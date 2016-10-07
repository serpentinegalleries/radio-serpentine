// app.js
var radioApp = angular.module('radioApp', ['ui.router','ui.bootstrap', 'ngSanitize']);
var TEMPLATES_URI = '/wp-content/themes/radio-serpentine/scripts/app/templates/';

radioApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('landing', {
            url: '/',
            templateUrl: TEMPLATES_URI + 'landing-page.html',
        })
        
        .state('index', {
            url: '/home',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'home.html' },

                'feature@index': { templateUrl: TEMPLATES_URI +  'feature.html' },

                'menu@index': { 
                    templateUrl: TEMPLATES_URI + 'menu.html',
                    controller: "MenuCtrl",
                },
            },
        })
        
        .state('about', {
            url: '/about',
            templateUrl: TEMPLATES_URI + 'about.html',
            controller: 'AboutCtrl',
        })
        
        .state('participants', {
            url: '/participants',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'participants.html', controller: "ParticipantsCtrl", },
            },
        })

        .state('participant', {
          url: "/participants/:participantId",
          templateUrl: TEMPLATES_URI + 'participants-single.html',
          controller: "SingleParticipantCtrl",
        })

        .state('series', {
            url: '/series',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'series.html', controller: "SeriesCtrl",  },
            }
        })

        .state('series-single', {
          url: "/series/:seriesId",
          templateUrl: TEMPLATES_URI + 'series-single.html',
          controller: "SingleSeriesCtrl",
        })

        .state('tracks', {
            url: '/tracks',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'tracks.html', controller: "TracksCtrl", },
            }
        })

        .state('track', {
          url: "/tracks/:trackId",
          templateUrl: TEMPLATES_URI + 'tracks-single.html',
          controller: "SingleTrackCtrl",
        })
        
        .state('marathon', {
            url: '/miracle',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'event-marathon.html', controller: "MarathonCtrl", },

                'programme@marathon': { templateUrl: TEMPLATES_URI +  'event-programme.html' },

                'participants@marathon': { 
                    templateUrl: TEMPLATES_URI + 'event-participants.html', controller: "MarathonParticipantsCtrl",
                },
                'supporters@marathon': { 
                    templateUrl: TEMPLATES_URI + 'event-supporters.html', controller: "MarathonSupportersCtrl",
                },
                'event-blog@marathon': { 
                    templateUrl: TEMPLATES_URI + 'event-blog.html', controller: "EventBlogCtrl",
                },                
            },
        })

        .state('blog', {
            url: '/miracle/blog',
            templateUrl: TEMPLATES_URI + 'blog.html',
            controller: 'BlogCtrl',
        })

        .state('blog-post', {
            url: '/miracle/blog/:postId',
            templateUrl: TEMPLATES_URI + 'blog-post.html',
            controller: 'BlogPostCtrl',
        })
        
        // use the HTML5 History API
//        $locationProvider.html5Mode(true);
  //      $urlMatcherFactoryProvider.strictMode(false);
});


/**************************
Player modal factory
**************************/

radioApp.factory('player',function ($uibModal, $log, $http, audio) {
  var track = {};

  var isOpen = false;

  var open = function() {
        if(isOpen) {
          angular.element(document.querySelector('.playerModal')).removeClass("blur");
          angular.element(document.querySelector('.modal-backdrop')).removeClass("send-to-back");
          angular.element(document.querySelector('body')).addClass("modal-open");  
          angular.element(document.querySelector('.wave-container')).addClass("hidden");  
          angular.element(document.querySelector('.metadata')).removeClass("hidden");  
          angular.element(document.querySelector('.download')).removeClass("hidden");  
          angular.element(document.querySelector('.on-air')).removeClass("hidden");  
          audio.play();        
        } else {
          angular.element(document.querySelector('.wave-container')).addClass("hidden");
          var modalInstance = $uibModal.open({
            animation: false,
            ariaDescribedBy: 'modal-body',
            templateUrl: TEMPLATES_URI + 'modal-player.html',
            controller: 'PlayerInstanceCtrl',
            windowClass: 'playerModal',
          });
          isOpen = true;
        };

    };
  var setTrackData = function (slug) {
    track = $http.get('/?json=get_post&post_slug=' + slug).
        then(function(response) {
            track = response.data.post;
            return track;
        });
    return track; 
  };
  var getTrackData = function () {
      return track;
  };
  var min = function() {
      angular.element(document.querySelector('.playerModal')).addClass("blur");
      angular.element(document.querySelector('body')).removeClass("modal-open");
      angular.element(document.querySelector('.wave-container')).removeClass("hidden");  
      angular.element(document.querySelector('.modal-backdrop')).addClass("send-to-back");
      angular.element(document.querySelector('.metadata')).addClass("hidden");  
      angular.element(document.querySelector('.download')).addClass("hidden");  
      angular.element(document.querySelector('.on-air')).addClass("hidden");  
  };
  return {
    open: open,
    setTrackData: setTrackData,
    get: getTrackData,
    min: min,
  }
});

/**************************
Audio audioElement factory
**************************/

radioApp.factory('audio',function ($document, $log, $http, $q, $rootScope) {
  var audioElement = $document[0].createElement('audio'); // $document[0].getElementById('audio');

  return {
    audioElement: audioElement,
    play: function() {
        audioElement.play();
    },
    pause: function() {
        audioElement.pause();
        $log.info(audioElement.duration);
    },
    setSrc: function(path) {
        var deferred = $q.defer();
        var audioDuration;
        if(path.includes("soundcloud")) {
            $http.get('https://api.soundcloud.com/resolve.json?url=' + path + '&client_id=43c06cb0c044139be1d46e4f91eb411d').then(function(sound){
                if (audioElement.src != sound.data.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d') {
                    audioElement.pause();
                    audioElement.src = sound.data.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d';
                    audioElement.load();
                    audioDuration = sound.data.duration;
                    audioElement.play();
                }
                else {
                    audioElement.play();
                } 
            });
        }
        else {
            if(audioElement.src !== path) {
                audioElement.pause();
                audioElement.src = path;
                audioElement.load();
                audioElement.play();
            }
            else {
                audioElement.play();
            }
        };
        $rootScope.$broadcast('changeTrack', audioDuration);
        deferred.resolve(audioElement);
        return deferred.promise;
    },
    loadSrc: function(path) {
      var deferred = $q.defer();
      var audioDuration;
      if(path.includes("soundcloud")) {
          $http.get('https://api.soundcloud.com/resolve.json?url=' + path + '&client_id=43c06cb0c044139be1d46e4f91eb411d').then(function(sound){
              if (audioElement.src != sound.data.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d') {
                  audioElement.pause();
                  audioElement.src = sound.data.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d';
                  audioElement.load();
                  audioDuration = sound.data.duration;
              }
              else {
              } 
          });
      }
      else {
          if(audioElement.src !== path) {
              audioElement.pause();
              audioElement.src = path;
              audioElement.load();
          }
          else {
          }
      };
      $rootScope.$broadcast('changeTrack', audioDuration);
      deferred.resolve(audioElement);
      return deferred.promise;
    }
  }
});

/**********************
Page components
**********************/

/* Player modal instance */
// Please note that $uibModalInstance represents a modal window (instance) dependency.

radioApp.controller('PlayerInstanceCtrl', function ($uibModalInstance, $log, $scope, player, audio) {
  // get related tracks and cue them for the next / previous buttons

  $scope.track = player.get();

  $scope.isPlaying = true;

  $scope.isVideo = false;
  
  $scope.$on('changeTrack', function(event, args) {
      $scope.track = player.get();
      $log.info(args);
      $scope.track.duration = args;
      $scope.isPlaying = true;
  });

  $scope.minim = function() {
    player.min();
  }
  $scope.previous = function(path) {
    /* To do: changetrack rootscope broadcast to update player data */
    audio.setSrc(path);
  }
  $scope.next = function(path) {
    /* To do: changetrack rootscope broadcast to update player data */
    audio.setSrc(path);
  }
  $scope.pause = function() {
    audio.pause();
    $scope.isPlaying = false;
  };
  $scope.play = function() {
    audio.play();  
    $scope.isPlaying = true;
  };

});

/* Wave Icon Controller, Triggers player open and closed */
radioApp.controller('WaveIconCtrl', function ($uibModal, $scope, $log, audio, player) {
  $scope.play = function() {
    player.open();
  }
});

/* Controller for featured track or event on the homepage */
radioApp.controller('FeatureCtrl', function ($scope, $http, $log, audio, player) {
  $http.get('/?json=get_tag_posts&tag_slug=featured').
        then(function(response) {
            $scope.item = response.data.posts[0];
            //$log.info(item);
            player.setTrackData($scope.item.slug).then(function(){
                  audio.loadSrc($scope.item.custom_fields.audio[0]);
            });
        });
  $scope.play = function(song_url, slug) {
    player.setTrackData(slug).then(function(){
        audio.setSrc(song_url).then(function(){
          player.open();
        });
    });
  }
});

/* Controller for menu on the homepage */
radioApp.controller('MenuCtrl', function ($scope, $http, $log, audio, player) {
  $http.get('/?json=get_category_posts&category_slug=tracks&count=4').
        then(function(response) {
            $scope.posts = response.data.posts;
        });
});



/**********************
Page controllers
**********************/

radioApp.controller('ParticipantsCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=participants&count=250').
        then(function(response) {
            $scope.posts = response.data.posts;
        });
});

radioApp.controller('SeriesCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=series').
        then(function(response) {
            $scope.posts = response.data.posts;
        });
});

radioApp.controller('TracksCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=tracks&count=250&date_format=m/d/Y').
        then(function(response) {
            $scope.tracks = response.data.posts;
        });
});

radioApp.controller('AboutCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_post&post_slug=about').
        then(function(response) {
            $scope.about = response.data.post;
        });
});


/******************
Single participant, tracks, and series pages' controllers
******************/


radioApp.controller('SingleTrackCtrl', function ($scope, $http, $log, $stateParams, player, audio) {
  var slug = $stateParams.trackId;
  $http.get('/?json=get_post&post_slug=' + slug + '&date_format=m/d/Y').
        then(function(response) {
            $scope.track = response.data.post;
        });
  $scope.play = function(song_url, slug) {
    player.setTrackData(slug).then(function(){
        audio.setSrc(song_url).then(function(){
          player.open();
        });
    });
  }
});

radioApp.controller('SingleParticipantCtrl', function ($scope, $sce, $http, $log, $stateParams, player, audio) {
  var slug = $stateParams.participantId;
  $http.get('/?json=get_post&post_slug=' + slug).
        then(function(response) {
            $scope.participant = response.data.post;
        });
  $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
  };
  $scope.play = function(song_url, slug) {
    player.setTrackData(slug).then(function(){
        audio.setSrc(song_url).then(function(){
          player.open();
        });
    });
  }
});

radioApp.controller('SingleSeriesCtrl', function ($scope, $sce, $http, $log, $stateParams, player, audio) {
  var slug = $stateParams.seriesId;
  $http.get('/?json=get_post&post_slug=' + slug + '&date_format=m/d/Y').
        then(function(response) {
            $scope.series = response.data.post;
        });
  $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
  };
  $scope.play = function(song_url, slug) {
    player.setTrackData(slug).then(function(){
        audio.setSrc(song_url).then(function(){
          player.open();
        });
    });
  }
});


/*****************
Dropdown menu
*****************/

radioApp.controller('DropdownCtrl', function ($scope, $log) {
  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});


/*********************
Event pages
*********************/

/* Miracle Marathon */

radioApp.controller('MarathonCtrl', function ($scope, $sce, $http, $log, $stateParams, player, audio) {
  $http.get('/?json=get_post&post_slug=miracle-marathon').
        then(function(response) {
            $scope.post = response.data.post;
        });
  $scope.renderHtml = function(code) {
      return $sce.trustAsHtml(code);
  };
  $scope.play = function(song_url, slug) {
    player.setTrackData(slug).then(function(){
        audio.setSrc(song_url).then(function(){
          player.open();
        });
    });
  };
});


radioApp.controller('MarathonParticipantsCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=miracle-marathon-participant&count=12').
        then(function(response) {
            $scope.posts = response.data.posts;
        });
});

radioApp.controller('MarathonSupportersCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_post&post_slug=supporters').
        then(function(response) {
            $scope.post = response.data.post;
        });
});

/*********************
Event blog
*********************/

radioApp.controller('BlogCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=blog&date_format=j F Y').
        then(function(response) {
            $scope.posts = response.data.posts;
        });
});

radioApp.controller('BlogPostCtrl', function ($scope, $http, $log, $stateParams, player, audio) {
  var slug = $stateParams.postId;
  $http.get('/?json=get_post&post_slug=' + slug + '&date_format=j F Y').
        then(function(response) {
            $scope.post = response.data.post;
        });
});

radioApp.controller('EventBlogCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=blog&count=2&date_format=j F Y').
        then(function(response) {
            $scope.post= response.data.posts[0];
        });
});