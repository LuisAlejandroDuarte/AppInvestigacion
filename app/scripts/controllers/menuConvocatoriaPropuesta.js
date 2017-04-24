'use strict';
 angular.module('listaTareasApp')


 .controller('menuConvocatoriaPropuestaCtrl',['$scope','TareasResource', '$window','$location', function ($scope,TareasResource,$window,$location) {



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


	$scope.onClicSalir = function()
	{
		 $window.sessionStorage.setItem('tipoUsuario',null);
            $window.sessionStorage.setItem('usuario',null);
            $window.location.href = "#/menu/";
	}

	$scope.onClicConvocatoria = function() {

		$window.sessionStorage.setItem('tipoUsuario',3);
		$location.path('/inicio');
	}


	$scope.onClicAtributo = function() {

	$window.location.href = "#/atributo/";	

	}


 }]);
