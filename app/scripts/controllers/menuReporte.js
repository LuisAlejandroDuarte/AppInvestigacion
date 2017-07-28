
'use strict';

angular.module('listaTareasApp')

  .controller('controladorMenuReporte', function($scope,$location,TareasResource,$route,$window) {


  	$scope.onClicSalir = function() {

  			 $window.location.href = "#/menuAdministracionGeneral";

  	}


	$scope.onClicInvestigador = function() {

		$window.location.href = "#/investigador";

	}

	$scope.onClicGrupo = function() {

		$window.location.href = "#/grupo";

	}

	$scope.onClicSemillero = function() {

		$window.location.href = "#/semillero";

	}


	$scope.onClicConvocatoria = function() {

		$window.location.href = "#/convocatoria";

	}

	

});