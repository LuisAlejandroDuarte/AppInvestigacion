'use strict';
 angular.module('listaTareasApp')
.directive('myModalarea', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString();  
                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM SGI_AREA" +
                                " WHERE ARE_CODI = " + Codigo, $scope.formData)
                        .success(function(data) {  

                        $('#tablearea').bootstrapTable('remove', {
                                field: 'ARE_CODI',
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
                 '<h4> Desea Borrar el área? </h4> ' +
                  '<div><label id="nombreArea"></label>' +
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




.directive('initTablaarea', ['$compile', function($compile) {
        return {
            restrict: 'A',

 			link: function(scope, el, attrs) {
            		var opts = scope.$eval(attrs.initTablaarea);   
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




 .controller('ControladorArea', ['$scope','$window', function($scope,$window) {
         $scope.options = {           
            method: 'post',
            url: 'scripts/services/api.php?url=executeSQL/S/SELECT A.ARE_CODI,A.ARE_NOMB,GA.GAR_NOMB ' + 
                    ' FROM SGI_AREA AS A INNER JOIN SGI_GRAN_AREA AS GA ON ' +
                    ' GA.GAR_CODI = A.ARE_GRAN_AREA_CODI',            
          
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
                idField:'ARE_CODI',
                toolbar: '#custom-toolbararea',
            columns: [{
                field: 'ARE_CODI',
                title: 'Código',
                align: 'left',
                valign: 'middle',
                width: 100,
                sortable: true
            }, {
                field: 'ARE_NOMB',
                title: 'ÁREA',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'GAR_NOMB',
                title: 'GRAN ÁREA',
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
                                $('#nombreArea').text(row.ARE_NOMB);
                                  $('#myModal').data('id', row.ARE_CODI).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-area/" + row.ARE_CODI + "";                           
                        }

                }



            }]
        };

    }])

	.controller('ListControllerArea', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-area/0";
        };            
    }]);

