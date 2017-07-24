'use strict';



angular.module('listaTareasApp')

  .controller('editCentro', function($scope,$location,TareasResource,$route) {

    	 

        $scope.datosZona= TareasResource.SQL({Accion: 'S',

                         SQL: 'SELECT ZON_CODI,ZON_NOMB FROM sgi_zona'}); 


         $scope.datosZona.then(function(result){


            $scope.datosZona = result.data;
             var centroID = parseInt($route.current.params.idCentro);

               var dat = TareasResource.SQL({Accion: 'S',

                         SQL: "SELECT centro.CEN_CODI, centro.CEN_NOMB,zona.ZON_NOMB," + 

                         " centro.CEN_ZONA_CODI " +

                         " from sgi_cent as centro  join sgi_zona as zona on " +

                         " zona.ZON_CODI = centro.CEN_ZONA_CODI where  centro.CEN_CODI =" +  centroID 

                         });                           
                dat.then(function(result){

                  $scope.viewDatos= result.data;   
                });

                 
      });
      


   

     	




    //   $scope.codi= $scope.viewDatos2.ARECODI;// datosArea.ARE_CODI;

     






    // //    $scope.selected_granarea.GAR_CODI = $scope.viewDatos.GAR_CODI;

    // 	// var original = datos.data;

    // //	 $scope.granarea = angular.copy(original);

    // 

   // $scope.datosZona= TareasResource.granareas.query();

    	  var id = ($route.current.params.idCentro) ? parseInt($route.current.params.idCentro) :0 ;

  		

  		if(id > 0)  	  		

      {

  			$scope.buttonText = 'Actualizar';

       $scope.tiTulo ='Editando Centro';

     }

  		else

      {

  			$scope.buttonText = 'Guardar';

        $scope.tiTulo ='Creando Centro';

      }



   //  $scope.selectedGranArea= $scope.viewDatos2.AREGRANAREACODI;





   



  	$scope.save = function(centro){



         var id = (centro.CEN_CODI) ? parseInt(centro.CEN_CODI) :0 ;

       $location.path('/centro');

      if(id > 0)    

      {

        // $scope.sql = 'UPDATE "SGI_GRAN_AREA" set  "GAR_NOMB" =@@' + gran.GAR_NOMB + '@@ WHERE "GAR_CODI" =' + gran.GAR_CODI ;

        

        $scope.viewDatos2= TareasResource.execute.query({Accion: 'M',

                         SQL: "UPDATE SGI_CENT set  CEN_NOMB ='" + centro.CEN_NOMB + "', " + 

                         "CEN_ZONA_CODI=" + centro.CEN_ZONA_CODI + " WHERE CEN_CODI =" + centro.CEN_CODI }); 

      }

      else

      {       



        // $scope.maximo = TareasResource.execute.query({Accion: 'S',

        //                  SQL: 'SELECT Max("GAR_CODI")  FROM  "SGI_GRAN_AREA"',

        //                  isGrid: 'false'});



      $scope.viewDatos2= TareasResource.execute.query({Accion: 'I',

                         SQL: id + ";SGI_CENT;CEN_CODI;INSERT INTO  SGI_CENT (CEN_CODI,CEN_NOMB,CEN_ZONA_CODI) " + 

                         " VALUES (@@,'" + centro.CEN_NOMB + "'," + centro.CEN_ZONA_CODI + ")" }); 

      }





  		//$location.path('/granarea'); 

  	

  		

  		

  	};  

     $scope.volver = function(){

        $location.path('/centro'); 

    };

  

});



 // bepsy ballesteros