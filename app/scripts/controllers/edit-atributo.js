'use strict';

angular.module('listaTareasApp')
  .controller('editAtributo', function($scope,$location,datosAtributo,TareasResource,$route) {
    	
     	
         datosAtributo.$promise.then(function(result){
            $scope.viewDatos= result;
         });


    	  var id = ($route.current.params.idAtributo) ? parseInt($route.current.params.idAtributo) :0 ;
  		
  		if(id > 0)  	  		
  			{
          $scope.buttonText = 'Actualizar';
          $scope.tiTulo ='Editando Átributo';
        }
  		else
      {
  			$scope.buttonText = 'Guardar';
         $scope.tiTulo ='Creando Átributo';
      }

   //  $scope.selectedGranArea= $scope.viewDatos2.AREGRANAREACODI;


   

  	$scope.save = function(atributo){

         var id = (atributo.ATR_CODI) ? parseInt(atributo.ATR_CODI) :0 ;
          
      if(id == 0)    
      {
        $scope.viewDatos2= TareasResource.execute.query({Accion: 'I',
                         SQL: 1 + ";INSERT INTO  sgi_atrib (ATR_DESC) " + 
                         " VALUES ('" + atributo.ATR_DESC + "')"}); 
          $location.path('/atributo');
        
      }
      else
      {       
        
          $scope.viewDatos2= TareasResource.execute.query({Accion: 'M',
                          SQL: "UPDATE sgi_atrib set  ATR_DESC = '" + atributo.ATR_DESC + "' " + 
                         " WHERE ATR_CODI =" + atributo.ATR_CODI }); 
          $location.path('/atributo');
      }


  		//$location.path('/granarea'); 
  	
  		
  		
  	};  
    $scope.volver = function(){
        $location.path('/atributo'); 
    };
  
  
});

 // bepsy ballesteros