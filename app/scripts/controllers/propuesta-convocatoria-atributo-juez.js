'uses strict'

angular./**
*  Module
*
* Description
*/
module('listaTareasApp')

 .directive('myModaleliminarpropuestaconvocatoriaatributojuez', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString(); 
                     var eliminar ={
                        Accion:"D",
                        SQL:"DELETE FROM sgi_prop_conv_juez WHERE PCJU_CODI="+ Codigo
                        }
            
                    $http.post("scripts/services/executesql.php",eliminar)
                        .success(function(data) {   
                         $scope.listPropuestaConvocatoriaAtributoJuez.splice($('#index')[0].innerText,1);    
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



.controller('controllerPropuestaConvocatoriaAtributoJuez', ['$scope','TareasResource','$window', function($scope,TareasResource,$window){
	
	  $scope.settingsPanel ={
         width: 1100,
         height: 300,
         autoUpdate:true
    }

	 var propuestaConvocatoriaAtributo =TareasResource.execute.query({Accion:"S",
													SQL:"SELECT CONCAT(P.PRO_NOMB, ' ', C.CON_DESC, ' ',A.ATR_DESC) AS PCAT_NOMB,PCA.PCAT_CODI  " + 
													" from sgi_prop_conv_atri AS PCA INNER JOIN sgi_conv AS C " +
													" ON PCA.PCAT_CONV_CODI = C.CON_CODI INNER JOIN sgi_prop_atrib AS PA " +
													" ON PCAT_PATR_CODI = PA.PATR_CODI INNER JOIN sgi_prop AS P " +
													" ON PA.PATR_PROP_CODI = P.PRO_CODI INNER JOIN sgi_atrib AS A " +
													" ON PA.PATR_ATRI_CODI = A.ATR_CODI"});
		
		propuestaConvocatoriaAtributo.$promise.then(function (result) {
			$scope.listPropuestaConvocatoriaAtributo = result;

			if ($scope.listPropuestaConvocatoriaAtributo.lenht>0)
				$scope.selPropuestaConvocatoriaAtributo = $scope.listPropuestaConvocatoriaAtributo[0];
								
						 var evaluacion  =TareasResource.execute.query({Accion:'S',
													SQL:'SELECT concat(PE.PEV_DESC," ",EE.EEV_CALI) AS EEV_NOMB,EE.EEV_CODI FROM sgi_esca_eval AS EE INNER JOIN sgi_para_eval AS PE ' +
													' ON EE.EEV_PARA_EVAL = PE.PEV_CODI'});

						 	evaluacion.$promise.then(function (result) {

						 		$scope.listEvaluacion = result;
						 		$selEvaluacion = $scope.listEvaluacion[0];

						 		 var juez =TareasResource.execute.query({Accion:'S',
													SQL:'SELECT concat(USE_NOMB," ",USE_APEL) AS USE_NOMB, USE_CODI  FROM sgi_user WHERE USE_COD_TIPO=2'});

								 juez.$promise.then(function (result) {
						 			$scope.listPersona =result;




						 					 var propuestaConvocatoriaJuez = {
								                        Accion:"S",
								                        SQL :"SELECT PCJ.PCJU_CODI,PCJ.PCJU_PCAT_CODI, " +
													" CONCAT(P.PRO_NOMB, ' ', C.CON_DESC, ' ',A.ATR_DESC) AS PCJU_PCAT_NOMB,PCJ.PCJU_EEVA_CODI, " + 
													" concat(PE.PEV_DESC,' ',EE.EEV_CALI) AS PCJU_EEV_NOMB,I.INV_CODI AS PCJU_INV_CODI,concat(I.INV_NOMB,' ',I.INV_APEL) AS PCJU_PER_NOMB " +
													" FROM sgi_prop_conv_juez AS PCJ INNER JOIN sgi_prop_conv_atri AS PCA ON " +
													" PCJ.PCJU_PCAT_CODI = PCA.PCAT_CODI INNER JOIN sgi_conv AS C " +
													" ON PCA.PCAT_CONV_CODI = C.CON_CODI INNER JOIN sgi_prop_atrib AS PA " +
													" ON PCAT_PATR_CODI = PA.PATR_CODI INNER JOIN sgi_prop AS P " +
													" ON PA.PATR_PROP_CODI = P.PRO_CODI INNER JOIN sgi_atrib AS A " +
													" ON PA.PATR_ATRI_CODI = A.ATR_CODI INNER JOIN sgi_inve AS I ON " + 
													" PCJ.PCJU_INV_CODI = I.INV_CODI  INNER JOIN sgi_esca_eval AS EE " +
													" ON EE.EEV_CODI = PCJ.PCJU_EEVA_CODI INNER JOIN sgi_para_eval AS PE " +
													" ON EE.EEV_PARA_EVAL = PE.PEV_CODI WHERE I.INV_TIPO=1"
								                    }
                   								$scope.listPropuestaConvocatoriaAtributoJuez =[];
                 							  	TareasResource.SQL(propuestaConvocatoriaJuez).then(function(result) { 
                      							if (result.data[0]!=null)
                         							$scope.listPropuestaConvocatoriaAtributoJuez = result.data;

            									 });



						 				

						 				});
						 	});					
			
		});

	$scope.onClicAgregar = function(selPropuestaConvocatoriaAtributo,selEvaluacion,selJuez)
	{

		if (selPropuestaConvocatoriaAtributo==undefined || selPropuestaConvocatoriaAtributo=="")
		{
			$window.alert("Debe seleccionar propuesta atributo convocatoria ");
			return;
		}

		if (selEvaluacion==undefined || selEvaluacion=="")
		{
			$window.alert("Debe seleccionar evaluación");
			return;
		}

		if (selJuez==undefined || selJuez=="")
		{
			$window.alert("Debe seleccionar Juez");
			return;
		}


		var ingresar ={
			PCJU_CODI:-1,
			PCJU_PCAT_CODI:selPropuestaConvocatoriaAtributo.PCAT_CODI,
			PCJU_PCAT_NOMB:selPropuestaConvocatoriaAtributo.PCAT_NOMB,
			PCJU_EEVA_CODI:selEvaluacion.EEV_CODI,
			PCJU_EEV_NOMB:selEvaluacion.EEV_NOMB,
			PCJU_INV_CODI:selJuez.USE_CODI,
			PCJU_PER_NOMB:selJuez.USE_NOMB
		}


		if ($scope.listPropuestaConvocatoriaAtributoJuez==undefined)  $scope.listPropuestaConvocatoriaAtributoJuez=[];

		 var existe =false;
         angular.forEach($scope.listPropuestaConvocatoriaAtributoJuez, function(value, key){

           if (value.PCJU_PCAT_CODI==ingresar.PCJU_PCAT_CODI && value.PCJU_EEVA_CODI==ingresar.PCJU_EEVA_CODI  && value.PCJU_INV_CODI == ingresar.PCJU_INV_CODI)
           {
                existe=true;
           }
        });

          if (!existe) 
            $scope.listPropuestaConvocatoriaAtributoJuez.splice(0,0,ingresar);
          else
            $window.alert("Ya existe la combinación");



	}

	 $scope.onClicEliminar  = function(item,object)
    {
        var datosItem = item;
        if (item.PCJU_CODI==-1)
        {
            $scope.listPropuestaConvocatoriaAtributoJuez.splice(object.$index,1);
            return;
        }
        else
        {

             $('#index').text(object.$index);
             $('#nombre').text(item.PCJU_PCAT_NOMB);
             $('#myModal').data('id', item.PCJU_CODI);
             $('#myModal').modal('show');       
        }

    }        

    $scope.onClicGuardar = function()
    {
    	 var insertSQL =[]
        angular.forEach($scope.listPropuestaConvocatoriaAtributoJuez, function(value, key){

            if (value.PCJU_CODI==-1)
            {
                                                  
                var datos ={
                    Accion :"I",
                    SQL:"INSERT INTO sgi_prop_conv_juez (PCJU_PCAT_CODI,PCJU_EEVA_CODI,	PCJU_INV_CODI) " +
                      " VALUES (" + value.PCJU_PCAT_CODI + "," + value.PCJU_EEVA_CODI + "," + value.PCJU_INV_CODI + ")"
                   }
                 insertSQL.splice(0,0,datos);
            }
        });

        TareasResource.SQLMulti(insertSQL).then(function(result) { 

                        if (result.data[0]=="fallo")                        
                            $window.alert(result.data[0].msg);
                        
                        else
                        {
                         $window.alert("Actualizado");    
                          var propuestaConvocatoriaJuez = {
								                        Accion:"S",
								                        SQL :"SELECT PCJ.PCJU_CODI,PCJ.PCJU_PCAT_CODI, " +
													" CONCAT(P.PRO_NOMB, ' ', C.CON_DESC, ' ',A.ATR_DESC) AS PCJU_PCAT_NOMB,PCJ.PCJU_EEVA_CODI, " + 
													" concat(PE.PEV_DESC,' ',EE.EEV_CALI) AS PCJU_EEV_NOMB,I.INV_CODI AS PCJU_INV_CODI,concat(I.INV_NOMB,' ',I.INV_APEL) AS PCJU_PER_NOMB " +
													" FROM sgi_prop_conv_juez AS PCJ INNER JOIN sgi_prop_conv_atri AS PCA ON " +
													" PCJ.PCJU_PCAT_CODI = PCA.PCAT_CODI INNER JOIN sgi_conv AS C " +
													" ON PCA.PCAT_CONV_CODI = C.CON_CODI INNER JOIN sgi_prop_atrib AS PA " +
													" ON PCAT_PATR_CODI = PA.PATR_CODI INNER JOIN sgi_prop AS P " +
													" ON PA.PATR_PROP_CODI = P.PRO_CODI INNER JOIN sgi_atrib AS A " +
													" ON PA.PATR_ATRI_CODI = A.ATR_CODI INNER JOIN sgi_user AS U ON " + 
													" PCJ.PCJU_INV_CODI = U.USE_CODI  INNER JOIN sgi_esca_eval AS EE " +
													" ON EE.EEV_CODI = PCJ.PCJU_EEVA_CODI INNER JOIN sgi_para_eval AS PE " +
													" ON EE.EEV_PARA_EVAL = PE.PEV_CODI WHERE I.INV_TIPO=1"
								                    }
                   								$scope.listPropuestaConvocatoriaAtributoJuez =[];
                 							  	TareasResource.SQL(propuestaConvocatoriaJuez).then(function(result) { 
                      							if (result.data[0]!=null)
                         							$scope.listPropuestaConvocatoriaAtributoJuez = result.data;

            									 });


                    	}
                 });

    }

}])