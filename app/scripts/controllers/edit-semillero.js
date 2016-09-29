'use strict';

angular.module('listaTareasApp')
  .controller('editSemillero', function($scope,$location,datosSemillero,TareasResource,$route,$window) {

   	 $('#myModal').hide();
  	  moment.locale('es');
  		$scope.semillero = {

  			strNombre:'',
  			strFecha:'',
  			strMision:'',
  			strVision:'',
  			strObjetivo:'',
  			strProyeccionRegional:'',
  			strTematicaInvestigacion:'',
        avaluado:1

  		}
  		  var idSemillero = ($route.current.params.idSemillero) ? parseInt($route.current.params.idSemillero) :0 ;

  		  if (idSemillero==0)  		  
  		  	$scope.btnGuardar="Guardar";
  		  else
  		  {
  		  	$scope.btnGuardar="Actualizar";
  		  	
  		  }


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
   		SQL:'SELECT I.INV_NOMB AS Nombres, I.INV_APEL AS Apellidos, C.CEN_NOMB AS' +
   		' Centro,Z.ZON_NOMB As Zona,P.PAC_NOMB As Programa,E.ESC_NOMB AS Escuela ' +
		' FROM sgi_inve AS I INNER JOIN sgi_cent As C ON C.CEN_CODI=I.INV_CENT_CODI INNER JOIN '  +
		' sgi_zona As Z ON Z.ZON_CODI = C.CEN_ZONA_CODI INNER JOIN sgi_prog_acad As ' +
		' P ON P.PAC_CODI = I.INV_PROG_ACAD_CODI INNER JOIN ' + 
		' sgi_escu AS E ON E.ESC_CODI = P.PAC_ESCU_CODI WHERE I.INV_CODI =' + id
    	}

    	var investigador = TareasResource.SQL(datos);
    		investigador.then(function(result){

    			if (result.data==null)
    			{
    				$window.alert("Faltan completar los datos del investigador");
	   	            $location.path('/inicio');
      				return;
    			}

    			$scope.nombreInvestigador = result.data[0].Nombres;
				$scope.apellidoInvestigador = result.data[0].Apellidos;
				$scope.centroInvestigador = result.data[0].Centro;
				$scope.zonaInvestigador = result.data[0].Zona;
				$scope.programaInvestigador = result.data[0].Programa;
				$scope.escuelaInvestigador = result.data[0].Escuela;
				$scope.mostrarDatosSemillero(idSemillero);
    		})

    }

    $scope.mostrarDatosSemillero = function(idSemillero)
    {

    	var datos = {
    		Accion:'S',
    		SQL:'SELECT SEM_NOMB,SEM_MISI,SEM_VISI,' +
    			' SEM_OBJE,SEM_PROY_REGI,SEM_TEMA_INVE,SEM_FECH_CREA,SEM_AVAL_UNAD ' + 
    			' FROM sgi_semi WHERE SEM_CODI =' + idSemillero    			
    	}

      var select = TareasResource.SQL(datos);

          select.then(function(result){

              $scope.semillero.strNombre = result.data[0].SEM_NOMB;
              $scope.semillero.strMision = result.data[0].SEM_MISI;
              $scope.semillero.strVision = result.data[0].SEM_VISI;
              $scope.semillero.strObjetivo= result.data[0].SEM_OBJE;
              $scope.semillero.strProyeccionRegional= result.data[0].SEM_PROY_REGI;
              $scope.semillero.strTematicaInvestigacion= result.data[0].SEM_TEMA_INVE;
              $scope.semillero.avaluado =  result.data[0].SEM_AVAL_UNAD; 
               var day = moment(result.data[0].SEM_FECH_CREA).format("D");
               var mounth = moment(result.data[0].SEM_FECH_CREA).format("M");
               var year = moment(result.data[0].SEM_FECH_CREA).format("YYYY");

               var  fechaStr = year + "," + mounth + "," + day;

              $scope.semillero.strFecha = new Date(fechaStr);

          })

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

   $scope.onClickCancelar = function()
   {
   	 $location.path('/semillero');
      return;
   }

    $scope.onClickGuardar = function(){
          $('#myModal').show();
    	if (idSemillero==0)
    	{
    		var datos = {

    			Accion:'I',
    			SQL:"INSERT INTO sgi_semi (" + 
    				" sem_nomb,sem_misi,sem_visi,sem_obje,sem_proy_regi," + 
            " sem_tema_inve,sem_fech_crea,sem_aval_unad) " +
    				" VALUES ('" + $scope.semillero.strNombre + "'," +
            " '"  +  $scope.semillero.strMision + "'," + 
            " '" + $scope.semillero.strVision + "'," + 
            " '" + $scope.semillero.strObjetivo + "'," +
            " '" + $scope.semillero.strProyeccionRegional + "'," +
            " '" + $scope.semillero.strTematicaInvestigacion + "'," +
            " '" + moment($scope.semillero.strFecha).format("YYYY-MM-DD") + "', " +
            " " + $scope.semillero.avaluado + ")" 

    		}

    		var insertSemilero =  TareasResource.SQL(datos);
    		insertSemilero.then(function(result){

            datos = {
              Accion:"I",
              SQL :"INSERT INTO sgi_inve_semi (INS_INVE_IDEN,INS_SEMI_CODI) " +
              " VALUES (" + user.INV_CODI + "," + result.data[0].valor + ")"

            }
              insertSemilero =  TareasResource.SQL(datos);
              insertSemilero.then(function(result){

                  $('#myModal').hide();
                  $window.alert("Semillero Guardado");
                   $location.path('/semillero');                    

              });    	
    		});
    	}

      else
      {
        datos = {

          Accion :"S",
          SQL:"UPDATE sgi_semi set sem_nomb ='" + $scope.semillero.strNombre + "'," + 
          " sem_misi ='"  +  $scope.semillero.strMision + "', " +
          " sem_visi ='" + $scope.semillero.strVision + "'," + 
          " sem_obje ='" + $scope.semillero.strObjetivo + "'," +
          " sem_proy_regi ='" + $scope.semillero.strProyeccionRegional + "'," + 
          " sem_tema_inve = '" + $scope.semillero.strTematicaInvestigacion + "'," +
          " sem_fech_crea = '" + moment($scope.semillero.strFecha).format("YYYY-MM-DD") + "'," +
          " sem_aval_unad = " + $scope.semillero.avaluado + " WHERE SEM_CODI = " + idSemillero            

        }

         insertSemilero =  TareasResource.SQL(datos);
              insertSemilero.then(function(result){

                  $('#myModal').hide();
                  $window.alert("Semillero Actualizado");
                   $location.path('/semillero');                 

              });     

      }


    }
     	
});
