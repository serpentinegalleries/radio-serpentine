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
radioApp.factory('player',function ($uibModal, $log, audio) {

  return {
    open: function() {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          windowClass: 'playerModal',
          resolve: {
            items: function () {
            }
          }
        });
        audio.play();
    },
    min: function() {
      angular.element(document.querySelector('.playerModal')).addClass("blur");
      angular.element(document.querySelector('body')).removeClass("modal-open");
    }
  }
});

radioApp.service('playerService', function () {
    return {
        getTrack: function (slug) {
            $http.get('/api/get_post/?post_slug=' + slug).
              then(function(response) {
                  $scope.track = response.data.post;
              });
        },
    };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

radioApp.controller('ModalInstanceCtrl', function ($uibModalInstance, $scope, player) {

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.minim = function() {
    player.min();
  }

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

/* UI in player */
radioApp.controller('AudioCtrl', function ($scope, $log, audio) {
  $scope.songSelect = function(path) {
    audio.setSrc(path);
  }
  $scope.audioPause = function(songPath) {
    audio.pause();  
  };
  $scope.audioPlay = function(songPath) {
    audio.play();  
  };
});

/* Header controller */
radioApp.controller('FeatureCtrl', function ($scope, $http, $log, audio, player) {
  $http.get('/api/get_tag_posts/?tag_slug=featured').
        then(function(response) {
            $scope.feature = response.data.posts[0];
            audio.setSrc($scope.feature.custom_fields.audio[0]);
        });
  $scope.play = function() {
    player.open();
  }
});
