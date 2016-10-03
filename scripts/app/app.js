// app.js
var radioApp = angular.module('radioApp', ['ui.router','ui.bootstrap', 'ngSanitize']);
var TEMPLATES_URI = '/wp-content/themes/radio-serpentine/scripts/app/templates/';

radioApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
        
        .state('home', {
            url: '/',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'partial-home.html' },

                'feature@home': { templateUrl: TEMPLATES_URI +  'partial-home-feature.html' },

                'menu@home': { 
                    templateUrl: TEMPLATES_URI + 'partial-home-menu.html',
                },
            },
        })
        
        .state('participants', {
            url: '/participants',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'partial-participants.html', controller: "ParticipantsCtrl", },
            },
        })

        .state('participant', {
          url: "/participants/:participantId",
          templateUrl: TEMPLATES_URI + 'partial-participants-single.html',
          controller: "SingleParticipantCtrl",
        })

        .state('series', {
            url: '/series',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'partial-series.html', controller: "SeriesCtrl",  },
            }
        })

        .state('themes', {
            url: '/themes',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'partial-themes.html' },
            }
        })

        .state('tracks', {
            url: '/tracks',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'partial-tracks.html', controller: "TracksCtrl", },
            }
        })

        .state('track', {
          url: "/tracks/:trackId",
          templateUrl: TEMPLATES_URI + 'partial-tracks-single.html',
          controller: "SingleTrackCtrl",
        })
        
        // use the HTML5 History API
        // $locationProvider.html5Mode(true);

});
radioApp.factory('player',function ($uibModal, $log, $http, audio) {
  var track = {};

  var isOpen = false;

  var open = function() {
        if(isOpen) {
          angular.element(document.querySelector('.playerModal')).removeClass("blur");
          angular.element(document.querySelector('body')).addClass("modal-open");          
        } else {
          var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: TEMPLATES_URI + 'modal-player.html',
            controller: 'PlayerInstanceCtrl',
            windowClass: 'playerModal',
          });
          audio.play();
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
  };

  return {
    open: open,
    setTrackData: setTrackData,
    get: getTrackData,
    min: min,
  }
});


// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

radioApp.controller('PlayerInstanceCtrl', function ($uibModalInstance, $log, $scope, player, audio) {

  $scope.track = player.get();

  $scope.isPlaying = true;

  $scope.reinit = function() {
    $scope.$apply(function () {
      $scope.track = player.get();
    });
  }
  
  $scope.minim = function() {
    player.min();
  }
  $scope.next = function(path) {
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

radioApp.factory('audio',function ($document, $log) {
  var audioElement = $document[0].createElement('audio'); // $document[0].getElementById('audio');
  return {
    audioElement: audioElement,
    play: function() {
        audioElement.play();
    },
    pause: function() {
        audioElement.pause();
    },
    setSrc: function(path) {
      if(path.includes("soundcloud")) {
        SC.get('/resolve.json?url=' + path).then(function(sound){
          audioElement.src = sound.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d';
        });
      }
      else {
        audioElement.src = path;
      };
      audioElement.load();
    }
  }
});

/* Wave Icon Controller */
radioApp.controller('WaveIconCtrl', function ($uibModal, $scope, $log, audio, player) {
  $scope.play = function() {
    player.open();
  }
});

/* Header controller */
radioApp.controller('FeatureCtrl', function ($scope, $http, $log, audio, player) {
  $http.get('/?json=get_tag_posts&tag_slug=featured').
        then(function(response) {
            $scope.feature = response.data.posts[0];
            audio.setSrc($scope.feature.custom_fields.audio[0]);
        });
  $scope.play = function(song_url, slug) {
    audio.setSrc(song_url);
    player.setTrackData(slug).then(function(){
      player.open();
    });
  }
});

radioApp.controller('ParticipantsCtrl', function ($scope, $http, $log) {
  $http.get('/?json=get_category_posts&category_slug=participants&count=50').
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
  $http.get('/?json=get_category_posts&category_slug=tracks').
        then(function(response) {
            $scope.tracks = response.data.posts;
        });
});


radioApp.controller('SingleTrackCtrl', function ($scope, $http, $log, $stateParams, player, audio) {
  var slug = $stateParams.trackId;
  $http.get('/?json=get_post&post_slug=' + slug).
        then(function(response) {
            $scope.track = response.data.post;
        });
  $scope.play = function(song_url, slug) {
    $log.info(song_url);
    audio.setSrc(song_url);
    player.setTrackData(slug).then(function(){
      player.open();
    });
  }
  angular.forEach($scope.track, function(item){
    var values = /(.*)\s+\((.+)\)\s*$/.exec(item.custom_fields.participant||"") || [];
    item.custom_fields.participant = values;
  });
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
    audio.setSrc(song_url);
    player.setTrackData(slug).then(function(){
      player.open();
    });
  }
});

radioApp.controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'tracks',
    'series',
    'themes'
  ];

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
