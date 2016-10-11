// app.js
var radioApp = angular.module('radioApp', ['ui.router','ui.bootstrap', 'ngSanitize']);
var TEMPLATES_URI = '/wp-content/themes/radio-serpentine/scripts/app/templates/';

radioApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
        
        .state('index', {
            url: '/',
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

                'programme@marathon': { templateUrl: TEMPLATES_URI +  'event-programme.html',
                  controller: "ProgrammeCtrl",
                 },

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

        // nested list with just some random string data
        .state('marathon.saturday', {
            url: '',
            templateUrl: TEMPLATES_URI + 'event-programme-saturday.html',
        })

        // nested list with just some random string data
        .state('marathon.sunday', {
            url: '',
            templateUrl: TEMPLATES_URI + 'event-programme-sunday.html',
        })

        .state('marathon-participants', {
          url: "/participants",
          templateUrl: TEMPLATES_URI + 'event-participants-all.html',
          controller: "MarathonParticipantsCtrl",
        })

        .state('blog', {
            url: '/miracle/blog',
            templateUrl: TEMPLATES_URI + 'blog.html',
            controller: 'BlogCtrl',
        })

        .state('blog2', {
            url: '/miracle/blog/previous/2',
            templateUrl: TEMPLATES_URI + 'blog-2.html',
            controller: 'BlogCtrl',
        })

        .state('blog3', {
            url: '/miracle/blog/previous/3',
            templateUrl: TEMPLATES_URI + 'blog-3.html',
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

radioApp.factory('player',function ($uibModal, $log, $http, audio, $rootScope, $timeout) {
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
  var bringToFront = function() {
      if(isOpen) {
        angular.element(document.querySelector('.playerModal')).removeClass("blur");
        angular.element(document.querySelector('.modal-backdrop')).removeClass("send-to-back");
        angular.element(document.querySelector('body')).addClass("modal-open");  
        angular.element(document.querySelector('.wave-container')).addClass("hidden");  
        angular.element(document.querySelector('.metadata')).removeClass("hidden");  
        angular.element(document.querySelector('.download')).removeClass("hidden");  
        angular.element(document.querySelector('.on-air')).removeClass("hidden");  
      };
  };
  return {
    open: open,
    setTrackData: setTrackData,
    get: getTrackData,
    min: min,
    bringToFront: bringToFront,
  }
});


radioApp.factory('marathon_player',function ($uibModal, $log, $http, audio, $rootScope) {
  var track = {};

  var isOpen = false;

  var open = function() {
          angular.element(document.querySelector('.wave-container')).addClass("hidden");
          var modalInstance = $uibModal.open({
            animation: false,
            ariaDescribedBy: 'modal-body',
            templateUrl: TEMPLATES_URI + 'modal-player-marathon.html',
            controller: 'PlayerMarathonInstanceCtrl',
            windowClass: 'marathonModal',
          });
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
      angular.element(document.querySelector('.marathonModal')).addClass("blur");
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
  audioElement.src = "http://tx.sharp-stream.com/http_live.php?i=rsl7.mp3&device=website";

  return {
    audioElement: audioElement,
    play: function() {
        audioElement.play();
        $rootScope.$broadcast('isTrackPlaying');
    },
    pause: function() {
        audioElement.pause();
    },
    isAudioPlaying: function() {
      return audioElement.paused;
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
      if(audioElement.src === '') {
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

radioApp.controller('PlayerInstanceCtrl', function ($uibModalInstance, $log, $http, $scope, player, audio, $timeout, $interval) {
  // get related tracks and cue them for the next / previous buttons

  $scope.track = player.get();

  $scope.isPlaying = true;

  $scope.isVideo = false;

  $interval($scope.callAtInterval, 5000);

  $scope.$on('isTrackPlaying', function(event) {
    $log.info(!(audio.isAudioPlaying()));
    $scope.isPlaying = !(audio.isAudioPlaying());
  });
  
  $scope.$on('changeTrack', function(event, args) {
      $scope.track = player.get();
      $scope.isPlaying = true;
  });

  $scope.callAtInterval = function() {
    console.log("Interval occurred");
   // angular.element(document.querySelector('#live-audio-metadata')).html("hello");

  }

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

/* Marathon Modal */
radioApp.controller('PlayerMarathonInstanceCtrl', function ($uibModalInstance, marathon_player, $log, $scope, player, audio) {
  // get related tracks and cue them for the next / previous buttons

  $scope.track = player.get();

  $scope.isPlaying = true;

  $scope.isVideo = true;

  $scope.$on('isTrackPlaying', function(event) {
    $log.info(!(audio.isAudioPlaying()));
    $scope.isPlaying = !(audio.isAudioPlaying());
  });
  
  $scope.$on('changeTrack', function(event, args) {
      $scope.track = player.get();
      $scope.isPlaying = true;
  });

  $scope.minim = function() {
    marathon_player.min();
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

  $scope.ok = function () {
    $uibModalInstance.dismiss();
    angular.element(document.querySelector('.wave-container')).removeClass("hidden");
    angular.element(document.querySelector('body')).removeClass("modal-open");
  };

});

/* Wave Icon Controller, Triggers player open and closed */
radioApp.controller('WaveIconCtrl', function ($uibModal, $scope, $log, audio, player, $rootScope, $http, marathon_player) {
  /*$http.get('/?json=get_tag_posts&tag_slug=featured').
        then(function(response) {
            $scope.item = response.data.posts[0];
            player.setTrackData($scope.item.slug).then(function(){
                  audio.loadSrc($scope.item.custom_fields.audio[0]);
            });
        });
  $scope.play = function() {
    audio.play();
    player.open();
    $rootScope.$broadcast('isTrackPlaying');
  }*/
    $scope.bringToFront = function() {
      player.bringToFront();
  };
});

/* Controller for featured track or event on the homepage */
radioApp.controller('FeatureCtrl', function ($scope, $http, $log, audio, player, marathon_player) {
  $http.get('/?json=get_tag_posts&tag_slug=featured').
        then(function(response) {
            $scope.item = response.data.posts[0];
            player.setTrackData($scope.item.slug).then(function(){
                  audio.loadSrc($scope.item.custom_fields.audio[0]);
            });
        });
  $scope.play = function(song_url, slug) {
    marathon_player.open();
    /*marathon_player.setTrackData(slug).then(function(){
        audio.setSrc(song_url).then(function(){
          marathon_player.open();
        });
    });*/
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

/*radioApp.controller('AboutCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_post&post_slug=about').
        then(function(response) {
            $scope.about = response.data.post;
        });
});*/


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
  $http.get('/?json=get_category_posts&category_slug=' + slug + '&date_format=m/d/Y').
        then(function(response) {
            $scope.tracks = response.data.posts;
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

radioApp.controller('MarathonCtrl', function ($scope, $sce, $http, $log, $stateParams, player, audio, marathon_player) {
  $scope.play = function(song_url, slug) {
    player.open();
    audio.play();
  };
});


radioApp.controller('MarathonParticipantsCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=miracle-marathon-participant&count=12').
        then(function(response) {
            $scope.posts = response.data.posts;
        });
  $http.get('/?json=get_category_posts&category_slug=miracle-marathon-participant&count=150').
        then(function(response) {
            $scope.participants = response.data.posts;
        });
});

radioApp.controller('MarathonSupportersCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_post&post_slug=supporters').
        then(function(response) {
            $scope.post = response.data.post;
        });
});

radioApp.controller('ProgrammeCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=saturday-8').
        then(function(response) {
            $scope.saturday = response.data.posts;
        });
  $http.get('/?json=get_category_posts&category_slug=sunday-9').
        then(function(response) {
            $scope.sunday = response.data.posts;
        });
});


/*********************
Event blog
*********************/

radioApp.controller('BlogCtrl', function ($scope, $http, $log, $sce) {
  $http.get('/?json=get_category_posts&category_slug=blog&count=50&date_format=j F Y').
        then(function(response) {
            $scope.posts = response.data.posts;
            $scope.posts = $sce.trustAsHtml($scope.posts);
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

radioApp.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);