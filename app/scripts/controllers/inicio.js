'use strict';

angular.module('listaTareasApp')

  .directive('myUsuario', [function () {
    return {
      restrict: 'AE',     
       controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
       }],
        template : '<div class="modal fade" id="myModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 
                    '<div class="modal-dialog">' +
        '<div class="modal-content">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title" id="myModalLabel">Validación Usuario</h4>' +
            '</div>' +
            '<div class="modal-body"> ' +
                 '<h4> Usuario o clave incorrectos </h4> ' +
                  '<div><label id="nombreCentro"></label>' +
            '</div>' +
            '<div class="modal-footer">' +                
                '<button type="button" class="btn btn-default" data-dismiss="modal"  >ACEPTAR</button>' +
            '</div>' +        
        '</div>' +        
    '</div>' +    
'</div>' +
'</div>'
    };
  }])


  .controller('InicioCtrl',['$scope','$modal','$document', '$q', 'TareasResource', '$log', '$cookieStore', '$location','$window', function ($scope,$modal,$document, $q, TareasResource, $log, $cookieStore, $location,$window) {
      
      if ( $window.sessionStorage.getItem('usuario') == "")
      {
          $scope.$parent.mnuInvestiga =false;
            $scope.$parent.mnuAdmin = false;
            $scope.$parent.mnuConvocatoria = false;
      }

     var inicioSesion = $q.defer();

    inicioSesion.promise.then(usrASesion);
 

    function usrASesion(usr) {
   
     
        
        $scope.usrConectado.nombre = usr[0].Usuario;
         $scope.usrConectado.puesto = 1;
       //  $scope.estado = usr.show;
        $scope.usrConectado.estaConectado = true;
       // $scope.usrConectado.Id = usr.Id_inve;      

         $cookieStore.put('estaConectado', true);
         $cookieStore.put('usuario', usr);
         $window.sessionStorage.setItem('usuario', JSON.stringify(usr[0]));

         if (usr[0].Id_tipo==0 && $scope.seleccionado==0)
         {
            $scope.$parent.mnuAdmin = true;           

             $location.path('/usuario');
            
             return;
         }

          if ($scope.seleccionado==1 && usr[0].Id_tipo==1)
          {
            $scope.$parent.mnuInvestiga =true;
            $scope.$parent.mnuAdmin = false;
            $scope.$parent.mnuConvocatoria = false;

            var executesql = TareasResource.SQL({Accion:'S',SQL:'SELECT INV_CODI FROM sgi_inve WHERE INV_CODI_USUA=' + usr[0].Id});
                executesql.then(function(result){
                   $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));
                     $scope.$parent.idInve= result.data[0].INV_CODI
                  $location.path('/edit-investigador/'+ result.data[0].INV_CODI );
                  return;
                });            
            
          }

         if ($scope.seleccionado=="2")
         {
           var executesql = TareasResource.SQL({Accion:'S',SQL:'SELECT INV_CODI FROM sgi_inve WHERE INV_CODI_USUA=' + usr[0].Id});
                executesql.then(function(result){
                   $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));
            $location.path('/grupo');
            return;
          });
         }

        

          if ($scope.seleccionado=="3" &&  usr[0].Id_tipo==1)
         {
            $location.path('/convocatoria');

         }
       
          if ($scope.seleccionado=="4")
         {
          $scope.$parent.mnuInvestiga =false;
            $scope.$parent.mnuAdmin = false;
            $scope.$parent.mnuConvocatoria = false;
           var executesql = TareasResource.SQL({Accion:'S',SQL:'SELECT INV_CODI FROM sgi_inve WHERE INV_CODI_USUA=' + usr[0].Id});
                executesql.then(function(result){
                   $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));
            $location.path('/semillero');
            return;
          });
         }



    };
    

    $scope.showRegistrarse = function(){
      $location.path('/edit-usuario/-1');
    }  

     $scope.iniciarSesion = function() {
   
  var usr = TareasResource.login.query({Usuario: $scope.usuario, Contrasena: md5($scope.clave)})


  
            usr.$promise.then(function(usr) { 
              
           inicioSesion.resolve(usr);         
        },
          function(error) {
                     $('#myModal').modal('show'); 
          });
        }
          }]);

   