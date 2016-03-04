 // Ionic Starter App

 // angular.module is a global place for creating, registering and retrieving Angular modules
 // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
 // the 2nd parameter is an array of 'requires'
 // 'starter.controllers' is found in controllers.js
 angular.module('app', ['ionic', 'app.controllers', 'app.services'])

 .run(function ($ionicPlatform) {
     $ionicPlatform.ready(function () {
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
         // for form inputs)
         if (window.cordova && window.cordova.plugins.Keyboard) {
             cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
             cordova.plugins.Keyboard.disableScroll(true);

         }
         if (window.StatusBar) {
             // org.apache.cordova.statusbar required
             StatusBar.styleDefault();
         }
     });
 })

 .config(function ($stateProvider, $urlRouterProvider) {
     $stateProvider

         .state('app', {
         url: "/app",
         abstract: true,
         templateUrl: "templates/Menu/menu.html",
         controller: 'appCtrl'
     })

     .state('app.tabs', {
         url: "/tabs",
         views: {
             'menuContent': {
                 templateUrl: "templates/Tabs/tabs.html",
                 //controller: "tabCtrl"
             }
         }
     })

     .state('app.about', {
         url: "/about",
         views: {
             'menuContent': {
                 templateUrl: "templates/Menu/about.html",
             }
         }
     })

     .state('app.resources', {
         url: "/resources",
         views: {
             'menuContent': {
                 templateUrl: "templates/Menu/resources.html",

             }
         }
     })

     .state('app.tabs.mapview', {
         url: '/map/tourmap',
         views: {
             'tab-map': {
                 templateUrl: 'templates/Tabs/mapview.html',
                 controller: 'mapCtrl'
             }
         }
     })

     .state('app.tabs.map', {
         url: '/map',
         views: {
             'tab-map': {
                 templateUrl: 'templates/Tabs/tab-map.html',
                 controller: 'premapCtrl'
             }
         }
     })

     .state('app.tabs.quizzes', {
         url: '/quizzes',
         views: {
             'tab-quizzes': {
                 templateUrl: 'templates/Tabs/tab-quizzes.html',
                 //controller: 'quizzesCtrl'
             }
         }
     })

     .state('app.tabs.timberquizzes', {
         url: '/timberquizzes',
         views: {
             'tab-quizzes': {
                 templateUrl: 'templates/Quizzes/timberquizzes.html',
                 controller: 'timbertoursCtrl'
             }
         }
     })

     .state('app.tabs.steelquizzes', {
         url: '/steelquizzes',
         views: {
             'tab-quizzes': {
                 templateUrl: 'templates/Quizzes/steelquizzes.html',
                 controller: 'steeltoursCtrl'
             }
         }
     })

     .state('app.tabs.concretequizzes', {
         url: '/concretequizzes',
         views: {
             'tab-quizzes': {
                 templateUrl: 'templates/Quizzes/concretequizzes.html',
                 controller: 'concretetoursCtrl'
             }
         }
     })

     .state('app.tabs.connectionsquizzes', {
         url: '/connectionsquizzes',
         views: {
             'tab-quizzes': {
                 templateUrl: 'templates/Quizzes/connectionsquizzes.html',
                 controller: 'connectionstoursCtrl'
             }
         }
     })

     .state('app.tabs.lateralquizzes', {
         url: '/lateralquizzes',
         views: {
             'tab-quizzes': {
                 templateUrl: 'templates/Quizzes/lateralquizzes.html',
                 controller: 'lateraltoursCtrl'
             }
         }
     })

     .state('app.tabs.tours', {
         url: '/tours',
         views: {
             'tab-tours': {
                 templateUrl: 'templates/Tabs/tab-tours.html',
                 //controller: 'toursCtrl'
             }
         }
     })

     .state('app.tabs.detailedquiz', {
         url: '/quizzes/:tourId',
         views: {
             'tab-quizzes': {
                 templateUrl: 'templates/Quizzes/detailedquiz.html',
                 controller: 'detailedquizCtrl'
             }
         }
     })

     .state('app.tabs.detailedtour', {
         url: '/tours/:tourId',
         views: {
             'tab-tours': {
                 templateUrl: 'templates/Tours/detailedtour.html',
                 controller: 'detailedtourCtrl'
             }
         }
     })

     .state('app.tabs.steel', {
         url: '/steel',
         views: {
             'tab-tours': {
                 templateUrl: 'templates/Tours/steeltour.html',
                 controller: 'steeltoursCtrl'
             }
         }
     })

     .state('app.tabs.timber', {
         url: '/timber',
         views: {
             'tab-tours': {
                 templateUrl: 'templates/Tours/timbertour.html',
                 controller: 'timbertoursCtrl'
             }
         }
     })

     .state('app.tabs.concrete', {
         url: '/concrete',
         views: {
             'tab-tours': {
                 templateUrl: 'templates/Tours/concretetour.html',
                 controller: 'concretetoursCtrl'
             }
         }
     })

     .state('app.tabs.lateral', {
         url: '/lateral',
         views: {
             'tab-tours': {
                 templateUrl: 'templates/Tours/lateraltour.html',
                 controller: 'lateraltoursCtrl'
             }
         }
     })

     .state('app.tabs.connections', {
         url: '/connections',
         views: {
             'tab-tours': {
                 templateUrl: 'templates/Tours/connectionstour.html',
                 controller: 'connectionstoursCtrl'
             }
         }
     });

     // if none of the above states are matched, use this as the fallback
     $urlRouterProvider.otherwise('/app/tabs');
 });