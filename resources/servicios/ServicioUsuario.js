'use strict';

var app = angular.module('reservaCanchasApp');
app.service('ServicioUsuario', funcionServicioUsuario);

function funcionServicioUsuario($q, $http){

  this.ingresarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://localhost:1337/usuario',usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarUsuarios = function(){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/usuario').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get('http://localhost:1337/usuario/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.login = function(nick, password){
    var defered = $q.defer();
    var promise = defered.promise;
    console.log(nick+' '+password);
    $http.get('http://localhost:1337/usuario?where={"nick":"'+nick+'","password":"'+password+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.loginXcorreo = function(correo){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://localhost:1337/usuario?where={"email":"'+correo+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.eliminarUsuario = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.delete('http://localhost:1337/usuario/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  }

  this.actualizarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    //console.log(usuario);
    //var id = usuario.id_usuario;
    //console.log(id);

    $http.put('http://localhost:1337/usuario/'+usuario.id_usuario, usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

}

funcionServicioUsuario.inject = ['$q','$http'];
