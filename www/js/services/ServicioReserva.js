'use strict';

var app = angular.module('starter');
app.service('ServicioReserva', funcionServicioReserva);

function funcionServicioReserva($q, $http){

  this.recuperarDistancia = function(urlGoogleApi){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get(urlGoogleApi).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorIdEstablecimientoCanchaFecha = function(id_establecimiento, id_cancha,fecha){
    var defered = $q.defer();
    var promise = defered.promise;
    var fechaNueva = moment(fecha).format('YYYY-MM-DD');
    console.log('FEcha nueva: ',fecha);
    $http.get('http://localhost:1337/Calendario_cancha?where={"id_establecimiento":"'+id_establecimiento+'","id_cancha":"'+id_cancha+'","fecha":"'+fecha+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorIdEstablecimiento = function(id_establecimiento){
    var defered = $q.defer();
    var promise = defered.promise;
    var fecha = '2017-06-14';
    console.log('FEcha nueva: ',fecha);
    $http.get('http://localhost:1337/Calendario_cancha?where={"id_establecimiento":"'+id_establecimiento+'","fecha":"'+fecha+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorIdUsuario = function(id_usuario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/Calendario_cancha?where={"id_usuario":"'+id_usuario+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.ingresarReserva = function(objReserva){
    var defered = $q.defer();
    var promise = defered.promise;
    console.log('Objeto de la reserva ',objReserva);
    $http.post('http://localhost:1337/Calendario_cancha',objReserva).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };



}

funcionServicioReserva.inject = ['$q','$http'];
