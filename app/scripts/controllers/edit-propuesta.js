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
        moment.locale('es');
         var user = JSON.parse($window.sessionStorage.getItem('usuario'));

        if (user==null || user==undefined)
        {

          $location.path('/menu');
          return;
        }   

        moment.locale('es');
         $('#myModal').show();  

        
      $scope.viewDatos  =datosPropuesta;
         
    
$scope.mostrarDatos = function(datosPropuesta) {

    $('#myModal').show();  
  var tipoConvocatoria = TareasResource.SQL({Accion: 'S',
                             SQL: 'SELECT TCO_CODI,TCO_DESC FROM sgi_tipo_conv'}); 
        tipoConvocatoria.then(function(result2){


              $scope.$$childTail.tipoConvocatoria = result2.data;


                      var convocatoria = TareasResource.execute.query({Accion: 'S',
                             SQL: 'SELECT CON_CODI,CON_DESC FROM sgi_conv'}); 
                convocatoria.$promise.then(function(result){
                      $scope.convocatoria = result;

                       var id = ($route.current.params.idPropuesta) ? parseInt($route.current.params.idPropuesta) :0 ;
                   datosPropuesta=  TareasResource.SQL({Accion: 'S',
                         SQL: "SELECT P.PRO_LINK_CVLA,P.PRO_FECH_REGI, P.PRO_LINK_GLAC, P.PRO_CODI,P.PRO_NOMB,C.CON_DESC,P.PRO_TEXT,P.PRO_TEXT_NOMB,P.PRO_CART_AVAL,P.PRO_CART_NOMB,P.PRO_CONV_CODI   " + 
                        " FROM sgi_prop AS P INNER JOIN sgi_conv AS C ON C.CON_CODI=P.PRO_CONV_CODI  WHERE " + 
                        " P.PRO_CODI=" + id });

                      


                      datosPropuesta.then(function(result){
                          if (result.data[0]!=null)
                          {
                          $scope.viewDatos = result.data;  
                          if (result.data[0].PRO_FECH_REGI!=null)
                            $scope.viewDatos[0].PRO_FECH_REGI =moment(result.data[0].PRO_FECH_REGI).format("DD MMMM YYYY hh:mm A");  

                          $scope.nombreDocumentoProyecto="";
                          $scope.nombreArchivoCarta ="";

                          if (result.data[0].PRO_TEXT_NOMB!=null) $scope.nombreDocumentoProyecto =result.data[0].PRO_TEXT_NOMB;
                          if (result.data[0].PRO_CART_NOMB!=null) $scope.nombreArchivoCarta =result.data[0].PRO_CART_NOMB;

                          if (result.data[0].PRO_TEXT!=null) $scope.nombreLinkDocumentoProyecto =result.data[0].PRO_TEXT;
                          if (result.data[0].PRO_CART_AVAL!=null) $scope.nombreLinkCartaAval =result.data[0].PRO_CART_AVAL;


                          nombreDocumentoProyecto = $scope.nombreDocumentoProyecto;
                          nombreArchivoCarta =$scope.nombreArchivoCarta;

                        }
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
                            
                              var user = JSON.parse($window.sessionStorage.getItem('usuario'));
                             
                           var select = TareasResource.SQL({Accion: 'S',
                             SQL: "SELECT concat(INV_NOMB,' ',INV_APEL) AS Nombre,INV_CODI FROM sgi_inve "  }); 

                              select.then(function(investigador){

                                   $('#myModal').hide();  
                                  $scope.listInvestigadores = investigador.data;

                                  select = TareasResource.SQL({Accion: 'S',
                                   SQL: "SELECT TIV_CODI,TIV_DESC FROM sgi_tipo_vinc"}); 

                                    select.then(function(vinculacion){

                                      $scope.listRoles=vinculacion.data;

                                       if (id>0)
                                       {
                                         select = TareasResource.SQL({Accion: 'S',
                                         SQL: "SELECT I.INV_CODI AS idInvestigador, concat(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador, " +
                                              " TV.TIV_CODI AS idRol,TV.TIV_DESC AS Rol,G.gru_codi AS idGrupo,G.gru_nomb As Grupo,I.INV_PROG_ACAD_CODI AS idPrograma,PA.PAC_ESCU_CODI AS idEscuela, " +
                                              " PA.PAC_NOMB AS programa,E.ESC_NOMB AS escuela " +
                                             " FROM sgi_prop_inve AS PI INNER JOIN sgi_inve AS I ON PI.PIN_INVE_CODI=I.INV_CODI  INNER JOIN sgi_tipo_vinc As TV ON TV.TIV_CODI = PI.PIN_TVIN_CODI " +
                                             " LEFT JOIN sgi_grup As G ON G.gru_codi=PI.PIN_TGRU_CODI INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI=I.INV_PROG_ACAD_CODI" +
                                             " INNER JOIN sgi_escu AS E ON " +
                                             " E.ESC_CODI=PA.PAC_ESCU_CODI WHERE PI.PIN_PROP_CODI =" + id }); 

                                          select.then(function(investigador){

                                            if (investigador.data[0]!=null)
                                                $scope.listInvestigadorPropuesta=investigador.data;

                                             var inv = JSON.parse($window.sessionStorage.getItem('investigador'));
                                            var datos = {

                                              Accion:'S',
                                              SQL:'SELECT distinct C.CON_CODI,C.CON_DESC,P.PRO_TEXT, P.PRO_CODI,P.PRO_NOMB As Nombre FROM sgi_prop AS P INNER JOIN sgi_prop_inve AS PI ON PI.PIN_PROP_CODI=P.PRO_CODI INNER JOIN sgi_conv AS C ON ' +
                                              ' C.CON_CODI=P.PRO_CONV_CODI WHERE P.PRO_INVE_CODI=' + inv.INV_CODI

                                            }    

                                                select = TareasResource.SQL(datos);
                                                  select.then(function(result) {
                                                      if (result.data[0]!=null)                                                      
                                                        $scope.listPropuestas =result.data;
                                                        $('#myModal').hide();  
                                                      

                                                });  
                                            
                                          }); 
                                       }
                                      
                                    });

                              });    

                      });
                });


        });

}
  $scope.mostrarDatos(datosPropuesta);


      $scope.onChangeInvestigador = function(investigador) {

           $('#myModal').show();  
          var datos = {
            Accion:'S',
            SQL:'SELECT P.PAC_NOMB AS Programa,P.PAC_CODI, E.ESC_NOMB AS Escuela,E.ESC_CODI FROM sgi_inve AS I INNER JOIN sgi_prog_acad AS P ON P.PAC_CODI = I.INV_PROG_ACAD_CODI INNER JOIN sgi_escu AS E ON E.ESC_CODI = P.PAC_ESCU_CODI WHERE I.INV_CODI=' + investigador.INV_CODI

          }

              var select = TareasResource.SQL(datos);
              select.then(function(result) {

                 $scope.escuela = "";
                 $scope.programa ="";
                 $scope.idEscuela="";
                 $scope.idPrograma="";

                if (result.data[0]!=null)
                {
                  $scope.escuela = result.data[0].Escuela;
                  $scope.idEscuela = result.data[0].ESC_CODI;                  
                  $scope.programa =result.data[0].Programa;
                  $scope.idPrograma = result.data[0].PAC_CODI;
                }


                  var select = TareasResource.SQL({Accion: 'S',
                  SQL: "SELECT G.gru_codi,G.gru_nomb FROM sgi_inve_grup AS IG INNER JOIN sgi_grup AS G ON G.gru_codi=IG.igr_grup_codi WHERE IG.igr_inve_iden=" + investigador.INV_CODI  }); 

                   select.then(function(grupo){

                      $scope.listGrupoInvestigacion=[];
                      if (grupo.data[0]!=null)
                        $scope.listGrupoInvestigacion = grupo.data;

                     $('#myModal').hide();  
                 });

              });

      }


      $scope.onClicEliminarInvestigador = function(item) {
        
        $scope.listInvestigadorPropuesta.splice(item.$index,1);
            

      }

    $scope.onClicInvestigador = function() {
        
      if ($scope.$$childTail.selInvestigador==undefined)
      {
        $window.alert("Debe seleccionar un investigador");
        return;
      }

      if ($scope.idEscuela=="")
      {
        $window.alert("Falta la escuela del Investigador");
        return;
      }

       if ($scope.idPrograma=="")
      {
        $window.alert("Falta el programa del Investigador");
        return;
      }

       if ($scope.$$childTail.selRol==undefined)
      {
        $window.alert("Debe seleccionar un Rol");
        return;
      }

      if ($scope.$$childTail.selGrupo==undefined)
      {
        $window.alert("Debe seleccionar un grupo");
        return;
      }

      var objectInve = Enumerable.From($scope.listInvestigadorPropuesta)
                             .Where(function (x) { return x.idInvestigador ==  $scope.$$childTail.selInvestigador.INV_CODI })
                             .ToArray()[0];

      if (objectInve!=null)
      {
         $window.alert("El investigador ya esta incluido");
          return;
      }


        if ($scope.listInvestigadorPropuesta ==undefined)
            $scope.listInvestigadorPropuesta =[];

         $scope.listInvestigadorPropuesta.splice(0,0,{nombreInvestigador:$scope.$$childTail.selInvestigador.Nombre,
                                                      idInvestigador:$scope.$$childTail.selInvestigador.INV_CODI,
                                                      idRol:$scope.$$childTail.selRol.TIV_CODI,Rol:$scope.$$childTail.selRol.TIV_DESC,
                                                      idGrupo:$scope.$$childTail.selGrupo.gru_codi,Grupo:$scope.$$childTail.selGrupo.gru_nomb,
                                                      idEscuela:$scope.idEscuela,idPrograma:$scope.idPrograma,
                                                      escuela:$scope.escuela,programa:$scope.programa});
        $scope.escuela = "";
        $scope.idEscuela = "";                  
        $scope.programa ="";
        $scope.idPrograma = "";
    }


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
        
        var fecha = new Date();
          var inve = JSON.parse($window.sessionStorage.getItem('investigador'));
        var datos =  {
            Accion: 'ADJUNTO',
            SQL: "INSERT INTO  sgi_prop (PRO_INVE_CODI,PRO_NOMB,PRO_LINK_GLAC,PRO_LINK_CVLA,PRO_CONV_CODI,PRO_FECH_REGI)" +
            " VALUES (" + inve.INV_CODI + ",'" + reg.PRO_NOMB + "','" + reg.PRO_LINK_GLAC  + "'," +
            " '" + reg.PRO_LINK_CVLA + "'," + reg.PRO_CONV_CODI + ",'" + moment(new Date()).format("YYYY-MM-DD HH:mm") + "')"
        };
         TareasResource.enviararchivo(datos).then(function(result) { 

              var idPropuesta = result.data.split('@')[1];
               
              var insert = [];

              if ($scope.listInvestigadorPropuesta!=undefined)
              {

              angular.forEach($scope.listInvestigadorPropuesta, function(value, key){

                insert.splice(0,0,{Accion:'I',SQL:'INSERT INTO  sgi_prop_inve (PIN_INVE_CODI,PIN_PROP_CODI,PIN_TVIN_CODI,PIN_TGRU_CODI,PIN_TESC_CODI,PIN_TPRO_CODI)' +
                 ' VALUES ('+  value.idInvestigador + ',' + idPropuesta + ','+ value.idRol + ',' + value.idGrupo +','+ value.idEscuela + ','+ value.idPrograma +')'})


              });
             }


              var consulta = TareasResource.SQLMulti(insert); 
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

                           $location.path('/edit-propuesta/' + idPropuesta);           
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
                " PRO_CONV_CODI = " + reg.PRO_CONV_CODI + ", " +     
                " PRO_FECH_REGI = '" + moment(new Date()).format("YYYY-MM-DD HH:mm") + "'" +
                " WHERE PRO_CODI=" + id
            };
             TareasResource.enviararchivo(datos).then(function(result) { 

                 var insert = [];


              if ($scope.listInvestigadorPropuesta!=undefined)
              {

              angular.forEach($scope.listInvestigadorPropuesta, function(value, key){

               
                  insert.splice(0,0,{Accion:'I',SQL:'INSERT INTO  sgi_prop_inve (PIN_INVE_CODI,PIN_PROP_CODI,PIN_TVIN_CODI,PIN_TGRU_CODI,PIN_TESC_CODI,PIN_TPRO_CODI)' +
                  ' VALUES ('+  value.idInvestigador + ',' + id + ','+ value.idRol + ',' + value.idGrupo +','+ value.idEscuela + ','+ value.idPrograma +')'})

               });
             }

              var inve = JSON.parse($window.sessionStorage.getItem('investigador'));
              insert.splice(0,0,{Accion:'D',SQL:'DELETE FROM sgi_prop_inve WHERE PIN_PROP_CODI=' + id })


              var consulta = TareasResource.SQLMulti(insert); 
                      consulta.then(function(result){

                         $window.alert("Actualizado");
                         $('#myModal').hide();  
                          $location.path('/edit-propuesta/' + id); 
                           $scope.mostrarDatos(datosPropuesta);    
                      });
               
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

       $scope.onChangePropuesta = function(item) {
         var inv = JSON.parse($window.sessionStorage.getItem('investigador'));
        $scope.nombreConvocatoria = item.CON_DESC;
         $scope.propuestaLink=item.PRO_TEXT;

          var datos = {
              Accion:'S',
              SQL:'SELECT PCJ.PCJU_EVAL_PROP_LINK,PCJ.PCJU_EEVA_CODI FROM sgi_prop_inve AS PI ' + 
              ' INNER JOIN sgi_prop_conv_juez AS PCJ ON PCJ.PCJU_PCAT_CODI=PI.PIN_PROP_CODI ' + 
              ' WHERE PCJ.PCJU_PCAT_CODI=' + item.PRO_CODI

          }

          $scope.total=0;
          $scope.listPropuesta=[];
          var select= TareasResource.SQL(datos);
              select.then(function(r) {
                if (r.data[0]!=null)
                {
                $scope.listPropuesta = r.data;


                    var suma= Enumerable.From($scope.listPropuesta)                             
                             .Sum(function (x) { return parseFloat(x.PCJU_EEVA_CODI) });

                    $scope.total = suma/$scope.listPropuesta.length;         
              }
              });

       };

});



