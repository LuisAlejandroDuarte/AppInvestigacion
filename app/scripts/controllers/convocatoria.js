'use strict';
 angular.module('listaTareasApp')
.directive('myModalconvocatoria', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString();                       
                     
                       var result= TareasResource.validaExisteRegistro.query({Tabla:"sgi_conv_para",Campo:"PCO_CONV_CODI",Valor:Codigo});
                       result.$promise.then(function(result2){

                         if (result2[0].existe=="false")
                           {
                               result= TareasResource.validaExisteRegistro.query({Tabla:"sgi_prop_conv_atri",Campo:"PCAT_CONV_CODI",Valor:Codigo});
                             result.$promise.then(function(result2){

                               if (result2[0].existe=="false")
                               {

                                 $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_conv" +
                                      " WHERE CON_CODI = " + Codigo, $scope.formData)
                                      .success(function(data) {  
                                      $('#tableconvocatoria').bootstrapTable('remove', {
                                          field: 'CON_CODI',
                                          values: Codigo
                                      });         
                                          $('#tableconvocatoria').bootstrapTable('refresh');   
                                          $('#myModal').modal('hide');                       
                                      })
                                 .error(function(data) {
                                  $('#myModal').modal('hide');
                                  alert(data['msg']);                        
                                  });  
                               }
                               else
                               {
                                   alert("No se puede eliminar existe el registro en la tabla propuesta Convocatoria Atributo");  
                               }
                             });
                           }
                            else
                           {
                               alert("No se puede eliminar existen parámetros asociados a la  convocatoria");  
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
                 '<h4> Desea Borrar la Convocatoria? </h4> ' +
                  '<div><label id="nombreConvocatoria"></label>' +
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




.directive('initTablaconvocatoria', ['$compile', function($compile) {
        return {
            restrict: 'A',

 			link: function(scope, el, attrs) {
            		var opts = scope.$eval(attrs.initTablaconvocatoria);   
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




 .controller('ControladorConvocatoria', ['$scope','$window','TareasResource','$location', function($scope,$window,TareasResource,$location) {

    var user = JSON.parse($window.sessionStorage.getItem('usuario'));
      var admin = JSON.parse($window.sessionStorage.getItem('usuario'));
    if (user==null || user==undefined)
    {

       if (admin.Usuario!="admin")
       {

        $location.path('/menu');
         return;
      }
      else
      {
        $scope.btnNuevo=false;
      }    
     
    }   
    else
    {  
        $scope.btnNuevo=true;
         $scope.$parent.mnuConvocatoria = true;                          
     }

             moment.locale('es');
         $scope.options = {                           
 				cache: false,
                height: 500,
                striped: true,
                pagination: true,                
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                showExport:true,
                minimumCountColumns: 2,
                clickToSelect: true,
                idField:'CON_CODI',
                toolbar: '#custom-toolbarconvocatoria',
            columns: [{
                field: 'CON_NUME',
                title: 'Número',
                align: 'left',
                valign: 'middle',
                width: 100,
                sortable: true
            },{
                field: 'CON_CODI',
                title: '',
                visible: false,                
                switchable:false                
            }, {
                field: 'CON_DESC',
                title: 'NOMBRE',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'CON_FECH_INIC',
                title: 'FECHA INICIO',
                align: 'left',
                valign: 'middle',
                sortable: true,
                formatter:function(value,row,index) {                                            

                       return moment(value).format('MMMM D YYYY').charAt(0).toUpperCase() +  moment(value).format('MMMM D YYYY').slice(1) ;  

               }
            }, {
                field: 'CON_FECH_FINA',
                title: 'FECHA FINALIZA',
                align: 'left',
                valign: 'middle',
                sortable: true,
                formatter:function(value,row,index) {     

                       return moment(value).format('MMMM D YYYY').charAt(0).toUpperCase() +  moment(value).format('MMMM D YYYY').slice(1) ;  

               }
            },{
                field: 'CON_TEXT',
                title: 'Texto',
                align: 'left',
                valign: 'middle',
                width: 40,                
                 formatter: function(value, row, index) {
                     if (value!=null)
                                                 {
                                                    return '<a href="http://' + value + '" target=_blank class="ver ml10 btn btn-default btn-xs" title="Ver Documento"><span class="glyphicon glyphicon-download"></span></a>';
                                                }
                                                else
                                                    return "N/A";
                   
                  
                   
                 },
                 events:  window.operateEvents = {
                    'click  .ver':function (e, value, row, index) {                    
                                   // $window.open(value,'Download'); 
                                   // $window.focus();                                     
                             }
                         }
            },{
                field: 'CON_RESO',
                title: 'RESO',
                align: 'left',
                valign: 'middle',
                width: 40,                
                 formatter: function(value, row, index) {
                        if (value!=null)
                         {
                            return '<a  href="http://' + value + '" target=_blank  class="ver ml10 btn btn-default btn-xs" title="Ver Documento"><span class="glyphicon glyphicon-download"></span></a>';
                        }
                        else
                            return "N/A";

                  
                   
                 },
                 events:  window.operateEvents = {
                    'click  .ver':function (e, value, row, index) {

                            // $window.open(value,'Download');  
                            //  $window.focus();
                                  
                             }
                         }
            },{
                title: '',
                width: 100,
                switchable:false,
                formatter: function(value, row, index) {

                       return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp; ' +
                    '<a class="remove ml10 btn btn-default btn-xs" title="Eliminar" ><span class="glyphicon glyphicon-trash"></span></a>' + 
                    '<img src="images/pdf.png" alt="pdf" class="pdf" style="width:20px;height:20px;cursor:pointer">';

                },
                events:  window.operateEvents = {
                        'click .remove': function (e, value, row, index) {
                                $('#nombreConvocatoria').text(row.CON_DESC);
                                  $('#myModal').data('id', row.CON_CODI).modal('show');                                
                        },

                        'click .edit': function (e, value, row, index) {
                                 $window.location.href ="#/edit-convocatoria/" + row.CON_CODI + "";                           
                        },
                         'click .pdf': function (e, value, row, index) {

                             var datosconvocatoria = TareasResource.SQL(
                                 {
                                  Accion:"S",
                                  SQL:"SELECT C.con_nume,C.CON_DESC,TC.TCO_DESC FROM sgi_conv As C INNER JOIN " + 
                                 "sgi_tipo_conv AS TC ON C.con_tipo_conv_codi=TC.TCO_CODI"
                                 });
                             datosconvocatoria.then(function(result){

                                var convocatoria = {
                                    datos:result.data
                                }

                                var datos = TareasResource.PdfConvocatoria(JSON.stringify(convocatoria));
                                     datos.then(function(result){
                                     var file = new Blob([result.data], { type: 'application/pdf;charset=utf-8' });
                                     saveAs(file, row.CON_NUME + 'convocatoria.pdf');                                                                   
                                });         
                             });
                        }
                }
            }]
        };  


        var datos = {

            Accion:"S",
            SQL:"SELECT CON_CODI,CON_NUME,CON_DESC,CON_FECH_INIC,CON_FECH_FINA,CON_TEXT,CON_TEXT_NOMB,CON_RESO,CON_RESO_NOMB " + 
                    " FROM sgi_conv"

        }

        var convocatoria = TareasResource.SQL(datos);
            convocatoria.then(function(result){
                $('#tableconvocatoria').bootstrapTable('load',result.data);        
            })    

        $scope.onClicSalir = function()
        {
            $window.sessionStorage.setItem('tipoUsuario',null);
            $window.sessionStorage.setItem('usuario',null);
            $window.location.href = "#/menu/";
        }
               
    }])

	.controller('ListControllerConvocatoria', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-convocatoria/0";
        };            
    }]);

