'use strict';

angular.module('listaTareasApp')
  .controller('ApCtrl', function ($scope, $cookieStore, $location,$window) {
    $scope.usrConectado = {nombre: "", puesto: '', estaConectado: ''};

    var usr =  JSON.parse($window.sessionStorage.getItem('usuario'));   
    if (usr != null ) {
      if (usr.Id_tipo==0)
      {
         $scope.mnuAdmin = true;        

      }
      else
      {
        $scope.mnuConvocatoria=true;
      }

      $scope.usrConectado.nombre = usr.Nombre;      
      $scope.usrConectado.estaConectado = true;
    };

    $scope.salir = function() {
      $scope.usrConectado = {nombre: "", puesto: '', estaConectado: ''};
       $scope.mnuInvestiga =false;
       $scope.mnuAdmin=false;
        $scope.mnuConvocatoria=false;
      $window.sessionStorage.setItem('usuario',null);
      $window.sessionStorage.setItem('investigador',null);

      $location.path('/inicio');
    };

  });
