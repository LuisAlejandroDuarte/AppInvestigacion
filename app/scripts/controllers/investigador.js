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









 .controller('ControladorInvestigador', ['$scope','$window','TareasResource', function($scope,$window,TareasResource) {

        moment.locale('es');

         $scope.options = {           
           
          

       			    cache: false,

                height: 300,

                striped: true,

                pagination: true,

                pageList: [10, 25, 50, 100, 200],

                search: true,

                showColumns: true,

                showRefresh: true,
                 showExport:true,
                minimumCountColumns: 2,                            
                toolbar: '#toolbar',
               

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



                       return '<img src="images/pdf.png" alt="pdf" class="pdf" style="width:30px;height:30px;cursor:pointer">';



                },

                events:  window.operateEvents = {

                        'click .pdf': function (e, value, row, index) {

                               row.inv_fech_naci = moment(row.inv_fech_naci).format("DD MMMM YYYY");        
                              var select={
                                Accion:"S",
                                SQL:"SELECT NI.nin_titu_obte,NI.nin_inst,NI.nin_agno,NF.niv_nomb FROM sgi_nive_inve AS NI INNER JOIN sgi_nive_form AS NF ON  " +
                                  " NF.niv_codi=NI.nin_niv_codi WHERE NI.nin_inv_codi=" + row.inv_codi
                                };

                                var nivelformacion = TareasResource.SQL(select);
                                  nivelformacion.then(function(academica){

                                      select={
                                        Accion:"S",
                                        SQL:"SELECT G.gru_nomb,IG.igr_fech_inic,IG.igr_fech_term FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG  ON  " +
                                          " IG.igr_grup_codi=G.gru_codi WHERE IG.igr_inve_iden=" + row.inv_codi
                                        };


                                       var grupo = TareasResource.SQL(select);  

                                          grupo.then(function(grupos){
                                            
                                            if (grupos.data[0]!=null)                            
                                            angular.forEach(grupos.data,function(fila,value){
                                                  if (fila.igr_fech_inic==null) 
                                                    fila.igr_fech_inic="";
                                                  else                                                    
                                                    fila.igr_fech_inic = moment(fila.igr_fech_inic).format("DD MMMM YYYY");        

                                                  if (fila.igr_fech_term==null) 
                                                     fila.igr_fech_term ="";
                                                  else
                                                    fila.igr_fech_term = moment(fila.igr_fech_term).format("DD MMMM YYYY");        
                                            });



                                             select={
                                              Accion:"S",
                                              SQL:"SELECT distinct P.pro_nomb,P.pro_fina FROM sgi_prod_proy AS PP INNER JOIN sgi_proy AS P  ON  " +
                                                " P.pro_codi=PP.Id_proy WHERE PP.id_inve=" + row.inv_codi
                                              };


                                               var proyecto = TareasResource.SQL(select);  

                                                proyecto.then(function(pro){



                                                     select={
                                                      Accion:"S",
                                                      SQL:"SELECT P.Nombre FROM sgi_prod_proy AS PP INNER JOIN sgi_prod AS P  ON  " +
                                                        " P.id=PP.Id_prod WHERE PP.id_inve=" + row.inv_codi
                                                      };

                                                        var producto = TareasResource.SQL(select);  

                                                         producto.then(function(produ){

                                                             select={
                                                              Accion:"S",
                                                              SQL:"SELECT S.sem_nomb,SI.ins_fech_inic,SI.ins_fech_term FROM sgi_semi AS S INNER JOIN sgi_inve_semi AS SI  ON  " +
                                                                " SI.ins_semi_codi=S.sem_codi WHERE SI.ins_inve_iden=" + row.inv_codi
                                                              };
                                                               var semillero = TareasResource.SQL(select);  
                                                               semillero.then(function(semi){
                                                                if (semi.data[0]!=null)                            
                                                                    angular.forEach(semi.data,function(fila,value){
                                                                        if (fila.ins_fech_inic==null) 
                                                                            fila.ins_fech_inic="";
                                                                        else                                                    
                                                                            fila.ins_fech_inic = moment(fila.ins_fech_inic).format("DD MMMM YYYY");        

                                                                        if (fila.ins_fech_term==null) 
                                                                            fila.ins_fech_term ="";
                                                                        else
                                                                            fila.ins_fech_term = moment(fila.ins_fech_term).format("DD MMMM YYYY");        
                                                                    });

                                                                  var investigador = {
                                                                    datos: row,
                                                                    formacion:academica.data,
                                                                    grupo:grupos.data,
                                                                    semillero:semi.data,
                                                                    proyecto:pro.data,
                                                                    producto:produ.data                                                                    
                                                                };
                                                            
                                                                var datos = TareasResource.PDF(JSON.stringify(investigador));
                                                                  datos.then(function(result){
                                                                       var file = new Blob([result.data], { type: 'application/pdf;charset=utf-8' });
                                                                        saveAs(file, row.inv_nomb + 'investigador.pdf');
                                                                   
                                                                  // $window.open('investigador.pdf','_blank','');
                                                                  });            
                                                               });                                                            
                                                         });

                                                });
                                                                                    
                                       });
                                   
                                  });                                        
                        },                      
                }

            }]

        };


        var parametros = {
          Accion:"S",
          SQL:'SELECT i.inv_codi,i.inv_iden,i.inv_nomb,i.inv_apel,i.inv_fech_naci,p.pac_nomb FROM sgi_inve as i ' + 
            ' inner join sgi_prog_acad as p on p.pac_codi=i.inv_prog_acad_codi'
        }

        var select = TareasResource.SQL(parametros);

          select.then(function(result){

            $('#tableinvestigador').bootstrapTable('load',result.data);


          });
    }])



	.controller('ListControllerInvestigador', ['$window','$scope', function($window,$scope) {

  

        this.onClicSalir = function() {

            $window.location.href = "#/menuReporte";

        };            

    }]);



