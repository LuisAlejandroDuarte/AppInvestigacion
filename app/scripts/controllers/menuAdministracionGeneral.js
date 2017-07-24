'use strict';
 angular.module('listaTareasApp')


 .controller('menuAdministracionGeneralCtrl',['$scope','TareasResource', '$window','$location', function ($scope,TareasResource,$window,$location) {

	var user = JSON.parse($window.sessionStorage.getItem('usuario'));



    if (user==null || user==undefined)

    {

      $location.path('/menu');

      return;

      }


  $scope.onClicAvalGrupoSemillero = function() {

  	$window.location.href = "#/avalgruposemillero/";

  }

	$scope.onClicSalir = function()
	{		 
        $window.location.href = "#/menu/";
	}

	$scope.onClicUsuario = function() {
	
		$location.path('/usuario');
	}
	
	$scope.onClicGestionBaseDatos = function() {

		$window.location.href = "#/gestionBaseDatos/";
		

	}

	$scope.onClicMenuReporte = function() {

		$window.location.href = "#/menuReporte/";		

	}


 }]);
