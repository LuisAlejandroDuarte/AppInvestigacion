'use strict';

angular.module('listaTareasApp')
  .controller('editUsuario', function($scope,$location,datosUsuario,TareasResource,$route,$window) {
    	var id;
    	var identificacion;
    	$scope.disabledTipoUsuario = ($window.sessionStorage.getItem('tipoUsuario')==-1) ? true:false;
  		 datosUsuario.$promise.then(function(result){

  		 	$scope.viewDatos= result;

  		 	identificacion = result[0].USE_IDEN;

  		 	  id = ($route.current.params.idUsuario) ? parseInt($route.current.params.idUsuario) :0 ;
  		
		  		if(id > 0)  	  		
		  			{
		          $scope.buttonText = 'Actualizar';
		          $scope.tiTulo ='Editando Usuario';
		        }
		  		else
			      {
			  			$scope.buttonText = 'Guardar';
			         $scope.tiTulo ='Creando Usuario';
			      }		
				
				$scope.admin=true;
				$scope.investigador = true;
				if (id==-1)
				{
					$scope.admin=false;
					$scope.investigador = true;
				}			            	

  		 });

     	
	 $scope.volver = function()
	 {
	 	if (id==-1)
	 	{
	 		 $location.path('/inicio');
	 		 return;
		}
	 	 $location.path('/usuario');
	 	
	 }
     	
	 $scope.save = function(usuario){

	 	if (id==0 || id==-1)
	 	{

	 		var executesql = TareasResource.SQL(datos);
	 			executesql.then(function(result){
	 					datos ={
	 						Accion:'S',
	 						SQL:"SELECT COUNT(*) As Cuantos FROM sgi_user WHERE USE_IDEN='" + usuario.USE_IDEN + "'"
	 					}

					executesql = TareasResource.SQL(datos);	
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
	 										"'" +  usuario.USE_EMAI +"','" +  usuario.USE_TELE +"','" +  usuario.USE_USUA + "','" +  md5(usuario.USE_USUA) + "'," + usuario.USE_COD_TIPO + ")"
	 										}

	 									executesql = TareasResource.SQL(datos);
	 										executesql.then(function(result){
	 										datos ={
	 											Accion:'S',
	 											SQL:"SELECT MAX(USE_CODI) As Maximo FROM sgi_user"
	 											}

											executesql = TareasResource.SQL(datos);	 					
	 										executesql.then(function(result){

	 										if (usuario.USE_COD_TIPO==1)
	 											{	
	 						   						datos ={
					        						Accion: 'I',
								        			SQL: "0;sgi_inve;INV_CODI;INSERT INTO  sgi_inve (INV_CODI,INV_IDEN,INV_TIPO_DOCU_CODI, " +
								        			" INV_NOMB,INV_APEL,INV_FECH_NACI,INV_MAIL,INV_CODI_USUA,INV_PASS,INV_TELE_CELU) " + 
								        			" VALUES (@@,'" +  usuario.USE_IDEN + "',1,'" + 
								        			usuario.USE_NOMB + "','" + usuario.USE_APEL + "','" + moment(new Date()).format('YYYY-MM-DD')  + "','" + 
								        			usuario.USE_EMAI + "'," + result.data[0].Maximo + ",'" + md5(usuario.USE_USUA) + "','" + usuario.USE_TELE + "')"
			      									};       

									      	TareasResource.enviararchivo(datos).then(function(result) { 
									      	$window.alert('Ingresado');
									      		if (id==-1)  
									      		{
									      			$location.path('/inicio');
									      			return;
									      		}					 				 			
										      });
						 					}
						 					else
						 					{
						 							$window.alert('Ingresado');
						 							$location.path('/usuario');
						 					}
					 					});
 				
	 								});
								}

							});
						}

					});

	 		});
		}
	 	else
	 	{
			var datos = {
	 			Accion:"U",
	 			SQL:"UPDATE sgi_user set " +
	 				" USE_IDEN = '" + usuario.USE_IDEN  + "', " +
	 				" USE_NOMB = '" +  usuario.USE_NOMB + "', " + 
	 				" USE_APEL = '" +  usuario.USE_APEL + "', " + 
	 				" USE_EMAI = '" +  usuario.USE_EMAI + "', " + 
	 				" USE_TELE = '" +  usuario.USE_TELE + "', " + 
	 				" USE_USUA = '" +  usuario.USE_USUA + "', " + 
	 				" USE_COD_TIPO = " + usuario.USE_COD_TIPO  +
	 				" WHERE USE_CODI = " + id	 					
	 		}

	 		var usuario = TareasResource.SQL(datos);
	 			usuario.then(function(rersult){

	 				$window.alert('Actualizado');
	 				 $location.path('/usuario');

	 			});

	 	}
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