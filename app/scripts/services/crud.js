'use strict';



var config = {

headers: { 'Content-Type': 'application/x-www-form-urlencoded'}

};


var acentos = {

	headers : {"Content-Type": "text/html;charset=utf-8"}
}


angular.module('listaTareasApp')

  .factory('TareasResource', function($resource,$http) {

    var servicio = {



		login: $resource('scripts/services/api.php?url=login', {}, {

		query: {method: 'GET', params: {Usuario: '@Usuario',Contrasena: '@Contrasena'},isArray:true}	

			}),



		empleados: $resource('scripts/services/api.php?url=grupo'),



		granareas: $resource('scripts/services/api.php?url=granarea'),



		getIdGranArea: $resource('scripts/services/api.php?url=granareaId', {}, {

		query: {method: 'POST',params: {IdGranArea: '@IdGranArea'}}

		}),



		updateGranArea: $resource('scripts/services/api.php?url=updateGranArea', {}, {

		query: {method: 'POST',params: {IdArea: '@idArea', IdGranArea: '@datosGranArea'}}

		}),



		

		

		insertGranArea: $resource('scripts/services/api.php?url=insertGranArea', {}, {

		query: {method: 'POST',params: {IdArea: '@idArea', IdGranArea: '@datosGranArea'}}

		}),		



		updateArea: $resource('scripts/services/api.php?url=updateArea', {}, {

		query: {method: 'POST',params: {IdArea: '@idArea',idGranArea: '@idGranArea', nombreArea: '@nombreArea'}}

		}),



		insertArea: $resource('scripts/services/api.php?url=insertArea', {}, {

		query: {method: 'POST',params: {datosArea: '@datosArea'}}

		}),



		getIdArea: $resource('scripts/services/api.php?url=areaId', {}, {

		query: {method: 'POST',params: {IdArea: '@IdArea'}}

		}),







		validaExisteRegistro: $resource('scripts/services/api.php?url=validaExisteRegistro/:Tabla/:Campo/:Valor', {

										Tabla: '@Tabla',

										Campo: '@Campo',

										Valor: '@Valor'}, {

		query: {method: 'GET',isArray:true}	

			}),



		// execute: $resource('scripts/services/api.php?url=executeSQL/:Accion/:SQL', {

		// 								Accion: '@Accion',

		// 								SQL: '@SQL'},{

		// query: {method: 'GET',isArray:true}

		// 	})



		execute: $resource('scripts/services/api.php?url=execute', {},{										

		query: {method: 'POST',params:{Accion: '@Accion',SQL: '@SQL'},isArray:true}

			}),





		createProyectoProducto: $resource('scripts/services/api.php?url=createProyectoProducto', {},{										

		query: {method: 'POST',params:{Lista: '@Lista',idProy: '@idProy',idInve:'@idInve'},isArray:true}

			}),





		enviararchivo: function(datos){

    	  	

    	  	// var data = {

    	  	// 	Accion : Accion,

    	  	// 	SQL : SQL    	  		

    	  	// };

                     

    	  	  return $http.post('scripts/services/enviar.php', datos);  

		},



	    enviarProyectoProducto: function(datos){    	  	                     

    	  	  return $http.post('scripts/services/proyecto.php', datos);  

		},



			SQL : function(datos) {



	  		  return $http.post('scripts/services/executesql.php', datos,config);  



	  	},


	  	PDF : function(datos) {
	  				return  $http({
	  				
		  				method: "post",
						url: 'scripts/services/pdf.php',
			            data: datos,
	        		    transformRequest: angular.identity,
	            		headers: { 'Content-Type': 'application/json' },
	            		responseType: 'arraybuffer'  					

  				},

  				 function errorCallback(response) {

    				// called asynchronously if an error occurs

    				// or server returns response with an error status.

  					});     				                      	  

			},

		
		PdfConvocatoria : function(datos) {
	  				return  $http({
	  				
		  				method: "post",
						url: 'scripts/services/pdfConvocatoria.php',
			            data: datos,
	        		    transformRequest: angular.identity,
	            		headers: { 'Content-Type': 'application/json' },
	            		responseType: 'arraybuffer'  				

  				},

  				 function errorCallback(response) {

    				// called asynchronously if an error occurs

    				// or server returns response with an error status.

  					});     				                      	  

			},	

	  	SQLMulti : function(datos) {



	  		  return $http.post('scripts/services/executesqlmulti.php', datos);  



	  	},

	  	enviararchivobinario: function(datos){

    	  	

    	return  $http({

  					method: 'post',

  					url: 'scripts/services/enviarbinario.php',

  					data:datos,

  					transformRequest: angular.identity,

  					enctype:'multipart/form-data',

            		headers: {'Content-Type': undefined}

  				},

  				 function errorCallback(response) {

    				// called asynchronously if an error occurs

    				// or server returns response with an error status.

  					});     				                      	  

			},



		borrarbinario: function(datos){

    	  	

    	return  $http({

  					method: 'post',

  					url: 'scripts/services/borrarbinario.php',

  					data:datos,

  					transformRequest: angular.identity,

            		headers: {'Content-Type': undefined}

  				},

  				 function errorCallback(response) {

    				// called asynchronously if an error occurs

    				// or server returns response with an error status.

  					});     				                      	  

			},

		descargarbinario: function(datos){

    	  	

    	return  $http({

  					method: 'post',

  					url: 'scripts/services/descargarbinario.php',

  					data:datos,

  					transformRequest: angular.identity,

            		headers: {'Content-Type': undefined}

  				},

  				 function errorCallback(response) {

    				// called asynchronously if an error occurs

    				// or server returns response with an error status.

  					});     				                      	  

			}					



		};

    return servicio;

  });

  