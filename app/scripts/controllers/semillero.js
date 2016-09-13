'use strict';
 angular.module('listaTareasApp')



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
.controller('SemilleroCtrl', ['$scope','$window','TareasResource', function($scope,$window,TareasResource) {

	 var user = JSON.parse($window.sessionStorage.getItem('investigador'));

	if (user==null || user==undefined)
    {

      $location.path('/inicio');
      return;
    }
    else
    {
    	$scope.$parent.mnuInvestiga =false;
            $scope.$parent.mnuAdmin = false;
            $scope.$parent.mnuConvocatoria = false;     
    }


	     $scope.options = {                      
          
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
                field: 'INS_FECH_INIC',
                title: 'Fecha',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{
                field: 'SEM_AVAL_UNAD',
                title: 'Avaluado',
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
    }
        

        var datos = {

        	Accion:'S',
        	SQL:'SELECT semi.sem_codi,semi.sem_nomb, inve_semi.INS_FECH_INIC,semi.SEM_AVAL_UNAD,inve.inv_nomb + " "  + inv_apel As Investigador ' + 
        		' FROM sgi_semi as semi inner join sgi_inve_semi as inve_semi on inve_semi.INS_SEMI_CODI= semi.SEM_CODI' +
				' inner join sgi_inve as inve on inve.INV_CODI=inve_semi.INS_INVE_IDEN WHERE inve.inv_codi = ' + user.inv_codi

        }

       var listaSemilleros= TareasResource.SQL(datos);
       		listaSemilleros.then(function(result){
       			$('#tablesemillero').bootstrapTable('load',result.data);	
       		});
        


}])

	.controller('ListControllersemillero', ['$window','$scope', function($window,$scope) {
  
        this.btnNovoClick = function() {
            $window.location.href = "#/edit-semillero/0";
        };            
    }]);