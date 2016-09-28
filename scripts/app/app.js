// app.js
var radioApp = angular.module('radioApp', ['ui.router','ui.bootstrap']);
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
                '': { templateUrl: TEMPLATES_URI + 'partial-participants.html' },
            }
        })

        .state('series', {
            url: '/series',
            views: {
                '': { templateUrl: TEMPLATES_URI + 'partial-series.html' },
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
                '': { templateUrl: TEMPLATES_URI + 'partial-tracks.html' },
            }
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
            resolve: {
              items: function () {
              }
            }
          });
          audio.play();
          isOpen = true;
        };
    };

  var setTrackData = function (slug) {
    track = $http.get('/api/get_post/?post_slug=' + slug).
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
  var audioElement = $document[0].createElement('audio');
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
  $http.get('/api/get_tag_posts/?tag_slug=featured').
        then(function(response) {
            $scope.feature = response.data.posts[0];
            audio.setSrc($scope.feature.custom_fields.audio[0]);
        });
  $scope.play = function(slug) {
    player.setTrackData(slug).then(function(){
      player.open();
    });
  }
});
