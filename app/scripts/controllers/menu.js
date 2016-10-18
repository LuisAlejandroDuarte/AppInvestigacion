'use strict';
 angular.module('listaTareasApp')

.controller('MenuCtrl', ['$scope','$window','TareasResource','$location', function($scope,$window,TareasResource,$location) {

	$scope.divContainer =
	{
		 'display': 'table',
    	'height': '100%',
    	'width': '100%',
    	'margin': '0'    	
	}

	$scope.estiloDiv =
	{
		
    	'width': '50%',
    	'margin': '0 auto',
    	'padding': '0 20px',
    	'text-align':'center'	

	}

	$scope.divPadre =
	{
		 'display': 'table-cell',
    	 'vertical-align': 'middle',
    	'position': 'relative',
    	'top':screen.height/7
	}

	$scope.onClicAdministrador = function()
	{
		$window.sessionStorage.setItem('tipoUsuario',0);
		$location.path('/usuario');
	}

	$scope.onClicInvestigador = function()
	{
		$window.sessionStorage.setItem('tipoUsuario',1);
		$location.path('/usuario');
	}

}]);


