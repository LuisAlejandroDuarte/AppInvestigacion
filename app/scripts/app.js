'use strict';

//var listaTareasApp = {};
//var app = angular.module('listaTareasApp ', ['app.services']);
//var services = angular.module('app.services', ['ngRoute', 'ngAnimate', 'ngResource', 'ngAnimate', 'ngCookies','ui.bootstrap']);

angular.module("listaTareasApp", ['ngRoute','ngAnimate','ngLocale', 'ngResource', 'ngAnimate', 'ngCookies','ui.bootstrap','mgcrea.ngStrap','base64','jqwidgets'])

  .run(function($rootScope, $location, $cookieStore) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if ($cookieStore.get('estaConectado') == false || $cookieStore.get('estaConectado') == null) {
        if(next.templateUrl == 'views/tareas.html' || next.templateUrl == 'views/empleados.html' || 
          next.templateUrl == 'views/edit-granarea.html' ) {
          $location.path('/inicio');
        }
      }
      else {
        var usuario = $cookieStore.get('usuario');
     
     // $location.path('/grupo');
        // if(next.templateUrl == 'views/inicio.html'  ) {
        //   $location.path('/main');          
        // }
        // else
        // {
        // if(next.templateUrl == 'views/edit-granarea.html') {
        //   $location.path('/edit-granarea/:idGranA');
        // }
      }
      
    })
  })



  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider
    .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'ControllerMain'
      })
    .when('/zona', {
        templateUrl: 'views/zona.html',
        controller: 'ControllerZona'
      })
       .when('/edit-zona/:idZona', {
        title: 'Editar Zona',
        templateUrl: 'views/edit-zona.html',
        controller: 'editZona',
         resolve: {
          datosZona: function($route,TareasResource){
            var zonaID = parseInt($route.current.params.idZona);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT ZON_CODI,ZON_NOMB,ZON_SIGL FROM " + 
                         " SGI_ZONA WHERE ZON_CODI =" +  zonaID });                           
            return dat;
          // return TareasResource.getIdGranArea.query({IdGranArea: granareaID});
          }
        }
      })
      .when('/inicio', {
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl'
      })
      .when('/tareas', {
        templateUrl: 'views/tareas.html',
        controller: 'TareasCtrl'
      })
      .when('/empleados', {
        templateUrl: 'views/empleados.html',
        controller: 'ControladorEmpleados'
      })

       .when('/area', {
        templateUrl: 'views/area.html',
        controller: 'ControladorArea'
        
      })

      .when('/edit-area/:idArea', {
        title: 'Editar Área',
        templateUrl: 'views/edit-area.html',
        controller: 'editArea',
         resolve: {
          datosArea: function($route,TareasResource){
            var areaID = parseInt($route.current.params.idArea);
           //  return TareasResource.getIdArea.query({IdArea: areaID});

               return    TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT area.ARE_CODI, area.ARE_NOMB,granarea.GAR_NOMB, " + 
                         " area.ARE_GRAN_AREA_CODI FROM SGI_AREA as area  join SGI_GRAN_AREA as granarea " + 
                         " on granarea.GAR_CODI = area.ARE_GRAN_AREA_CODI  where area.ARE_CODI =" + areaID });

          }
        }
      })

      .when('/granarea', {
        templateUrl: 'views/granarea.html',
        controller: 'ControladorGranArea'
      })

      .when('/edit-granarea/:idGranA', {
        title: 'Editar Gran Area',
        templateUrl: 'views/edit-granarea.html',
        controller: 'editGranArea',
         resolve: {
          datos: function($route,TareasResource){
            var granareaID = parseInt($route.current.params.idGranA);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT GAR_CODI,GAR_NOMB FROM SGI_GRAN_AREA WHERE GAR_CODI =" +  granareaID });  

            return dat;
          // return TareasResource.getIdGranArea.query({IdGranArea: granareaID});
          }
        }
      })

      .when('/centro', {
        templateUrl: 'views/centro.html',
        controller: 'ControladorCentro'
      })

      .when('/usuario', {
        templateUrl: 'views/usuario.html',
        controller: 'ControladorUsuario'
      })

         .when('/edit-usuario/:idUsuario', {
        title: 'Editar Usuario',
        templateUrl: 'views/edit-usuario.html',
        controller: 'editUsuario',
         resolve: {
          datosUsuario: function($route,TareasResource){
            var usuarioID = parseInt($route.current.params.idUsuario); 

             return    TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT * from sgi_user WHERE USE_CODI=" + usuarioID });

          }
        }
      })


         .when('/edit-centro/:idCentro', {
        title: 'Editar Centro',
        templateUrl: 'views/edit-centro.html',
        controller: 'editCentro',
         resolve: {
          datosCentro: function($route,TareasResource){
            var centroID = parseInt($route.current.params.idCentro);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT centro.CEN_CODI, centro.CEN_NOMB,zona.ZON_NOMB," + 
                         " centro.CEN_ZONA_CODI " +
                         " from SGI_CENT as centro  join SGI_ZONA as zona on " +
                         " zona.ZON_CODI = centro.CEN_ZONA_CODI where  centro.CEN_CODI =" +  centroID 
                         });                           
            return dat;
          // return TareasResource.getIdGranArea.query({IdGranArea: granareaID});
          }
        }
      })

      
      .when('/investigador', {
        templateUrl: 'views/investigador.html',
        controller: 'ControladorInvestigador'
      })

       .when('/grupo', {
        templateUrl: 'views/grupo.html',
        controller: 'ControladorGrupo'
      })


      .when('/edit-grupo/:idGrupo', {
        templateUrl: 'views/edit-grupo.html',
        controller: 'ControladorEditGrupo',
                 resolve: {
          datosGrupo: function($route,TareasResource){
            var grupoID = parseInt($route.current.params.idGrupo);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT IG.igr_codi,G.gru_nomb AS Grupo,G.gru_codi, G.gru_colc_codi,G.gru_cate_colc, I.inv_codi," + 
            " IG.igr_fech_inic AS Fecha,CONCAT(I.inv_nomb,'',I.inv_apel) As Investigador,G.gru_area_codi As selArea,G.gru_cent_codi As selCentro" + 
            " FROM sgi_inve_grup AS IG  INNER JOIN sgi_grup AS G ON G.gru_codi = IG.igr_grup_codi " + 
            " INNER JOIN sgi_inve As I ON I.inv_codi = IG.igr_inve_iden WHERE G.gru_codi =" + grupoID + "" });   

            dat.$promise.then(function(investigador){
              dat = investigador;
            });

            return dat;         
          }
        }
      })

       .when('/edit-investigador/:idInvestigador', {
        title: 'Editar Investigador',
        templateUrl: 'views/edit-investigador.html',
        controller: 'editInvestigador',
         resolve: {
          datosInvestigador: function($route,TareasResource){
            var investigadorID = parseInt($route.current.params.idInvestigador);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT INV.INV_CODI,INV_CODI_USUA, INV.INV_IDEN,INV.INV_TIPO_DOCU_CODI,INV.INV_NOMB,INV.INV_APEL,INV.INV_LINK_CVLA, " +
                          " INV.INV_FECH_NACI,INV.INV_MAIL,INV.INV_CENT_CODI,INV.INV_PROG_ACAD_CODI, " +
                          " INV.INV_TELE_CELU,INV.inv_foto, ZONA.ZON_NOMB ,ESCUELA.ESC_NOMB FROM sgi_inve AS INV LEFT JOIN sgi_cent AS CENTRO ON " + 
                          " CENTRO.CEN_CODI = INV.INV_CENT_CODI LEFT JOIN sgi_prog_acad AS PROGRAMA ON " + 
                          " PROGRAMA.PAC_CODI = INV.INV_PROG_ACAD_CODI LEFT JOIN sgi_zona AS ZONA ON ZONA.ZON_CODI = CENTRO.CEN_ZONA_CODI " + 
                          " LEFT JOIN sgi_escu AS ESCUELA ON ESCUELA.ESC_CODI = PROGRAMA.PAC_ESCU_CODI " +
                          " WHERE INV.INV_CODI =" + investigadorID + "" });                           
            return dat;         
          }
        }
      })

       
      .when('/sgiTipoConv', {
        templateUrl: 'views/sgi_tipo_conv.html',
        controller: 'ControladorSgiTipoConv'
      })

       .when('/edit-sgiTipoConv/:idSgiTipoConv', {
        title: 'Editar Centro',
        templateUrl: 'views/edit-sgiTipoConv.html',
        controller: 'editSgiTipoConv',
         resolve: {
          datos: function($route,TareasResource){
            var SgiTipoConvID = parseInt($route.current.params.idSgiTipoConv);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT TCO_CODI, TCO_DESC  from SGI_TIPO_CONV" + 
                         " WHERE TCO_CODI =" + SgiTipoConvID });                           
            return dat;
          // return TareasResource.getIdGranArea.query({IdGranArea: granareaID});
          }
        }
      })

      .when('/sgiConv', {
        templateUrl: 'views/sgiConv.html',
        controller: 'ControladorSgiConv'
      })

      .when('/edit-sgiConv/:idSgiConv', {
        title: 'Editar Centro',
        templateUrl: 'views/edit-sgiConv.html',
        controller: 'editSgiConv',
         resolve: {
          datos: function($route,TareasResource){
            var SgiConvID = parseInt($route.current.params.idSgiConv);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT conv.CON_CODI, tipoConv.TCO_DESC, " + 
                         " conv.CON_NUME,conv.CON_DESC,conv.CON_TEXT, " + 
                         " conv.CON_FECH_INIC,conv.CON_FECH_FINA,conv.CON_TIPO_CONV_CODI " +
                         " FROM SGI_CONV as conv join SGI_TIPO_CONV as tipoConv on " + 
                         " tipoConv.TCO_CODI = conv.CON_TIPO_CONV_CODI where " + 
                         " conv.CON_CODI =" + SgiConvID });                           
            return dat;
          // return TareasResource.getIdGranArea.query({IdGranArea: granareaID});
          }
        }
      })

     .when('/convocatoria', {
        templateUrl: 'views/convocatoria.html',
        controller: 'ControladorConvocatoria'
      })

     .when('/edit-convocatoria/:idConvocatoria', {
        title: 'Editar Convocatoria',
        templateUrl: 'views/edit-convocatoria.html',
        controller: 'editConvocatoria',
         resolve: {
          datosConvocatoria: function($route,TareasResource){
            var ConvocatoriaID = parseInt($route.current.params.idConvocatoria);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT conv.CON_CODI, tipoConv.TCO_DESC, " + 
                         " conv.CON_NUME,conv.CON_DESC,conv.CON_TEXT,conv.CON_TEXT_NOMB,conv.CON_RESO,conv.CON_RESO_NOMB, " + 
                         " conv.CON_FECH_INIC,conv.CON_FECH_FINA,conv.CON_TIPO_CONV_CODI,conv.CON_PUNT_TOTA  " +
                         " FROM sgi_conv as conv join sgi_tipo_conv as tipoConv on " + 
                         " tipoConv.TCO_CODI = conv.CON_TIPO_CONV_CODI where " + 
                         " conv.CON_CODI =" + ConvocatoriaID });                           
            return dat;
          // return TareasResource.getIdGranArea.query({IdGranArea: granareaID});
          }
        }
      })

      .when('/atributo', {
        templateUrl: 'views/atributo.html',
        controller: 'Controladoratributo'
        
      })

      .when('/edit-atributo/:idAtributo', {
        title: 'Editar Atributo',
        templateUrl: 'views/edit-atributo.html',
        controller: 'editAtributo',
         resolve: {
          datosAtributo: function($route,TareasResource){
            var atributoID = parseInt($route.current.params.idAtributo); 

             return    TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT ATR_DESC,ATR_CODI FROM sgi_atrib WHERE ATR_CODI =" + atributoID });

          }
        }
      })

      .when('/propuesta', {
        templateUrl: 'views/propuesta.html',
        controller: 'ControladorPropuesta'
        
      })

      .when('/edit-propuesta/:idPropuesta', {
        title: 'Editar Propuesta',
        templateUrl: 'views/edit-propuesta.html',
        controller: 'editPropuesta',
         resolve: {
          datosPropuesta: function($route,TareasResource){
            var propuestaID = parseInt($route.current.params.idPropuesta); 

             return    TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT P.PRO_LINK_CVLA, P.PRO_LINK_GLAC, P.PRO_CODI,P.PRO_NOMB,C.CON_DESC,P.PRO_TEXT,P.PRO_TEXT_NOMB,P.PRO_CART_AVAL,P.PRO_CART_NOMB,P.PRO_CONV_CODI   " + 
                        " FROM sgi_prop AS P INNER JOIN sgi_conv AS C ON C.CON_CODI=P.PRO_CONV_CODI  WHERE " + 
                        " P.PRO_CODI=" + propuestaID });

          }
        }
      })

     .when('/propuesta-atributo', {
        templateUrl: 'views/propuesta-atributo.html',
        controller: 'propuestaAtributoCtrl'
        
      })

      .when('/propuesta-atributo-convocatoria', {
        templateUrl: 'views/propuesta-atributo-convocatoria.html',
        controller: 'propuestaAtributoConvocatoriaCtrl'
        
      })

      .when('/parametroEvaluacion', {
        templateUrl: 'views/parametroEvaluacion.html',
        controller: 'Controladorparametroevaluacion'
        
      })

      .when('/edit-parametroEvaluacion/:idParametroEvaluacion', {
        title: 'Editar parámetro evaluación',
        templateUrl: 'views/edit-parametroEvaluacion.html',
        controller: 'editParametroEvaluacion',
         resolve: {
          datosParametroEvaluacion: function($route,TareasResource){
            var parametroEvaluacionID = parseInt($route.current.params.idParametroEvaluacion); 

             return    TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT PEV_CODI,PEV_DESC FROM sgi_para_eval WHERE PEV_CODI =" + parametroEvaluacionID });

          }
        }
      })     

      .when('/escalaEvaluacion', {
        templateUrl: 'views/escalaEvaluacion.html',
        controller: 'Controladorescalaevaluacion'
        
      })

      .when('/propuestaConvocatoriaAtributoJuez', {
        templateUrl: 'views/propuesta-convocatoria-atributo-juez.html',
      controller:'controllerPropuestaConvocatoriaAtributoJuez'

    })

      .otherwise({
        redirectTo: '/'
      });
     

  }]);


  //TareasResource.objeto.query({Usuario: $scope.usuario, Contrasena: $scope.clave})