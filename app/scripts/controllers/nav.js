'use strict';

angular.module('listaTareasApp')
  .controller('ApCtrl', function ($scope, $cookieStore, $location,$window) {
    $scope.usrConectado = {nombre: "", puesto: '', estaConectado: ''};

    var usr = $cookieStore.get('usuario');

    if (usr != null) {
      $scope.usrConectado.nombre = usr.nombre;
      $scope.usrConectado.puesto = usr.puesto;
      $scope.usrConectado.estaConectado = true;
    };

    $scope.salir = function() {
      $scope.usrConectado = {nombre: "", puesto: '', estaConectado: ''};
     
      $cookieStore.remove('estaConectado');
      $cookieStore.remove('usuario');
       
      $window.sessionStorage.setItem('usuario',null);

      $location.path('/inicio');
    };

  });
