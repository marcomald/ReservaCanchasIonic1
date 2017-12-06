'use strict';

var app = angular.module('reservaCanchasApp');
app.service('ServicioHorarioCancha', funcionServicioHorarioCancha);

function funcionServicioHorarioCancha($q, $http){

  this.ingresarHorarioCancha = function(horario_cancha){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://localhost:1337/Horario_cancha',horario_cancha).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarHorarioCancha = function(){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/Horario_cancha').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorIdEstablecimiento = function(id_establecimiento){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/Horario_cancha?where={"id_establecimiento":"'+id_establecimiento+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


  this.buscarPorIdEstablecimientoYCancha = function(id_establecimiento, id_cancha){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/Horario_cancha?where={"id_establecimiento":"'+id_establecimiento+'","id_cancha":"'+id_cancha+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorIdEstablecimientoCanchaFecha = function(id_establecimiento, id_cancha,fecha){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/Horario_cancha?where={"id_establecimiento":"'+id_establecimiento+'","id_cancha":"'+id_cancha+'","tipo_dia":"'+fecha+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


  this.eliminarHorarioCancha = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.delete('http://localhost:1337/Horario_cancha/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  }

  this.actualizarHorarioCancha = function(horario_cancha){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.put('http://localhost:1337/Horario_cancha/'+horario_cancha.id_horario_cancha, horario_cancha).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

}

funcionServicioHorarioCancha.inject = ['$q','$http'];
