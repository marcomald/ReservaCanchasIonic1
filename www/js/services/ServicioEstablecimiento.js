'use strict';

var app = angular.module('starter');
app.service('ServicioEstablecimiento', funcionServicioEstablecimiento);

function funcionServicioEstablecimiento($q, $http){

  this.ingresarEstablecimiento = function(establecimiento){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://localhost:1337/establecimiento',establecimiento).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarEstablecimientos = function(){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/establecimiento').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/establecimiento/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorNombre = function(nombre){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/establecimiento?where={"nombre":"'+nombre+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


  this.eliminarEstablecimiento = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.delete('http://localhost:1337/establecimiento/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  }

  this.actualizarEstablecimiento = function(establecimiento){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.put('http://localhost:1337/establecimiento/'+establecimiento.id_establecimiento, establecimiento).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

}

funcionServicioEstablecimiento.inject = ['$q','$http'];
