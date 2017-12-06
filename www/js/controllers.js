angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
//############################ CREATE USER CONTROLLER ################################################
.controller('createUserCtrl', function($scope, $state) {
  $scope.goLogin = function(){
    $state.go('login');
  };

})
//############################ USER PROFILE CONTROLLER ################################################
.controller('UserProfiletCtrl', function($scope, $state, $rootScope) {
  $scope.user = $rootScope.userLogged;
  console.log($scope.user);
  $scope.goLogin = function(){
    $state.go('login');
  };

})
//############################ LOGIN CONTROLLER ################################################
.controller('loginCtrl', function($scope, $timeout, $ionicPopup, $location, ServicioUsuario,$rootScope,$state) {

  $scope.user = {};
  $scope.userFromDB = {};
  $rootScope.userLogged = {};

  $scope.goHome = function() {
    $state.go('app.home');
  };

  $scope.goCreateUser = function() {
    $state.go('login.createUser');
  };

  $scope.showAlert = function() {

    ServicioUsuario.login($scope.user.name, $scope.user.password).then(function(res){
      $scope.userFromDB = res.data[0];
      $rootScope.userLogged = res.data[0];
      if(res.data.length > 0){
      var alertPopup = $ionicPopup.alert({
        title: 'Exito!',
        template: 'Bienvenido '+$scope.userFromDB.nombres
      });

      alertPopup.then(function(res) {
        console.log('Ingreso Correcto');
        $scope.goHome();
      });

    }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Usuario y/o contraseña incorrecta'
        });
        alertPopup.then(function(res) {
          console.log('Ingreso Incorrecto');
        });
    }
    },function(err){
      console.error(err);
    });

  };
});
