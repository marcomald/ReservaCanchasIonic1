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
.controller('SearchCtrl', function($rootScope, $scope, $stateParams,ServicioUsuario, ServicioReserva, ServicioEstablecimiento, ServicioCancha, $ionicPopup) {
  $scope.reservas = {};
  $scope.canchas = {};
  $scope.establecimientos = {};
  $scope.horario = {};
  $scope.usuario = {};
  $scope.usuario = $rootScope.userLogged;
  $scope.reservasCompletas = [];

  $scope.recuperarEstablecimientos = function(){
    ServicioEstablecimiento.recuperarEstablecimientos().then(function(res){
      $scope.establecimientos = res.data;
      console.log(res);
    },function(err){
      console.log('Error, ',err);
    });
  }

  $scope.recuperarCanchas = function(){
    ServicioCancha.recuperarCanchas().then(function(res){
      $scope.canchas = res.data;
      console.log($scope.canchas);
    },function(err){
      console.log('Error, ',err);
    });
  }

  $scope.buscarReservas = function() {
    var id_user = $scope.usuario.id_usuario;
    var reserva = {};
    ServicioReserva.buscarPorIdUsuario(id_user).then(function(res){
      $scope.reservas = res.data;
      for(var i in $scope.reservas){
        for(var j in $scope.establecimientos){
          if($scope.reservas[i].id_establecimiento == $scope.establecimientos[j].id_establecimiento){
            reserva.establecimiento = $scope.establecimientos[j].nombre;
            for(var k in $scope.canchas){
              if($scope.reservas[i].id_cancha == $scope.canchas[k].id_cancha){
                reserva.cancha = $scope.canchas[k].nombre;
                reserva.usuario = $scope.usuario.nick;
                reserva.costo = $scope.reservas[i].costo_hora + ' $';
                reserva.fechaReserva = $scope.reservas[i].fecha;
                reserva.fechaRealizada = $scope.reservas[i].createdAt;
                reserva.hora = $scope.reservas[i].hora + ':00 - ' + (Number($scope.reservas[i].hora)+1) + ':00';
                reserva.id = i
                $scope.reservasCompletas.push(reserva);
                reserva = {};
              }
            }
          }
        }

      }

    },function(err){
      console.log('Error, ',err);
    });
  }

  $scope.recuperarCanchas();
  $scope.recuperarEstablecimientos();
  $scope.buscarReservas();


})

//###################### BUSCAR CERCANOS CONTROLLER ###################################
.controller('BuscarCercanosCtrl', function($scope, $state, ServicioUsuario, ServicioReserva, ServicioEstablecimiento, $ionicPopup, $q, $rootScope) {

  $scope.limiteDistancia;
  $scope.establecimientos = [];
  $scope.establecimientosEnRango = [];
  $scope.establecimiento = {};
  $scope.reserva = {};
  $scope.rango = {};
  $rootScope.establecimientoSeleccionado

  $scope.recuperarEstablecimientos = function(){
    ServicioEstablecimiento.recuperarEstablecimientos().then(function(res){
      $scope.establecimientos = res.data;
      console.log(res);
    },function(err){
      console.log('Error, ',err);
    });
  }

  $scope.recuperarEstablecimientos();

  var coordenadasNavegador;
  var numeroMarcadores = 0;
  var latMarcador;
  var lngMarcador;
  var map;
  var arregloDistancias = [];

  initMap();

  /**
   * Init map, google maps
   */
  function initMap() {

    //Saber la ubicacion
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        coordenadasNavegador = {lat: position.coords.latitude, lng: position.coords.longitude};
        console.log(coordenadasNavegador);

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: coordenadasNavegador
        });

        var marker = new google.maps.Marker({
          position: coordenadasNavegador,
          map: map,
          title:  'Usted esta aquí'
        });

      });
    } else {
      alert('Geolocation is not supported by this browser.');

      var centro = { lat: 0, lng: 0 };
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: centro
      });
    }

  }

  $scope.guardarDistancias = function(){
      var deferred ;
      deferred = $q.defer();
      var promises = [];
      var objetoYdistancia = {};
      var urlDistancia ;
      var j;

      for (j = 0; j < $scope.establecimientos.length; j++) {
        urlDistancia = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+coordenadasNavegador.lat+','+coordenadasNavegador.lng+'&destinations='+$scope.establecimientos[j].latitud+','+$scope.establecimientos[j].longitud+'&key=AIzaSyC4l4zw9BAp-Vur8WYSbPDzH_jDk3zfEmQ';
        console.log('URL DISTANCIA:',urlDistancia);
        promises.push(ServicioReserva.recuperarDistancia(urlDistancia));
      }
      $q.all(promises).then(function(res){
        res.forEach(function(dist, j){
          objetoYdistancia = { objEstablecimiento : $scope.establecimientos[j], distancia : dist.data};
          arregloDistancias.push(objetoYdistancia);
        });
        deferred.resolve(arregloDistancias);
      },function(err){
        console.error(err);
        deferred.reject(err);
      });
      return deferred.promise;
    }

    var arregloMarcadores = [];

  $scope.sacarEstablecimientosEnRango = function(){

    arregloMarcadores.forEach(function(dist, index){
      dist.setMap(null);
    });

    $scope.establecimientosEnRango = [];
    arregloDistancias = [];

    $scope.guardarDistancias().then(function(res){
      console.log('distancia:',arregloDistancias);

      arregloDistancias.forEach(function(dist, index){
        console.log($scope.rango.distancia)
        console.log(arregloDistancias[index].distancia.rows[0].elements[0].distance.value)
        if(arregloDistancias[index].distancia.rows[0].elements[0].distance.value <= ($scope.rango.distancia * 1000)){
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log($scope.rango.distancia)
          $scope.establecimientosEnRango.push(arregloDistancias[index].objEstablecimiento);
          console.log(arregloDistancias[index].objEstablecimiento.nombre);

          var marker = new google.maps.Marker({
            position: {lat: arregloDistancias[index].objEstablecimiento.latitud, lng: arregloDistancias[index].objEstablecimiento.longitud},
            map: map,
            title: arregloDistancias[index].objEstablecimiento.nombre,
            icon: {
              url: "../img/soccer.png"
            }
          });

          arregloMarcadores.push(marker);

          console.log(marker);

        }

      });

    },function(err){
      console.error(err);
    });
  }

  $scope.verInfoEstablecimiento = function(establecimiento){
    $rootScope.establecimientoSeleccionado = establecimiento;
    console.log(establecimiento)
    $state.go("app.home-verEstablecimiento");
  }

})
//###################### BUSCAR ESTABLECIMIENTOS CONTROLLER ###################################
.controller('BuscarEstablecimientoCtrl', function($scope, $rootScope, $state, ServicioUsuario, ServicioEstablecimiento, $ionicPopup) {

  $scope.establecimientos = {};
  $scope.filtroEstablecimiento = {};

  $scope.recuperarEstablecimientos = function(){
    ServicioEstablecimiento.recuperarEstablecimientos().then(function(res){
      $scope.establecimientos = res.data;
      console.log(res);
    },function(err){
      console.log('Error, ',err);
    });
  }

  $scope.recuperarEstablecimientos();

  $scope.verInfoEstablecimiento = function(establecimiento){
    $rootScope.establecimientoSeleccionado = establecimiento;
    console.log(establecimiento)
    $state.go("app.home-verEstablecimiento");
  }

})
//###################### INFO ESTABLECIMIENTO ############################################
.controller('InfoEstablecimientoCtrl', function($scope, $rootScope, $state, ServicioUsuario,$ionicPopup) {
  $scope.establecimiento = {};
  $scope.establecimiento = $rootScope.establecimientoSeleccionado;

  console.log($rootScope.establecimientoSeleccionado)

  var coordenadasNavegador;
  var numeroMarcadores = 0;
  var latMarcador;
  var lngMarcador;
  var map;

  initMap();

  function initMap() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    //Saber la ubicacion
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        coordenadasNavegador = {lat: position.coords.latitude, lng: position.coords.longitude};
        console.log(coordenadasNavegador);

        map = new google.maps.Map(document.getElementById('map1'), {
          zoom: 12,
          center: coordenadasNavegador
        });

        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);

      });
    } else {
      alert('Geolocation is not supported by this browser.');

      var centro = { lat: 0, lng: 0 };
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: centro
      });
    }

  }


  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: coordenadasNavegador,
      destination: {lat: $scope.establecimiento.latitud,lng:$scope.establecimiento.longitud},
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

})
//###################### REALIZAR RESERVA CONTROLLER ###################################
.controller('RealizarReservaCtrl', function($scope, $state, ServicioUsuario,$ionicPopup) {
  $scope.empezarReserva =  function(){
    $state.go("app.home-pasosReserva");
  }
})
.controller('PasosReservaCtrl', function($scope, $rootScope, $state, ServicioEstablecimiento, ServicioUsuario, ServicioCancha, $ionicPopup) {
  $scope.establecimientos = {};
  $scope.canchas = {};
  $scope.reserva = {};
  $scope.cancha = {};
  $scope.usuario = $rootScope.userLogged;
  $rootScope.datosReserva = {};

  console.log($scope.usuario);
  $scope.recuperarEstablecimientos = function(){
    ServicioEstablecimiento.recuperarEstablecimientos().then(function(res){
      $scope.establecimientos = res.data;
    },function(err){
      console.log('Error, ',err);
    });
  }

  $scope.recuperarEstablecimientos();

  $scope.recuperarCanchas = function(){
    ServicioCancha.buscarPorIdEstablecimiento(JSON.parse($scope.reserva.establecimiento).id_establecimiento).then(function(res){
      $scope.canchas = res.data;
    },function(err){
      console.log('Error, ',err);
    });
  }

  $scope.datosCancha = function(){
    $scope.cancha.iluminacion = false;
    $scope.cancha.cubierta =  false;
    if(JSON.parse($scope.reserva.cancha).iluminacion == true){
      $scope.cancha.iluminacion = true;
    }
    if(JSON.parse($scope.reserva.cancha).cubierta == true){
      $scope.cancha.cubierta = true;
    }
  }

  $scope.calcularHoraFin = function(){
    var hora_fin = (($scope.reserva.hora_inicio)*1)+1;
    $scope.reserva.hora_fin = hora_fin;
    $scope.reserva.hora_inicio = Number($scope.reserva.hora_inicio);
  }

  $scope.realizarReserva = function(){
    $scope.reserva.usuario = $scope.usuario;
    $rootScope.datosReserva = $scope.reserva;
    console.log($scope.reserva);
    $state.go("app.home-confirmarReserva");
  }

})
.controller('ConfirmarReservaCtrl', function($scope, $rootScope, $state, ServicioReserva, $ionicPopup) {

  $scope.datosReservacion = {};
  $scope.datosReservacion = $rootScope.datosReserva;

  $scope.establecimiento = {};
  $scope.establecimiento = JSON.parse($scope.datosReserva.establecimiento);

  $scope.cancha = {};
  $scope.cancha = JSON.parse($scope.datosReservacion.cancha);

  $scope.datosReserva.hora = $scope.datosReservacion.hora_inicio + ":00 - " + $scope.datosReservacion.hora_fin+ ":00";

  $scope.usuario = {};
  $scope.usuario = $scope.datosReservacion.usuario;

  $scope.realizarReserva = function(){
    var objReserva = {};
    objReserva.id_establecimiento = $scope.establecimiento.id_establecimiento;
    objReserva.id_cancha = $scope.cancha.id_cancha;
    objReserva.id_usuario =   $scope.usuario.id_usuario;
    objReserva.fecha = $scope.datosReservacion.fecha;
    objReserva.hora = $scope.datosReservacion.hora_inicio;
    objReserva.costo_hora = 45;

    ServicioReserva.ingresarReserva(objReserva).then(function(res){
      var alertPopup = $ionicPopup.alert({
        title: 'Exito!',
        template: 'Reserva Realizada'
      });
      $state.go("app.home");
      console.log(res);
    },function(err){
      console.log('Error, ',err);
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Se produjo un error'
      });
    });
  }

})
//###################### HOME CONTROLLER ###################################
.controller('HomeCtrl', function($scope, $state, ServicioUsuario, $ionicPopup) {

  $scope.goRealizarReserva = function(){
      $state.go("app.home-realizarReserva");
  };

  $scope.goBuscarEstablecimientos = function(){
      $state.go("app.home-buscarEstablecimiento");
  };

  $scope.goBuscarCercanos = function(){
      $state.go("app.home-buscarCercanos");
  };

})
//############################ CREATE USER CONTROLLER ################################################
.controller('createUserCtrl', function($scope, $state, ServicioUsuario,$ionicPopup) {

 $scope.user = {};

 $scope.createUser = function(){

   ServicioUsuario.ingresarUsuario($scope.user).then(function(res){

     var alertPopup = $ionicPopup.alert({
       title: 'Exito!',
       template: 'Nuevo usuario creado'
     });

     alertPopup.then(function(res) {
       $state.go('login');
     });
   },function(err){
     console.error(err);
   });

 }

 $scope.goLogin = function(){
   $state.go('login');
 }


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
    $state.go('createUser');
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
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: JSON.stringify(err)
      });
      console.error(err);
    });

  };
});
