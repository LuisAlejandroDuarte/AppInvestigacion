'use strict';

angular.module('listaTareasApp')
  .controller('editrEvaluadorCtrl', function($scope,$cookieStore,$location,TareasResource,$route,$window,$http) {
   moment.locale('es');
   var idPropuesta;
     var fileDocumentoProyecto=null;
  	idPropuesta = parseInt($route.current.params.idEvaluador);
	var user = JSON.parse($window.sessionStorage.getItem('investigador'));

    if (user==null || user==undefined)
    {

      $location.path('/menu');
      return;
    }  

    $scope.propuesta =$window.sessionStorage.getItem('Propuesta'); 
 	$scope.convocatoria =$window.sessionStorage.getItem('Convocatoria');  
  $scope.nombreLinkDocumento =($window.sessionStorage.getItem('link')=="null")? "": $window.sessionStorage.getItem('link');
  $scope.nombreDocumento =$window.sessionStorage.getItem('nombre')=="null"? "":$window.sessionStorage.getItem('nombre');
  $scope.totalEvaluacion = $window.sessionStorage.getItem('total'); 

  $scope.onClickCancelar = function() {


    $location.path('/evaluador');

  }                   


  $scope.onClickGuardar = function() {

    if ($scope.totalEvaluacion =="" || $scope.totalEvaluacion==undefined)
    {
      $window.alert("Debe digitar la evalaución");
      return;
    }
  

      var fd = new FormData();                        
      fd.append('id',idPropuesta); 
      fd.append('accion','Ingresar');  
      fd.append('archFileOld','');  
      fd.append('tipo',5);
      if (fileDocumentoProyecto!=null)  {
          fd.append('PROPUESTA', fileDocumentoProyecto);                                                    
          TareasResource.enviararchivobinario(fd).then(function(result1) { 

            var datos = {
              Accion:'U',
              SQL:"UPDATE sgi_prop_conv_juez set  PCJU_EEVA_CODI=" + $scope.totalEvaluacion + " WHERE PCJU_CODI=" + idPropuesta

            }

            var update = TareasResource.SQL(datos);
              update.then(function() {
                    if ($scope.nombreDocumento==undefined ||  $scope.nombreDocumento=="")
                    {
                        datos = {
                            Accion:'U',
                            SQL:"UPDATE sgi_prop_conv_juez set  PCJU_EVAL_PROP_LINK=null,PCJU_EVAL_PROP_NOMB=null WHERE PCJU_CODI=" + idPropuesta

                          }

                      update = TareasResource.SQL(datos);
                        update.then(function() {

                          $window.alert("Actualizado");
                          $location.path('/edit-evaluador/'+idPropuesta );  

                        });

                    }  
                    else
                    {
                      $window.alert("Actualizado");
                        $location.path('/edit-evaluador/'+idPropuesta );  
                    }

              });
       
          });
      }
      else
      {
          var datos = {
              Accion:'U',
              SQL:"UPDATE sgi_prop_conv_juez set  PCJU_EEVA_CODI=" + $scope.totalEvaluacion + " WHERE PCJU_CODI=" + idPropuesta

            }

            var update = TareasResource.SQL(datos);
              update.then(function() {
                    if ($scope.nombreDocumento==undefined ||  $scope.nombreDocumento=="")
                    {
                        datos = {
                            Accion:'U',
                            SQL:"UPDATE sgi_prop_conv_juez set  PCJU_EVAL_PROP_LINK=null,PCJU_EVAL_PROP_NOMB=null WHERE PCJU_CODI=" + idPropuesta

                          }

                      update = TareasResource.SQL(datos);
                        update.then(function() {

                          $window.alert("Actualizado");
                          $location.path('/edit-evaluador/'+idPropuesta );  

                        });

                    }  
                    else
                    {
                      $window.alert("Actualizado");
                        $location.path('/edit-evaluador/'+idPropuesta );  
                    }

              });
      }

  }


   $scope.uploadFile = function (arch) {
        
        if (arch.files[0].size>2000000)
        {
          $window.alert("El Archivo debe ser menor a 2 Megas");
          return;
        }

        fileDocumentoProyecto =arch.files[0];
         $scope.nombreDocumento = arch.files[0].name;      
        $scope.$apply();
    }


    $scope.EliminarDocumentoProyecto = function() {
      fileDocumentoProyecto=null;
      $scope.nombreDocumento="";

    }

});
