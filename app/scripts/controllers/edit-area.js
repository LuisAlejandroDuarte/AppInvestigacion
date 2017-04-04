'use strict';

angular.module('listaTareasApp')
  .controller('editArea', function($scope,$location,datosArea,TareasResource,$route) {
    	
     	$scope.viewDatos= datosArea;
    //   $scope.codi= $scope.viewDatos2.ARECODI;// datosArea.ARE_CODI;
         $scope.datosGranArea= TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT GAR_CODI,GAR_NOMB FROM SGI_GRAN_AREA'}); 
    // //    $scope.selected_granarea.GAR_CODI = $scope.viewDatos.GAR_CODI;
    // 	// var original = datos.data;
    // //	 $scope.granarea = angular.copy(original);
    	  var id = ($route.current.params.idArea) ? parseInt($route.current.params.idArea) :0 ;
  		
  		if(id > 0)  	  		
  			{
          $scope.buttonText = 'Actualizar';
          $scope.tiTulo ='Editando Área';
        }
  		else
      {
  			$scope.buttonText = 'Guardar';
         $scope.tiTulo ='Creando Área';
      }

   //  $scope.selectedGranArea= $scope.viewDatos2.AREGRANAREACODI;


   

  	$scope.save = function(area){

         var id = (area.ARE_CODI) ? parseInt(area.ARE_CODI) :0 ;
       $location.path('/area');
      if(id > 0)    
      {
        // $scope.sql = 'UPDATE "SGI_GRAN_AREA" set  "GAR_NOMB" =@@' + gran.GAR_NOMB + '@@ WHERE "GAR_CODI" =' + gran.GAR_CODI ;
        
        $scope.viewDatos2= TareasResource.execute.query({Accion: 'M',
                         SQL: "UPDATE SGI_AREA set  ARE_NOMB = '" + area.ARE_NOMB + "', " + 
                         " ARE_GRAN_AREA_CODI=" + area.ARE_GRAN_AREA_CODI + " WHERE ARE_CODI =" + area.ARE_CODI }); 
      }
      else
      {       

        // $scope.maximo = TareasResource.execute.query({Accion: 'S',
        //                  SQL: 'SELECT Max("GAR_CODI")  FROM  "SGI_GRAN_AREA"',
        //                  isGrid: 'false'});

      $scope.viewDatos2= TareasResource.execute.query({Accion: 'I',
                         SQL: id + ";SGI_AREA;ARE_CODI;INSERT INTO  SGI_AREA (ARE_CODI,ARE_NOMB,ARE_GRAN_AREA_CODI) " + 
                         " VALUES (@@,'" + area.ARE_NOMB + "'," + area.ARE_GRAN_AREA_CODI + ")" }); 
      }


  		//$location.path('/granarea'); 
  	
  		
  		
  	};  
    $scope.volver = function(){
        $location.path('/area'); 
    };
  
  
});

 // bepsy ballesteros