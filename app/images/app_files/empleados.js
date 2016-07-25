'use strict';

angular.module('listaTareasApp')
  .controller('ControladorEmpleados', function($scope, TareasResource) {
    $scope.empleados = TareasResource.empleados.query();

    $scope.ordenarPor = function(orden) {
      $scope.ordenSeleccionado = orden;
    };
  });