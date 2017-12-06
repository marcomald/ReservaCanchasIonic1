'use strict';

var app = angular.module('reservaCanchasApp');
app.service('ServicioCalendario', funcionServicioCalendario);

function funcionServicioCalendario($q, $http){

  this.ingresarCalendario = function(calendario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://localhost:1337/calendario',calendario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarCalendario = function(){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/calendario?limit=800').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    var fecha = moment(id).format('YYYY MM DD');
    console.log(fecha);
    $http.get('http://localhost:1337/calendario/'+fecha).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarCalendario = function(calendario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.put('http://localhost:1337/cancha/'+calendario.fecha, calendario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

}

funcionServicioCalendario.inject = ['$q','$http'];
