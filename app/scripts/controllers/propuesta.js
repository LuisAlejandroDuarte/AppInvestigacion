'use strict';
 angular.module('listaTareasApp')
.directive('myModalpropuesta', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString();  
                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_prop" +
                                " WHERE PRO_CODI = " + Codigo, $scope.formData)
                        .success(function(data) {  

                        $('#tablepropuesta').bootstrapTable('remove', {
                                field: 'PRO_CODI',
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
                 '<h4> Desea Borrar la propuesta? </h4> ' +
                  '<div><label id="nombrepropuesta"></label>' +
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




.directive('initTablapropuesta', ['$compile', function($compile) {
        return {
            restrict: 'A',

 			link: function(scope, el, attrs) {
            		var opts = scope.$eval(attrs.initTablapropuesta);   
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




 .controller('ControladorPropuesta', ['$scope','$window', function($scope,$window) {
         $scope.options = {           
            method: 'post',
            url: 'scripts/services/api.php?url=executeSQL/S/SELECT P.PRO_CODI,P.PRO_NOMB,C.CON_DESC,P.PRO_TEXT,P.PRO_CART_AVAL  ' + 
                    ' FROM sgi_prop AS P INNER JOIN sgi_conv AS C ON C.CON_CODI=P.PRO_CONV_CODI ',
          
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
                idField:'PRO_CODI',
                toolbar: '#custom-toolbarpropuesta',
            columns: [{
                field: 'PRO_NOMB',
                title: 'Propuesta',
                align: 'left',
                valign: 'middle',
                width: 100,
                sortable: true
            }, {
                field: 'CON_DESC',
                title: 'Convocatoria',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{
                field: 'PRO_TEXT',
                title: 'Texto',
                align: 'left',
                valign: 'middle',
                width: 40,                
                 formatter: function(value, row, index) {
                    if (value!="undefined" )
                    {
                        return '<a class="ver ml10 btn btn-default btn-xs" title="Ver Documento"><span class="glyphicon glyphicon-eye-open"></span></a>';
                    }
                   
                 },
                 events:  window.operateEvents = {
                    'click  .ver':function (e, value, row, index) {
                                 $window.open(row.PRO_TEXT);  
                             }
                         }
            },{
                field: 'PRO_CART_AVAL',
                title: 'CARTA',
                align: 'left',
                valign: 'middle',
                width: 40,                
                 formatter: function(value, row, index) {
                    if (value!="undefined")
                    {
                        return '<a class="ver ml10 btn btn-default btn-xs" title="Ver Documento"><span class="glyphicon glyphicon-eye-open"></span></a>';
                    }
                   
                 },
                 events:  window.operateEvents = {
                    'click  .ver':function (e, value, row, index) {
                                 $window.open(row.PRO_CART_AVAL);  
                             }
                         }
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
                                $('#nombrepropuesta').text(row.PRO_NOMB);
                                  $('#myModal').data('id', row.PRO_CODI).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-propuesta/" + row.PRO_CODI + "";                           
                        }

                }



            }]
        };

    }])

	.controller('ListControllerpropuesta', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-propuesta/0";
        };            
    }]);
