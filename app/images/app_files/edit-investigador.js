'use strict';

angular.module('listaTareasApp')
 
  .controller('editInvestigador', function($scope,$location,datosInvestigador,TareasResource,$route,$base64) {
    

    
  	$scope.viewDatos = datosInvestigador;

     $scope.Documento = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT TID_CODI,TID_NOMB FROM SGI_TIPO_DOCU'}); 

      $scope.Centro = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT CEN_CODI,CEN_NOMB FROM sgi_cent'}); 

       $scope.Programa = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT PAC_CODI,PAC_NOMB FROM sgi_prog_acad'}); 

       $scope.academico = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT PAC_CODI,PAC_NOMB FROM sgi_prog_acad'}); 

       $scope.formacion = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT NIV_CODI,NIV_NOMB FROM sgi_nive_form'}); 

        $scope.grupo = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT gru_codi_colc,gru_nomb FROM sgi_grup'}); 

       $scope.informacionacademica =TareasResource.execute.query({Accion: "S",
                         SQL: "SELECT NIN_NIV_CODI AS Codi,NIN_TITU_OBTE AS titulo,NIN_INST As Instituto, " +
                         " NIN_AGNO AS Agno, Concat(NIN_TITU_OBTE, ' ',NIN_INST, ' ',NIN_AGNO) As Nombre,'false' As Sel FROM sgi_nive_inve where " +
                         " NIN_INV_CODI =" + $route.current.params.idInvestigador + "" }); 
         


  		if($route.current.params.idInvestigador!='0') 
      { 	  		
  			$scope.buttonText = 'Actualizar';
        $scope.tiTulo ='Editando Investigador';
      }

  		else
      {
  			$scope.buttonText = 'Guardar';
         $scope.tiTulo ='Creando Investigador';
      }

         $scope.onchangedcentro = function(idCentro){

     

       $scope.Zona = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT Zona.ZON_NOMB FROM sgi_cent AS Centro INNER JOIN " +
                         "sgi_zona AS Zona ON  Centro.CEN_ZONA_CODI =Zona.ZON_CODI WHERE " +
                         "Centro.CEN_CODI =" + idCentro }); 

   };
    $scope.onChangedGrup = function(idGrupo){

      $scope.lineas = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT l.lin_codi,l.lin_desc FROM sgi_grup_line_inve AS g " + 
                         " INNER JOIN sgi_line_inve AS l ON g.gli_line_inve_codi=l.lin_codi " +
                         " WHERE g.gli_grup_codi_colc=" + idGrupo }); 

    };

   $scope.on_changedprograma = function(idPrograma){



       $scope.Programa2 = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT ESCUELA.ESC_NOMB FROM sgi_prog_acad AS PROGRAMA INNER JOIN " +
                         "sgi_escu AS ESCUELA ON  PROGRAMA.PAC_CODI = ESCUELA.ESC_CODI WHERE " +
                         "PROGRAMA.PAC_CODI =" + idPrograma }); 

   };

      $scope.agregarformacion = function(titu,tituloformacion,institucion,Agno) {
        $scope.informacionacademica.push({Nombre:titu + ' ' + tituloformacion + ' ' + institucion + ' ' + Agno,Sel:"false"});
        
      };

      $scope.delformacion = function() {
        for(var i=0;i<$scope.informacionacademica.length;i++)
        {
          if ($scope.informacionacademica[i].Sel==true)
          {
            $scope.informacionacademica.splice(i,1);
          }
        }
      };

      $scope.uploadFile = function (input) {
 
     if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
 
            //Sets the Old Image to new New Image
            $('#photo-id').attr('src', e.target.result);
 
            //Create a canvas and draw image on Client Side to get the byte[] equivalent
            var canvas = document.createElement("canvas");
            var imageElement = document.createElement("img");
 
            imageElement.setAttribute('src', e.target.result);
            canvas.width = 150;
            canvas.height =93;
            var context = canvas.getContext("2d");
            context.drawImage(imageElement, 0, 0);
            var base64Image = canvas.toDataURL("image/jpeg");
            $('#photo-id').attr('src', base64Image);
            //Removes the Data Type Prefix 
            //And set the view model to the new value

            $scope.viewDatos[0].inv_foto = base64Image.replace(/data:image\/jpeg;base64,/g, '');
           // $scope.viewDatos[0].inv_foto= $base64.decode($scope.viewDatos[0].inv_foto);
        }
          
        //Renders Image on Page
        reader.readAsDataURL(input.files[0]);
    }
};


  });




//   $scope.save = function(investigador){

    

//          var id = (investigador.INV_CODI) ? investigador.INV_CODI :'0' ;
        
    
//       if(id != '0')    
//       {
//         // $scope.sql = 'UPDATE "SGI_GRAN_AREA" set  "GAR_NOMB" =@@' + gran.GAR_NOMB + '@@ WHERE "GAR_CODI" =' + gran.GAR_CODI ;
        
//         // $scope.viewDatos= TareasResource.execute.query({Accion: 'M',
//         //                  SQL: "UPDATE SGI_AREA set  ARE_NOMB = '" + area.ARE_NOMB + "', " + 
//         //                  " ARE_GRAN_AREA_CODI=" + area.ARE_GRAN_AREA_CODI + " WHERE ARE_CODI =" + area.ARE_CODI }); 
//       }
//       else
//       {       

//         // $scope.maximo = TareasResource.execute.query({Accion: 'S',
//         //                  SQL: 'SELECT Max("GAR_CODI")  FROM  "SGI_GRAN_AREA"',
//         //                  isGrid: 'false'});
  

// // $scope.viewDatos2="INSERT INTO  SGI_INVE (INV_CODI,INV_APEL,INV_NOMB," + 
// //                           " INV_CENT_CODI,INV_FECH_NACI,INV_IDEN,INV_MAIL,INV_PROG_ACAD_CODI,INV_TELE_CELU, " +
// //                           " INV_TIPO_DOCU_CODI) " + 
// //                           " VALUES (@@,'" + investigador.INV_APEL + "','" + investigador.INV_NOMB + "'," + 
// //                            investigador.INV_CENT_CODI + ",'" + investigador.INV_FECH_NACI + "','" + investigador.INV_IDEN + "', '" +
// //                            investigador.INV_MAIL + "'," + investigador.INV_PROG_ACAD_CODI  + ",'" + investigador.INV_TELE_CELU + "'," +
// //                            investigador.INV_TIPO_DOCU_CODI + ")";

//       $scope.viewDatos2= TareasResource.execute.query({Accion: 'I',
//                          SQL: id + ";SGI_INVE;INV_CODI;INSERT INTO  SGI_INVE (INV_CODI,INV_APEL,INV_NOMB," + 
//                           " INV_CENT_CODI,INV_FECH_NACI,INV_IDEN,INV_MAIL,INV_PROG_ACAD_CODI,INV_TELE_CELU, " +
//                           " INV_TIPO_DOCU_CODI) " + 
//                           " VALUES (@@,'" + investigador.INV_APEL + "','" + investigador.INV_NOMB + "'," + 
//                            investigador.INV_CENT_CODI + ",'" + investigador.INV_FECH_NACI + "','" + investigador.INV_IDEN + "', '" +
//                            investigador.INV_MAIL + "'," + investigador.INV_PROG_ACAD_CODI  + ",'" + investigador.INV_TELE_CELU + "'," +
//                            investigador.INV_TIPO_DOCU_CODI + ")"}); 
//       }


//   $location.path('/investigador');
    
      
      
//     };  


  
    


  


























 //.directive('myCrearcentro', function(){
//     // Runs during compile
//     return {
//       // name: '',
//       // priority: 1,
//       // terminal: true,
//       // scope: {}, // {} = isolate, true = child, false/undefined = no change
//              controller: [ "$scope","$window",'$http','TareasResource','$q','$log', function($scope,$window,$http,TareasResource,$q,$log) {

//                 $scope.datosZona= TareasResource.execute.query({Accion: 'S',
//                          SQL: 'SELECT ZON_CODI,ZON_NOMB FROM SGI_ZONA'}); 

//                  function validoCentro(existe) {                                      

//                  $scope.viewDatos2= TareasResource.execute.query({Accion: 'I',
//                          SQL: "0" + ";SGI_CENT;CEN_CODI;INSERT INTO  SGI_CENT (CEN_CODI,CEN_NOMB,CEN_ZONA_CODI) " + 
//                          " VALUES (@@,'" + $scope.centro + "'," + $scope.zona + ")" }); 

//                   $scope.Centro = TareasResource.execute.query({Accion: 'S',
//                          SQL: 'SELECT CEN_CODI,CEN_NOMB FROM SGI_CENT'}); 
                   

//                      $('#myModal').modal('hide');
//                  };

//             $scope.salvarCentro = function() {
                
//               var diferir = $q.defer();

//                  diferir.promise.then(validoCentro);

//                 var existe = TareasResource.validaExisteRegistro.result({Tabla: "SGI_CENT",Campo: "CEN_NOMB",Valor: $scope.centro})

                  
//                   .$promise.then(function (existe) {
//                        diferir.resolve(existe);                       
//                   },
//                     function(error) {
//                      window.alert(error.data[0].msg);           
//           });
                  
                 

//                 };
               
//             }],
//       // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
//        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
//        template: '<div class="modal fade" id="myModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 
//                     '<div class="modal-dialog">' +
//         '<div class="modal-content">' +
//             '<div class="modal-header">' +
//                 '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
//                  '<h3 class="modal-title" id="myModalLabel">CREAR CENTRO</h3> ' +
//             '</div>' +
//             '<div class="modal-body"> ' +
//                  '<div class="row">' +
//                  '<div class="col-md-1">' +
//                  '<label>NOMBRE</label>' +
//                  '</div>' +  
//                  '</div>' +
//                  '<div class="row">' +    
//                  '<div class="col-md-12">' +
//                  '<input id="nameCentro" ng-model="centro" type="text" class="form-control" placeholder="Centro" autofocus required/>' +                      
//                  '</div>' +
//                  '</div>' + 
//                  '<div class="row">' +
//                  '<div class="col-md-1" style="margin-top:30px">' +
//                  '<label>ZONA</label>' +
//                  '</div>' +  
//                  '</div>' +
//                  '<div class="row">' +    
//                  '<div class="col-md-9">' +
//                  '<select class="form-control"  ng-model="zona"  ng-options="opt.ZON_CODI as opt.ZON_NOMB for opt in datosZona" required/>' +                      
//                  '</div>' +
//                  '</div>' + 
//                  '<h1>{{dato}}</h1>' +
//             '</div>' +
//             '<div class="modal-footer">' +
//                 '<button  class="btn btn-danger"  id="btnYes" ng-click= "salvarCentro();">Si</button>' +
//                 '<button type="button" class="btn btn-default" data-dismiss="modal"  >No</button>' +
//             '</div>' +        
//         '</div>' +        
//     '</div>' +    
// '</div>' +
// '</div>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     };
//   })

//  .directive('myButtoncentro', function(){
//     // Runs during compile
//     return {
//       // name: '',
//       // priority: 1,
//       // terminal: true,
//       // scope: {}, // {} = isolate, true = child, false/undefined = no change
//       restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
//        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
//             $scope.show = function() {

//               $('#myModal').modal('show');
                     
//                 };
               
//             }],
//       // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
       
//        template: '<button type="button" class="btn btn-default" ng-click= "show();">...</button>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     }
//   })

//   .directive('myCrearacedemico', function(){
//     return {
//           controller: [ "$scope","$window",'$http','TareasResource','$q','$log', function($scope,$window,$http,TareasResource,$q,$log) {
//                    $scope.datosEscuela= TareasResource.execute.query({Accion: 'S',
//                           SQL: 'SELECT ESC_CODI,ESC_NOMB FROM sgi_escu'}); 

//                  function validoAcademico(existe) {                                      

//                  $scope.viewResult= TareasResource.execute.query({Accion: 'I',
//                          SQL: "0" + ";sgi_prog_acad;PAC_CODI;INSERT INTO  sgi_prog_acad (PAC_CODI,PAC_NOMB,PAC_ESCU_CODI) " + 
//                          " VALUES (@@,'" + $scope.academico + "'," + $scope.Escuela + ")" }); 

//                   $scope.Escuela = TareasResource.execute.query({Accion: 'S',
//                          SQL: 'SELECT ESC_CODI,ESC_NOMB FROM sgi_escu'}); 
                   

//                      $('#myModalAcademico').modal('hide');
//                  };

//             $scope.salvaracademico = function() {
                
//               var diferir = $q.defer();

//                  diferir.promise.then(validoacademico);

//                 var existe = TareasResource.validaExisteRegistro.result({Tabla: "sgi_prog_acad",Campo: "PAC_NOMB",Valor: $scope.academico})

                  
//                   .$promise.then(function (existe2) {
//                        diferir.resolve(existe2);                       
//                   },
//                     function(error) {
//                      window.alert(error.data[0].msg);           
//           });
                  
                 

//       };
//           }],
//  restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
//        template: '<div class="modal fade" id="myModalAcademico"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">' + 
//                     '<div class="modal-dialog">' +
//         '<div class="modal-content">' +
//             '<div class="modal-header">' +
//                 '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
//                  '<h3 class="modal-title" id="myModalLabel2">CREAR ACADEMICO</h3> ' +
//             '</div>' +
//             '<div class="modal-body"> ' +
//                  '<div class="row">' +
//                  '<div class="col-md-1">' +
//                  '<label>NOMBRE</label>' +
//                  '</div>' +  
//                  '</div>' +
//                  '<div class="row">' +    
//                  '<div class="col-md-12">' +
//                  '<input id="nameAcademico" ng-model="academico" type="text" class="form-control" placeholder="Académico" autofocus required/>' +                      
//                  '</div>' +
//                  '</div>' + 
//                  '<div class="row">' +
//                  '<div class="col-md-1" style="margin-top:30px">' +
//                  '<label>ESCUELA</label>' +
//                  '</div>' +  
//                  '</div>' +
//                  '<div class="row">' +    
//                  '<div class="col-md-9">' +
//                   '<select class="form-control"  ng-model="escuela"  ng-options="opt.ESC_CODI as opt.ESC_NOMB for opt in datosEscuela" required/>' +                      
//                  '</div>' +
//                  '</div>' + 
//                  '<my-Crearescuela></my-Crearescuela>' +
//                  '<my-Buttonescuela></my-Buttonescuela> ' +
//             '</div>' +
//             '<div class="modal-footer">' +
//                 '<button  class="btn btn-danger"  id="btnYes2" ng-click= "salvarAcademico();">Si</button>' +
//                 '<button type="button" class="btn btn-default" data-dismiss="modal">No</button>' +
//             '</div>' +        
//         '</div>' +        
//     '</div>' +    
// '</div>' +
// '</div>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     };

//     })

  
//     .directive('myButtonacademico', function(){
//     // Runs during compile
//     return {
//       // name: '',
//       // priority: 1,
//       // terminal: true,
//       // scope: {}, // {} = isolate, true = child, false/undefined = no change
//       restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
//        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
//             $scope.showAcademico = function() {

//               $('#myModalAcademico').modal('show');
                     
//                 };
               
//             }],
//       // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
       
//        template: '<button type="button" class="btn btn-default" ng-click= "showAcademico();">...</button>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     }
//   })



// .directive('myButtongrupo', function(){
//     // Runs during compile
//     return {
//       // name: '',
//       // priority: 1,
//       // terminal: true,
//       // scope: {}, // {} = isolate, true = child, false/undefined = no change
//       restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
//        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
//             $scope.showGrupo = function() {

//               $('#myModalGrupo').modal('show');
                     
//                 };
               
//             }],
//       // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
       
//        template: '<button type="button" class="btn btn-default" ng-click= "showGrupo();">...</button>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     }
//   })

//   .directive('myCreargrupo', function(){
//     return {
//           controller: [ "$scope","$window",'$http','TareasResource','$q','$log', function($scope,$window,$http,TareasResource,$q,$log) {
//                    $scope.datosEscuela= TareasResource.execute.query({Accion: 'S',
//                           SQL: 'SELECT ESC_CODI,ESC_NOMB FROM sgi_escu'}); 

//                  function validogrupo(existe) {                                      

//                  $scope.viewResult= TareasResource.execute.query({Accion: 'I',
//                          SQL: "0" + ";sgi_prog_acad;PAC_CODI;INSERT INTO  sgi_prog_acad (PAC_CODI,PAC_NOMB,PAC_ESCU_CODI) " + 
//                          " VALUES (@@,'" + $scope.academico + "'," + $scope.Escuela + ")" }); 

//                   $scope.Escuela = TareasResource.execute.query({Accion: 'S',
//                          SQL: 'SELECT ESC_CODI,ESC_NOMB FROM sgi_escu'}); 
                   

//                      $('#myModalGrupo').modal('hide');
//                  };

//             $scope.salvargrupo = function() {
                
//               var diferir = $q.defer();

//                  diferir.promise.then(validoacademico);

//                 var existe = TareasResource.validaExisteRegistro.result({Tabla: "sgi_prog_acad",Campo: "PAC_NOMB",Valor: $scope.academico})

                  
//                   .$promise.then(function (existe2) {
//                        diferir.resolve(existe2);                       
//                   },
//                     function(error) {
//                      window.alert(error.data[0].msg);           
//           });
                  
                 

//       };
//           }],
//  restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
//        template: '<div class="modal fade" id="myModalGrupo"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">' + 
//                     '<div class="modal-dialog">' +
//         '<div class="modal-content">' +
//             '<div class="modal-header">' +
//                 '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
//                  '<h3 class="modal-title" id="myModalLabel2">CREAR GRUPO</h3> ' +
//             '</div>' +
//             '<div class="modal-body"> ' +
//                  '<div class="row">' +
//                  '<div class="col-md-1">' +
//                  '<label>NOMBRE</label>' +
//                  '</div>' +  
//                  '</div>' +
//                  '<div class="row">' +    
//                  '<div class="col-md-12">' +
//                  '<input id="nameAcademico" ng-model="academico" type="text" class="form-control" placeholder="Académico" autofocus required/>' +                      
//                  '</div>' +
//                  '</div>' + 
//                  '<div class="row">' +
//                  '<div class="col-md-1" style="margin-top:30px">' +
//                  '<label>ESCUELA</label>' +
//                  '</div>' +  
//                  '</div>' +                
//                  '<my-Crearescuela></my-Crearescuela>' +
//                  '<my-Buttonescuela></my-Buttonescuela> ' +
//             '</div>' +
//             '<div class="modal-footer">' +
//                 '<button  class="btn btn-danger"  id="btnYes2" ng-click= "salvarAcademico();">Si</button>' +
//                 '<button type="button" class="btn btn-default" data-dismiss="modal">No</button>' +
//             '</div>' +        
//         '</div>' +        
//     '</div>' +    
// '</div>' +
// '</div>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     };

//     })
  
// .directive('myButtonsemillero', function(){
//     // Runs during compile
//     return {
//       // name: '',
//       // priority: 1,
//       // terminal: true,
//       // scope: {}, // {} = isolate, true = child, false/undefined = no change
//       restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
//        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
//             $scope.showSemillero = function() {

//               $('#myModalSemillero').modal('show');
                     
//                 };
               
//             }],
//       // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
       
//        template: '<button type="button" class="btn btn-default" ng-click= "showSemillero();">...</button>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     }
//   })
//    .directive('myCrearsemillero', function(){
//     return {
//           controller: [ "$scope","$window",'$http','TareasResource','$q','$log', function($scope,$window,$http,TareasResource,$q,$log) {
//                    $scope.datosEscuela= TareasResource.execute.query({Accion: 'S',
//                           SQL: 'SELECT ESC_CODI,ESC_NOMB FROM sgi_escu'}); 

//                  function validogrupo(existe) {                                      

//                  $scope.viewResult= TareasResource.execute.query({Accion: 'I',
//                          SQL: "0" + ";sgi_prog_acad;PAC_CODI;INSERT INTO  sgi_prog_acad (PAC_CODI,PAC_NOMB,PAC_ESCU_CODI) " + 
//                          " VALUES (@@,'" + $scope.academico + "'," + $scope.Escuela + ")" }); 

//                   $scope.Escuela = TareasResource.execute.query({Accion: 'S',
//                          SQL: 'SELECT ESC_CODI,ESC_NOMB FROM sgi_escu'}); 
                   

//                      $('#myModalGrupo').modal('hide');
//                  };

//             $scope.salvargrupo = function() {
                
//               var diferir = $q.defer();

//                  diferir.promise.then(validoacademico);

//                 var existe = TareasResource.validaExisteRegistro.result({Tabla: "sgi_prog_acad",Campo: "PAC_NOMB",Valor: $scope.academico})

                  
//                   .$promise.then(function (existe2) {
//                        diferir.resolve(existe2);                       
//                   },
//                     function(error) {
//                      window.alert(error.data[0].msg);           
//           });
                  
                 

//       };
//           }],
//  restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
//        template: '<div class="modal fade" id="myModalSemillero"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">' + 
//                     '<div class="modal-dialog">' +
//         '<div class="modal-content">' +
//             '<div class="modal-header">' +
//                 '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
//                  '<h3 class="modal-title" id="myModalLabel2">CREAR SEMILLERO</h3> ' +
//             '</div>' +
//             '<div class="modal-body"> ' +
//                  '<div class="row">' +
//                  '<div class="col-md-1">' +
//                  '<label>NOMBRE</label>' +
//                  '</div>' +  
//                  '</div>' +
//                  '<div class="row">' +    
//                  '<div class="col-md-12">' +
//                  '<input id="nameAcademico" ng-model="academico" type="text" class="form-control" placeholder="Semillero" autofocus required/>' +                      
//                  '</div>' +
//                  '</div>' + 
//                  '<div class="row">' +
//                  '<div class="col-md-1" style="margin-top:30px">' +
//                  '<label></label>' +
//                  '</div>' +  
//                  '</div>' +                
//                  '<my-Crearescuela></my-Crearescuela>' +
//                  '<my-Buttonescuela></my-Buttonescuela> ' +
//             '</div>' +
//             '<div class="modal-footer">' +
//                 '<button  class="btn btn-danger"  id="btnYes2" ng-click= "salvarAcademico();">Si</button>' +
//                 '<button type="button" class="btn btn-default" data-dismiss="modal">No</button>' +
//             '</div>' +        
//         '</div>' +        
//     '</div>' +    
// '</div>' +
// '</div>',
//       // templateUrl: '',
//       // replace: true,
//       // transclude: true,
//       // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//       link: function($scope, iElm, iAttrs, controller) {
        
//       }
//     };

//     })