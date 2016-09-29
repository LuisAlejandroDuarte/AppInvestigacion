'use strict';

angular.module('listaTareasApp')
  .controller('editSemillero', function($scope,$location,datosSemillero,TareasResource,$route,$window) {

   	
  	  moment.locale('es');
  		$scope.semillero = {

  			strNombre:'',
  			strFecha:'',
  			strMision:'',
  			strVision:'',
  			strObjetivo:'',
  			strProyeccionRegional:'',
  			strTematicaInvestigacion:''

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

    $scope.mostrarDatosSemillero(idSemillero)
    {
    	var datos = {
    		Accion:'S',
    		SQL:'SELECT SEM_NOMB,S.SEM_MISI,S.SEM_VISI,' +
    			' S.SEM_OBJE,S.SEM_PROY_REGI,S.SEM_TEMA_INVE ' + 
    			' FROM sgi_semi AS S INNER JOIN sgi_inve_semi ' + 
    			' AS SI ON SI.ins_semi_codi = S.SEM_CODI ' +
    			'  '

    	}
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

    	if (idSemillero==0)
    	{
    		var datos = {

    			Accion:'I',
    			SQL:"INSERT INTO sgi_semi (" + 
    				" sem_nomb,sem_misi,sem_visi,sem_obje,sem_proy_regi,sem_tema_inve) " +
    				" VALUES ('" + $scope.semillero.strNombre + "','"  +  $scope.semillero.strMision + "','" + $scope.semillero.strVision + "','" + $scope.semillero.strObjetivo + "','" + $scope.semillero.strProyeccionRegional + "','" + $scope.semillero.strTematicaInvestigacion + "')" 

    		}

    		var insertSemilero =  TareasResource.SQL(datos);
    		insertSemilero.then(function(result){


    			var IdSemilla = result.data[0].valor;

    			datos = {
    				Accion:'I',
    				SQL:"INSERT INTO sgi_inve_semi (ins_inve_iden,ins_semi_codi,ins_fech_inic) " +
    					" VALUES (" + user.INV_CODI + "," + IdSemilla + ",'" + moment($scope.semillero.strFecha).format('YYYY-MM-DD') + "')"
    				}
    				 insertSemilero =  TareasResource.SQL(datos);
    					insertSemilero.then(function(result){



    					});
    		});
    	}
    }
     	
});
