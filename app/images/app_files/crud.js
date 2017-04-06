'use strict';
angular.module('listaTareasApp')
  .factory('TareasResource', function($resource) {
    var servicio = {

		login: $resource('scripts/services/api.php?url=login', {}, {
		result: {method: 'GET', params: {Usuario: '@Usuario',Contrasena: '@Contrasena'},isArray:true}	
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
		result: {method: 'GET',isArray:true}	
			}),

		execute: $resource('scripts/services/api.php?url=executeSQL/:Accion/:SQL', {
										Accion: '@Accion',
										SQL: '@SQL'},{
		query: {method: 'GET',isArray:true}
			})
		};
    return servicio;
  });
  