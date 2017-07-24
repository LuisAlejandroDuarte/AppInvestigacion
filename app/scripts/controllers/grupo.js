'use strict';

 angular.module('listaTareasApp')

.directive('myModalgrupo', function() {

       return {

        restrict : 'AE',    

        controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {

            $scope.afirmaEliminar = function() {

                    var Codigo = $('#myModal').data('id').toString(); 

                    var user = JSON.parse($window.sessionStorage.getItem('investigador'));

                    var Execute = {

                        Accion:'S',

                        SQL:'SELECT Count(IGR_GRUP_CODI) As Count FROM sgi_inve_grup WHERE IGR_GRUP_CODI=' + Codigo + ' AND IGR_FECH_TERM is null AND IGR_INVE_IDEN<>' + user.INV_CODI



                    }



                      var result= TareasResource.SQL(Execute)

                       .then(function(result2){



                              if (result2.data[0].Count>0)

                                {

                                  $window.alert("Debe primero eliminar los investigadores relacionados al grupo");

                                    $('#myModal').data('id', 0).modal('hide'); 

                                  return;

                                }

                                else

                                {

                                    Execute = {

                                     Accion:'S',

                                     SQL:'SELECT Count(gli_codi) As Count FROM sgi_grup_line_inve WHERE gli_grup_codi=' + Codigo + ' AND  gli_fech_term is null'

                                    }



                                    result= TareasResource.SQL(Execute)

                                        .then(function(result2){



                                               if (result2.data[0].Count>0)

                                                {

                                                  $window.alert("Debe primero eliminar las líneas de investigación relacionados al grupo");

                                                  $('#myModal').data('id', 0).modal('hide'); 

                                                  return;

                                                }

                                                else

                                                {





                                                        Execute = {

                                                         Accion:'S',

                                                         SQL:'SELECT Count(sgr_codi) As Count FROM sgi_grup_semi WHERE sgr_grup_codi=' + Codigo + ' AND  sgr_fech_term is null'

                                                        }





                                                          result= TareasResource.SQL(Execute)

                                                            .then(function(result2){



                                                                  if (result2.data[0].Count>0)

                                                                        {

                                                                          $window.alert("Debe primero eliminar los semilleros relacionados al grupo");

                                                                         $('#myModal').data('id', 0).modal('hide'); 

                                                                          return;

                                                                        }

                                                                        else

                                                                        {



                                                                             Execute = {

                                                                                Accion:'S',

                                                                                SQL:'SELECT Count(id_proy) As Count FROM sgi_grup_proy WHERE id_grup=' + Codigo + ' AND fech_term is null'

                                                                                }

                                                                                   result= TareasResource.SQL(Execute)

                                                                                    .then(function(result2){

                                                                                       if (result2.data[0].Count>0)

                                                                                        {

                                                                                          $window.alert("Debe primero eliminar los producción  relacionados al grupo");

                                                                                         $('#myModal').data('id', 0).modal('hide'); 

                                                                                          return;

                                                                                        }

                                                                                        else

                                                                                        {

                                                                                              Execute = {

                                                                                                Accion:'S',

                                                                                                SQL:'SELECT Count(  pgr_plnt_codi) As Count FROM sgi_plnt_grup WHERE pgr_grup_codi=' + Codigo + ' AND pgr_fech_term is null'

                                                                                                }



                                                                                                  result= TareasResource.SQL(Execute)

                                                                                                         .then(function(result2){



                                                                                                              if (result2.data[0].Count>0)

                                                                                                                {

                                                                                                                  $window.alert("Debe primero eliminar los plan trabajo grupo relacionados al grupo");

                                                                                                                 $('#myModal').data('id', 0).modal('hide'); 

                                                                                                                  return;

                                                                                                                }

                                                                                                                else

                                                                                                                {

                                                                                                                     $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_grup" +

                                                                                                                            " WHERE gru_codi = " + Codigo, $scope.formData)

                                                                                                                    .success(function(data) {  



                                                                                                                    var multiple =[];

                                                                                                                        multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_inve_grup WHERE IGR_GRUP_CODI=' + Codigo });  

                                                                                                                        multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_grup_line_inve WHERE gli_grup_codi=' + Codigo  }); 

                                                                                                                        multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_grup_semi WHERE sgr_grup_codi=' + Codigo  }); 

                                                                                                                        multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_plnt_grup WHERE pgr_grup_codi=' + Codigo  }); 

                                                                                                                        multiple.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_grup_proy WHERE id_grup=' + Codigo  }); 

                                                                                                                     TareasResource.SQLMulti(multiple).then(function(result) {    

                                                                                                                            

                                                                                                                                $('#tablegrupo').bootstrapTable('remove', {

                                                                                                                                        field: 'gru_codi',

                                                                                                                                        values: Codigo

                                                                                                                                });                                                                                                                                                                         



                                                                                                                                $('#myModal').modal('hide');

                                                                                                                             });

                                                                                                                   

                                                                                                                     })

                                                                                                                    .error(function(data) {

                                                                                                                        $('#myModal').modal('hide');

                                                                                                                        alert(data['msg']);                        

                                                                                                                    });  

                                                                                                                                                    }



                                                                                                         });

                                                                                        }

                                                                                    });

                                                                             

                                                                        }



                                                            });

                                                }



                                        });

                                }

                       });

                                    

                };

               

            }],



        template : '<div class="modal fade" id="myModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 

                    '<div class="modal-dialog">' +

        '<div class="modal-content">' +

            '<div class="modal-header">' +

                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +

                 '<h3 class="modal-title" id="myModalLabel">Advertencia!</h3> ' +

            '</div>' +

            '<div class="modal-body"> ' +

                 '<h4> Desea Borrar el grupo? </h4> ' +

                  '<div><label id="nombreGrupo"></label>' +

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





 .controller('ControladorGrupo', ['$scope','$window','$cookieStore','$location', function($scope,$window,$cookieStore,$location) {



    var user = JSON.parse($window.sessionStorage.getItem('investigador'));

    moment.locale('es');

    if (user==null || user==undefined)

    {



      $location.path('/menu');

      return;

      }

   



         $scope.options = {           

            method: 'post',

            url: 'scripts/services/api.php?url=executeSQL/S/SELECT IG.igr_grup_codi,G.gru_nomb AS Grupo,G.gru_codi,G.gru_aval_inst,' + 

            ' G.gru_fech_ini AS Fecha,CONCAT(I.inv_nomb," ",I.inv_apel) As Investigador ' + 

            ' FROM sgi_inve_grup AS IG  INNER JOIN sgi_grup AS G ON G.gru_codi = IG.igr_grup_codi ' + 

            ' INNER JOIN sgi_inve As I ON I.inv_codi = IG.igr_inve_iden WHERE IG.igr_tipo_vinc_codi=1 AND IG.igr_inve_iden=' + user.INV_CODI,

          

                cache: false,

                height: 500,

                striped: true,

                pagination: true,                

                pageList: [10, 25, 50, 100, 200],

                search: true,
                showExport:true,
                showColumns: true,

                showRefresh: true,

                minimumCountColumns: 2,

                clickToSelect: true,

                idField:'gru_codi',

                toolbar: '#toolbargrupo',

            columns: [{               

                field: 'Grupo',

                title: 'GRUPO',

                align: 'left',

                valign: 'middle',

                sortable: true

            }, {

                field: 'Fecha',

                title: 'FECHA DE CREACIÓN',

                align: 'left',

                valign: 'middle',

                sortable: true,

                 formatter: function(value, row, index) {



                    return moment(value).format("DD MMMM YYYY");

                 }



            }, {

                field: 'Investigador',

                title: 'Director',

                align: 'left',

                valign: 'middle',

                sortable: true

            } , {

                field: 'gru_aval_inst',

                title: 'Avalado',

                align: 'left',

                valign: 'middle',

                sortable: true,

                 formatter: function(value, row, index) {



                    return (value==0)? 'NO':'SI';

                 }

            } ,{

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

                                  $('#myModal').data('id', row.gru_codi).modal('show');                                

                        },



                        'click .edit': function (e, value, row, index) {

                                 $window.location.href ="#/edit-grupo/" + row.gru_codi + "";                           

                        }



                }







            }]

        };





     $scope.onClicSalir = function()

    {

        $window.sessionStorage.setItem('tipoUsuario',null);

        $window.sessionStorage.setItem('usuario',null);

        $window.location.href = "#/menu/";

    }



    }])







.directive('initTablagrupo', ['$compile', function($compile) {

        return {

            restrict: 'A',



            link: function(scope, el, attrs) {

                    var opts = scope.$eval(attrs.initTablagrupo);   

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









.controller('ListControllerGrupo', ['$window','$scope', function($window,$scope) {

  

        this.btnNovoClick = function() {

            $window.location.href = "#/edit-grupo/0";

        };            

    }]);

