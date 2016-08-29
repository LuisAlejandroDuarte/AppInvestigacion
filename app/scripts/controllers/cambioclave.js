'use strict';

angular.module('listaTareasApp')
  .controller('cambioclave', function($scope,$location,TareasResource,$route,$window) {

  	 var user = JSON.parse($window.sessionStorage.getItem('usuario'));

  	$scope.save = function() {

  		var datos = {

  			Accion:"S",
  			SQL:"Select * from sgi_user where USE_USUA='" + user.Usuario + "' and USE_CLAV='" + md5($scope.claveactual)  + "' "

  		};

  	var selectUsuario	= TareasResource.SQL(datos);
  		selectUsuario.then(function(result) {

  			if (result.data[0]==null)
  			{
  				$window.alert("La clave actual no corresponde con la escrita");
  				return;
  			}

  			if ($scope.repitaclave !=$scope.nuevaclave)
  			{
  				$window.alert("La nueva clave y repitir clave no coinciden");
  				return;
  			}

		datos = {

  			Accion:"U",
  			SQL:"Update sgi_user set USE_CLAV='" + md5($scope.nuevaclave) + "' where USE_CODI=" + user.Id

  		};

  			selectUsuario	= TareasResource.SQL(datos);
  			selectUsuario.then(function(result) {

  				$window.alert(result.data[0].msg);
  				  $scope.$parent.mnuInvestiga =false;
			      $scope.$parent.mnuAdmin=false;
      			  $window.sessionStorage.setItem('usuario',null);
                  $window.sessionStorage.setItem('investigador',null);

  				$location.path('/inicio');

  			});
  		});

  	}


  	$scope.volver = function(){

  		$scope.$parent.mnuInvestiga =false;
		$scope.$parent.mnuAdmin=false;
      	$window.sessionStorage.setItem('usuario',null);
        $window.sessionStorage.setItem('investigador',null);
        $location.path('/inicio');

  	}
  		

  });