'use strict';

angular.module('listaTareasApp')
  .controller('editGranArea', function($scope,$location,datos,TareasResource,$route) {
    	    	
    	
  	$scope.viewDatos = datos;

  		if($route.current.params.idGranA> 0) 
      { 	  		
  			$scope.buttonText = 'Actualizar';
        $scope.tiTulo ='Editando Gran Área';
      }

  		else
      {
  			$scope.buttonText = 'Guardar';
         $scope.tiTulo ='Creando Gran Área'
      }

  	$scope.save = function(gran){
  		$location.path('/granarea'); 
  	
  		 var id = (gran.GAR_CODI) ? parseInt(gran.GAR_CODI) :0 ;
  		if(id > 0)  	
  		{
        // $scope.sql = 'UPDATE "SGI_GRAN_AREA" set  "GAR_NOMB" =@@' + gran.GAR_NOMB + '@@ WHERE "GAR_CODI" =' + gran.GAR_CODI ;
  			$scope.buttonText = 'Actualizar4';
  			$scope.viewDatos2= TareasResource.execute.query({Accion: 'M',
                         SQL: "UPDATE SGI_GRAN_AREA set  GAR_NOMB = '" + gran.GAR_NOMB + "' " +
                          " WHERE GAR_CODI =" + gran.GAR_CODI }); 
  		}
  		else
  		{

			$scope.viewDatos2= TareasResource.execute.query({Accion: 'I',
                         SQL: id + ";SGI_GRAN_AREA;GAR_CODI;INSERT INTO " +
                         "SGI_GRAN_AREA (GAR_CODI,GAR_NOMB) VALUES (@@,'" + gran.GAR_NOMB + "')"}); 
  		}
  		
  	};

  	$scope.volver = function(){
        $location.path('/granarea'); 
  	};
  
    
});

