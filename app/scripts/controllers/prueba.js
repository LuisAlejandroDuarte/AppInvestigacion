'use strict';
var Directiva = angular.module("Directiva", []);
 
Directiva.controller("directivaController", function($scope){

});
 
 

    
Directiva.directive('chispas', function () {
      return {
        restrict: 'E',
        link: function postLink(scope, element) {
           element.text('Mi primera directiva: chispas');
        }
      };
    })