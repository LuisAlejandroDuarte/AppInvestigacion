'use strict';

angular.module('listaTareasApp')

.directive('mostrariconoespera',function(){

   return {
        restrict : 'AE',   
          template : '<div id="myModal">' +
                     
                        '<div class="imagewait">' +
                          '<div class="showait">  </div>' + 
                          '</div>' +
                      '</div>',

      }

})


  .controller('editConvocatoria', function($scope,$window,$location,datosConvocatoria,TareasResource,$route) {
    var nombOld;
    var fileText;
    var fileReso;
       $('#myModal').show();  
        var tipoConvocatoria = TareasResource.execute.query({Accion: 'S',
                             SQL: 'SELECT TCO_CODI,TCO_DESC FROM sgi_tipo_conv'}); 
        tipoConvocatoria.$promise.then(function(result){
              $scope.tipoConvocatoria = result;

              datosConvocatoria.$promise.then(function(result){                 
                    $('#myModal').hide(); 
                var id = ($route.current.params.idConvocatoria) ? parseInt($route.current.params.idConvocatoria) :0 ;
                  if (id>0)
                  {
                    moment.utc();
                     moment.locale('es');
                    result[0].CON_FECH_FINA = moment(result[0].CON_FECH_FINA).format("D-MMMM-YYYY");
                    result[0].CON_FECH_INIC = moment(result[0].CON_FECH_INIC).format("D-MMMM-YYYY");
                  
                  $scope.viewDatos = result;
                  $scope.viewDatos[0].CON_PUNT_TOTA = parseInt(result[0].CON_PUNT_TOTA);
                  nombOld = $scope.viewDatos[0].CON_DESC;

                  if (result[0].CON_TEXT!=null) $scope.nombreArchivoTexto =result[0].CON_TEXT;
                  if (result[0].CON_RESO!=null) $scope.nombreArchivoResolucion =result[0].CON_RESO;

                   $scope.buttonText = 'Actualizar';
                      $scope.tiTulo ='Editando Convocatoria';
                 }                                   
                    else
                    {
                      if ($scope.viewDatos==undefined)                        
                      {
                       $scope.viewDatos=[]; 
                        $scope.viewDatos.splice(0,0,{});

                       //$scope.viewDatos[0]=[];                           
                      }

                        $scope.viewDatos[0].CON_FECH_FINA = moment(new Date()).format("DD-MMMM-YYYY");
                        $scope.viewDatos[0].CON_FECH_INIC = moment(new Date()).format("DD-MMMM-YYYY");
                      $scope.buttonText = 'Guardar';
                      $scope.tiTulo ='Creando Convocatoria';
                    }

              });
        });

  
               
     $scope.uploadFileTexto = function (arch) {
 
		     var tipo;
		 	 var replace;

       fileText = arch.files[0];

		    // if (arch.files[0].size>7500000)
		    // {
		    //   $window.alert("El Archivo debe ser menor a 7 Megas");
		    //   return;
		    // }

		     $scope.nombreArchivoTexto = arch.files[0].name;


		   //  tipo = arch.files[0].type.split("\/");
		    // var fs = require('fs');

		    // fs.createReadStream(arch.value).pipe(fs.createWriteStream('/AppInvestigacion/' + arch.value));
		     
		     // var reader = new FileReader();
		     //    reader.onload = function (e) {
		     //        var dato = e.target.result;               		           
		     //        $scope.viewDatos[0].CON_TEXT = dato;                    
		     //    }
		     // reader.readAsDataURL(arch.files[0]);        

		    //   var fd = new FormData();
		    // //Take the first selected file
		    // fd.append("file", arch.files[0]);

		    //   $http.post('/AppInvestigacion', fd, {
		    //     withCredentials: true,
		    //     headers: {'Content-Type': undefined }
		    // }).success('').error('ffd');
		    $scope.$apply();
    }

         $scope.uploadFileResolucion = function (arch) {
 
         var tipo;
       var replace;

        if (arch.files[0].size>7500000)
        {
          $window.alert("El Archivo debe ser menor a 7 Megas");
          return;
        }

         $scope.nombreArchivoResolucion = arch.files[0].name;

         fileReso = arch.files[0];

      //   tipo = arch.files[0].type.split("\/");
        // var fs = require('fs');

        // fs.createReadStream(arch.value).pipe(fs.createWriteStream('/AppInvestigacion/' + arch.value));
         
         // var reader = new FileReader();
         //    reader.onload = function (e) {
         //        var dato = e.target.result;               
         //        $scope.viewDatos[0].CON_RESO = dato;                    
         //    }
         // reader.readAsDataURL(arch.files[0]);        

        //   var fd = new FormData();
        // //Take the first selected file
        // fd.append("file", arch.files[0]);

        //   $http.post('/AppInvestigacion', fd, {
        //     withCredentials: true,
        //     headers: {'Content-Type': undefined }
        // }).success('').error('ffd');
        $scope.$apply();
    }

     function formatoFecha(fecha) {
           var mes;   
         var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];


         var dat = fecha.split("-");

        if (dat[1]==Meses[0] || dat[1]=="01") mes ="01";
        if (dat[1]==Meses[1] || dat[1]=="02") mes ="02";
        if (dat[1]==Meses[2] || dat[1]=="03")  mes ="03";
        if (dat[1]==Meses[3] || dat[1]=="04") mes ="04";
        if (dat[1]==Meses[4] || dat[1]=="05") mes ="05";
        if (dat[1]==Meses[5] || dat[1]=="06") mes ="06";
        if (dat[1]==Meses[6] || dat[1]=="07") mes ="07";
        if (dat[1]==Meses[7] || dat[1]=="08") mes ="08";
        if (dat[1]==Meses[8] || dat[1]=="09") mes ="09";
        if (dat[1]==Meses[9] || dat[1]=="10") mes ="10";
        if (dat[1]==Meses[10] || dat[1]=="11") mes ="11";
        if (dat[1]==Meses[11] || dat[1]=="12") mes ="12";

          if (isNaN(dat[1])==false)

            return dat[0] + "-" + mes + "-" + dat[2];
          else
            return dat[2] + "-" + mes + "-" + dat[0];         

      }

    $scope.save = function(reg){

       var id = (reg.CON_CODI) ? parseInt(reg.CON_CODI) :0;


   var valida =TareasResource.validaExisteRegistro.query({Tabla:'sgi_conv',Campo:'CON_DESC',Valor:reg.CON_DESC });
      $('#myModal').show();
        valida.$promise.then(function(result){
           $('#myModal').hide();
        if (result[0]['existe']=="true" && nombOld!=reg.CON_DESC)
        {
            $window.alert('Ya existe la descripción');                 
          }
        else
        {


             if (id==0)
             {
              


              var datos =  {
                  Accion: 'ADJUNTO',
                  SQL: "INSERT INTO  sgi_conv (CON_NUME,CON_DESC,CON_FECH_INIC,CON_FECH_FINA,CON_TIPO_CONV_CODI, CON_PUNT_TOTA)" +
                  " VALUES (" + reg.CON_NUME + ",'" + reg.CON_DESC + "'," +
                  " '" + moment(new Date(reg.CON_FECH_INIC)).format('YYYY-MM-DD') + "','" + moment(new Date(reg.CON_FECH_FINA)).format('YYYY-MM-DD') + "'," + reg.CON_TIPO_CONV_CODI + "," + reg.CON_PUNT_TOTA + ")"
              };
               $('#myModal').show();
               TareasResource.enviararchivo(datos).then(function(result) { 
                  
                  var idConvocatoria = result.data.split('@')[1];

                    if (fileText!=undefined)
                    {
                    var fd = new FormData();
                    //fileText.name = fileText.name . idConvocatoria;
                   fd.append('file', fileText);                   
                   fd.append('id',idConvocatoria);

                   fd.append('tipo',1);

                     TareasResource.enviararchivobinario(fd).then(function(result1) { 

                        datos ={
                          Accion:'U',
                          SQL:"UPDATE sgi_conv set CON_TEXT='id_" + idConvocatoria + "_" + fileText.name + "' WHERE CON_CODI=" + idConvocatoria
                        }                         

                        TareasResource.SQL(datos).then(function(resut){

                               $('#myModal').hide(); 

                        });

                                                                  
                     });
                   }     
                if (fileReso!=undefined)
                    {
                        var fd2 = new FormData();                                
                        fd2.append('file', fileReso);
                        fd2.append('id',idConvocatoria);
                        fd2.append('tipo',2);
                        TareasResource.enviararchivobinario(fd2).then(function(result2) { 

                         datos ={
                          Accion:'U',
                          SQL:"UPDATE sgi_conv set CON_RESO='id_" + idConvocatoria + "_" + fileReso.name + "' WHERE CON_CODI=" + idConvocatoria
                        }                         

                        TareasResource.SQL(datos).then(function(resut){

                               $('#myModal').hide(); 

                               });                                                          
                          });
                    }   

                     $('#myModal').hide();     
                     $window.alert("INGRESADO");           
                     $location.path('/convocatoria');          
                });           
              }         
              else
              {
                var fechamoment = moment(reg.CON_FECH_INIC);

                var datos =  {
                  Accion: 'U',
                  SQL: "UPDATE  sgi_conv set  " +
                  " CON_NUME =" + reg.CON_NUME + "," +
                  " CON_DESC = '" + reg.CON_DESC + "', " +
                  " CON_TEXT = '" + reg.CON_TEXT  + "', " + 
                  " CON_RESO = '" + reg.CON_RESO + "', " + 
                  " CON_FECH_INIC = '" + moment(reg.CON_FECH_INIC).format('YYYY-MM-DD')  + "', " +
                  " CON_FECH_FINA = '" +  moment(reg.CON_FECH_FINA).format('YYYY-MM-DD') + "', " +
                  " CON_TIPO_CONV_CODI= " + reg.CON_TIPO_CONV_CODI + ", " + 
                  " CON_PUNT_TOTA = " + reg.CON_PUNT_TOTA + " " +
                  " WHERE CON_CODI=" + id
              };
               $('#myModal').show();
               TareasResource.enviararchivo(datos).then(function(result) { 
              $('#myModal').hide();

                  $window.alert(result.data);

                   $location.path('/convocatoria'); 
                });           
             
            }  
          }

        });
   } 

      $scope.EliminarTexto = function()
      {
        $scope.viewDatos[0].CON_TEXT ="undefined";
        $scope.nombreArchivoTexto ="";
        fileText =undefined;
      }

      $scope.EliminarResolucion = function()
      {
        $scope.viewDatos[0].CON_RESO ="undefined";
        $scope.nombreArchivoResolucion ="";
        fileReso = undefined;
      }

      $scope.DescargarTexto = function()      
      {
        if ($scope.viewDatos[0].CON_TEXT==undefined)
        {
          $window.alert("No existe documento");
          return;
        }

        $window.open($scope.viewDatos[0].CON_TEXT);
        
      }

      $scope.DescargarResolucion = function()
      {

        if ($scope.viewDatos[0].CON_RESO==undefined)
        {
          $window.alert("No existe documento");
          return;
        }

        $window.open($scope.viewDatos[0].CON_RESO);        
      }

       $scope.volver = function(){
          $location.path('/convocatoria'); 
          
       };

});



