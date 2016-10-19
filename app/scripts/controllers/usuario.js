'use strict';
 angular.module('listaTareasApp')

.controller('ControladorUsuario', ['$scope','$window','$cookieStore','$location','TareasResource', function($scope,$window,$cookieStore,$location,TareasResource) {

    var user = JSON.parse($window.sessionStorage.getItem('usuario'));

    if (user==null || user==undefined)
    {
      $location.path('/inicio');
      return;
     }
    
    if ($window.sessionStorage.getItem('tipoUsuario')!=0)
    {
      $location.path('/inicio');
      return;
    }


         $scope.options = {           
                method: 'post',                     
                cache: false,
                height: 300,
                striped: true,
                pagination: true,                
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,
                clickToSelect: true,
                idField:'USE_CODI',
                toolbar: '#custom-toolbarusuario',
            columns: [{
                field: 'USE_IDEN',
                title: 'Identificación',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{               
                field: 'USE_NOMB',
                title: 'Nombre',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{               
                field: 'TIPO',
                title: 'TIPO',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{               
                field: 'USE_APEL',
                title: 'Apellido',
                align: 'left',
                valign: 'middle',
                sortable: true
            },  {
                field: 'USE_EMAI',
                title: 'Correo',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{
                field: 'USE_USUA',
                title: 'Usuario',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{
                title: '',
                width: 75,
                switchable:false,
                formatter: function(value, row, index) {

                       return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp; ' +
                    '<a class="remove ml10 btn btn-default btn-xs" title="Eliminar" ><span class="glyphicon glyphicon-trash"></span></a>';

                },
                events:  $window.operateEvents = {
                        'click .remove': function (e, value, row, index) {
                                $('#nombreGrupo').text(row.Grupo);
                                  $('#myModal').data('id', row.USE_CODI).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-usuario/" + row.USE_CODI + "";                           
                        }

                }



            }]
        };

        var datos ={
            Accion:"S",
            SQL:'SELECT USE_CODI,USE_IDEN,USE_TELE,USE_COD_TIPO, USE_NOMB,USE_APEL,USE_EMAI,USE_USUA, CASE WHEN USE_COD_TIPO="0" THEN "Administrador" ' +
                         ' ELSE "Investigador" END AS TIPO from sgi_user WHERE USE_CODI'
        }

        var usuarios = TareasResource.SQL(datos); 
            usuarios.then(function(result){
                $('#tableusuario').bootstrapTable('load',result.data);                
            });

        $scope.onClicSalir = function()
        {
            $window.sessionStorage.setItem('tipoUsuario',null);
            $window.sessionStorage.setItem('usuario',null);
            $window.location.href = "#/menu/";
        }

    }])



.directive('initTablausuario', ['$compile', function($compile) {
        return {
            restrict: 'A',

            link: function(scope, el, attrs) {
                    var opts = scope.$eval(attrs.initTablausuario);   
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


.controller('ListControllerUsuario', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-usuario/0";
        };            
    }]);
