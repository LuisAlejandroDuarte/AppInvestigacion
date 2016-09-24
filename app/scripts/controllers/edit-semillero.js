'use strict';

angular.module('listaTareasApp')
  .controller('editSemillero', function($scope,$location,datosSemillero,TareasResource,$route,$window) {
   	
   	    $scope.jqxPanelSettings =
      {
        height: '200',
        autoUpdate:true,
        theme:'bootstrap',
        width:'auto',
        sizeMode:'fixed'
      }

  	 var user = JSON.parse($window.sessionStorage.getItem('investigador'));


    $scope.mostrarDatosInvestigador = function(id)
    {
    	var datos = {
    		Accion:'S',
    		SQL:'SELECT '
    	}
    }
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
            $scope.mostrarDatosInvestigador(user.INV_CODI);
    }

   




     	
});
