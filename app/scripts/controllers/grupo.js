'use strict';
 angular.module('listaTareasApp')
.directive('myModalgrupo', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString();  
                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_grup" +
                                " WHERE gru_codi = " + Codigo, $scope.formData)
                        .success(function(data) {  

                        $('#tablegrupo').bootstrapTable('remove', {
                                field: 'gru_codi',
                                values: Codigo
                        });            
                        $('#myModal').modal('hide');
                       
                    })
                        .error(function(data) {
                            $('#myModal').modal('hide');
                            alert(data['msg']);                        
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

    if (user==null || user==undefined)
    {

      $location.path('/menu');
      return;
      }
   

         $scope.options = {           
            method: 'post',
            url: 'scripts/services/api.php?url=executeSQL/S/SELECT IG.igr_grup_codi,G.gru_nomb AS Grupo,G.gru_codi,' + 
            ' IG.igr_fech_inic AS Fecha,CONCAT(I.inv_nomb," ",I.inv_apel) As Investigador ' + 
            ' FROM sgi_inve_grup AS IG  INNER JOIN sgi_grup AS G ON G.gru_codi = IG.igr_grup_codi ' + 
            ' INNER JOIN sgi_inve As I ON I.inv_codi = IG.igr_inve_iden WHERE IG.igr_tipo_vinc_codi=1 AND IG.igr_inve_iden=' + user.INV_CODI,
          
                cache: false,
                height: 500,
                striped: true,
                pagination: true,                
                pageList: [10, 25, 50, 100, 200],
                search: true,
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
                title: 'FECHA',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'Investigador',
                title: 'Director',
                align: 'left',
                valign: 'middle',
                sortable: true
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
