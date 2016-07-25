'use strict';
 angular.module('listaTareasApp')

 .directive('myModaleliminarpropuestaatributoconvocatoria', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
            $scope.afirmaEliminar = function() {
                      var Codigo = $('#myModal').data('id').toString(); 
                     var eliminar ={
                        Accion:"D",
                        SQL:"DELETE FROM sgi_prop_conv_atri WHERE PCAT_CODI="+ Codigo
                        }
            
                    $http.post("scripts/services/executesql.php",eliminar)
                        .success(function(data) {   
                         $scope.listPropuestaAtributoConvocatoria.splice($('#index')[0].innerText,1);    
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

.controller('propuestaAtributoConvocatoriaCtrl', ['$scope','$window','TareasResource','$location', function($scope,$window,TareasResource,$location){
       

     //Devuelve el formato de una fecha

    $scope.settingsPanel ={
         width: 1100,
         height: 300,
         autoUpdate:true
    }

                                
        var propuesta ={
            Accion:"S",
            SQL:"SELECT PA.PATR_CODI, CONCAT(P.PRO_NOMB, ' ',A.ATR_DESC) As PATR_NOMB FROM sgi_prop_atrib AS PA INNER JOIN sgi_prop AS P ON " +
            " P.PRO_CODI = PA.PATR_PROP_CODI INNER JOIN sgi_atrib As A ON " +
            " A.ATR_CODI = PA.PATR_ATRI_CODI "
          }
         $scope.listPropuestaAtributo =[];
         TareasResource.SQL(propuesta).then(function(result) {             

            if (result.data[0]!=null)                   
                $scope.listPropuestaAtributo = result.data;

                    var convocatoria ={
                        Accion:"S",
                        SQL:"SELECT CON_CODI,CON_DESC from sgi_conv"
                    }

                $scope.listConvocatoria=[];
                TareasResource.SQL(convocatoria).then(function(result) { 
                        if (result.data[0]!=null)
                            $scope.listConvocatoria = result.data;                            
                    var detalle = {
                        Accion:"S",
                        SQL :"SELECT PCA.PCAT_CODI, PCA.PCAT_PATR_CODI,PCA.PCAT_CONV_CODI, CONCAT(P.PRO_NOMB, ' ',A.ATR_DESC) As PCAT_NOMB,PCA.PCAT_FECH,C.CON_DESC,C.CON_CODI " +
                        " FROM sgi_prop_atrib AS PA INNER JOIN sgi_prop AS P  ON " +
                        " PA.PATR_PROP_CODI = P.PRO_CODI INNER JOIN sgi_atrib AS A  ON " +
                        " PA.PATR_ATRI_CODI = A.ATR_CODI INNER JOIN sgi_prop_conv_atri AS PCA ON PCA.PCAT_PATR_CODI=PA.PATR_CODI INNER JOIN sgi_conv AS C ON " +
                        " PCA.PCAT_CONV_CODI=C.CON_CODI"
                    }
                   $scope.listPropuestaAtributoConvocatoria =[];
                   TareasResource.SQL(detalle).then(function(result) { 
                      if (result.data[0]!=null)
                         $scope.listPropuestaAtributoConvocatoria = result.data;

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
             $('#nombre').text(item.PCAT_ATR_NOMB + ' ' + item.CON_DESC );
             $('#myModal').data('id', item.PATR_CODI);
             $('#myModal').modal('show');       
        }


     

        
    }        

     //Año-Mes-Dias
    function devolverFormatoFecha(fecha)
    {
        var Mes ="ene,feb,mar,abr,may,jun,jul,ago,sep,oct,nov,dic";        
        var arrayMes = new Array();        
        arrayMes = Mes.split(",");

        var _fecha = fecha.split("-");
        var dia = _fecha[0];
        var mes = arrayMes.indexOf(_fecha[1])+1;
        var year = _fecha[2];

        return year + "-" + mes + "-" + dia;

    }   

    $scope.onClicAgregar = function(selPropuestaAtributo,selConvocatoria,selFecha)    
    {
        if (selPropuestaAtributo==undefined || selPropuestaAtributo=="")
        {
            $window.alert("Seleccione una propuesta atributo");
            return;
        }
        if (selConvocatoria==undefined || selConvocatoria=="")
        {
            $window.alert("Seleccione una convocatoria");
            return;
        }

        if (selFecha==undefined || selFecha=="")
        {
            $window.alert("Seleccione una fecha");
            return;
        }

        var fecha = new Date(selFecha);
        var strFecha =  fecha.getFullYear() + '-' + parseInt(fecha.getMonth()+1,10)  + '-' + fecha.getDate();

        if ($scope.listPropuestaAtributoConvocatoria==undefined)
            $scope.listPropuestaAtributoConvocatoria=[];

        var ingresar ={
                PCAT_CODI:-1,
                PCAT_PATR_CODI:selPropuestaAtributo.PATR_CODI,
                PCAT_NOMB:selPropuestaAtributo.PATR_NOMB,
                CON_CODI:selConvocatoria.CON_CODI,        
                CON_DESC:selConvocatoria.CON_DESC,      
                PCAT_FECH:strFecha          
        }
        var existe =false;
         angular.forEach($scope.listPropuestaAtributoConvocatoria, function(value, key){

           if (value.PCAT_PATR_CODI==ingresar.PCAT_PATR_CODI && value.CON_CODI==ingresar.CON_CODI)
           {
                existe=true;
           }
        });

        if (!existe) 
            $scope.listPropuestaAtributoConvocatoria.splice(0,0,ingresar);
        else
            $window.alert("Ya existe la combinación");
       
    }

    $scope.onClicGuardar = function()
    {       

        
         var insertSQL =[]
        angular.forEach($scope.listPropuestaAtributoConvocatoria, function(value, key){

            if (value.PCAT_CODI==-1)
            {
                                                  
                var datos ={
                    Accion :"I",
                    SQL:"INSERT INTO sgi_prop_conv_atri (PCAT_PATR_CODI,PCAT_CONV_CODI,PCAT_FECH) " +
                      " VALUES (" + value.PCAT_PATR_CODI + "," + value.CON_CODI + ",'" + value.PCAT_FECH + "')"
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
                                SQL :"SELECT PCA.PCAT_CODI, PCA.PCAT_PATR_CODI,PCA.PCAT_CONV_CODI, CONCAT(P.PRO_NOMB, ' ',A.ATR_DESC) As PCAT_NOMB,PCA.PCAT_FECH,C.CON_DESC,C.CON_CODI " +
                                " FROM sgi_prop_atrib AS PA INNER JOIN sgi_prop AS P  ON " +
                                " PA.PATR_PROP_CODI = P.PRO_CODI INNER JOIN sgi_atrib AS A  ON " +
                                " PA.PATR_ATRI_CODI = A.ATR_CODI INNER JOIN sgi_prop_conv_atri AS PCA ON PCA.PCAT_PATR_CODI=PA.PATR_CODI INNER JOIN sgi_conv AS C ON " +
                                " PCA.PCAT_CONV_CODI=C.CON_CODI"
                                  }
                               $scope.listPropuestaAtributoConvocatoria =[];
                               TareasResource.SQL(detalle).then(function(result) { 
                                  if (result.data[0]!=null)
                                     $scope.listPropuestaAtributoConvocatoria = result.data;

                                });                         
                    }
            });         
    }

}])