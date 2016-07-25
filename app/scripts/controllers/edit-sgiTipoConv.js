'use strict';

angular.module('listaTareasApp')
  .controller('editSgiTipoConv', function($scope,$location,datos,TareasResource,$route) {
    	    	
    	
  	$scope.viewDatos = datos;

console.log(datos);
  		if($route.current.params.idSgiTipoConv> 0) 
      { 	  		
  			$scope.buttonText = 'Actualizar';
        $scope.tiTulo ='Editando Tipo Convocatoria';
      }

  		else
      {
  			$scope.buttonText = 'Guardar';
         $scope.tiTulo ='Creando Tipo Convocatoria'
      }

  	$scope.save = function(reg){
  		$location.path('/sgiTipoConv'); 
  	
  		 var id = (reg.TCO_CODI) ? parseInt(reg.TCO_CODI) :0 ;
  		// $location.path('/granarea');
  		if(id > 0)  	
  		{

  			$scope.viewDatos2= TareasResource.execute.query({Accion: 'M',
                         SQL: "UPDATE SGI_TIPO_CONV set  TCO_DESC = " + 
                         reg.TCO_DESC + " WHERE TCO_CODI =" + reg.TCO_CODI }); 
  		}
  		else
  		{

			$scope.viewDatos2= TareasResource.execute.query({Accion: 'I',
                         SQL: id + ";SGI_TIPO_CONV;TCO_CODI;INSERT INTO " +
                         " SGI_TIPO_CONV (TCO_CODI,TCO_DESC) VALUES (@@,'" + reg.TCO_DESC +"')"}); 
  		}
  		
  	};

  	$scope.volver = function(){
        $location.path('/sgiTipoConv'); 
  	};
  
    
});

