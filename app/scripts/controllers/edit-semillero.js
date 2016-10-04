'use strict';

angular.module('listaTareasApp')

  .directive('mostrarfechaeliminacion',function(){

   return {
        restrict : 'AE',   
         controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {

            $scope.eliminarfecha = new Date();
            $scope.afirmaEliminar = function() {
              
               var update = $('#myFechaEliminacion').data('datos');

               if (update.Tipo=="LineasInvestigacion")
               {

                     var item = Enumerable.From($scope.lstLineasInvestigacionFecha)
                             .Where(function (x) { return x.LIS_CODI == update.Id })
                             .ToArray()[0];

                     var day = moment($scope.eliminarfecha).format("D");
                     var mounth = moment($scope.eliminarfecha).format("M");
                     var year = moment($scope.eliminarfecha).format("YYYY");
                     var  fechaStr = year + "," + mounth + "," + day;
                     

                      item.LIS_FECH_FINA = new Date(fechaStr);  
                        $('#myFechaEliminacion').modal('hide');        

                }

                if (update.Tipo=="IntegranteSemillero")
                {

                   var item = Enumerable.From($scope.lstIntegranteSemilleroFecha)
                             .Where(function (x) { return x.IS_CODI == update.Id })
                             .ToArray()[0];

                     var day = moment($scope.eliminarfecha).format("D");
                     var mounth = moment($scope.eliminarfecha).format("M");
                     var year = moment($scope.eliminarfecha).format("YYYY");
                     var  fechaStr = year + "," + mounth + "," + day;
                     

                      item.IS_FECH_FIN = new Date(fechaStr);  
                        $('#myFechaEliminacion').modal('hide');      

                  
                }

                 if (update.Tipo=="ProgramaAcademico")
                {

                   var item = Enumerable.From($scope.lstProgramaAcademicoFecha)
                             .Where(function (x) { return x.PAS_CODI == update.Id })
                             .ToArray()[0];

                     var day = moment($scope.eliminarfecha).format("D");
                     var mounth = moment($scope.eliminarfecha).format("M");
                     var year = moment($scope.eliminarfecha).format("YYYY");
                     var  fechaStr = year + "," + mounth + "," + day;
                     

                      item.PAS_FECH_FIN = new Date(fechaStr);  
                        $('#myFechaEliminacion').modal('hide');      

                  
                }


                

            }

         }],
        template : '<div class="modal fade" id="myFechaEliminacion"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 
                    '<div class="modal-dialog">' +
        '<div class="modal-content">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                 '<h3 class="modal-title" id="myModalLabel">Advertencia!</h3> ' +
            '</div>' +
            '<div class="modal-body"> ' +
                 '<h4> Desea Eliminar el Registro </h4> ' +                         
                  '<label id="item"></label>' +
                   '<div class="row"> ' +
                    '<div class="col-lg-5 col-md-5 col-xs-6 col-sm-6">' +
                      '<label>Fecha Terminación</label>' +
                    '</div>' +
                  '</div>' +  
                  '<div class="row"> ' +
                     '<div class="col-lg-5 col-md-5 col-xs-6 col-sm-6">' +
                            '<input   class="form-control input-sm" ' +
                               'name="fecha" ng-model="eliminarfecha" ' +
                               'data-date-format="dd-MMMM-yyyy" ' +
                               'date-type="iso" data-autoclose="1"  ' +
                               'bs-datepicker required />' +     
                     '</div>' +
                  '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button ng-click= "afirmaEliminar();" class="btn btn-danger"  id="btnYes" >Si</button>' +
                '<button type="button" class="btn btn-default" data-dismiss="modal"  >No</button>' +
            '</div>' +        
        '</div>' +        
    '</div>' +    
'</div>' +
'</div>',

      }

})


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

		$scope.jqxPanelMain =
		{
			height: '300',
	        autoUpdate:true,
	        theme:'bootstrap',
	        width:'auto',
	        sizeMode:'fixed'	       
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

    var	datos = {

    		Accion:"S",
    		SQL:"SELECT lin_codi,lin_desc AS Nombre FROM sgi_line_inve ORDER BY lin_desc"

    	}

   	var lista = TareasResource.SQL(datos);
   		lista.then(function(result){

   			$scope.lstLineasInvestigacion = result.data;

        datos = {
          Accion:"S",
          SQL:"SELECT concat(INV_APEL,' ',INV_NOMB) AS Nombre  ,INV_CODI  FROM sgi_inve WHERE " + 
          " INV_CODI!=" + id + " ORDER BY concat(INV_APEL,' ',INV_NOMB)"
        }


        if( $scope.lstIntegrantesSemillero==undefined) $scope.lstIntegrantesSemillero=[];

           lista = TareasResource.SQL(datos);
            lista.then(function(result){

              $scope.lstIntegrantesSemillero = result.data;
          datos = {
            Accion:"S",
            SQL:"SELECT PAC_CODI,PAC_NOMB AS Nombre FROM   sgi_prog_acad ORDER BY PAC_NOMB"
            }             

          if( $scope.lstProgramaAcademico==undefined) $scope.lstProgramaAcademico=[];

            lista = TareasResource.SQL(datos);
            lista.then(function(result){

               $scope.lstProgramaAcademico = result.data;


            datos = {
              Accion:"S",
              SQL:"SELECT TIE_CODI,TIE_NOMB AS Nombre FROM  sgi_tipo_estr ORDER BY TIE_NOMB"
            }           

            lista = TareasResource.SQL(datos);
            lista.then(function(result){

              $scope.lstTipoEstrategia = result.data;

              datos = {

                Accion:"S",
                SQL:"SELECT Linea.lin_desc AS Nombre,LineaSemillero.LIS_FECH_INI,LineaSemillero.LIS_FECH_FINA,LineaSemillero.LIS_CODI,LineaSemillero.LIS_LINE_INVE_CODI " +
                " FROM sgi_line_inve_semi AS LineaSemillero " +
                " INNER JOIN sgi_line_inve AS Linea " + 
                " ON Linea.lin_codi = LineaSemillero.LIS_LINE_INVE_CODI  WHERE LineaSemillero.LIS_SEMI_CODI = " + idSemillero

              }

              lista = TareasResource.SQL(datos);
              lista.then(function(result){     

                  if (result.data[0]!=null)            
                  {
                     angular.forEach(result.data, function(value, key) {

                         var day = moment(result.data[key].LIS_FECH_INI).format("D");
                         var mounth = moment(result.data[key].LIS_FECH_INI).format("M");
                         var year = moment(result.data[key].LIS_FECH_INI).format("YYYY");

                          var  fechaStr = year + "," + mounth + "," + day;

                      result.data[key].LIS_FECH_INI  = new Date(fechaStr);

                     });

                    $scope.lstLineasInvestigacionFecha = result.data;

                  }


              datos = {

                Accion:"S",
                SQL:"SELECT concat(investigador.INV_NOMB, ' ',investigador.INV_APEL)  AS Nombre," +
                " integrante.IS_FECH_INI,integrante.IS_FECH_FIN,integrante.IS_CODI,integrante.IS_INVE_CODI " +
                " FROM sgi_inte_semi AS integrante " +
                " INNER JOIN sgi_inve AS investigador " + 
                " ON integrante.IS_INVE_CODI = investigador.INV_CODI  WHERE integrante.IS_SEMI_CODI = " + idSemillero

              }
            
              lista = TareasResource.SQL(datos);
              lista.then(function(result){     

                 if (result.data[0]!=null)    
                  {

                    angular.forEach(result.data, function(value, key) {

                         var day = moment(result.data[key].IS_FECH_INI).format("D");
                         var mounth = moment(result.data[key].IS_FECH_INI).format("M");
                         var year = moment(result.data[key].IS_FECH_INI).format("YYYY");

                          var  fechaStr = year + "," + mounth + "," + day;

                       result.data[key].IS_FECH_INI  = new Date(fechaStr);

                     });

                    $scope.lstIntegranteSemilleroFecha =result.data;
                  }

                  

                datos = {

                  Accion:"S",
                  SQL:"SELECT Programa.PAC_NOMB AS Nombre," +
                  " ProgramaSemillero.PAS_FECH_INI,ProgramaSemillero.PAS_FECH_FIN,ProgramaSemillero.PAS_CODI,ProgramaSemillero.PAS_PACA_CODI " +
                  " FROM sgi_prog_acad_semi AS ProgramaSemillero " +
                  " INNER JOIN sgi_prog_acad AS Programa " + 
                  " ON ProgramaSemillero.PAS_PACA_CODI = Programa.PAC_CODI  WHERE ProgramaSemillero.PAS_SEMI_CODI = " + idSemillero

                  }

                   lista = TareasResource.SQL(datos);
                   lista.then(function(result){ 

                     if (result.data[0]!=null)    
                        {

                          angular.forEach(result.data, function(value, key) {

                               var day = moment(result.data[key].PAS_FECH_INI).format("D");
                               var mounth = moment(result.data[key].PAS_FECH_INI).format("M");
                               var year = moment(result.data[key].PAS_FECH_INI).format("YYYY");

                                var  fechaStr = year + "," + mounth + "," + day;

                             result.data[key].PAS_FECH_INI  = new Date(fechaStr);

                           });

                          $scope.lstProgramaAcademicoFecha =result.data;
                        }

                              datos = {
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

                                  if (result.data[0]==null)
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
                   });         

              });

             });
           });
         });
       }); 
   		});
    }

    $scope.onClicEliminarIntegranteSemillero = function(item){


      if (item.item.IS_CODI==-1)
      {
         $scope.lstIntegranteSemilleroFecha.splice(item.$index,1);
      }
      else
      {

           var datos = {        
              Tipo:'IntegranteSemillero',              
              Id:item.item.IS_CODI,            
              }
             

        $('#item').text(item.item.Nombre);
        $('#myFechaEliminacion').data('datos', datos).modal('show');        
      }      

      
    }

    $scope.onClicEliminarProgramaAcademico = function(item){

       if (item.item.PAS_CODI==-1)
      {
         $scope.lstProgramaAcademicoFecha.splice(item.$index,1);
      }
      else
      {

           var datos = {        
              Tipo:'ProgramaAcademico',              
              Id:item.item.PAS_CODI,            
              }
             

        $('#item').text(item.item.Nombre);
        $('#myFechaEliminacion').data('datos', datos).modal('show');        
      }      
       
       

    }

    $scope.onClicEliminarLineasInvestigacion = function(item)
    {        

      if (item.item.LIS_CODI==-1)
      {
         $scope.lstLineasInvestigacionFecha.splice(item.$index,1);
      }
      else
      {

           var datos = {        
              Tipo:'LineasInvestigacion',              
              Id:item.item.LIS_CODI,            
        }
       

        $('#item').text(item.item.Nombre);
        $('#myFechaEliminacion').data('datos', datos).modal('show');        
      }
       
    }

    $scope.onClicEliminarTipoEstrategia = function(item) {

        $scope.lstTipoEstrategica.splice(item.$index,1);

    }

    $scope.onClicAgregarProgramaAcademico = function() {

       if ($scope.semillero.selProgramaAcademico==undefined || $scope.semillero.selProgramaAcademico=="")
      {
        $window.alert("Seleccione un Programa Académico")
        return;
      }

      if ($scope.semillero.fechaProgramaAcademico==undefined || $scope.semillero.fechaProgramaAcademico=="")
      {
        $window.alert("Seleccione una fecha Programa Académico")
        return;
      }

        if ($scope.lstProgramaAcademicoFecha==undefined) $scope.lstProgramaAcademicoFecha=[];

          var day = moment($scope.semillero.fechaProgramaAcademico).format("D");
         var mounth = moment($scope.semillero.fechaProgramaAcademico).format("M");
         var year = moment($scope.semillero.fechaProgramaAcademico).format("YYYY");

          var  fechaStr = year + "," + mounth + "," + day;

           $scope.lstProgramaAcademicoFecha.splice(0,0,
              { Nombre:$scope.semillero.selProgramaAcademico.Nombre,
                PAS_FECH_INI:new Date(fechaStr),
                PAS_CODI:-1,
                PAS_FECH_FIN:null,
                PAS_PACA_CODI:$scope.semillero.selProgramaAcademico.PAC_CODI});  


      $scope.semillero.fechaProgramaAcademico="";
      $scope.semillero.selProgramaAcademico="";     

    }

    $scope.onClicAgregarIntegranteSemillero = function()
    {
      if ($scope.semillero.selIntegrante==undefined || $scope.semillero.selIntegrante=="")
      {
        $window.alert("Seleccione un Integrante Semillero")
        return;
      }

      if ($scope.semillero.fechaIntegranteSemillero==undefined || $scope.semillero.fechaIntegranteSemillero=="")
      {
        $window.alert("Seleccione una fecha Integrante semillero")
        return;
      }

        if ($scope.lstIntegranteSemilleroFecha==undefined) $scope.lstIntegranteSemilleroFecha=[];

         var day = moment($scope.semillero.fechaIntegranteSemillero).format("D");
         var mounth = moment($scope.semillero.fechaIntegranteSemillero).format("M");
         var year = moment($scope.semillero.fechaIntegranteSemillero).format("YYYY");

          var  fechaStr = year + "," + mounth + "," + day;

          $scope.lstIntegranteSemilleroFecha.splice(0,0,
              { Nombre:$scope.semillero.selIntegrante.Nombre,
                IS_FECH_INI:new Date(fechaStr),
                IS_CODI:-1,
                IS_FECH_FIN:null,
                IS_INVE_CODI:$scope.semillero.selIntegrante.INV_CODI});  

          $scope.semillero.selIntegrante="";
          $scope.semillero.fechaIntegranteSemillero="";

    }

    $scope.onClicAgregarLineasInvestigacion = function()
    {
    	if ($scope.semillero.selLineas==undefined || $scope.semillero.selLineas=="")
    	{
    		$window.alert("Seleccione una línea de Investigación")
    		return;
    	}

    	if ($scope.semillero.fechaLineaInvestigacion==undefined || $scope.semillero.fechaLineaInvestigacion=="")
    	{
    		$window.alert("Seleccione una fecha de línea de  Investigación")
    		return;
    	}

    if ($scope.lstLineasInvestigacionFecha==undefined) $scope.lstLineasInvestigacionFecha=[];

        

         var day = moment($scope.semillero.fechaLineaInvestigacion).format("D");
         var mounth = moment($scope.semillero.fechaLineaInvestigacion).format("M");
         var year = moment($scope.semillero.fechaLineaInvestigacion).format("YYYY");

         var  fechaStr = year + "," + mounth + "," + day;
               

          $scope.lstLineasInvestigacionFecha.splice(0,0,
              { Nombre:$scope.semillero.selLineas.Nombre,
                LIS_FECH_INI:new Date(fechaStr),
                LIS_FECH_FINA:null,
                LIS_CODI:-1,
                LIS_LINE_INVE_CODI:$scope.semillero.selLineas.lin_codi});    

          $scope.semillero.selLineas="";
          $scope.semillero.fechaLineaInvestigacion="";
    }


    $scope.onClicAgregarTipoEstrategia = function() {

      if ($scope.semillero.selTipoEstrategia==undefined || $scope.semillero.selTipoEstrategia=="")
      {
          $window.alert("Seleccione un tipo estrategia")
          return;
      }

      if ($scope.semillero.txtTipoEstrategia==undefined || $scope.semillero.txtTipoEstrategia=="")
      {
          $window.alert("Falta descripción tipo estrategia")
          return;
      }

       if ($scope.lstTipoEstrategica==undefined) $scope.lstTipoEstrategica=[];


       $scope.lstTipoEstrategica.splice(0,0,
              { Nombre:$scope.semillero.selTipoEstrategia.Nombre,
                TES_DESC:$scope.semillero.txtTipoEstrategia,
                TES_CODI:-1,
                TES_TIES_CODI:$scope.semillero.selTipoEstrategia.TIE_CODI});    

       $scope.semillero.selTipoEstrategia="";
       $scope.semillero.txtTipoEstrategia="";

    }

    $scope.mostrarDatosSemillero = function(idSemillero)
    {



    	if (idSemillero>0)
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

            idSemillero = result.data[0].valor;
            datos = {
              Accion:"I",
              SQL :"INSERT INTO sgi_inve_semi (INS_INVE_IDEN,INS_SEMI_CODI) " +
              " VALUES (" + user.INV_CODI + "," + idSemillero + ")"

            }
              insertSemilero =  TareasResource.SQL(datos);
              insertSemilero.then(function(result){                  
                var insert =[];
                angular.forEach($scope.lstLineasInvestigacionFecha, function(value, key) {

                  datos = {
                    Accion:"I",
                    SQL:"INSERT INTO sgi_line_inve_semi (LIS_SEMI_CODI,LIS_LINE_INVE_CODI,LIS_FECH_INI) VALUES " +
                        " (" + idSemillero + "," + value.LIS_LINE_INVE_CODI + ",'" + moment(value.LIS_FECH_INI).format("YYYY-MM-DD") + "')"
                  }

                  insert.splice(0,0,datos);                  

               });

                angular.forEach($scope.lstIntegranteSemilleroFecha, function(value, key) {

                  datos = {
                    Accion:"I",
                    SQL:"INSERT INTO sgi_inte_semi (IS_SEMI_CODI,IS_INVE_CODI,IS_FECH_INI) VALUES " +
                        " (" + idSemillero + "," + value.IS_INVE_CODI + ",'" + moment(value.IS_FECH_INI).format("YYYY-MM-DD") + "')"
                  }

                  insert.splice(0,0,datos);                  

               });

              angular.forEach($scope.lstProgramaAcademicoFecha, function(value, key) {

                  datos = {
                    Accion:"I",
                    SQL:"INSERT INTO sgi_prog_acad_semi (PAS_SEMI_CODI,PAS_PACA_CODI,PAS_FECH_INI) VALUES " +
                        " (" + idSemillero + "," + value.PAS_PACA_CODI + ",'" + moment(value.PAS_FECH_INIC).format("YYYY-MM-DD") + "')"
                  }

                  insert.splice(0,0,datos);                  

               });


                angular.forEach($scope.lstTipoEstrategica, function(value, key) {

                  datos = {
                    Accion:"I",
                    SQL:"INSERT INTO sgi_tipo_estr_semi (TES_SEMI_CODI,TES_TIES_CODI,TES_DESC) VALUES " +
                        " (" + idSemillero + "," + value.TES_TIES_CODI + ",'" + value.TES_DESC + "')"
                  }

                  insert.splice(0,0,datos);                  

               });


                  insertSemilero = TareasResource.SQLMulti(insert);
                    insertSemilero.then(function(){
                       $('#myModal').hide();
                       $window.alert("Semillero Guardado");
                      $location.path('/semillero');  

                    });

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

