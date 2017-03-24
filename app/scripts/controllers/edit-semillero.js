'use strict';

angular.module('listaTareasApp')

  .directive('mostrarfechaeliminacion',function(){

   return {
        restrict : 'AE',   
         controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {

            $scope.eliminarfecha = new Date();
            $scope.afirmaEliminar = function() {
              moment.locale('es');
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
                               'data-autoclose="1"  ' +
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


.directive('initTablagrupos', ['$compile', function($compile) {
        return {
            restrict: 'A',

      link: function(scope, el, attrs) {
                var opts = scope.$eval(attrs.initTablagrupos);   
                opts.onLoadSuccess = function() {
                    $compile(el.contents())(scope); 
            };
             el.bootstrapTable(opts);
              scope.$watch(el, function (bstable) {
                    $compile(el.contents())(scope);
                });    
                el.bind('body-changed.bs.table', function () {
                    var body = el.find('tbody')[0];
                    console.log('get here one more time');
                    $compile(body)(scope);
                });
            }
        }
    }])


  .controller('editSemillero', function($scope,$location,datosSemillero,TareasResource,$route,$window) {

    var formData = [];
    $scope.documentos = [];

   $('#myModal').hide();
      moment.locale('es');
    $scope.optionsgrupos = {                                
          cache: false,
          height: 200,
          striped: true,
          pagination: true,                
          pageList: [10, 25, 50, 100, 200],                
          minimumCountColumns: 2,         
          idField:'gru_codi',                                       
      columns: [

      {
          field: 'gru_nomb',
          title: 'GRUPO',
          align: 'left',
          valign: 'middle',
          sortable: true
      },{
          field: 'FechaInicio',
          title: 'Fecha Inicio',
          align: 'left',
          valign: 'middle',
          sortable: true,
           formatter: function(value, row, index) {

                return moment(value).format("DD MMMM YYYY");

           }
      },{
          field: 'FechaFin',
          title: 'Fecha Fin',
          align: 'left',
          valign: 'middle',
          sortable: true,
            formatter: function(value, row, index) {

                if (value==null || moment(value).format("DD MMMM YYYY")=='Invalid date') return '';
                return moment(value).format("DD MMMM YYYY");

           }
        }

      ]
    }


    $scope.optionsdocu = {                                
          cache: false,
          height: 200,
          striped: true,
          pagination: true,                
          pageList: [10, 25, 50, 100, 200],                
          minimumCountColumns: 2,         
          idField:'id',                                       
      columns: [

        {
            field: 'Nombre',
            title: 'Nombre',
            align: 'left',
            valign: 'middle',
            sortable: true,
            formatter: function(value, row, index) {
                return '<a href="http://' + value + '" target=_blank class="" title="Ver Documento">' + value + '</a>';
               

           }
        },{

            field:'btnBorrar',
            title:'',
            align:'center',
            valign:'middle',
             formatter: function(value, row, index) {

                return '<a class="remove ml10 btn btn-default btn-xs" title="Eliminar" ><span class="glyphicon glyphicon-trash"></span></a>';

           }
        }

      ]
    }

   
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
      height: '500',
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

    var datos = {

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

                      result.data[key].LIS_FECH_FINA  =(result.data[key].LIS_FECH_FINA==null)? null: 
                            new Date(moment(result.data[key].LIS_FECH_FINA).format("YYYY") + "," + 
                              moment(result.data[key].LIS_FECH_FINA).format("M") + "," + 
                              moment(result.data[key].LIS_FECH_FINA).format("D"));

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
                          // result.data[key].IS_FECH_FIN  =(result.data[key].IS_FECH_FIN==null)? null: moment(result.data[key].IS_FECH_FIN);

                            result.data[key].IS_FECH_FIN  =(result.data[key].IS_FECH_FIN==null)? null: 
                            new Date(moment(result.data[key].IS_FECH_FIN).format("YYYY") + "," + 
                              moment(result.data[key].IS_FECH_FIN).format("M") + "," + 
                              moment(result.data[key].IS_FECH_FIN).format("D"));

                      

                     });
                                        
                         $scope.lstIntegranteSemilleroFecha =result.data;

                  }
                 
                      if ($scope.lstIntegranteSemilleroFecha==undefined) $scope.lstIntegranteSemilleroFecha=[];
                       $scope.lstIntegranteSemilleroFecha.splice(0,0,
                                { Nombre:user.INV_NOMB + ' ' + user.INV_APEL,
                                  IS_FECH_INI:new Date(),
                                  IS_CODI:-10,
                                  IS_FECH_FIN:null,
                                  IS_INVE_CODI:user.INV_CODI});  
                 

                  

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
                              //result.data[key].PAS_FECH_FIN  =(result.data[key].PAS_FECH_FIN==null)? null: moment(result.data[key].PAS_FECH_FIN);
                              result.data[key].PAS_FECH_FIN  =(result.data[key].PAS_FECH_FIN==null)? null: 
                            new Date(moment(result.data[key].PAS_FECH_FIN).format("YYYY") + "," + 
                              moment(result.data[key].PAS_FECH_FIN).format("M") + "," + 
                              moment(result.data[key].PAS_FECH_FIN).format("D"));

                            

                           });

                          $scope.lstProgramaAcademicoFecha =result.data;
                        }

                          datos = {

                            Accion:"S",
                            SQL:"SELECT TipoEstrategia.TIE_NOMB AS Nombre," +
                            " EstrategiaSemillero.TES_CODI,EstrategiaSemillero.TES_TIES_CODI,EstrategiaSemillero.TES_DESC " +
                            " FROM sgi_tipo_estr_semi AS EstrategiaSemillero " +
                            " INNER JOIN sgi_tipo_estr AS TipoEstrategia " + 
                            " ON EstrategiaSemillero.TES_TIES_CODI = TipoEstrategia.TIE_CODI  WHERE EstrategiaSemillero.TES_SEMI_CODI = " + idSemillero

                            }

                             lista = TareasResource.SQL(datos);
                             lista.then(function(result){ 

                                if (result.data[0]!=null)    
                                    {
                                        $scope.lstTipoEstrategica = result.data;
                                    }

                            
                            datos = {

                               Accion:'S',                              
                                SQL:'SELECT ESPRODS_CODI,ESPRODS_NOMB AS Nombre FROM sgi_esprod_semi' 

                            }      

                             lista = TareasResource.SQL(datos);
                             lista.then(function(result){ 
                                $scope.lstEstadoProducto = result.data;
                              
                              // $scope.lstEstadoProducto = result.data;

                               var  datos2 = {

                                  Accion:'S',
                                   SQL:'SELECT  ESPROYS_CODI,ESPROYS_DESC AS Nombre FROM sgi_esproy_semi' 

                                }      

                            var lista2 = TareasResource.SQL(datos2);
                             lista2.then(function(result2){ 

                                 $scope.lstEstadoProyecto = result2.data;
                                         
                                         
                                        datos = {
                                            Accion:'S',
                                            SQL:'SELECT PPR_CODI,PPR_SEMI_CODI,PPR_INVE_CODI,PPR_PROY_CODI,PPR_PROD_CODI,PPR_EPY_CODI,PPR_EPD_CODI,PPR_FECH_INI,PPR_FECH_FIN' +
                                              ' FROM sgi_proy_prod_semi   WHERE PPR_SEMI_CODI = ' + idSemillero

                                          }

                             lista = TareasResource.SQL(datos);
                             lista.then(function(result){ 

                                if (result.data[0]!=null) 
                                   
                                   angular.forEach(result.data, function(value, key) {
                                      var yyyy = moment(value.PPR_FECH_INI).format("YYYY");
                                      var mes = moment(value.PPR_FECH_INI).format("MM");
                                      var dia = moment(value.PPR_FECH_INI).format("DD"); 



                                       var  fechaStr = yyyy + "," + mes + "," + dia;
                                       result.data[key].PPR_FECH_INI = new Date(fechaStr);  

                                       var fechaFin =null;
                                       if (value.PPR_FECH_FIN!=null)
                                          {
                                            fechaFin =  moment(value.PPR_FECH_FIN).format("YYYY") + "," + moment(value.PPR_FECH_FIN).format("MM") + "," + moment(value.PPR_FECH_FIN).format("DD")
                                          }

                                      var datos = {

                                        //  NombreProyecto:result.data[key].NombreProyecto,
                                         // NombreProducto:result.data[key].NombreProducto,
                                          PPR_EPY_CODI : Enumerable.From($scope.lstEstadoProyecto)    
                                                               .Where(function (x) { return x.ESPROYS_CODI == result.data[key].PPR_EPY_CODI })          
                                                               .ToArray()[0],
                                          PPR_EPD_CODI : Enumerable.From($scope.lstEstadoProducto)                            
                                                                 .Where(function (x) { return x.ESPRODS_CODI == result.data[key].PPR_EPD_CODI})   
                                                               .ToArray()[0],                                                                                                                                     

                                          PPR_INVE_CODI:Enumerable.From($scope.lstIntegranteSemilleroFecha)                            
                                                                 .Where(function (x) { return x.IS_INVE_CODI == result.data[key].PPR_INVE_CODI})   
                                                               .ToArray()[0], 

                                          PPR_PROY_CODI:result.data[key].PPR_PROY_CODI,
                                          PPR_PROD_CODI:result.data[key].PPR_PROD_CODI,
                                          LST_PROYECTOS:null,
                                          LST_PRODUCTOS:null,                                                                      
                                          PPR_FECH_INI : new Date(fechaStr),
                                          PPR_CODI:result.data[key].PPR_CODI,
                                          PPR_FECH_FIN :(fechaFin==null)? null:new Date(fechaFin),
                                          checkFechaFin:(fechaFin==null)? false:true,
                                          deshabilitarFecha:(fechaFin!=null)? true:false


                                        }

                                        if ($scope.listProyectosProductos==undefined) $scope.listProyectosProductos=[];

                                        $scope.listProyectosProductos.splice(0,0,datos);

                                   });
                                  
                                  var select=[];
                                  angular.forEach($scope.listProyectosProductos, function(value, key) {

                                          var  datos2 = {

                                                  Accion:'S',
                                                  SQL:'SELECT P.PRO_NOMB AS Nombre,P.PRO_CODI,PI.id_inve,PI.id_proy    FROM sgi_proy AS P INNER JOIN sgi_proy_inve AS PI ON P.PRO_CODI=PI.id_proy WHERE PI.id_inve=' + value.PPR_INVE_CODI.IS_INVE_CODI

                                                }       
                                         select.splice(0,0,datos2);
                                                                                                            
                                     });


                                    if (select.length>0)
                                    {
                                     var  lista2 =  TareasResource.SQLMulti(select);
                                          lista2.then(function(result2){  

                                            angular.forEach(result2.data.split("ok")[0].split(";"), function(value2, key2) {

                                              if (value2!="")
                                              {
                                                var dd = value2;

                                             

                                              var item = Enumerable.From($scope.listProyectosProductos)                            
                                                                 .Where(function (x) { return x.PPR_INVE_CODI.IS_INVE_CODI ==JSON.parse(value2)[0].id_inve})   
                                                               .ToArray()[0];
                                               if (item!=null)                   
                                                             {  
                                                  item.LST_PROYECTOS =JSON.parse(value2);    

                                                  item.PPR_PROY_CODI = Enumerable.From(item.LST_PROYECTOS)                            
                                                                     .Where(function (x) { return x.PRO_CODI ==item.PPR_PROY_CODI })   
                                                                   .ToArray()[0];

                                                  $scope.onChangedProyecto(item);
                                                   }

                                              // item.PPR_PROD_CODI =Enumerable.From( item.LST_PRODUCTOS)                            
                                              //                    .Where(function (x) { return x.id ==item.PPR_PROD_CODI})   
                                              //                  .ToArray()[0];


                                               //  value.LST_PRODUCTOS = JSON.parse(result2.data.split("ok")[0]);


                                              }
                                            });
                                            
                                           

                                      });        
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
                                          $location.path('/menu');
                                      return;
                                  }

                                $scope.nombreInvestigador = result.data[0].Nombres;
                                $scope.apellidoInvestigador = result.data[0].Apellidos;
                                $scope.centroInvestigador = result.data[0].Centro;
                                $scope.zonaInvestigador = result.data[0].Zona;
                                $scope.programaInvestigador = result.data[0].Programa;
                                $scope.escuelaInvestigador = result.data[0].Escuela;
                                  datos = {
                                          Accion:'S',
                                          SQL:'SELECT G.gru_codi,G.gru_nomb,IG.IGR_FECH_INIC As FechaInicio FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG ON IG.IGR_GRUP_CODI = G.gru_codi WHERE IG.  IGR_INVE_IDEN =' + id
                                     }

                                investigador = TareasResource.SQL(datos);
                                investigador.then(function(result){

                                  if (result.data[0]!=null)

                                      $('#tablegrupos').bootstrapTable('load',result.data);          

                                     

                                      $('#tabledocu').bootstrapTable('load',$scope.documentos);                                    
                                     $scope.mostrarDatosSemillero(idSemillero);                          

                                  });                               
                                })  
                             }); 
                            });
                          });
                        });
                     });
                   });
                });                     
             });
           });
         });
       }); 
     
    }


    $scope.onChangedFechaTermina = function(item)
    {
      if (item.item.checkFechaFin==true)
      {
        item.item.deshabilitarFecha2 =false;
        item.item.PPR_FECH_FIN = new Date();
      }
      else

      {
        item.item.PPR_FECH_FIN=null;
        item.item.deshabilitarFecha2 =true;
      }
    }



    $scope.onClickNewProyProd = function() {

            if ($scope.lstIntegranteSemilleroFecha==undefined)
            {
               $window.alert("Faltan agregar integrantes al Semillero");
               return;
            }

            if ($scope.lstIntegranteSemilleroFecha.length==0)
                {
                  $window.alert("Faltan agregar integrantes al Semillero");
                  return;
                }

          
                var datos = {

                    NombreProyecto:'',
                    NombreProducto:'', 
                    PPR_EPY_CODI : Enumerable.From($scope.lstEstadoProyecto)                            
                                         .ToArray()[0],
                    PPR_EPD_CODI : Enumerable.From($scope.lstEstadoProducto)                            
                                         .ToArray()[0],
                    
                    LST_PRODUCTOS:null,        
                    LST_PROYECTOS:null,     
                    
                    PPR_PROY_CODI:null,

                    PPR_PROD_CODI:null,

                    PPR_INVE_CODI:null,
                    PPR_FECH_INI :new Date(),
                    PPR_CODI:-1,
                    PPR_FECH_FIN :null,
                    checkFechaFin :false


                  }

                  if ( $scope.listProyectosProductos==undefined)  $scope.listProyectosProductos =[];


                  $scope.listProyectosProductos.splice(0,0,datos);

     

        
    }


    $scope.onChangedIntegrante = function(item)
    {
       var  datos2 = {

              Accion:'S',
              SQL:'SELECT P.PRO_NOMB AS Nombre,P.PRO_CODI,PI.id_inve,PI.id_proy  FROM sgi_proy AS P INNER JOIN sgi_proy_inve AS PI ON P.PRO_CODI=PI.id_proy WHERE PI.id_inve=' + item.PPR_INVE_CODI.IS_INVE_CODI

            }      

      item.LST_PROYECTOS=[];    
      item.LST_PRODUCTOS=[];  
      item.PPR_PROD_CODI=null;
      var   lista2 = TareasResource.SQL(datos2);
            lista2.then(function(result2){ 
              if (result2.data[0]!=null)
              {
                item.LST_PROYECTOS = result2.data   
                item.PPR_PROY_CODI =result2.data[0];
                $scope.onChangedProyecto(item);   
              }
            });
                                         
    }

    $scope.onChangedProyecto = function(item) {
       var datos2 = {

          Accion:'S',
           SQL:'SELECT  P.id,P.Nombre FROM sgi_prod_proy AS PP INNER JOIN sgi_prod AS P ON P.id=PP.id_prod WHERE PP.id_proy=' + item.PPR_PROY_CODI.PRO_CODI 

        } 
        $('#myModal').show();     

    var  lista2 = TareasResource.SQL(datos2);
        lista2.then(function(result2){  
            
            item.LST_PRODUCTOS = result2.data;  

            if (item.PPR_PROD_CODI==undefined)
            {
               item.PPR_PROD_CODI = result2.data[0];
                $('#myModal').hide();
               return;
            }

            if (item.PPR_PROD_CODI!=null || item.PPR_PROD_CODI!=undefined)
            {
              if (item.PPR_PROD_CODI.id!=undefined)
              {
              item.PPR_PROD_CODI= Enumerable.From(item.LST_PRODUCTOS)                            
                                  .Where(function (x) { return x.id ==item.PPR_PROD_CODI.id})   
                                  .ToArray()[0];

               if (item.PPR_PROD_CODI==undefined) 
               {
                  item.PPR_PROD_CODI = result2.data[0];
                  $('#myModal').hide();
                  return;
               }
             }

              else
              item.PPR_PROD_CODI= Enumerable.From(item.LST_PRODUCTOS)                            
                                  .Where(function (x) { return x.id ==item.PPR_PROD_CODI})   
                                  .ToArray()[0];                                  
            }
            else
            {

              item.PPR_PROD_CODI = result2.data[0];
            }
            $('#myModal').hide();
          });
    }

    $scope.onClicEliminarProyectoProducto = function(item)
    {
      $scope.listProyectosProductos.splice(item.$index,1);
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

      $location.path('/menu');
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
                        " (" + idSemillero + "," + value.PAS_PACA_CODI + ",'" + moment(value.PAS_FECH_INI).format("YYYY-MM-DD") + "')"
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


                 angular.forEach($scope.listProyectosProductos, function(value, key) {

                  if (value!=null)
                  {
                  if (value.PPR_FECH_FIN==null)
                   {   
                      datos = { 
                        Accion:"I",
                       SQL:"INSERT INTO sgi_proy_prod_semi (PPR_INVE_CODI,PPR_SEMI_CODI,PPR_PROY_CODI,PPR_PROD_CODI,PPR_EPD_CODI,PPR_EPY_CODI,PPR_FECH_INI) VALUES " +
                            " (" + value.PPR_INVE_CODI.IS_INVE_CODI + "," + idSemillero + "," + value.PPR_PROY_CODI.PRO_CODI + "," + value.PPR_PROD_CODI.PDS_CODI + "," + value.PPR_EPD_CODI.ESPRODS_CODI + "," +
                             value.PPR_EPY_CODI.ESPROYS_CODI + ",'" +  moment(value.PPR_FECH_INI).format("YYYY-MM-DD") + "')"
                      } 
                   }
                   else
                   {
                      datos = { 
                        Accion:"I",
                       SQL:"INSERT INTO sgi_proy_prod_semi (PPR_INVE_CODI,PPR_SEMI_CODI,PPR_PROY_CODI,PPR_PROD_CODI,PPR_EPD_CODI,PPR_EPY_CODI,PPR_FECH_INI,PPR_FECH_FIN) VALUES " +
                            " (" + value.PPR_INVE_CODI.IS_INVE_CODI + "," + idSemillero + "," + value.PPR_PROY_CODI.PRO_CODI + "," + value.PPR_PROD_CODI.id + "," + value.PPR_EPD_CODI.ESPRODS_CODI + "," +
                             value.PPR_EPY_CODI.ESPROYS_CODI + ",'" +  moment(value.PPR_FECH_INI).format("YYYY-MM-DD") + "','" +  moment(value.PPR_FECH_FIN).format("YYYY-MM-DD") + "')"
                      } 
                   } 

                  insert.splice(0,0,datos);                  
                }

               });

                


                  insertSemilero = TareasResource.SQLMulti(insert);                  
                    insertSemilero.then(function(){
                           $('#myModal').hide();
                                 $window.alert("Semillero Guardado");



                          // var ids =[];

                          // var insertSemilero =[];
                          //  angular.forEach($scope.documentos, function(value, key) {

                          //     datos = {
                          //       Accion:'I',
                          //       SQL:"INSERT INTO sgi_doc_semi (id_semillero,nombre) VALUES (" + idSemillero + ",'" + value.Nombre + "')" 

                          //     }

                          //     insertSemilero.splice(0,0,datos);

                          //  });

                     
                          //  $('#myModal').show();
                          //  TareasResource.SQLMulti(insertSemilero).then(function(result) {    

                          //    var e = result;
                          //      // $location.path('/semillero');  
                          //  });                       
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
               
                var insert =[];
                angular.forEach($scope.lstLineasInvestigacionFecha, function(value, key) {

                  if ( value.LIS_CODI==-1)
                  {
                    datos = {
                      Accion:"I",
                      SQL:"INSERT INTO sgi_line_inve_semi (LIS_SEMI_CODI,LIS_LINE_INVE_CODI,LIS_FECH_INI) VALUES " +
                          " (" + idSemillero + "," + value.LIS_LINE_INVE_CODI + ",'" + moment(value.LIS_FECH_INI).format("YYYY-MM-DD") + "')"
                    }
                  }
                  else
                  {

                    var fecha =  (value.LIS_FECH_FINA!=null)?   "'" + moment(value.LIS_FECH_FINA).format("YYYY-MM-DD") + "'" : null;

                    

                     datos = {
                      Accion:"U",
                      SQL:"UPDATE sgi_line_inve_semi set " +
                          " LIS_FECH_INI ='" + moment(value.LIS_FECH_INI).format("YYYY-MM-DD") + "', " +
                          " LIS_FECH_FINA =" + fecha + " " +
                          " WHERE LIS_CODI =" + value.LIS_CODI
                      
                    }
                  }
                 
                  insert.splice(0,0,datos);                  

               });

              angular.forEach($scope.lstIntegranteSemilleroFecha, function(value, key) {

                  if (value.IS_CODI==-1)
                  {

                    datos = {
                      Accion:"I",
                      SQL:"INSERT INTO sgi_inte_semi (IS_SEMI_CODI,IS_INVE_CODI,IS_FECH_INI) VALUES " +
                          " (" + idSemillero + "," + value.IS_INVE_CODI + ",'" + moment(value.IS_FECH_INI).format("YYYY-MM-DD") + "')"
                    }
                  }
                  else
                  {
                   var fecha =  (value.IS_FECH_FIN!=null)?   "'" + moment(value.IS_FECH_FIN).format("YYYY-MM-DD") + "'" : null;

                    datos = {
                      Accion:"U",
                      SQL:"UPDATE sgi_inte_semi set " +
                          " IS_FECH_INI='" + moment(value.IS_FECH_INI).format("YYYY-MM-DD")  + "', " +
                          " IS_FECH_FIN=" + fecha + " WHERE IS_CODI=" + value.IS_CODI 
                    }

                  }


                  insert.splice(0,0,datos);                  

               });
                

               angular.forEach($scope.lstProgramaAcademicoFecha, function(value, key) {

                  if (value.PAS_CODI==-1)
                  {

                    datos = {
                      Accion:"I",
                      SQL:"INSERT INTO sgi_prog_acad_semi (PAS_SEMI_CODI,PAS_PACA_CODI,PAS_FECH_INI) VALUES " +
                          " (" + idSemillero + "," + value.PAS_PACA_CODI + ",'" + moment(value.PAS_FECH_INI).format("YYYY-MM-DD") + "')"
                    }

                  }
                  else
                  {
                    var fecha =  (value.PAS_FECH_FIN!=null)?   "'" + moment(value.PAS_FECH_FIN).format("YYYY-MM-DD") + "'" : null;

                     datos = {
                      Accion:"U",
                      SQL:"UPDATE sgi_prog_acad_semi set " +
                          " PAS_FECH_INI='" + moment(value.PAS_FECH_INI).format("YYYY-MM-DD") + "'," +
                          " PAS_FECH_FIN =" + fecha + " WHERE PAS_CODI=" + value.PAS_CODI
                    }                     
                  }

                  insert.splice(0,0,datos);                  

               });     


                datos = {
                    Accion:"D",
                    SQL:"DELETE FROM sgi_tipo_estr_semi WHERE TES_SEMI_CODI = " + idSemillero
                  }    

               insert.splice(insert.length-1,0,datos);               

                angular.forEach($scope.lstTipoEstrategica, function(value, key) {

                  datos = {
                    Accion:"I",
                    SQL:"INSERT INTO sgi_tipo_estr_semi (TES_SEMI_CODI,TES_TIES_CODI,TES_DESC) VALUES " +
                        " (" + idSemillero + "," + value.TES_TIES_CODI + ",'" + value.TES_DESC + "')"
                  }

                 insert.splice(insert.length-1,0,datos);                

               });  

                  datos = {
                    Accion:"D",
                    SQL:"DELETE FROM sgi_proy_prod_semi WHERE PPR_SEMI_CODI = " + idSemillero
                  }    

               insert.splice(insert.length-1,0,datos);      

               angular.forEach($scope.listProyectosProductos, function(value, key) {

                if (value!=null)
                {

                  if (value.PPR_FECH_FIN==null)
                   {   
                      datos = { 
                        Accion:"I",
                       SQL:"INSERT INTO sgi_proy_prod_semi (PPR_INVE_CODI, PPR_SEMI_CODI,PPR_PROY_CODI,PPR_PROD_CODI,PPR_EPD_CODI,PPR_EPY_CODI,PPR_FECH_INI) VALUES " +
                            " (" + value.PPR_INVE_CODI.IS_INVE_CODI + "," + idSemillero + "," + value.PPR_PROY_CODI.PRO_CODI + "," + value.PPR_PROD_CODI.id + "," + value.PPR_EPD_CODI.ESPRODS_CODI + "," +
                             value.PPR_EPY_CODI.ESPROYS_CODI + ",'" +  moment(value.PPR_FECH_INI).format("YYYY-MM-DD") + "')"
                      } 
                   }
                   else
                   {
                      datos = { 
                        Accion:"I",
                       SQL:"INSERT INTO sgi_proy_prod_semi (PPR_INVE_CODI, PPR_SEMI_CODI,PPR_PROY_CODI,PPR_PROD_CODI,PPR_EPD_CODI,PPR_EPY_CODI,PPR_FECH_INI,PPR_FECH_FIN) VALUES " +
                            " (" + value.PPR_INVE_CODI.IS_INVE_CODI + "," + idSemillero + "," + value.PPR_PROY_CODI.PRO_CODI + "," + value.PPR_PROD_CODI.id + "," + value.PPR_EPD_CODI.ESPRODS_CODI + "," +
                             value.PPR_EPY_CODI.ESPROYS_CODI + ",'" +  moment(value.PPR_FECH_INI).format("YYYY-MM-DD") + "','" +  moment(value.PPR_FECH_FIN).format("YYYY-MM-DD") + "')"
                      } 
                   } 


                   insert.splice(insert.length-1,0,datos);      
                 }
               });       
              


                insertSemilero = TareasResource.SQLMulti(insert);
                    insertSemilero.then(function(resulta){


                         var ids =[];

                          var insertSemilero2 =[];
                           angular.forEach($scope.documentos, function(value, key) {

                              datos = {
                                Accion:'ADJUNTO',
                                SQL:"INSERT INTO sgi_doc_semi (id_semillero,nombre) VALUES (" + idSemillero + ",'" + value.Nombre + "')" 

                              }

                              insertSemilero2.push(datos);

                           });

                     
                           $('#myModal').show();
                           TareasResource.SQLMulti(insertSemilero2).then(function(result) {    

                             var e = result;


                                   var fd = new FormData();       
                                   angular.forEach($scope.documentos, function(value, key) {
                                        fd.append('id',result.data[key]); 
                                        fd.append('accion','Ingresar');  
                                        fd.append('archFileOld','');  
                                        fd.append('tipo','');
                                        fd.append('SEMILLERO', value.data);                                                                            
                                   });
                                                                                                                                          
                                TareasResource.enviararchivobinario(fd).then(function(result1) { 
                                        var d = result1.data;
                                        $('#myModal').hide();
                                       $window.alert("Semillero Actualizado");                  
                                      });                                           
                           });                                                      
                       });              

               });                     
           }
    }

     var Data;

    $scope.uploadFileTexto = function(item)
    {

      //$scope.lstDocu.
      
      Data = item.files[0];

      $scope.nombreArchivo = Data.name;
      $scope.$apply()

    }

    $scope.onClicKAgregarDocumento = function() {

    
      var datos = {
        Nombre:$scope.nombreArchivo,
        data:Data
      }

      $scope.documentos.splice(0,0,datos);
      $('#tabledocu').bootstrapTable('load',$scope.documentos);    
      $scope.nombreArchivo="";    

    }

      
});

