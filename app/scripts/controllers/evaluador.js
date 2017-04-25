'use strict';

angular.module('listaTareasApp')
  .controller('EvaluadorCtrl', function($scope,$location,TareasResource,$route,$window) {
    	
      var user = JSON.parse($window.sessionStorage.getItem('usuario'));

    if (user==null || user==undefined)
    {

      $location.path('/inicio');
      return;
    }   
    else

         $scope.$parent.mnuConvocatoria = true;                          
		 
     	
	 $scope.save = function(usuario){

	 

	 		
	 				var	datos ={
	 						Accion:'S',
	 						SQL:"SELECT COUNT(*) As Cuantos FROM sgi_user WHERE USE_IDEN='" + usuario.USE_IDEN + "'"
	 					}

					var executesql = TareasResource.SQL(datos);	
						executesql.then(function(result){

						if (result.data[0].Cuantos>0)
						{
							$window.alert("La identificacion ya existe");
							return;
						}
						else
						{
							datos ={
	 							Accion:'S',
	 							SQL:"SELECT COUNT(*) As Cuantos FROM sgi_user WHERE USE_USUA='" + usuario.USE_USUA + "'"
	 						}

							executesql = TareasResource.SQL(datos);	
								executesql.then(function(result){

									if (result.data[0].Cuantos>0)
									{
										$window.alert("El usuario ya existe");
										return;
									}
									else
									{
										datos = {
	 										Accion:"I",
	 										SQL:"INSERT INTO sgi_user (USE_IDEN,USE_NOMB,USE_APEL,USE_EMAI,USE_TELE,USE_USUA,USE_CLAV,USE_COD_TIPO) " +
	 										" VALUES ('" +  usuario.USE_IDEN + "','" +  usuario.USE_NOMB +"','" +  usuario.USE_APEL +"'," + 
	 										"'" +  usuario.USE_EMAI +"','" +  usuario.USE_TELE +"','" +  usuario.USE_USUA + "','" +  md5(usuario.USE_USUA) + "',2)"
	 										}

	 									executesql = TareasResource.SQL(datos);
	 										executesql.then(function(result){

	 											usuario.USE_IDEN ="";
	 											usuario.USE_NOMB="";
	 											usuario.USE_APEL="";
	 											usuario.USE_EMAI="";
	 											usuario.USE_TELE="";
	 											usuario.USE_USUA="";
	 											$window.alert("Evaluador Creado");
 				
	 								});
								}

							});
						}

					});

	 		
		}	
	 

	 $scope.onClickPassword = function(user)
	 {

	 	

	 	if (user=="")
	 	{
	 		$window.alert("Debe digitar un usuario");
	 		return;
	 	}

	 	var datos = {
	 			Accion:"U",
	 			SQL:"UPDATE sgi_user set " +	 				
	 				" USE_CLAV = '" + md5(user) + "'"  +
	 				" WHERE USE_CODI = " + id	 					
	 		}

	 		var usuario = TareasResource.SQL(datos);
	 			usuario.then(function(rersult){

	 				$window.alert('la clave se cambio por el nombre de Usuario');
	 				

	 			});
	 }

 });