'use strict';

angular.module('listaTareasApp')
  .controller('InicioCtrl',['$scope','$modal','$document', '$q', 'TareasResource', '$log', '$cookieStore', '$location', function ($scope,$modal,$document, $q, TareasResource, $log, $cookieStore, $location) {
   
    // $scope.iniciarSesion = function() {
    //   // var usr = TareasResource.iniciar.sesion({nombreUsuario: $scope.usuario.nombreUsuario, clave: $scope.usuario.clave})
    //   //   .$promise.then(function(usr) {
    //   //     inisioSesion.resolve(usr);
    //   //   });
    //   $scope.dato = TareasResource.objeto.query({Usuario: $scope.usuario, Contrasena: $scope.clave});
    // };
    // 
       

     var inicioSesion = $q.defer();

    inicioSesion.promise.then(usrASesion);
 

    function usrASesion(usr) {
   
  

        $scope.usrConectado.nombre = usr.usuario;
         $scope.usrConectado.puesto = 1;
       //  $scope.estado = usr.show;
        $scope.usrConectado.estaConectado = true;
        $scope.usrConectado.Id = usr.Id_inve;

         $log.info($scope.usrConectado);

         $cookieStore.put('estaConectado', true);
         $cookieStore.put('usuario', usr);

         if ($scope.seleccionado=="2")
         {
            $location.path('/grupo');
         }

         if ($scope.seleccionado=="1")
         {
            $location.path('/edit-investigador/'+ usr[0].Id );

         }

          if ($scope.seleccionado=="3")
         {
            $location.path('/convocatoria');

         }
       
        
    };
    

    $scope.showRegistrarse = function(){
      $location.path('/edit-investigador/0');
    }  

     $scope.iniciarSesion = function() {
   
  var usr = TareasResource.login.query({Usuario: $scope.usuario, Contrasena: md5($scope.clave)})


  
            usr.$promise.then(function(usr) { 
              
           inicioSesion.resolve(usr);         
        },
          function(error) {
            $scope.result = error.data[0].msg;    
              var modalInstance = $modal.open({
         templateUrl: 'myModalContent.html',
         controller: 'ModalInstanceCtrl',
          resolve: {
            result: function () {
              return $scope.result;
        }
      }
     
    });        
          });
        }
          }]);

angular.module('listaTareasApp')
.controller('ModalInstanceCtrl',['$scope', '$modalInstance', 'result', function ($scope, $modalInstance, result) {

  $scope.result = result;
  
  $scope.cerrar = function () {
    $modalInstance.dismiss('cerrar');
  };
 
}]);
   // var datos =  angular.fromJson

   //    if ($scope.dato == 'false')
   //    {
   //         $scope.usrConectado.nombre = usr.Usuario;
   //       $scope.usrConectado.puesto = 1;
   //     //  $scope.estado = usr.show;
   //      $scope.usrConectado.estaConectado = true;
   //      $scope.usrConectado.Grupo = true;

   //       $log.info($scope.usrConectado);

   //       $cookieStore.put('estaConectado', true);
   //       $cookieStore.put('usuario', usr);

   //      // $location.path('/main');
   //    }
   //    else
   //    {
   //             $scope.result = usr.message;
   //    var modalInstance = $modal.open({
   //       templateUrl: 'myModalContent.html',
   //       controller: 'ModalInstanceCtrl',
   //        resolve: {
   //          result: function () {
   //            return $scope.result;
   //      }
   //    }
     
    //});
  


    //     .$promise.then(function(usr) {
    // $scope.estado = usr.show;
    //        inicioSesion.resolve(usr);

         
    //     });
     
      
	     // $scope.dato= TareasResource.objeto.query({Usuario: $scope.usuario, Contrasena: $scope.clave});
      //  var d = $scope.dato;
 // $scope.result = 'Ho existe';
 //      var modalInstance = $modal.open({
 //         templateUrl: 'myModalContent.html',
 //         controller: 'ModalInstanceCtrl',
 //          resolve: {
 //            result: function () {
 //              return $scope.result;
 //        }
 //      }
     
 //    });

 //       modalInstance.result.then(function (selectedItem) {
 //      $scope.selected = selectedItem;
 //    }, function () {
 //      $log.info('Modal dismissed at: ' + new Date());
 //    });






//carrera 28 56 -57 apto 301
//ing rodriguez