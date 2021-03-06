'use strict';

 angular.module('listaTareasApp')



.directive('myModalDelete', function() {

       return {

        restrict : 'AE',    

        controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {

            $scope.afirmaEliminar = function() {

                      var Codigo = $('#myModalDeleteSemillero').data('id').toString();  





                    var Execute = {

                        Accion:'S',

                        SQL:'SELECT Count(LIS_CODI) As Count FROM sgi_line_inve_semi WHERE LIS_SEMI_CODI=' + Codigo 



                    }



                      var result = TareasResource.SQL(Execute);

                          result.then(function(result2) {



                                if (result2.data[0].Count>0)

                                {

                                  $window.alert("Debe primero eliminar las líneas de investigacion relacionadas al semillero");

                                    $('#myModalDeleteSemillero').data('id', 0).modal('hide'); 

                                  return;

                                }

                                else

                                {

                                     var Execute = {

                                        Accion:'S',

                                        SQL:'SELECT Count(INS_CODI) As Count FROM sgi_inve_semi WHERE INS_SEMI_CODI=' + Codigo 



                                    }





                                      result = TareasResource.SQL(Execute);

                                      result.then(function(result2) {



                                        if (result2.data[0].Count>0)

                                        {

                                          $window.alert("Debe primero eliminar los investigadores relacionadas al semillero");

                                            $('#myModalDeleteSemillero').data('id', 0).modal('hide'); 

                                          return;

                                        }

                                        else

                                        {



                                             Execute = {

                                                Accion:'S',

                                                SQL:'SELECT Count(PRODS_CODI) As Count FROM sgi_prod_semi WHERE PRODS_SEMI_CODI=' + Codigo 

                                             }



                                               result = TareasResource.SQL(Execute);

                                              result.then(function(result2) {



                                                if (result2.data[0].Count>0)

                                                {

                                                  $window.alert("Debe primero eliminar los investigadores relacionadas al semillero");

                                                    $('#myModalDeleteSemillero').data('id', 0).modal('hide'); 

                                                  return;

                                                }

                                                else

                                                {



                                                }

                                            });

                                       }

                                });

                              }



                          });  





                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_semi" +

                                " WHERE SEM_CODI = " + Codigo, $scope.formData)

                        .success(function(data) {  



                        $('#tablearea').bootstrapTable('remove', {

                                field: 'sem_codi',

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



        template : '<div class="modal fade" id="myModalDeleteSemillero"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 

                    '<div class="modal-dialog">' +

        '<div class="modal-content">' +

            '<div class="modal-header">' +

                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +

                 '<h3 class="modal-title" id="myModalLabel">Advertencia!</h3> ' +

            '</div>' +

            '<div class="modal-body"> ' +

                 '<h4> Desea Borrar el Semillero? </h4> ' +

                  '<div><label id="nombreSemillero"></label>' +

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



.directive('initTablasemillero', ['$compile', function($compile) {

        return {

            restrict: 'A',



 			link: function(scope, el, attrs) {

            		var opts = scope.$eval(attrs.initTablasemillero);   

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

.controller('SemilleroCtrl', ['$scope','$window','TareasResource','$location', function($scope,$window,TareasResource,$location) {



	 var user = JSON.parse($window.sessionStorage.getItem('investigador'));

    $scope.btnNuevo=true;

       moment.locale('es');

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

    	$scope.$parent.mnuInvestiga =false;

            $scope.$parent.mnuAdmin = false;

            $scope.$parent.mnuConvocatoria = false;     

    }


if (admin.Usuario=="admin")
  {
     $scope.btnNuevo=false;
  }


	     $scope.options = {                      

          

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

                idField:'sem_codi',

                toolbar: '#custom-toolbarsemillero',

            columns: [



            {

                field: 'sem_nomb',

                title: 'Semillero',

                align: 'left',

                valign: 'middle',

                sortable: true

            },{

                field: 'SEM_FECH_CREA',

                title: 'Fecha de Creación',

                align: 'left',

                valign: 'middle',

                sortable: true,

                 formatter: function(value, row, index) {



                      return moment(value).format("DD MMMM YYYY");



                 }

            },{

                field: 'SEM_AVAL_UNAD',

                title: 'Avalado',

                align: 'left',

                valign: 'middle',

                sortable: true,

                  formatter: function(value, row, index) {



                      return value=="1"? "SI":"NO" ;



                 }

            },{

                title: '',

                width: 75,

                switchable:false,

                formatter: function(value, row, index) {

                      var admin =JSON.parse($window.sessionStorage.getItem('usuario'));

                      if (admin.Usuario!="admin")
                      {

                        return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp; ' +

                        '<a class="remove ml10 btn btn-default btn-xs" title="Eliminar" ><span class="glyphicon glyphicon-trash"></span></a>';
                      }

                       else

                      {
                         return '<img src="images/pdf.png" alt="pdf" class="pdf" style="width:30px;height:30px;cursor:pointer">';
                      }


                },

                events:  window.operateEvents = {

                        'click .remove': function (e, value, row, index) {

                                $('#Id').text(row.sem_nomb);

                                  $('#myModalDeleteSemillero').data('id', row.sem_codi).modal('show');                                

                        },



                        'click .edit': function (e, value, row, index) {

                                 $window.location.href ="#/edit-semillero/" + row.sem_codi + "";                           

                        },
                          'click .pdf': function (e, value, row, index) {

                                 

                        }



                }







            }]

    }

        





          var admin =JSON.parse($window.sessionStorage.getItem('usuario'));

        if (admin.Usuario!="admin")
        {

        var datos = {



        	Accion:'S',

        	SQL:'SELECT semi.sem_codi,semi.sem_nomb, semi.SEM_FECH_CREA,semi.SEM_AVAL_UNAD,inve.inv_nomb + " "  + inv_apel As Investigador ' + 

        		' FROM sgi_semi as semi inner join sgi_inve_semi as inve_semi on inve_semi.INS_SEMI_CODI= semi.SEM_CODI' +

				' inner join sgi_inve as inve on inve.INV_CODI=inve_semi.INS_INVE_IDEN WHERE inve.inv_codi = ' + user.INV_CODI



        }
      }
      else
      {
          var datos = {



          Accion:'S',

          SQL:'SELECT semi.sem_codi,semi.sem_nomb, semi.SEM_FECH_CREA,semi.SEM_AVAL_UNAD,inve.inv_nomb + " "  + inv_apel As Investigador ' + 

            ' FROM sgi_semi as semi inner join sgi_inve_semi as inve_semi on inve_semi.INS_SEMI_CODI= semi.SEM_CODI' +

        ' inner join sgi_inve as inve on inve.INV_CODI=inve_semi.INS_INVE_IDEN'

      }
    }



       var listaSemilleros= TareasResource.SQL(datos);

       		listaSemilleros.then(function(result){

                if (result.data[0]!=null)

       			      $('#tablesemillero').bootstrapTable('load',result.data);	

                  else

                     $('#tablesemillero').bootstrapTable('load',{});   

       		});

        

    $scope.onClicSalir = function()

        {

              var admin =JSON.parse($window.sessionStorage.getItem('usuario'));

        if (admin.Usuario!="admin")
        {
           $window.sessionStorage.setItem('tipoUsuario',null);

           $window.sessionStorage.setItem('usuario',null);

           $window.location.href = "#/menu/";
        }
        else
        {
           $window.sessionStorage.setItem('tipoUsuario',null);         

           $window.location.href = "#/menuReporte/";
        }

      }    





}])



	.controller('ListControllersemillero', ['$window','$scope', function($window,$scope) {

  

        this.btnNovoClick = function() {

            $window.location.href = "#/edit-semillero/0";

        };            

    }]);