'use strict';

angular.module('listaTareasApp')
  .controller('editSemillero', function($scope,$location,datosSemillero,TareasResource,$route,$window) {
   
  	 var user = JSON.parse($window.sessionStorage.getItem('investigador'));

	if (user==null || user==undefined)
    {

      $location.path('/inicio');
      return;
    }
    else
    {
    	$scope.$parent.mnuInvestiga =false;
            $scope.$parent.mnuAdmin = false;
            $scope.$parent.mnuConvocatoria = false;     
    }
     	
});
