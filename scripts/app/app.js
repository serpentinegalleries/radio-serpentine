// app.js
var radioApp = angular.module('radioApp', ['ui.router']);
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
        $locationProvider.html5Mode(true);

});
