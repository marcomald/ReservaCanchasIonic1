// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.home-buscarEstablecimiento', {
    url: '/home-buscarEstablecimiento',
    views: {
      'menuContent': {
        templateUrl: 'templates/buscarEstablecimiento.html',
        controller: 'BuscarEstablecimientoCtrl'
      }
    }
  })
  .state('app.home-realizarReserva', {
    url: '/home-realizarReserva',
    views: {
      'menuContent': {
        templateUrl: 'templates/realizarReserva.html',
        controller: 'RealizarReservaCtrl'
      }
    }
  })
  .state('app.home-pasosReserva', {
    url: '/home-pasosReserva',
    views: {
      'menuContent': {
        templateUrl: 'templates/pasosReserva.html',
        controller: 'PasosReservaCtrl'
      }
    }
  })
  .state('app.home-confirmarReserva', {
    url: '/home-confirmarReserva',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmarReserva.html',
        controller: 'ConfirmarReservaCtrl'
      }
    }
  })
  .state('app.home-buscarCercanos', {
    url: '/home-buscarCercanos',
    views: {
      'menuContent': {
        templateUrl: 'templates/buscarCercanos.html',
        controller: 'BuscarCercanosCtrl'
      }
    }
  })
  .state('app.home-verEstablecimiento', {
    url: '/home-verEstablecimiento',
    views: {
      'menuContent': {
        templateUrl: 'templates/establecimientoInfo.html',
        controller: 'InfoEstablecimientoCtrl'
      }
    }
  })
  .state('app.info', {
    url: '/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/info.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.user-profile', {
    url: '/user-profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/user-profile.html',
        controller: 'UserProfiletCtrl'
      }
    }
  })
  .state('createUser', {
    url: '/create-user',
    templateUrl: 'templates/createUser.html',
    controller: 'createUserCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
    }
  );
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
