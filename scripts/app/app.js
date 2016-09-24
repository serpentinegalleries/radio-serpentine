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

/* Header controller */
radioApp.controller('FeatureCtrl', function ($scope, $http, $log) {
  $http.get('/api/get_tag_posts/?tag_slug=featured').
        then(function(response) {
            $scope.feature = response.data.posts[0];
        });
});


/* Player and related modals */
radioApp.controller('PlayerModalCtrl', function ($uibModal, $log) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = false;

  $ctrl.open = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      windowClass: 'playerModal',
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  /* Opens different modal */
  $ctrl.openComponentModal = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      component: 'modalComponent',
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

radioApp.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.min = function() {
    angular.element(document.querySelector('.playerModal')).addClass("blur");
    angular.element(document.querySelector('body')).removeClass("modal-open");
  }

});

// Please note that the close and dismiss bindings are from $uibModalInstance.

radioApp.component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});

// Defines a simple audio service available to all states

radioApp.factory('audio',function ($document, $log) {
  var audioElement = $document[0].createElement('audio');
  return {
    audioElement: audioElement,
    play: function(filename) {
        if(audioElement.src != filename) {
          audioElement.src = filename;
        };
        audioElement.play();
    },
    pause: function() {
        audioElement.pause();
    }
  }
});

radioApp.controller('AudioCtrl', function ($scope, $log, audio) {
  $scope.songSelect = function(songPath) {
    if(songPath.includes("soundcloud")) {
      SC.get('/resolve.json?url=' + songPath).then(function(sound){
        audio.play(sound.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d');
      });
    }
    else {
      audio.play(songPath)
    };
  }
  $scope.audioPause = function(songPath) {
    audio.pause();  
  };
});


