'use strict';

angular.module('listaTareasApp')
  .controller('editParametroEvaluacion', function($scope,$location,datosParametroEvaluacion,TareasResource,$route,$window) {
    	

      datosParametroEvaluacion.$promise.then(function(result){
            $scope.viewDatos= result;
              var id = ($route.current.params.idParametroEvaluacion) ? parseInt($route.current.params.idParametroEvaluacion) :0 ;
      
                if(id > 0)          
                  {
                    $scope.buttonText = 'Actualizar';
                    $scope.tiTulo ='Editando parámetro evaluación';
                  }
                else
                {
                
                  $scope.buttonText = 'Guardar';
                   $scope.tiTulo ='Creando parámetro evaluación';
                }
         });

  
    


   //  $scope.selectedGranArea= $scope.viewDatos2.AREGRANAREACODI;


   

  	$scope.save = function(parametro){

         var id = (parametro.PEV_CODI) ? parseInt(parametro.PEV_CODI) :0 ;
            //$location.path('/atributo');
      if(id == 0)    
      {

        var valida =TareasResource.validaExisteRegistro.query({Tabla:'sgi_para_eval',Campo:'PEV_DESC',Valor:parametro.PEV_DESC});
            valida.$promise.then(function(result){

                if (result[0]['existe']=="true")
                {
                    $window.alert('Ya existe el nombre');                 
                  }
                else
                {
                    var insert= TareasResource.execute.query({Accion: 'I',
                         SQL: 1 + ";INSERT INTO  sgi_para_eval (PEV_DESC) " + 
                         " VALUES ('" + parametro.PEV_DESC + "')"}); 
                   insert.$promise.then(function(result){
                    $scope.viewDatos2= result;
                      $location.path('/parametroEvaluacion'); 
                    });
                }
            });

      }
      else
      {       
        
          var update= TareasResource.execute.query({Accion: 'M',
                          SQL: "UPDATE sgi_para_eval set  PEV_DESC = '" + parametro.PEV_DESC + "' " + 
                         " WHERE PEV_CODI =" + parametro.PEV_CODI }); 

           update.$promise.then(function(result){
            $scope.viewDatos2= result;
            $location.path('/parametroEvaluacion'); 
         });

        
      }
      


  		//$location.path('/granarea'); 
  	
  		
  		
  	};  
    $scope.volver = function(){
        $location.path('/parametroEvaluacion'); 
    };
  
  
});

