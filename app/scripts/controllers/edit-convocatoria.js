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
    var nombreArchivoTexto;
    var nombreArchivoResolucion;
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
                    
                     moment.locale('es');
                     var day;
                     var mounth;
                     var year;
                     var fechaStr;

                     day = moment(result[0].CON_FECH_FINA).format("D");
                     mounth = moment(result[0].CON_FECH_FINA).format("M");
                     year = moment(result[0].CON_FECH_FINA).format("YYYY");

                      fechaStr = year + "," + mounth + "," + day;

                    result[0].CON_FECH_FINA =new Date(fechaStr); //moment(result[0].CON_FECH_FINA).format("DD-MMMM-YYYY");

                     day = moment(result[0].CON_FECH_INIC).format("D");
                     mounth = moment(result[0].CON_FECH_INIC).format("M");
                     year = moment(result[0].CON_FECH_INIC).format("YYYY");

                     fechaStr = year + "," + mounth + "," + day;


                    result[0].CON_FECH_INIC = new Date(fechaStr); //moment(result[0].CON_FECH_INIC).format("DD-MMMM-YYYY");
                  
                  $scope.viewDatos = result;
                  $scope.viewDatos[0].CON_PUNT_TOTA = parseInt(result[0].CON_PUNT_TOTA);
                  nombOld = $scope.viewDatos[0].CON_DESC;

                  $scope.nombreArchivoTexto="";
                  $scope.nombreArchivoResolucion ="";

                  if (result[0].CON_TEXT_NOMB!=null) $scope.nombreArchivoTexto =result[0].CON_TEXT_NOMB;
                  if (result[0].CON_RESO_NOMB!=null) $scope.nombreArchivoResolucion =result[0].CON_RESO_NOMB;

                  if (result[0].CON_TEXT!=null) $scope.nombreLinkArchivoTexto =result[0].CON_TEXT;
                  if (result[0].CON_RESO!=null) $scope.nombreLinkArchivoResolucion =result[0].CON_RESO;


                  nombreArchivoTexto = $scope.nombreArchivoTexto;
                  nombreArchivoResolucion =$scope.nombreArchivoResolucion;

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
		    if (arch.files[0].size>2000000)
		    {
		      $window.alert("El Archivo debe ser menor a 2 Megas");
		      return;
		    }


        if (arch.files[0].name.length>90)
        {
         $window.alert("El nombre del Archivo no debe exceder de 90 caracteres");
           arch.files[0]=undefined;
          return; 
        }

		     $scope.nombreArchivoTexto = arch.files[0].name;
         $scope.$apply()
         fileText = arch.files[0];
    }

    $scope.uploadFileResolucion = function (arch) {        
        if (arch.files[0].size>2000000)
        {
          $window.alert("El Archivo debe ser menor a 2 Megas");

          return;
        }

        if (arch.files[0].name.length>90)
        {
         $window.alert("El nombre del Archivo no debe exceder de 90 caracteres");
           arch.files[0]=undefined;
          return; 
        }

         $scope.nombreArchivoResolucion = arch.files[0].name;

        $scope.$apply()
         fileReso = arch.files[0];
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

    var ingresado =false;
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
                  
                        var fd = new FormData();                        
                         fd.append('id',idConvocatoria); 
                         fd.append('accion','Ingresar');  
                         fd.append('archFileOld','');  
                         fd.append('tipo','');
                        if (fileText!=undefined) fd.append('CONTEXTO', fileText);                                                    
                        if (fileReso!=undefined) fd.append('CONRESO', fileReso);                                                                                
                        TareasResource.enviararchivobinario(fd).then(function(result1) { 
                     
                              $('#myModal').hide();     
                              $window.alert("INGRESADO");           
                              $location.path('/convocatoria');                       
                     });                                          
                });           
              }         
              else
              {
                var fechamoment = moment(reg.CON_FECH_INIC);
                var actualizandoTexto =false;
                var actualizandoReso = false;
                 
                      var fd = new FormData();                        
                      fd.append('id',id); 
                      fd.append('accion','Actualizar');  
                      fd.append('archFileOld',nombreArchivoTexto + '@' + $scope.nombreArchivoTexto + '@' + nombreArchivoResolucion + '@' + $scope.nombreArchivoResolucion);  
                      fd.append('CONTEXTO', fileText);                                                    
                      fd.append('CONRESO', fileReso);                           
                      fd.append('tipo','CONTEXTO@CONRESO');
                       $('#myModal').show();
                      TareasResource.enviararchivobinario(fd).then(function(result1) {
                            actualizandoTexto = false;
                            $location.path('/convocatoria'); 


                             var datos =  {
                              Accion: 'U',
                              SQL: "UPDATE  sgi_conv set  " +
                              " CON_NUME =" + reg.CON_NUME + "," +
                              " CON_DESC = '" + reg.CON_DESC + "', " +                                                   
                              " CON_FECH_INIC = '" + moment(reg.CON_FECH_INIC).format('YYYY-MM-DD')  + "', " +
                              " CON_FECH_FINA = '" +  moment(reg.CON_FECH_FINA).format('YYYY-MM-DD') + "', " +
                              " CON_TIPO_CONV_CODI= " + reg.CON_TIPO_CONV_CODI + ", " + 
                              " CON_PUNT_TOTA = " + reg.CON_PUNT_TOTA + " " +
                              " WHERE CON_CODI=" + id
                          };
                          
                           TareasResource.enviararchivo(datos).then(function(result) { 
                               $('#myModal').hide();                    
                               $window.alert("ACTUALIZADO");  

                               if (!actualizandoTexto && !actualizandoReso)
                                  $location.path('/convocatoria');


                             
                            });                            

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



