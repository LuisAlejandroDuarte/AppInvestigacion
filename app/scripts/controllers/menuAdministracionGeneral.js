'use strict';
 angular.module('listaTareasApp')


 .controller('menuAdministracionGeneralCtrl',['$scope','TareasResource', '$window','$location', function ($scope,TareasResource,$window,$location) {

	var user = JSON.parse($window.sessionStorage.getItem('usuario'));



    if (user==null || user==undefined)

    {

      $location.path('/menu');

      return;

      }




	$scope.onClicSalir = function()
	{		 
            $window.location.href = "#/menu/";
	}

	$scope.onClicUsuario = function() {
	
		$location.path('/usuario');
	}
	


 }]);
