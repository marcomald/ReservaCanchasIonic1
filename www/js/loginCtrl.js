
angular.module('starter.controllers',[])

  .controller('loginCtrl', function($scope, $timeout, $ionicPopup) {

    $scope.showAlert = function() {
      console.log("Entro al metodo");
      var alertPopup = $ionicPopup.alert({
        title: 'Don\'t eat that!',
        template: 'It might taste good'
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

  })
// .inject = ['$scope', '$timeout', '$ionicPopup'];
