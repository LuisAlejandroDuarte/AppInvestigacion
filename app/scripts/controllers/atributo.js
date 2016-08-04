'use strict';
 angular.module('listaTareasApp')
.directive('myModalatributo', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo =parseInt($('#myModal').data('id').toString());  
                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_atrib" +
                                " WHERE ATR_CODI = " + Codigo, $scope.formData)
                        .success(function(data) {  

                        $('#tableatributo').bootstrapTable('remove', {
                                field: 'ATR_CODI',
                                values: Codigo
                        });     

                         $('#tableatributo').bootstrapTable('refresh');     

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
                 '<h4> Desea Borrar el atributo? </h4> ' +
                  '<div><label id="nombreAtributo"></label>' +
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




.directive('initTablaatributo', ['$compile', function($compile) {
        return {
            restrict: 'A',

 			link: function(scope, el, attrs) {
            		var opts = scope.$eval(attrs.initTablaatributo);   
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




 .controller('Controladoratributo', ['$scope','$window','TareasResource', function($scope,$window,TareasResource) {
         $scope.options = {           
            method: 'post',
            url: 'scripts/services/api.php?url=executeSQL/S/',            
          
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
                idField:'ATR_CODI',
                toolbar: '#custom-toolbaratributo',
            columns: [

            {
                field: 'ATR_DESC',
                title: 'Descripción',
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
                                $('#nombreAtributo').text(row.ATR_DESC);
                                  $('#myModal').data('id', row.ATR_CODI).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-atributo/" + row.ATR_CODI + "";                           
                        }

                }



            }]
        };

      var dat ={
            Accion:'S',
            SQL:'SELECT ATR_CODI,ATR_DESC FROM sgi_atrib'
        }

        var datos = TareasResource.SQL(dat);
            datos.then(function(result){
                $('#tableatributo').bootstrapTable('load',result.data);
            });

        //$('#tableatributo').bootstrapTable('load','scripts/services/api.php?url=executeSQL/S/SELECT ATR_CODI,ATR_DESC FROM sgi_atrib');    

    }])

	.controller('ListControlleratributo', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-atributo/0";
        };            
    }]);

