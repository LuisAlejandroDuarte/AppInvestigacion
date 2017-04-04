'use strict';

angular.module('listaTareasApp')

.directive('myModaleliminarescalaevaluacion', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString(); 
                     var eliminar ={
                        Accion:"D",
                        SQL:"DELETE FROM sgi_esca_eval WHERE EEV_CODI="+ Codigo
                        }
            
                    $http.post("scripts/services/executesql.php",eliminar)
                        .success(function(data) {   
                         $scope.listEscalaEvaluacion.splice($('#index')[0].innerText,1);    
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
                 '<h4> Desea Borrar ? </h4> ' +
                  '<div><label id="nombre"></label>' +
                   '<div ng-show=false><label id="index"></label>' +
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


.controller('Controladorescalaevaluacion',['$scope','$window','TareasResource',function($scope,$window,TareasResource) {

	
	$scope.settingsPanel =
	{
		height:300
	}

	var listParametro =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT PEV_CODI,PEV_DESC FROM sgi_para_eval"}); 


	 listParametro.$promise.then(function(result){

	 		$scope.listParametro = result;


	 	 var select ={
            Accion:"S",
            SQL:"SELECT ee.EEV_CODI, ee.EEV_CALI,pe.PEV_CODI,pe.PEV_DESC FROM sgi_esca_eval AS ee INNER JOIN sgi_para_eval AS pe ON  " + 
	 			" ee.EEV_PARA_EVAL = pe.PEV_CODI "
          }

         $scope.listEscalaEvaluacion =[];
         TareasResource.SQL(select).then(function(result) {  
         	if (result.data[0]!=null)
				$scope.listEscalaEvaluacion = result.data;
         });   	 	

	 });


	 $scope.onClicEliminar = function(item,object) {

 		var datosItem = item;
	        if (item.EEV_CODI==-1)
	        {
	            $scope.listEscalaEvaluacion.splice(object.$index,1);
	            return;
	        }
	        else
	        {

	             $('#index').text(object.$index);
	             $('#nombre').text(item.PEV_DESC );
	             $('#myModal').data('id', item.EEV_CODI);
	             $('#myModal').modal('show');       
	        }

	 }

	 $scope.onClicAgregar = function(selParametro,selEvaluacion) {

	 	var existe;
	 	if (selParametro==undefined || selParametro=="")
	 	{
	 		$window.alert("Seleccione un parámetro");
	 		return;
	 	}

	 	if (selEvaluacion==undefined || selEvaluacion=="")
	 	{
	 		$window.alert("Esciba la Calificación");
	 		return;
	 	}

	 	var ingresar ={

	 		EEV_CODI :-1,
	 		PEV_DESC : selParametro.PEV_DESC,
	 		PEV_CODI : selParametro.PEV_CODI,
	 		EEV_CALI : selEvaluacion
	 		

	 	}
	 	existe	=false;

	 	 	if ($scope.listEscalaEvaluacion==undefined) $scope.listEscalaEvaluacion=[]; 
	 	 		 angular.forEach($scope.listEscalaEvaluacion, function(value, key){

	 	 		 	if (ingresar.EEV_CALI==value.EEV_CALI && ingresar.PEV_CODI == value.PEV_CODI)
	 	 		 	{
	 	 		 		existe=true;
	 	 		 	}

	 	 		 });

	 	 		 if (existe==false)
					$scope.listEscalaEvaluacion.splice(0,0,ingresar);		 	 	
				 else
				 	$window.alert("Ya existe la combinación");	
	 }

	 $scope.onClicGuardar = function()
	 {
	 	 var insertSQL =[]
        angular.forEach($scope.listEscalaEvaluacion, function(value, key){

            if (value.EEV_CODI==-1)
            {
                                                  
                var datos ={
                    Accion :"I",
                    SQL:"INSERT INTO sgi_esca_eval (EEV_CALI,EEV_PARA_EVAL) " +
                      " VALUES (" + value.EEV_CALI + "," + value.PEV_CODI + ")"
                   }
                 insertSQL.splice(0,0,datos);
            }
        });
         TareasResource.SQLMulti(insertSQL).then(function(result) { 

         	  if (result.data[0]=="fallo")              
	               $window.alert(result.data[0].msg);              
              else
              {
              	$window.alert("INGRESADO");	

              		 var select ={
         			   	Accion:"S",
            			SQL:"SELECT ee.EEV_CODI, ee.EEV_CALI,pe.PEV_CODI,pe.PEV_DESC FROM sgi_esca_eval AS ee INNER JOIN sgi_para_eval AS pe ON  " + 
	 					" ee.EEV_PARA_EVAL = pe.PEV_CODI "
          				}

			         $scope.listEscalaEvaluacion =[];
			         TareasResource.SQL(select).then(function(result) {  
			         	if (result.data[0]!=null)
							$scope.listEscalaEvaluacion = result.data;
			         });   	 	
     			}

         });
	 }

}]);