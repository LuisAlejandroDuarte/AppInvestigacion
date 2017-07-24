'use strict';



angular.module('listaTareasApp')

  .controller('editZona', function($scope,$location,TareasResource,$route) {

    	    	

    
  var zonaID = parseInt($route.current.params.idZona);

            var datosZona = TareasResource.SQL({Accion: 'S',

                         SQL: "SELECT ZON_CODI,ZON_NOMB,ZON_SIGL FROM " + 

                         " sgi_zona WHERE ZON_CODI =" +  zonaID });           
        
    $scope.viewDatos=[];
  	
    $scope.viewDatos.push({ZON_NOMB:'',ZON_SIGL:''});
    
    

    datosZona.then(function(result) {

      if (result.data[0]!=null)

        $scope.viewDatos = result.data;
    });

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

  		

  		if(id > 0)  	

  		{

        // $scope.sql = 'UPDATE "SGI_GRAN_AREA" set  "GAR_NOMB" =@@' + gran.GAR_NOMB + '@@ WHERE "GAR_CODI" =' + gran.GAR_CODI ;

  		var update = TareasResource.SQL({Accion: 'M',
                         SQL: "UPDATE sgi_zona set  ZON_NOMB = '" + zona.ZON_NOMB + "', ZON_SIGL='" + zona.ZON_SIGL + "'" + 
                         " WHERE ZON_CODI =" + zona.ZON_CODI }); 

  		  update.then(function(){

             $location.path('/zona');

        });

  		}

  		else

  		{

  		      var update = TareasResource.SQL({Accion: 'I',
                         SQL: "INSERT INTO  sgi_zona (ZON_NOMB,ZON_SIGL) VALUES  ('" + zona.ZON_NOMB + "','" + zona.ZON_SIGL + "')"}); 

        update.then(function(){

             $location.path('/zona');

        });     
			

  		}

  		

  	};

      $scope.volver = function(){

        $location.path('/zona'); 

    };

});



