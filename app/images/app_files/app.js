'use strict';

//var listaTareasApp = {};
//var app = angular.module('listaTareasApp ', ['app.services']);
//var services = angular.module('app.services', ['ngRoute', 'ngAnimate', 'ngResource', 'ngAnimate', 'ngCookies','ui.bootstrap']);

angular.module("listaTareasApp", ['ngRoute', 'ngAnimate', 'ngResource', 'ngAnimate', 'ngCookies','ui.bootstrap','mgcrea.ngStrap','base64'])

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

        if(next.templateUrl == 'views/inicio.html'  ) {
          $location.path('/main');          
        }
        else
        {
        // if(next.templateUrl == 'views/edit-granarea.html') {
        //   $location.path('/edit-granarea/:idGranA');
        // }
      }
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

       .when('/edit-investigador/:idInvestigador', {
        title: 'Editar Investigador',
        templateUrl: 'views/edit-investigador.html',
        controller: 'editInvestigador',
         resolve: {
          datosInvestigador: function($route,TareasResource){
            var investigadorID = parseInt($route.current.params.idInvestigador);
            var dat = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT  INV.INV_IDEN,INV.INV_TIPO_DOCU_CODI,INV.INV_NOMB,INV.INV_APEL, " +
                          " date_add(INV.INV_FECH_NACI,INTERVAL 1 DAY) AS INV_FECH_NACI,INV.INV_MAIL,INV.INV_CENT_CODI,INV.INV_PROG_ACAD_CODI, " +
                          " INV.INV_TELE_CELU,INV.inv_foto, ZONA.ZON_NOMB ,ESCUELA.ESC_NOMB FROM sgi_inve AS INV INNER JOIN sgi_cent AS CENTRO ON " + 
                          " CENTRO.CEN_CODI = INV.INV_CENT_CODI INNER JOIN sgi_prog_acad AS PROGRAMA ON " + 
                          " PROGRAMA.PAC_CODI = INV.INV_PROG_ACAD_CODI INNER JOIN sgi_zona AS ZONA ON ZONA.ZON_CODI = CENTRO.CEN_ZONA_CODI " + 
                          " INNER JOIN sgi_escu AS ESCUELA ON ESCUELA.ESC_CODI = PROGRAMA.PAC_ESCU_CODI " +
                          " WHERE INV.INV_CODI ='" + investigadorID + "'" });                           
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


      .otherwise({
        redirectTo: '/'
      });
     

  }]);


  //TareasResource.objeto.query({Usuario: $scope.usuario, Contrasena: $scope.clave})