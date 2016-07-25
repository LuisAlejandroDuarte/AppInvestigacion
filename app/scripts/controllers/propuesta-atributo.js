'use strict';
 angular.module('listaTareasApp')

 .directive('myModaleliminarpropuestaatributo', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString(); 
                     var eliminar ={
                        Accion:"D",
                        SQL:"DELETE FROM sgi_prop_atrib WHERE PATR_CODI="+ Codigo
                        }
            
                    $http.post("scripts/services/executesql.php",eliminar)
                        .success(function(data) {   
                         $scope.listPropuestaAtributo.splice($('#index')[0].innerText,1);    
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

.controller('propuestaAtributoCtrl', ['$scope','$window','TareasResource','$location', function($scope,$window,TareasResource,$location){
	   

     //Devuelve el formato de una fecha

    $scope.settingsPanel ={
         width: 1100,
         height: 300,
         autoUpdate:true
    }

			 	     	    	
    	var propuesta ={
    		Accion:"S",
    		SQL:"SELECT PRO_CODI,PRO_NOMB FROM sgi_prop"
    	  }
         $scope.listPropuesta =[];
    	 TareasResource.SQL(propuesta).then(function(result) {             

    	 	if (result.data[0]!=null)           		
         		$scope.listPropuesta = result.data;

                    var atributo ={
                        Accion:"S",
                        SQL:"SELECT ATR_CODI,ATR_DESC from sgi_atrib"
                    }

                $scope.listAtributo=[];
                TareasResource.SQL(atributo).then(function(result) { 
                        if (result.data[0]!=null)
                            $scope.listAtributo = result.data;                            
                    var detalle = {
                        Accion:"S",
                        SQL :"SELECT PA.PATR_CODI, P.PRO_CODI, P.PRO_NOMB,A.ATR_CODI,A.ATR_DESC FROM sgi_prop_atrib AS PA INNER JOIN sgi_prop AS P  ON " +
                        " PA.PATR_PROP_CODI = P.PRO_CODI INNER JOIN sgi_atrib AS A  ON " +
                        " PA.PATR_ATRI_CODI = A.ATR_CODI"
                    }

             TareasResource.SQL(detalle).then(function(result) { 
                if (result.data[0]!=null)
                     $scope.listPropuestaAtributo = result.data;

             });

         });       
     });

    
    $scope.onClicEliminar  = function(item,object)
    {
        var datosItem = item;
        if (item.PATR_CODI==-1)
        {
            $scope.listPropuestaAtributo.splice(object.$index,1);
            return;
        }
        else
        {

             $('#index').text(object.$index);
             $('#nombre').text(item.PRO_NOMB + ' ' + item.ATR_DESC );
             $('#myModal').data('id', item.PATR_CODI);
             $('#myModal').modal('show');       
        }


        // var eliminar ={
        //     Accion:"S",
        //     SQL:"SELECT JPE_PREV_CONS FROM ESC_JUEZ_PROD_EVEN WHERE JPE_PREV_CONS=" + item.PRE_CONS
        // }

        //  Execute.SQL(eliminar).then(function(result) { 

        //     if (result.data[0]!=null)
        //     {
        //         $window.alert('Exist el registro en la tabla Juez Producto Evento');
        //     }
        //     else
        //     {
                
        //          //$scope.listProductoEvento.splice(object.$index,1);
        //     }


       //  });

        
    }        

    $scope.onClicAgregar = function(selPropuesta,selAtributo)    
    {
        if (selPropuesta==undefined || selPropuesta=="")
        {
            $window.alert("Seleccione una propuesta");
            return;
        }
        if (selAtributo==undefined || selAtributo=="")
        {
            $window.alert("Seleccione un atributo");
            return;
        }

        

        if ($scope.listPropuestaAtributo==undefined)
        	$scope.listPropuestaAtributo=[];

        var ingresar ={
                PATR_CODI:-1,
                PATR_ATRI_CODI:selAtributo.ATR_CODI,
                PATR_PROP_CODI:selPropuesta.PRO_CODI,        		
        		PRO_NOMB:selPropuesta.PRO_NOMB,
        		ATR_DESC :selAtributo.ATR_DESC        		
        }
        var existe =false;
         angular.forEach($scope.listPropuestaAtributo, function(value, key){

   		   if (value.PATR_ATRI_CODI==ingresar.PATR_ATRI_CODI && value.PATR_PROP_CODI==ingresar.PATR_PROP_CODI)
   		   {
   		   		existe=true;
   		   }
   		});

        if (!existe) 
			$scope.listPropuestaAtributo.splice(0,0,ingresar);
        else
            $window.alert("Ya existe la combinación");
       
    }

    $scope.onClicGuardar = function()
    {    	

    	
         var insertSQL =[]
        angular.forEach($scope.listPropuestaAtributo, function(value, key){

            if (value.PATR_CODI==-1)
            {
                                                  
                var datos ={
                    Accion :"I",
                    SQL:"INSERT INTO sgi_prop_atrib (PATR_ATRI_CODI,PATR_PROP_CODI) " +
                      " VALUES (" + value.PATR_ATRI_CODI + "," + value.PATR_PROP_CODI + ")"
                   }
                 insertSQL.splice(0,0,datos);
            }
        });
             TareasResource.SQLMulti(insertSQL).then(function(result) { 

                        if (result.data[0]=="fallo")
                        {
                            $window.alert(result.data[0].msg);
                        }
                        else
                        {
                         $window.alert("Actualizado");     
                            var detalle = {
                                Accion:"S",
                                SQL :"SELECT PA.PATR_CODI, P.PRO_CODI, P.PRO_NOMB,A.ATR_CODI,A.ATR_DESC FROM sgi_prop_atrib AS PA INNER JOIN sgi_prop AS P  ON " +
                                " PA.PATR_PROP_CODI = P.PRO_CODI INNER JOIN sgi_atrib AS A  ON " +
                                " PA.PATR_ATRI_CODI = A.ATR_CODI"
                            }

                         TareasResource.SQL(detalle).then(function(result) { 
                         if (result.data[0]!=null)
                            $scope.listPropuestaAtributo = result.data;

                            });                         
                    }
            });  		
    }

}])