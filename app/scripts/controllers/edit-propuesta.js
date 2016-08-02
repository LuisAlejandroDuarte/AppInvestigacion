'use strict';

angular.module('listaTareasApp')

.directive('mostrariconoesperapropuesta',function(){

   return {
        restrict : 'AE',   
          template : '<div id="myModal">' +
                     
                        '<div class="imagewait">' +
                          '<div class="showait">  </div>' + 
                          '</div>' +
                      '</div>',

      }

})

  .controller('editPropuesta', function($scope,$window,$location,datosPropuesta,TareasResource,$route) {
      var fileDocumentoProyecto;
      var fileCartaAval;
         $('#myModal').show();  

        var convocatoria = TareasResource.execute.query({Accion: 'S',
                             SQL: 'SELECT CON_CODI,CON_DESC FROM sgi_conv'}); 
        convocatoria.$promise.then(function(result){
              $scope.convocatoria = result;

              datosPropuesta.$promise.then(function(result){
                  $scope.viewDatos = result;

                  if (result[0].PRO_TEXT!=undefined) $scope.nombreArchivoTexto ="Clic en descargar";
                  if (result[0].PRO_CART_AVAL!=undefined) $scope.nombreArchivoCarta ="Clic en descargar";

                  var id = ($route.current.params.idPropuesta) ? parseInt($route.current.params.idPropuesta) :0 ;
          
                  if(id > 0)          
                    {
                      $scope.buttonText = 'Actualizar';
                      $scope.tiTulo ='Editando propuesta';
                    }
                    else
                    {
                      $scope.buttonText = 'Guardar';
                      $scope.tiTulo ='Creando propuesta';
                    }
                     $('#myModal').hide();  
              });
        });
     $scope.uploadFileTexto = function (arch) {
 		    
		    if (arch.files[0].size>2000000)
		    {
		      $window.alert("El Archivo debe ser menor a 2 Megas");
		      return;
		    }

        fileDocumentoProyecto =arch.files[0];
		     $scope.nombreDocumentoProyecto = arch.files[0].name;		   
		    $scope.$apply();
    }

    $scope.uploadFileCarta = function (arch) {
      

        if (arch.files[0].size>2000000)
        {
          $window.alert("El Archivo debe ser menor a 2 Megas");
          return;
        }

        fileCartaAval = arch.files[0];
         $scope.nombreCartaAval = arch.files[0].name;       
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

       var id = (reg.PRO_CODI) ? parseInt(reg.PRO_CODI) :0;
         $('#myModal').show();  
       if (id==0)
       {
        
        var datos =  {
            Accion: 'ADJUNTO',
            SQL: "INSERT INTO  sgi_prop (PRO_NOMB,PRO_TEXT,PRO_LINK_GLAC,PRO_LINK_CVLA,PRO_CART_AVAL,PRO_CONV_CODI)" +
            " VALUES ('" + reg.PRO_NOMB + "','" + reg.PRO_TEXT + "','" + reg.PRO_LINK_GLAC  + "'," +
            " '" + reg.PRO_LINK_CVLA + "','" + reg.PRO_CART_AVAL  + "'," + reg.PRO_CONV_CODI + ")"
        };
         TareasResource.enviararchivo(datos).then(function(result) { 
            $window.alert(result.data);
              $('#myModal').hide();  
             $location.path('/propuesta'); 
          });           
        }         
      else
        {
           datos =  {
            Accion: 'U',
            SQL: "UPDATE  sgi_prop set  " +
            " PRO_NOMB ='" + reg.PRO_NOMB + "'," +
            " PRO_TEXT = '" + reg.PRO_TEXT + "', " +
            " PRO_LINK_GLAC = '" + reg.PRO_LINK_GLAC  + "', " + 
            " PRO_LINK_CVLA = '" + reg.PRO_LINK_CVLA + "', " + 
            " PRO_CART_AVAL = '" + reg.PRO_CART_AVAL  + "', " +
            " PRO_CONV_CODI = " + reg.PRO_CONV_CODI + " " +            
            " WHERE PRO_CODI=" + id
        };
         TareasResource.enviararchivo(datos).then(function(result) { 
            $window.alert(result.data);
             $('#myModal').hide();  
             $location.path('/propuesta'); 
          });           
        }


   } 

      $scope.EliminarDocumentoProyecto = function()
      {
        $scope.viewDatos[0].PRO_TEXT ="undefined";
        $scope.nombreDocumentoProyecto ="";
        fileDocumentoProyecto =undefined;        
        
      }

      $scope.EliminarCartaAval = function()
      {
        $scope.viewDatos[0].PRO_CART_AVAL ="undefined";
        $scope.nombreCartaAval ="";
        fileCartaAval =undefined;
      }

      $scope.DescargarTexto = function()      
      {
        if ($scope.viewDatos[0].PRO_TEXT==undefined)
        {
          $window.alert("No existe documento");
          return;
        }

        $window.open($scope.viewDatos[0].PRO_TEXT);
        
      }

      $scope.DescargarCarta = function()
      {

        if ($scope.viewDatos[0].PRO_CART_AVAL==undefined)
        {
          $window.alert("No existe documento");
          return;
        }

        $window.open($scope.viewDatos[0].PRO_CART_AVAL);        
      }

       $scope.volver = function(){
          $location.path('/propuesta'); 
       };

});



