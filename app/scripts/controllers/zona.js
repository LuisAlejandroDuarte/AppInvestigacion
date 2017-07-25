'use strict';
angular.module('listaTareasApp')



.directive('myModalzona', function() {

       return {

        restrict : 'AE',    

        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {

            $scope.afirmaEliminar = function() {

                      var Codigo = $('#myModal').data('id').toString();  

                    $http.post("scripts/services/api.php?url=executeSQL/D/DELETE FROM sgi_zona" +

                                " WHERE ZON_CODI = " + Codigo, $scope.formData)

                        .success(function(data) {  



                        $('#tableZona').bootstrapTable('remove', {

                                field: 'ZON_CODI',

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

                 '<h4> Desea Borrar la zona? </h4> ' +

                  '<div><label id="nombreZona"></label>' +

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

.directive('initTablazona', ['$compile', function($compile) {

        return {

            restrict: 'A',



            link: function(scope, el, attrs) {

                    var opts = scope.$eval(attrs.initTablazona);   

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



  .controller('ControllerZona', ['$scope','$window','TareasResource','$location', function($scope,$window,TareasResource,$location) {





  		   $scope.options = {                      
                           
              

                cache: false,


                height: 300,


                striped: true,


                pagination: true,


                pageList: [10, 25, 50, 100, 200],


                search: true,

                 showExport:true,
                showColumns: true,


                showRefresh: true,


                minimumCountColumns: 2,
                toolbar:'#toolbarzona',

                


                columns: [{


                    field: 'ZON_CODI',


                    title: 'Código',                   


                    visible:false,


                    clickToSelect: false


                }, {


                    field: 'ZON_NOMB',


                    title: 'Nombre',


                    align: 'left',


                    valign: 'bottom',


                    sortable: true,


                    clickToSelect: true


                },{


                    field: 'ZON_SIGL',


                    title: 'Sigla',


                    align: 'left',


                    valign: 'bottom',


                    sortable: true,


                    clickToSelect: true


                },{                   


                    title: '',

                    width: 75,
                    align: 'center',


                    valign: 'middle',


                    switchable:false,


                    clickToSelect: true,


                    formatter: operateFormatter,


                    events: window.operateEvents ={
                    	  'click .remove': function (e, value, row, index) {


          						$('#nombreZona').text(row.ZON_NOMB);


        					$('#myModal').data('id', row.ZON_CODI).modal('show');
                    }

                  }
                }]


            };

      

       function operateFormatter(value, row, index) {


        return [


            


            '<a class="edit ml10" href="#/edit-zona/'+ row.ZON_CODI + '" title="Editar">',


                '<i class="glyphicon glyphicon-edit"></i>',


            '</a> &nbsp' ,


            '<a class="remove ml10" href="javascript:void(0)" title="Eliminar">',


                '<i class="glyphicon glyphicon-remove"></i>',


            '</a>'


        ].join('');


    }




       
      

      var select= {
      	Accion:"S",
      	SQL:'SELECT ZON_CODI,ZON_NOMB,ZON_SIGL  from sgi_zona order by ZON_NOMB ASC'
      }



     var zona =TareasResource.SQL(select);
     	zona.then(function(result){

     		$('#tableZona').bootstrapTable('load', result.data);

     	});        


      $scope.onClicSalir = function() {

        $location.path("/gestionBaseDatos");

      }

  }]);