'use strict';
 angular.module('listaTareasApp')
.directive('myModalcentro', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString();  
                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM SGI_CENT" +
                                " WHERE CEN_CODI = " + Codigo, $scope.formData)
                        .success(function(data) {  

                        $('#tablecentro').bootstrapTable('remove', {
                                field: 'CEN_CODI',
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
                 '<h4> Desea Borrar el centro? </h4> ' +
                  '<div><label id="nombreCentro"></label>' +
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




.directive('initTablacentro', ['$compile', function($compile) {
        return {
            restrict: 'A',

 			link: function(scope, el, attrs) {
            		var opts = scope.$eval(attrs.initTablacentro);   
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




 .controller('ControladorCentro', ['$scope','$window', function($scope,$window) {
         $scope.options = {           
            method: 'get',
            url: 'scripts/services/api.php?url=executeSQL/S/SELECT C.CEN_CODI,C.CEN_NOMB,Z.ZON_NOMB ' + 
            		' FROM SGI_CENT AS C INNER JOIN SGI_ZONA AS Z ON ' +
					' Z.ZON_CODI = C.CEN_ZONA_CODI',            
          
 				cache: false,
                height: 500,
                striped: true,
                pagination: true,                
                pagelist: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,
                clickToSelect: true,
                idField:'CEN_CODI',
                toolbar: '#custom-toolbarcentro',
            columns: [{
                field: 'CEN_CODI',
                title: 'Código',
                align: 'left',
                valign: 'middle',
                width: 100,
                sortable: true
            }, {
                field: 'CEN_NOMB',
                title: 'CENTRO',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'ZON_NOMB',
                title: 'ZONA',
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
                                $('#nombreCentro').text(row.CEN_NOMB);
                                  $('#myModal').data('id', row.CEN_CODI).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-centro/" + row.CEN_CODI + "";                           
                        }

                }



            }]
        };

    }])

	.controller('ListControllerCentro', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-centro/0";
        };            
    }]);

