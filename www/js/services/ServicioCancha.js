'use strict';

var app = angular.module('starter');
app.service('ServicioCancha', funcionServicioCancha);

function funcionServicioCancha($q, $http){

  this.ingresarCancha = function(cancha){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://localhost:1337/cancha',cancha).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarCanchas = function(){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/cancha').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/cancha/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorIdEstablecimiento = function(id_establecimiento){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/cancha?where={"id_establecimiento":"'+id_establecimiento+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


  this.eliminarCancha = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.delete('http://localhost:1337/cancha/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  }

  this.actualizarCancha = function(cancha){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.put('http://localhost:1337/cancha/'+cancha.id_cancha, cancha).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

}

funcionServicioCancha.inject = ['$q','$http'];
