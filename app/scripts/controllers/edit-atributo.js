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
        var consulta = TareasResource.SQL({Accion: 'I',
                         SQL: "INSERT INTO  sgi_atrib (ATR_DESC) " + 
                         " VALUES ('" + atributo.ATR_DESC + "')"}); 
          consulta.then(function(result){
              $location.path('/atributo');
          });


          
        
      }
      else
      {       
        
          var actualizar= TareasResource.SQL({Accion: 'U',
                          SQL: "UPDATE sgi_atrib set  ATR_DESC = '" + atributo.ATR_DESC + "' " + 
                         " WHERE ATR_CODI =" + atributo.ATR_CODI }); 

          actualizar.then(function(result){
              $location.path('/atributo');
          });
          
      }


  		//$location.path('/granarea'); 
  	
  		
  		
  	};  
    $scope.volver = function(){
        $location.path('/atributo'); 
    };
  
  
});

 // bepsy ballesteros