
'use strict';

angular.module('listaTareasApp')

  .controller('ControladorGestionBaseDatos', function($scope,$location,TareasResource,$route,$window) {


  		

  		 var datos =[{'id':1,'tabla':'ZONA'},{'id':2,'tabla':'CENTRO'},{'id':3,'tabla':'ÁREA'},{'id':4,'tabla':'GRAN ÁREA'},{'id':5,'tabla':'ATRIBUTO'}];
  		moment.locale('es');

  	   $scope.optionsBaseDatos = {                                                      
                toggle:'table',                
                idField:'id',   
                data: datos,
                toolbar: '#toolbarbasedatos',             
            columns: [{               
                field: 'tabla',
                title: 'TABLA',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'Ver',
                title: 'Ver',
                align: 'left',
                valign: 'middle',
                sortable: true,
                 formatter: function(value, row, index) {
                    return  '<a href="" target=_blank class="ver ml10 btn btn-default btn-xs" title="Ver"><span class="glyphicon glyphicon-eye-open"></span></a>' ;  

                 },
                 events:window.operateEvents = {
			        'click .ver': function (e, value, row, index) {
			             	
							if (row.id==1)
			             	{
			             			$location.path('/zona');
			             			$scope.$apply()
			             	}

			             	if (row.id==2)
			             	{
			             			$location.path('/centro');
			             			$scope.$apply()
			             	}

			             	if (row.id==3)
			             	{
			             			$location.path('/area');
			             			$scope.$apply()
			             	}
			             	if (row.id==4)
			             	{
			             			$location.path('/granarea');
			             			$scope.$apply()
			             	}

			             	if (row.id==5)
			             	{
			             			$location.path('/atributo');
			             			$scope.$apply()
			             	}

			        }			       
			    }

            }]

        };                
  
       $('#myModal').hide();  
     
$scope.onClicSalir = function() {

			$location.path("#/menuAdministracionGeneral");
	}
});
