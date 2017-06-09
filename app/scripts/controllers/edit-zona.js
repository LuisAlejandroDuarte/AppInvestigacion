'use strict';

angular.module('listaTareasApp')
  .controller('editZona', function($scope,$location,datosZona,TareasResource,$route) {
    	    	
    	
  	$scope.viewDatos = datosZona;

  		if($route.current.params.idZona> 0)        	  	
  		{
        $scope.buttonText = 'Actualizar';
         $scope.tiTulo ='Editando Zona';
      }

  		else
      {
  			$scope.buttonText = 'Guardar';
        $scope.tiTulo ='Creando Zona';
      }

  	$scope.save = function(zona){
  		//$location.path('/granarea'); 
  	
  		 var id = (zona.ZON_CODI) ? parseInt(zona.ZON_CODI) :0 ;
  		 $location.path('/zona');
  		if(id > 0)  	
  		{
        // $scope.sql = 'UPDATE "SGI_GRAN_AREA" set  "GAR_NOMB" =@@' + gran.GAR_NOMB + '@@ WHERE "GAR_CODI" =' + gran.GAR_CODI ;
  		
  			$scope.viewDatos= TareasResource.execute.query({Accion: 'M',
                         SQL: "UPDATE SGI_ZONA set  ZON_NOMB = '" + zona.ZON_NOMB + "', ZON_SIGL='" + zona.ZON_SIGL + "'" + 
                         " WHERE ZON_CODI =" + zona.ZON_CODI }); 
  		}
  		else
  		{
  			

			$scope.viewDatos= TareasResource.execute.query({Accion: 'I',
                         SQL: id + ";SGI_ZONA;ZON_CODI;INSERT INTO  SGI_ZONA (ZON_CODI,ZON_NOMB,ZON_SIGL) VALUES " +
                         " (@@,'" + zona.ZON_NOMB + "','" + zona.ZON_SIGL + "')" }); 
  		}
  		
  	};
      $scope.volver = function(){
        $location.path('/zona'); 
    };
});

