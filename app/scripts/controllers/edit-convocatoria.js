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
    var id = ($route.current.params.idConvocatoria) ? parseInt($route.current.params.idConvocatoria) :0 ;
    $scope.settingsPanel ={
             width: '60%',
             height: 200,
             autoUpdate:true
        };  

       $('#myModal').show();  
       $scope.mostrarBoton=true;
  var user = JSON.parse($window.sessionStorage.getItem('usuario'));

         if (user==null || user==undefined)
          {

            $location.path('/menu');
            return;
          }  

        var tipoConvocatoria = TareasResource.execute.query({Accion: 'S',
                             SQL: 'SELECT TCO_CODI,TCO_DESC FROM sgi_tipo_conv'}); 
        tipoConvocatoria.$promise.then(function(result){
              $scope.tipoConvocatoria = result;

              datosConvocatoria.$promise.then(function(result2){                 

                   var consulta = TareasResource.SQL({Accion: 'S',
                         SQL: "SELECT CPA_CODI,CPA_NOMB FROM  sgi_paco "}); 
          consulta.then(function(result){

            $scope.listParametros = result.data;

               consulta = TareasResource.SQL({Accion: 'S',
                SQL: "SELECT P.CPA_NOMB,P.CPA_CODI,CP.PCO_VALO AS Valor   FROM  sgi_conv_para AS CP INNER JOIN sgi_paco AS P ON P.CPA_CODI=CP.PCO_PARA_CODI WHERE CP.PCO_CONV_CODI=" + id}); 
               consulta.then(function(result){
                  if (result.data[0]!=null)
                    $scope.listParametroConvocatoria =result.data;

                   $scope.$$childTail.selParametro=$scope.listParametros[0];

                 

                    $scope.listEvaluadorInvestigador =[];
                      var evaluadores = TareasResource.SQL({Accion:'S',SQL:"SELECT concat(I.INV_NOMB,' ',I.INV_APEL) AS Nombre,I.INV_CODI,C.TICA_NOMB As Cargo,C.TICA_CODI,PA.PAC_NOMB As Programa, " +
                        " PA.PAC_CODI,E.ESC_NOMB AS Escuela,E.ESC_CODI FROM sgi_inve As I LEFT JOIN sgi_tipo_cargo AS C ON  " + 
                        " C.TICA_CODI=I.INV_TICA_CODI INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI = I.INV_PROG_ACAD_CODI INNER JOIN sgi_escu As E ON E.ESC_CODI=PA.PAC_ESCU_CODI"});  

                        evaluadores.then(function(result){


                            $scope.listEvaluadorInvestigador = result.data;




                              

                                         var propuestas = TareasResource.SQL({Accion:'S',SQL:'SELECT PRO_CODI,PRO_NOMB AS Nombre FROM sgi_prop WHERE  PRO_CONV_CODI  =' + id  });
                                        propuestas.then(function(re) {

                                        $scope.listPropuestas=re.data;

                                             $scope.$$childTail.selPropuesta = Enumerable.From($scope.listPropuestas)
                                         .Where(function (x) { return x.PRO_CODI == result.data[0].PCJU_PCAT_CODI })
                                         .ToArray()[0];

                                         if ($scope.$$childTail.selPropuesta!=null)
                                            $scope.onChangePropuesta();

                                      });


                                      

                                 
                                    if (id>0)
                                    {
                                      
                                        var propuestas = TareasResource.SQL({Accion:'S',SQL:'SELECT PRO_CODI,PRO_NOMB AS Nombre FROM sgi_prop WHERE  PRO_CONV_CODI  =' + id  });
                                        propuestas.then(function(re) {


                                        $scope.listPropuestas=re.data;

                                       moment.locale('es');
                                       var day;
                                       var mounth;
                                       var year;
                                       var fechaStr;

                                       day = moment(result2[0].CON_FECH_FINA).format("D");
                                       mounth = moment(result2[0].CON_FECH_FINA).format("M");
                                       year = moment(result2[0].CON_FECH_FINA).format("YYYY");

                                        fechaStr = year + "," + mounth + "," + day;

                                      result2[0].CON_FECH_FINA =new Date(fechaStr); //moment(result[0].CON_FECH_FINA).format("DD-MMMM-YYYY");

                                       day = moment(result2[0].CON_FECH_INIC).format("D");
                                       mounth = moment(result2[0].CON_FECH_INIC).format("M");
                                       year = moment(result2[0].CON_FECH_INIC).format("YYYY");

                                       fechaStr = year + "," + mounth + "," + day;


                                      result2[0].CON_FECH_INIC = new Date(fechaStr); //moment(result[0].CON_FECH_INIC).format("DD-MMMM-YYYY");
                                    
                                    $scope.viewDatos = result2;
                                    $scope.viewDatos[0].CON_PUNT_TOTA = parseInt(result2[0].CON_PUNT_TOTA);
                                    nombOld = $scope.viewDatos[0].CON_DESC;

                                    $scope.nombreArchivoTexto="";
                                    $scope.nombreArchivoResolucion ="";

                                    if (result2[0].CON_TEXT_NOMB!=null) $scope.nombreArchivoTexto =result2[0].CON_TEXT_NOMB;
                                    if (result2[0].CON_RESO_NOMB!=null) $scope.nombreArchivoResolucion =result2[0].CON_RESO_NOMB;

                                    if (result2[0].CON_TEXT!=null) $scope.nombreLinkArchivoTexto =result2[0].CON_TEXT;
                                    if (result2[0].CON_RESO!=null) $scope.nombreLinkArchivoResolucion =result2[0].CON_RESO;


                                    nombreArchivoTexto = $scope.nombreArchivoTexto;
                                    nombreArchivoResolucion =$scope.nombreArchivoResolucion;                   

                                      if ($scope.listEvaluadorInvestigador.length>0)
                                      {
                                          angular.forEach($scope.listEvaluadorInvestigador,function(value,key) {

                                                var grupo = TareasResource.SQL({Accion:'S',SQL:'SELECT G.gru_codi,G.gru_nomb AS Nombre FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG ON IG.IGR_GRUP_CODI=G.gru_codi WHERE IG.IGR_INVE_IDEN=' + value.INV_CODI });
                                                    grupo.then(function(r){
                                                        if (r.data[0]!=null)
                                                          value.listGrupo =r.data;

                                                    });

                                          });
                                      }

                                   


                                     $scope.buttonText = 'Actualizar';
                                        $scope.tiTulo ='Editando Convocatoria';
                                         $('#myModal').hide(); 
                                     });
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

                                         if ($scope.listEvaluadorInvestigador.length>0)
                                          {
                                              angular.forEach($scope.listEvaluadorInvestigador,function(value,key) {

                                                    var grupo = TareasResource.SQL({Accion:'S',SQL:'SELECT G.gru_codi,G.gru_nomb AS Nombre FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG ON IG.IGR_GRUP_CODI=G.gru_codi WHERE IG.IGR_INVE_IDEN=' + value.INV_CODI });
                                                        grupo.then(function(r){
                                                            if (r.data[0]!=null)
                                                              value.listGrupo =r.data;

                                                        });

                                              });
                                          }

                                         $('#myModal').hide(); 
                                      }   
                                                  
                    
                      });

                 });

          });
                   
     });
   });


  $scope.onChangePropuesta = function() {

     var id = ($route.current.params.idConvocatoria) ? parseInt($route.current.params.idConvocatoria) :0 ;
    var datos = {
        Accion:"S",
        SQL:"SELECT concat(I.INV_NOMB,' ',I.INV_APEL) AS Investigador,TV.TIV_DESC AS Rol,PA.PAC_NOMB As Programa,E.ESC_NOMB As Escuela,G.gru_nomb AS Grupo FROM sgi_prop_inve AS PI INNER JOIN sgi_inve AS I  ON  I.INV_CODI = PI.PIN_INVE_CODI INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI =PI.PIN_TPRO_CODI INNER JOIN sgi_escu AS E ON " +
            " E.ESC_CODI = PI.PIN_TESC_CODI INNER JOIN sgi_tipo_vinc As TV ON TV.TIV_CODI=PI.PIN_TVIN_CODI INNER JOIN sgi_prog_acad AS P ON P.PAC_CODI=PI.PIN_TPRO_CODI INNER JOIN sgi_grup AS G ON PI.PIN_TGRU_CODI=G.gru_codi WHERE PI.PIN_PROP_CODI =" + $scope.$$childTail.selPropuesta.PRO_CODI
    }
       $scope.listInvestigadores=[];
      var lista = TareasResource.SQL(datos);
          lista.then(function(result) {
            $scope.listInvestigadores=[];
              if (result.data[0]!=null)
              $scope.listInvestigadores = result.data;

            $scope.listEvaluadores=[];
            var   consulta = TareasResource.SQL({Accion: 'S',
                  SQL: "SELECT I.INV_CODI,concat(I.INV_NOMB,' ',I.INV_APEL) As Nombre,PCJ.PCJU_PCAT_CODI,C.TICA_NOMB As Cargo,C.TICA_CODI,PA.PAC_NOMB As Programa, " +
                 "  PA.PAC_CODI,E.ESC_NOMB AS Escuela,E.ESC_CODI,'I' As Estado  FROM  sgi_prop_conv_juez AS PCJ INNER JOIN sgi_inve AS I ON I.INV_CODI=PCJ.PCJU_INV_CODI " +
                 "  LEFT JOIN sgi_tipo_cargo AS C ON  C.TICA_CODI=I.INV_TICA_CODI INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI = I.INV_PROG_ACAD_CODI INNER JOIN " +
                 "  sgi_escu As E ON E.ESC_CODI=PA.PAC_ESCU_CODI WHERE PCJ.PCJU_CON_CODI =" + id + " AND PCJ.PCJU_PCAT_CODI=" +  $scope.$$childTail.selPropuesta.PRO_CODI}); 
                 consulta.then(function(result){
                    $scope.listEvaluadores=[];
                    $scope.listEvaluadoresTemp =[];
                    if (result.data[0]!=null)
                    {
                         $scope.listEvaluadores=result.data;
                         $scope.listEvaluadoresTemp = result.data;
                       }
                     });



          });

  }

  $scope.onClickAgregarEvaluador = function() {
      var grupo=[];
      if ($scope.listEvaluadores==undefined)
       {
        $scope.listEvaluadores=[];
         $scope.listEvaluadoresTemp=[];
       }

       // var grupo = TareasResource.SQL({Accion:'S',SQL:'SELECT G.gru_codi,G.gru_nomb AS Nombre FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG ON IG.IGR_GRUP_CODI=G.gru_codi WHERE IG.IGR_INVE_IDEN=' + $scope.$$childTail.selEvaluador.INV_CODI });
       //  $('#myModal').show();  
       // grupo.then(function(result) {
       //    
       //    if (result.data[0]!=null)
       //    {
       //        grupo=result.data;
       //    }

        grupo=  Enumerable.From($scope.listEvaluadorInvestigador)
                                         .Where(function (x) { return x.INV_CODI == $scope.$$childTail.selEvaluador.INV_CODI })
                                         .ToArray()[0];

          $scope.listEvaluadores.push({Nombre:$scope.$$childTail.selEvaluador.Nombre,INV_CODI:$scope.$$childTail.selEvaluador.INV_CODI,Cargo:$scope.$$childTail.selEvaluador.Cargo,Programa:$scope.$$childTail.selEvaluador.Programa,Escuela:$scope.$$childTail.selEvaluador.Escuela,listGrupo:grupo.listGrupo,Estado:'N'});
          $scope.listEvaluadoresTemp.push({Nombre:$scope.$$childTail.selEvaluador.Nombre,INV_CODI:$scope.$$childTail.selEvaluador.INV_CODI,Cargo:$scope.$$childTail.selEvaluador.Cargo,Programa:$scope.$$childTail.selEvaluador.Programa,Escuela:$scope.$$childTail.selEvaluador.Escuela,listGrupo:grupo.listGrupo,Estado:'N'});
           //$('#myModal').hide();  
     //  });


       

  }

    $scope.onClickDeleteEvaluador = function(item)
    {

        

        var inve =  Enumerable.From($scope.listEvaluadoresTemp)
                             .Where(function (x) { return x.INV_CODI == item.item.INV_CODI })
                             .ToArray()[0];

        inve.Estado='D';                             


         $scope.listEvaluadores =Enumerable.From($scope.listEvaluadoresTemp)
                             .Where(function (x) { return x.Estado != 'D' })
                             .ToArray();



    }


    $scope.onClicAgregarParametro = function() {

      if ($scope.$$childTail.valor==undefined || $scope.$$childTail.valor=="") 
       {
          $window.alert("Digite un valor");
          return;
       }  

      if ($scope.listParametroConvocatoria==undefined) $scope.listParametroConvocatoria=[];

      var seleccion= Enumerable.From($scope.listParametroConvocatoria)
                             .Where(function (x) { return x.CPA_CODI == $scope.$$childTail.selParametro.CPA_CODI })
                             .ToArray()[0];

      var suma= Enumerable.From($scope.listParametroConvocatoria)                             
                             .Sum(function (x) { return parseFloat(x.Valor) });
      

      if (seleccion!=undefined)
      {
        $scope.$$childTail.valor="";
        $window.alert("Ya está en la lista");
        return;
      }   


      if (parseFloat(suma) + parseFloat($scope.$$childTail.valor)> parseFloat($scope.viewDatos[0].CON_PUNT_TOTA))
      {
        $window.alert("La suma es mayor al puntaje de la convocatoria");
         $scope.$$childTail.valor="";
        return;
      }

      $scope.listParametroConvocatoria.splice(0,0,{CPA_CODI:$scope.$$childTail.selParametro.CPA_CODI,CPA_NOMB:$scope.$$childTail.selParametro.CPA_NOMB,Valor:$scope.$$childTail.valor});
      $scope.$$childTail.valor="";



    }

    $scope.onClicEliminarParametro = function(item) {

       $scope.listParametroConvocatoria.splice(item.$index,1);

    }
               
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
                           var select =[]; 
                         

                               var fd = new FormData();                        
                               fd.append('id',idConvocatoria); 
                               fd.append('accion','Ingresar');  
                               fd.append('archFileOld','');  
                               fd.append('tipo','');
                              if (fileText!=undefined) fd.append('CONTEXTO', fileText);                                                    
                              if (fileReso!=undefined) fd.append('CONRESO', fileReso);                                                                                
                              TareasResource.enviararchivobinario(fd).then(function(result1) { 
                                       var select =[]; 
                                       if ($scope.listParametroConvocatoria!=undefined)
                                       {
                                          if ($scope.listParametroConvocatoria[0]!=null)
                                          {
                                             
                                              angular.forEach($scope.listParametroConvocatoria, function(value, key) {

                                                var insert = {
                                                    Accion:"I",
                                                    SQL:"INSERT INTO sgi_conv_para (PCO_CONV_CODI,PCO_PARA_CODI,PCO_VALO) VALUES (" + idConvocatoria + "," + value.CPA_CODI + "," + value.Valor + ")"
                                                }                                      

                                                 select.splice(0,0,insert);

                                              });
                                         }
                                      }
                                    var resultado =  TareasResource.SQLMulti(select);
                                        resultado.then(function() {

                                             $('#myModal').hide();     
                                        $window.alert("INGRESADO");           
                                        $location.path('/edit-convocatoria/'+ idConvocatoria);     

                                         });                                            
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
                           // $location.path('/convocatoria'); 


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
                                            

                                 var select =[]; 

                                 if ($scope.$$childTail.selPropuesta!=undefined)
                                {
                                if ($scope.$$childTail.selPropuesta.PRO_CODI!=undefined)
                                {
                                  angular.forEach($scope.listEvaluadoresTemp, function(value, key) {

                                     if (value.Estado=='N') 
                                      {  
                                        var insert = {
                                            Accion:"I",
                                            SQL:"INSERT INTO sgi_prop_conv_juez (PCJU_PCAT_CODI,PCJU_CON_CODI,PCJU_INV_CODI) VALUES (" + $scope.$$childTail.selPropuesta.PRO_CODI + "," +  id + "," + value.INV_CODI + ")"
                                        }                                      

                                         select.splice(0,0,insert);
                                       }

                                       if (value.Estado=='D')
                                        {  
                                          var insert = {
                                              Accion:"D",
                                              SQL:"DELETE FROM sgi_prop_conv_juez WHERE PCJU_INV_CODI = "+ value.INV_CODI + " AND PCJU_PCAT_CODI=" + $scope.$$childTail.selPropuesta.PRO_CODI + " AND PCJU_CON_CODI=" + id
                                          }                                      

                                           select.splice(0,0,insert);

                                        } 

                                      });                                                                                                        

                                 }
                               }
                                  var resultado =  TareasResource.SQLMulti(select);
                                        resultado.then(function(r) {
                                       var consulta = TareasResource.SQL({Accion: 'D',
                                       SQL: "DELETE  FROM  sgi_conv_para WHERE PCO_CONV_CODI=" + id}); 
                                       consulta.then(function(result){
                                          var select =[];
                                           if ($scope.listParametroConvocatoria!=undefined)
                                           {
                                              angular.forEach($scope.listParametroConvocatoria, function(value, key) {

                                                var insert = {
                                                    Accion:"I",
                                                    SQL:"INSERT INTO sgi_conv_para (PCO_CONV_CODI,PCO_PARA_CODI,PCO_VALO) VALUES (" + id + "," + value.CPA_CODI + "," + value.Valor + ")"
                                                }                                      

                                                 select.splice(0,0,insert);

                                              });
                                           }
                                            var resultado =  TareasResource.SQLMulti(select);
                                                resultado.then(function() {
                                                   $('#myModal').hide();      
                                                   $window.alert("ACTUALIZADO");  
                                                })


                                              });

                                        });
                             
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

       $scope.onClicSelect = function(item,index) {

         item.$parent.mostrarBoton=true;

         if (index==3) item.$parent.mostrarBoton=false;

       }


});



