'use strict';
 angular.module('listaTareasApp')
.directive('myModalinvestigador', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {
            $scope.afirmaEliminar = function() {
                      var Codigo =parseInt($('#myModal').data('id')); 

            var r = TareasResource.validaExisteRegistro.query({Tabla: 'sgi_proy_inve',Campo:'id_inve',Valor:Codigo});
                        

             r.$promise.then(function(result2){
                if (result2[0].existe=="true")
                {
                    alert("El investigador Tiene Proyectos Relacionados, no se puede eliminar");
                    $('#myModal').modal('hide');
                    return;    
                }    
                else
                {
                    r = TareasResource.validaExisteRegistro.query({Tabla: 'sgi_nive_inve',Campo:'nin_inv_codi',Valor:Codigo});    
                    r.$promise.then(function(result2){
                         if (result2[0].existe=="true")
                              {
                                alert("El investigador Tiene Información Académica, no se puede eliminar");
                                $('#myModal').modal('hide');
                                return;    
                              }    
                              else
                              {
                                  r = TareasResource.validaExisteRegistro.query({Tabla: 'sgi_grup_line_inve',Campo:'gli_line_inve_codi',Valor:Codigo});
                                  r.$promise.then(function(result2){

                                     if (result2[0].existe=="true")
                                     {
                                         alert("El investigador Pertenece a un grupo linea de Investigación, no se puede eliminar");
                                         $('#myModal').modal('hide');
                                         return;  
                                     }
                                     else
                                     {
                                        r = TareasResource.validaExisteRegistro.query({Tabla: 'sgi_inve_grup',Campo:'igr_inve_iden',Valor:Codigo});
                                        r.$promise.then(function(result2){
                                            if (result2[0].existe=="true")
                                              {
                                                 alert("El investigador Pertenece a un grupo de Investigación, no se puede eliminar");
                                                 $('#myModal').modal('hide');
                                                 return;  
                                             }
                                             else
                                             {
                                                 r = TareasResource.validaExisteRegistro.query({Tabla: 'sgi_inve_semi',Campo:'ins_inve_iden',Valor:Codigo});
                                                 r.$promise.then(function(result2){
                                                    if (result2[0].existe=="true")
                                                        {
                                                            alert("El investigador Pertenece a un Semillero de Investigación, no se puede eliminar");
                                                            $('#myModal').modal('hide');
                                                            return;  
                                                        }
                                                        else
                                                        {
                                                             r = TareasResource.validaExisteRegistro.query({Tabla: 'sgi_line_inve_semi',Campo:'lis_line_inve_codi',Valor:Codigo});
                                                             r.$promise.then(function(result2){
                                                                if (result2[0].existe=="true")
                                                                    {
                                                                        alert("El investigador Pertenece a una línea de Investigación, no se puede eliminar");
                                                                        $('#myModal').modal('hide');
                                                                        return;  
                                                                    }
                                                                    else
                                                                    {
                                                         $http.post("scripts/services/api.php?url=executeSQL/S/SELECT FROM sgi_proy_inve" +
                                " WHERE id_inve = " + Codigo + "" , $scope.formData)
                        .success(function(resul) {  

                    

                     $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_inve" +
                                " WHERE inv_codi = " + Codigo + "" , $scope.formData)
                        .success(function(data) {  

                            $('#tableinvestigador').bootstrapTable('remove', {
                                    field: 'inv_codi',
                                    values: Codigo
                            });          

                         $('#tableinvestigador').bootstrapTable('refresh', {
                            silent:true
                             //url: 'scripts/services/api.php?url=executeSQL/S/SELECT inv_codi,inv_iden,inv_nomb,inv_apel FROM sgi_inve'
                         });

                        $('#myModal').modal('hide');
                       
                    })
                        .error(function(data) {
                            $('#myModal').modal('hide');
                            alert(data['msg']);                        
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
            url: 'scripts/services/api.php?url=executeSQL/S/SELECT inv_codi,inv_iden,inv_nomb,inv_apel FROM sgi_inve',            
          
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
                field: 'inv_codi',
                title: 'Código',
                align: 'left',
                valign: 'middle',
                width: 100,
                visible:false,
                switchable:false
            },  {
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
                                $('#nombreInvestigador').text(row.inv_nomb);
                                  $('#myModal').data('id', row.inv_codi).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-investigador/" + row.inv_codi + "";                           
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

