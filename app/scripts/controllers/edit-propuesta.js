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
      var nombreDocumentoProyecto;
      var nombreArchivoCarta

         var user = JSON.parse($window.sessionStorage.getItem('usuario'));

        if (user==null || user==undefined)
        {

          $location.path('/menu');
          return;
        }   

        moment.locale('es');
         $('#myModal').show();  


           var tipoConvocatoria = TareasResource.SQL({Accion: 'S',
                             SQL: 'SELECT TCO_CODI,TCO_DESC FROM sgi_tipo_conv'}); 
        tipoConvocatoria.then(function(result2){
              $scope.$$childTail.tipoConvocatoria = result2.data;


                      var convocatoria = TareasResource.execute.query({Accion: 'S',
                             SQL: 'SELECT CON_CODI,CON_DESC FROM sgi_conv'}); 
                convocatoria.$promise.then(function(result){
                      $scope.convocatoria = result;


                      datosPropuesta.$promise.then(function(result){
                          $scope.viewDatos = result;                 

                          $scope.nombreDocumentoProyecto="";
                          $scope.nombreArchivoCarta ="";

                          if (result[0].PRO_TEXT_NOMB!=null) $scope.nombreDocumentoProyecto =result[0].PRO_TEXT_NOMB;
                          if (result[0].PRO_CART_NOMB!=null) $scope.nombreArchivoCarta =result[0].PRO_CART_NOMB;

                          if (result[0].PRO_TEXT!=null) $scope.nombreLinkDocumentoProyecto =result[0].PRO_TEXT;
                          if (result[0].PRO_CART_AVAL!=null) $scope.nombreLinkCartaAval =result[0].PRO_CART_AVAL;


                          nombreDocumentoProyecto = $scope.nombreDocumentoProyecto;
                          nombreArchivoCarta =$scope.nombreArchivoCarta;


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
         $scope.nombreArchivoCarta = arch.files[0].name;       
        $scope.$apply();
    }

     $scope.onChangedConvocatoria = function() {

      var dato =$scope.$$childTail.selConvocatoria;

      var datos = {
        Accion:"S",
        SQL:"SELECT conv.CON_CODI, tipoConv.TCO_DESC, " + 
                         " conv.CON_NUME,conv.CON_DESC,conv.CON_TEXT,conv.CON_TEXT_NOMB,conv.CON_RESO,conv.CON_RESO_NOMB, " + 
                         " conv.CON_FECH_INIC,conv.CON_FECH_FINA,conv.CON_TIPO_CONV_CODI,conv.CON_PUNT_TOTA  " +
                         " FROM sgi_conv as conv join sgi_tipo_conv as tipoConv on " + 
                         " tipoConv.TCO_CODI = conv.CON_TIPO_CONV_CODI where " + 
                         " conv.CON_CODI =" + dato.CON_CODI
      }

      var convocatoria = TareasResource.SQL(datos);
          convocatoria.then(function(result) {

            var d = result.data[0];

            $scope.$$childTail.numero = d.CON_NUME;
            $scope.$$childTail.descripcion =d.CON_DESC;
            $scope.$$childTail.puntaje =d.CON_PUNT_TOTA;
            $scope.$$childTail.fechaInicio =moment(d.CON_FECH_INIC).format("DD MMMM YYYY");
            $scope.$$childTail.fechaFinal =moment(d.CON_FECH_FINA).format("DD MMMM YYYY");
            $scope.$$childTail.nombreLinkArchivoResolucion =d.CON_RESO;
            $scope.$$childTail.nombreArchivoResolucion =d.CON_RESO_NOMB;

            $scope.$$childTail.nombreLinkArchivoTexto =d.CON_TEXT;
            $scope.$$childTail.nombreArchivoTexto =d.CON_TEXT_NOMB;
            


            $scope.$$childTail.selTipoConvocatoria =Enumerable.From($scope.$$childTail.tipoConvocatoria)
                             .Where(function (x) { return x.TCO_CODI ==  d.CON_TIPO_CONV_CODI })
                             .ToArray()[0].TCO_DESC;

           
            
            
            
             // CON_TIPO_CONV_CODI

          });

     }

    $scope.save = function(reg){

       var id = (reg.PRO_CODI) ? parseInt(reg.PRO_CODI) :0;
         $('#myModal').show();  
       if (id==0)
       {
        
        var datos =  {
            Accion: 'ADJUNTO',
            SQL: "INSERT INTO  sgi_prop (PRO_NOMB,PRO_LINK_GLAC,PRO_LINK_CVLA,PRO_CONV_CODI)" +
            " VALUES ('" + reg.PRO_NOMB + "','" + reg.PRO_LINK_GLAC  + "'," +
            " '" + reg.PRO_LINK_CVLA + "'," + reg.PRO_CONV_CODI + ")"
        };
         TareasResource.enviararchivo(datos).then(function(result) { 

              var idPropuesta = result.data.split('@')[1];
            
              var consulta = TareasResource.SQL({Accion: 'I',
                         SQL: "INSERT INTO  sgi_prop_inve (PIN_INVE_CODI,PIN_PROP_CODI) " + 
                         " VALUES (" + user.Id + "," + idPropuesta + ")"}); 
                      consulta.then(function(result){
                            var fd = new FormData();                        
                     fd.append('id',idPropuesta); 
                     fd.append('accion','Ingresar');  
                     fd.append('archFileOld','');  
                     fd.append('tipo','');
                    if (fileDocumentoProyecto!=undefined) fd.append('PROTEXTO', fileDocumentoProyecto);                                                    
                    if (fileCartaAval!=undefined) fd.append('PROCARTA', fileCartaAval);                                                                                
                    TareasResource.enviararchivobinario(fd).then(function(result1) { 
                 
                          $('#myModal').hide();     
                          $window.alert("INGRESADO");           
                          $location.path('/propuesta');                       
                    });            
                });              
          });           
        }         
      else
        {
 
            var fd = new FormData();                        
            fd.append('id',id); 
            fd.append('accion','Actualizar');  
            fd.append('archFileOld',nombreDocumentoProyecto + '@' + $scope.nombreDocumentoProyecto + '@' + nombreArchivoCarta + '@' + $scope.nombreArchivoCarta);  
            fd.append('PROTEXTO', fileDocumentoProyecto);                                                    
            fd.append('PROCARTA', fileCartaAval);                           
            fd.append('tipo','PROTEXTO@PROCARTA');
            $('#myModal').show();
            TareasResource.enviararchivobinario(fd).then(function(result1) {

                datos =  {
                Accion: 'U',
                SQL: "UPDATE  sgi_prop set  " +
                " PRO_NOMB ='" + reg.PRO_NOMB + "'," +                
                " PRO_LINK_GLAC = '" + reg.PRO_LINK_GLAC  + "', " + 
                " PRO_LINK_CVLA = '" + reg.PRO_LINK_CVLA + "', " +                
                " PRO_CONV_CODI = " + reg.PRO_CONV_CODI + " " +            
                " WHERE PRO_CODI=" + id
            };
             TareasResource.enviararchivo(datos).then(function(result) { 
                $window.alert(result.data);
                 $('#myModal').hide();  
                 $location.path('/propuesta'); 
              });    
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
        $scope.nombreArchivoCarta ="";
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



