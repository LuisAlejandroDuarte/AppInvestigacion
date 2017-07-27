'use strict';
 angular.module('listaTareasApp')
.directive('myModalinvestigador', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString();  
                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM SGI_INVE" +
                                " WHERE INV_IDEN = '" + Codigo + "'" , $scope.formData)
                        .success(function(data) {  

                        $('#tableinvestigador').bootstrapTable('remove', {
                                field: 'INV_IDEN',
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
                 '<h4> Desea Borrar el Investigador? </h4> ' +
                  '<div><label id="nombreInvestigador"></label>' +
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




.directive('initTablainvestigador', ['$compile', function($compile) {
        return {
            restrict: 'A',

 			link: function(scope, el, attrs) {
            		var opts = scope.$eval(attrs.initTablainvestigador);   
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




 .controller('ControladorInvestigador', ['$scope','$window', function($scope,$window) {
         $scope.options = {           
            method: 'post',
            url: 'scripts/services/api.php?url=executeSQL/S/SELECT inv_iden,inv_nomb,inv_apel FROM sgi_inve',            
          
 			    cache: false,
                height: 300,
                striped: true,
                pagination: true,
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,                            
               
            columns: [{
                field: 'inv_iden',
                title: 'IDENTIFICACIÓN',
                align: 'left',
                valign: 'middle',
                width: 100,
                sortable: true
            }, {
                field: 'inv_nomb',
                title: 'NOMBRES',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'inv_apel',
                title: 'APELLIDOS',
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
                events:  window.operateEvents = {
                        'click .remove': function (e, value, row, index) {
                                $('#nombreInvestigador').text(row.INV_NOMB);
                                  $('#myModal').data('id', row.INV_IDEN).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-investigador/" + row.INV_IDEN + "";                           
                        }

                }



            }]
        };

    }])

	.controller('ListControllerInvestigador', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-investigador/0";
        };            
    }]);

