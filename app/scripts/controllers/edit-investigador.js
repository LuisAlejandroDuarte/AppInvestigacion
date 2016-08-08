'use strict';

angular.module('listaTareasApp')
  

.directive('initTablainvestigadoredit', ['$compile', function($compile) {
        return {
            restrict: 'A',

      link: function(scope, el, attrs) {
                var opts = scope.$eval(attrs.initTablainvestigadoredit);   
                opts.onLoadSuccess = function() {
                    $compile(el.contents())(scope); 
            };
             el.bootstrapTable(opts);
              scope.$watch(el, function (bstable) {
                    $compile(el.contents())(scope);
                });    
                el.bind('body-changed.bs.table', function () {
                    var body = el.find('tbody')[0];
                    console.log('get here one more time');
                    $compile(body)(scope);
                });
            }
        }
    }])



  
  .controller('editInvestigador', function($scope,$window,$location,datosInvestigador,TareasResource,$route,$base64,$q) {
    var id_inve;
    var idInvestigador;    
    var oldUser;
    var oldIdentificacion;
    var strmd5;

    var user = JSON.parse($window.sessionStorage.getItem('usuario'));

    if (user==null || user==undefined)
    {

      $location.path('/inicio');
      return;
      }

    $scope.settingsPanel ={
             width: 900,
             height: 200,
             autoUpdate:true
        };
  $scope.pass ={
    strPass:'',
    strRePass:''
  };

   $scope.proy ={
          selTipoInvestigador:'',
          selEntidad:'',
          selLineaInvestigador:'',
          selGrupoProducto:''          
        };


  $scope.options = {           
            method: 'post',
            url: '' ,            
          
          cache: false,
                height: 300,
                striped: true,
                pagination: true,
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,                            
               
            columns: [{
                field: 'PRO_CODI',
                title: 'Código',
                align: 'left',
                valign: 'middle',
                width: 100,
                visible:false,
                switchable:false
            },  {
                field: 'PRO_NOMB',
                title: 'NOMBRE',
                align: 'left',
                valign: 'middle',
                width: 100,
                sortable: true
            }, {
                field: 'PRO_FINA',
                title: 'FIANACIACION',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'fecha_ini',
                title: 'F.Inicio',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'fecha_ter',
                title: 'F.Termina',
                align: 'left',
                valign: 'middle',
                sortable: true
            },{
                field: 'id_grupo',
                title: '',                
                visible:false,
                switchable:false
            },{
                field: 'id_tipoInvestigador',
                title: '',                
                visible:false,
                switchable:false
            },{
                field: 'id_convocatoria',
                title: '',                
                visible:false,
                switchable:false
            },{
                field: 'id_linea',
                title: '',                
                visible:false,
                switchable:false
            },{
                title: '',
                width: 35,
                switchable:false,
                formatter: function(value, row, index) {

                       return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-pencil"></span></a>';

                },
                events:  window.operateEvents = {                        

                        'click .edit': function (e, value, row, index) {

                                 $scope.hideTable=true;  
                                 $scope.hideProyecto =false; 

                                 //$scope.$apply();   
                                 $scope.showProyecto(row);                        
                        }

                }
            }]
        };    
         $('#myModal').show();  
        datosInvestigador.$promise.then(function(datos){      
                id_inve = datos[0].INV_CODI;
               $scope.hideTable=false;  
               $scope.hideProyecto =true;   
             $('#tableinvestigadoredit').bootstrapTable('refresh',
              { url:'scripts/services/api.php?url=executeSQL/S/SELECT PI.id_grupo,PI.id_tipoInvestigador,PI.id_convocatoria,PI.id_linea,' +
                'P.PRO_CODI, P.PRO_NOMB, P.PRO_FINA,PI.fecha_ini,PI.fecha_ter FROM sgi_proy_inve AS PI INNER JOIN sgi_inve AS I ON I.INV_CODI =PI.id_inve INNER JOIN sgi_proy AS P ON  ' + 
                'P.PRO_CODI=PI.id_proy WHERE  PI.id_inve=' + datos[0].INV_CODI });     
             $('#myModal').hide();    
              $scope.viewDatos = datosInvestigador;  

                     var day;
                     var mounth;
                     var year;
                     var fechaStr;

                     day = moment(datosInvestigador[0].INV_FECH_NACI).format("D");
                     mounth = moment(datosInvestigador[0].INV_FECH_NACI).format("M");
                     year = moment(datosInvestigador[0].INV_FECH_NACI).format("YYYY");

                     fechaStr = year + "," + mounth + "," + day;

                     $scope.viewDatos[0].INV_FECH_NACI =new Date(fechaStr);

              oldUser = datos[0].INV_USER; 
              oldIdentificacion = datos[0].INV_IDEN;  

      });

      $scope.showProyecto  = function(codi)
      {
        
        $scope.proy ={

          selTipoInvestigador:codi.id_tipoInvestigador,
          selEntidad:codi.id_convocatoria,          
          selGrupoProducto:codi.id_grupo          
        };
        $scope.onChangedGrupProducto(codi.id_grupo,codi.id_linea);          
        $scope.idProyecto = codi.PRO_CODI;
        

        if (codi.PRO_CODI==0)
        {
          $scope.proyectoProducto=[];
          $('#strNombreProyecto').val("");
          $('#strTitulo').val("");
          $('#strFechaTitulo').val("");          
          $('#strFinanciacion').val("");          
          $('#fechaInicioProyecto').val("");
          $('#fechaTerminaProyecto').val("");         
        }
        else
        {

            var proyectoProducto=TareasResource.execute.query({Accion:'S',            
                SQL:" select tp.Descripcion AS NombreTipoProducto, pr.id AS IdProducto,pr.id_tipo AS IdTipoProducto,pr.Nombre As NombreProducto, pp.titulo AS TituloProducto ,pp.fecha AS Fecha ,'false' As Sel " +
                     " FROM  sgi_prod AS pr INNER JOIN sgi_tipo_prod AS tp ON (tp.id = pr.id_tipo) " +
                     " INNER JOIN sgi_prod_proy AS pp ON (pp.id_prod=pr.id) " +
                     " WHERE pp.id_proy =" + $scope.idProyecto + " AND pp.id_inve="  + $route.current.params.idInvestigador + "" }); 

       $scope.proyectoProducto =[];
        proyectoProducto.$promise.then(function(result2){
          tieneDatos = false;
          angular.forEach(result2, function(value, key){

            if (value.NombreProducto==undefined)
            {              
              $scope.proyectoProducto =[];              
            }
            else
              tieneDatos =true;
                        
          });
          if (tieneDatos==true)
                $scope.proyectoProducto = result2;           
        });


        $('#strNombreProyecto').val(codi.PRO_NOMB);
        $('#strFinanciacion').val(codi.PRO_FINA);  
        $scope.selGrupoProducto = codi.id_grupo;
        var fecha  =new Date(codi.fecha_ini);



        $('#fechaInicioProyecto').val(codi.fecha_ini); 

        if (codi.fecha_ter==null)
        {
          $('#fechaTerminaProyecto').val("");
        }
        else
        {
          fecha  =new Date(codi.fecha_ter);
          $('#fechaTerminaProyecto').val(codi.fecha_ter);

        }


        }

      }


      $scope.agregarProducto = function()
      {
        var strNombreProducto =$('#strNombreProducto').val();
        var strTituloProducto =$('#strTituloProducto').val();
        var selProducto =parseInt($("#selProducto").val()) +1;
        var strNombreTipoProducto =$("#selProducto option:selected").text();
        var fecha = $('#strFecha').val();
        var existe = false;

        if (strNombreProducto=="")
        {
            $window.alert("Falta nombre del producto");
            return;
        }

        if (strTituloProducto=="")
        {
            $window.alert("Falta título del producto");
            return;
        }

        if (fecha=="")
        {
            $window.alert("Falta seleccionar una fecha");
            return;
        }

        angular.forEach($scope.proyectoProducto,function(item){

          if (strNombreTipoProducto == item.NombreTipoProducto && item.NombreProducto==strNombreProducto && item.TituloProducto==strTituloProducto)
              {
                existe=true;
              }

          });

        if (existe==true)
        {
          $window.alert("Ya existe el Producto");
          return;
        }
       
        $scope.proyectoProducto.splice(0,0,{IdProducto:0,IdTipoProducto:selProducto,NombreTipoProducto:strNombreTipoProducto,NombreProducto:strNombreProducto,TituloProducto:strTituloProducto,Fecha:fecha});
      }

      $scope.eliminarProducto = function()
      {
        for(var i=0;i<$scope.proyectoProducto.length;i++)
        {
          if ($scope.proyectoProducto[i].Sel==true)
          {
            $scope.proyectoProducto.splice(i,1);
          }
        }
      }

      $scope.btnNovoClick = function() {

          var codi ={
            PRO_CODI:0
          }
          $scope.hideTable=true;  
          $scope.hideProyecto =false;                   
          $scope.showProyecto(codi);    
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

      $scope.salvarProyecto = function()
      {

        if ($scope.proyectoProducto.length==0)
        {
          $window.alert('Debe ingresar al menos un producto');
          return;
        }

       var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];

        var max;
        var mes;
        var idProyecto;

        var strNombreProyecto = $('#strNombreProyecto').val();        
        var strFinanciacion = $('#strFinanciacion').val();
        var fechaInicioProyecto = $('#fechaInicioProyecto').val();

        if (fechaInicioProyecto=="")
        {
            $window.alert("Falta fecha Inicio Proyecto");
            return;
        }

        var dat = fechaInicioProyecto.split("-");

        if (dat[1]==Meses[0] || dat[1]=="01") mes ="01";
        if (dat[1]==Meses[1] || dat[1]=="02") mes ="02";
        if (dat[1]==Meses[2] || dat[1]=="03") mes ="03";
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

            fechaInicioProyecto = dat[0] + "-" + mes + "-" + dat[2];
          else
            fechaInicioProyecto = dat[2] + "-" + mes + "-" + dat[0];

        var fechaTerminaProyecto = $('#fechaTerminaProyecto').val();

            dat = fechaTerminaProyecto.split("-");
        if (dat[1]==Meses[0] || dat[1]=="01") mes ="01";
        if (dat[1]==Meses[1] || dat[1]=="02") mes ="02";
        if (dat[1]==Meses[2] || dat[1]=="03") mes ="03";
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

            fechaTerminaProyecto = dat[0] + "-" + mes + "-" + dat[2];
          else
            fechaTerminaProyecto = dat[2] + "-" + mes + "-" + dat[0];                 

        if (strNombreProyecto=="")
        {
            $window.alert("Falta nombre del Proyecto");
            return;
        }

        

            if (strFinanciacion=="")
        {
            $window.alert("Falta financiación del Proyecto");
            return;
        }

        if ( $scope.idProyecto==0)
        {

            var  r= TareasResource.execute.query({Accion: "I",SQL:"0;sgi_proy;PRO_CODI;INSERT INTO sgi_proy " +
                                                            " (PRO_CODI,PRO_NOMB,PRO_FINA) " +
                                                            " VALUES (@@,'" + strNombreProyecto + "'," + strFinanciacion + ")"});
            r.$promise.then(function(result2){
                idProyecto = result2[0].valor;

                // =" +     + ",id_tipoInvestigador=" +  + "," +
                //   " =" +  + ",  =" +  + 

                r= TareasResource.execute.query({Accion: "I",SQL:"1;INSERT INTO sgi_proy_inve " +
                                                            " (id_inve,id_proy,fecha_ini,id_grupo," +
                                                             "id_tipoInvestigador,id_convocatoria,id_linea) " +
                                                            " VALUES (" + idInvestigador + "," + idProyecto + "," + 
                                                              "'" + fechaInicioProyecto + "', " + $scope.proy.selGrupoProducto + ", " +
                                                            "" + $scope.proy.selTipoInvestigador + ", " + $scope.proy.selEntidad +  "," + $scope.proy.selLineaInvestigador +  ")"});    

                       r.$promise.then(function(result2){
                          $scope.idProyecto = result2[0].valor;

                              $scope.Lista =[];
                          angular.forEach( $scope.proyectoProducto,function(item){
                            if (item.IdProducto==0)
                            {
                             $scope.Lista.splice(0,0,{IdProducto:0,IdTipoProducto:item.IdTipoProducto,NombreTipoProducto:item.NombreTipoProducto,NombreProducto:item.NombreProducto,TituloProducto:item.TituloProducto,Fecha:formatoFecha(item.Fecha)});
                            }

                          });
                         
                          var datos = {
                            Lista:$scope.Lista,
                            idProy:idProyecto,
                            idInve: idInvestigador
                          }

                        TareasResource.enviarProyectoProducto(datos).then(function(result) { 

                          var resultado = result;
                         
                              $window.alert("Guardado");
                              $scope.pass.strPass="";
                              $scope.pass.strRePass="";
                              $location.path('/edit-investigador/'+ idInvestigador);
                            

                        });
               
                       });

            });
          
        }
        else
        {

           var  r= TareasResource.execute.query({Accion: "M",SQL:"UPDATE  sgi_proy set PRO_NOMB ='" + strNombreProyecto + "'," +
                                                            " PRO_FINA=" + strFinanciacion + " WHERE PRO_CODI=" + $scope.idProyecto + ""});
            r.$promise.then(function(result2){
              if (result2[0].estado=="ok")                                                                                                                       
              {
                 r= TareasResource.execute.query({Accion: "M",SQL:"UPDATE sgi_proy_inve set  fecha_ini ='" + fechaInicioProyecto + "'," + 
                  " id_grupo=" +   $scope.proy.selGrupoProducto  + ",id_tipoInvestigador=" + $scope.proy.selTipoInvestigador + "," +
                  " id_convocatoria=" + $scope.proy.selEntidad + ", id_linea =" + $scope.proy.selLineaInvestigador + 
                  " WHERE id_inve=" + idInvestigador + " AND id_proy=" + $scope.idProyecto + ""});    
                 r.$promise.then(function(result2){
                    if (result2[0].estado=="ok")
                    {
                       var  r6= TareasResource.execute.query({Accion: "D",SQL:"DELETE FROM sgi_prod_proy " +
                                                            " WHERE  id_proy = " +  $scope.idProyecto + " AND id_inve="+ idInvestigador + ""});
                                          r6.$promise.then(function(result2){
                                             if (result2[0].estado=="ok")
                                             {

                                              $scope.Lista =[];
                                              angular.forEach( $scope.proyectoProducto,function(item){

                                                 $scope.Lista.splice(0,0,{IdProducto:0,IdTipoProducto:item.IdTipoProducto,NombreTipoProducto:item.NombreTipoProducto,NombreProducto:item.NombreProducto,TituloProducto:item.TituloProducto,Fecha:formatoFecha(item.Fecha)});

                                              });
                                             
                                              var datos = {
                                                Lista:$scope.Lista,
                                                idProy:$scope.idProyecto,
                                                idInve: idInvestigador
                                              }

                                            TareasResource.enviarProyectoProducto(datos).then(function(result) { 

                                              var resultado = result;
                                              
                                                  $window.alert("Actualizado");
                                                  $scope.pass.strPass="";
                                                  $scope.pass.strRePass="";
                                                  $location.path('/edit-investigador/'+ idInvestigador);
                                              
                                              });
                                            }
                                       });
                                    }  
                             });
                        }
             });
        } 
  }
      $scope.volverLista = function()
      {
        $scope.hideTable=false;  
        $scope.hideProyecto =true; 
          $('#tableinvestigadoredit').bootstrapTable('refresh',
              { url:'scripts/services/api.php?url=executeSQL/S/SELECT PI.id_grupo,PI.id_tipoInvestigador,PI.id_convocatoria,PI.id_linea,' +
              ' P.PRO_CODI, P.PRO_NOMB, P.PRO_FINA,PI.fecha_ini,PI.fecha_ter FROM sgi_proy_inve AS PI INNER JOIN sgi_inve AS I ON I.INV_CODI =PI.id_inve INNER JOIN sgi_proy AS P ON  ' + 
              ' P.PRO_CODI=PI.id_proy WHERE  PI.id_inve=' + id_inve });                      
      }


      $scope.jqxPanelSettings =
            {             

              height: "100",
              width:'95%',
              autoUpdate:true,
              theme:'bootstrap'
             
            }
     var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];
     
     var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth(); //hoy es 0!
    var Mes = Meses[mm-1];
    var yyyy = hoy.getFullYear();

    $scope.fechaHoy = new Date(yyyy, mm, dd);
  	

    

     $scope.Documento = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT TID_CODI,TID_NOMB FROM sgi_tipo_docu'}); 

      $scope.Centro = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT CEN_CODI,CEN_NOMB FROM sgi_cent'}); 

       $scope.Programa = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT PAC_CODI,PAC_NOMB FROM sgi_prog_acad'}); 

       $scope.academico = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT PAC_CODI,PAC_NOMB FROM sgi_prog_acad'}); 

        

       $scope.formacion = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT NIV_CODI,NIV_NOMB FROM sgi_nive_form'}); 

      
       var items ={
        Accion:"S",
        SQL: 'SELECT G.gru_codi,G.gru_nomb FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG ON IG.IGR_GRUP_CODI=G.gru_codi WHERE '+
                         " IG.IGR_INVE_IDEN=" + user.Id_inve
       }

      var  grupo = TareasResource.SQL(items); 
        $scope.grupo =[];
      grupo.then(function(result2){
        if (result2.data[0]!=null)
          $scope.grupo = result2.data;
      });


       var informacionacademica =TareasResource.execute.query({Accion: "S",
                         SQL: "SELECT NIN_NIV_CODI AS Codi,NIN_TITU_OBTE AS titulo,NIN_INST As Instituto, " +
                         " NIN_AGNO AS Agno, Concat(NIN_TITU_OBTE, ' ',NIN_INST, ' ',NIN_AGNO) As Nombre,'false' As Sel FROM sgi_nive_inve where " +
                         " NIN_INV_CODI =" + $route.current.params.idInvestigador + "" });

        // var informacionacademica =TareasResource.execute.query({Accion: "S",
        //                  SQL: "SELECT * from sgi_inve where inv_iden=0"});

      var tieneDatos = false;
      $scope.informacionacademica =[];  
        informacionacademica.$promise.then(function(result2){
          angular.forEach(result2, function(value, key){
            if (value.Agno==undefined)
            {              
              $scope.informacionacademica =[];              
            }
            else
              tieneDatos =true;
                        
          });
          var idConsecutivo=0;
          if (tieneDatos==true)

               angular.forEach(result2,function(item){
                  $scope.informacionacademica.splice(0,0,{Consecutivo:idConsecutivo,Nombre:item.Nombre,Sel:false,Codi:item.Codi, titulo:item.titulo,Instituto:item.Instituto,Agno:item.Agno});                                        
                  idConsecutivo = idConsecutivo+1;
               });                                

        });
        

       var grupoinvestigacion =  TareasResource.execute.query({Accion: "S",
                         SQL:"SELECT grupo.gru_nomb As NombreGrupo,grupo.gru_codi As IdGrupo," +
                            "linea.lin_codi As IdLinea,linea.lin_desc As NombreLinea, " +
                            "inve_grup.igr_fech_inic As FechaInicio,inve_grup.igr_fech_term As FechaTermina,'false' As Sel FROM  sgi_inve_grup as inve_grup INNER JOIN " + 
                            "sgi_grup as grupo on grupo.gru_codi = inve_grup.igr_grup_codi INNER JOIN " +                            
                            "sgi_line_inve as linea on linea.lin_codi = inve_grup.igr_line_inve_codi " +
                            " WHERE  inve_grup.igr_inve_iden="  + $route.current.params.idInvestigador + "" }); 

        
        $scope.grupoinvestigacion =[];
        grupoinvestigacion.$promise.then(function(result2){
          tieneDatos = false;
          angular.forEach(result2, function(value, key){
            if (value.NombreGrupo==undefined)
            {              
              $scope.grupoinvestigacion =[];              
            }
            else
              tieneDatos =true;
                        
          });
          if (tieneDatos==true)
                $scope.grupoinvestigacion = result2;           
        });

        $scope.grupoProyecto =[];

       $scope.semillero = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT sem_codi,sem_nomb FROM sgi_semi'}); 

        var semilleroinvestigacion =  TareasResource.execute.query({Accion: "S",
                         SQL:"SELECT semillero.sem_nomb As NombreSemillero,semillero.sem_codi As IdSemillero," +
                            "linea.lin_codi As IdLinea,linea.lin_desc As NombreLinea, " +
                            "inve_semi.ins_fech_inic As FechaInicio,inve_semi.ins_fech_term As FechaTermina,'false' As Sel FROM  sgi_inve_semi as inve_semi INNER JOIN " + 
                            "sgi_semi as semillero on semillero.sem_codi = inve_semi.ins_semi_codi INNER JOIN " +                            
                            "sgi_line_inve as linea on linea.lin_codi = inve_semi.ins_line_inve_codi " +
                            " WHERE  inve_semi.ins_inve_iden="  + $route.current.params.idInvestigador + "" }); 

       $scope.semilleroinvestigacion =[];
        semilleroinvestigacion.$promise.then(function(result2){
            tieneDatos = false;
          angular.forEach(result2, function(value, key){
            if (value.NombreSemillero==undefined)
            {              
              $scope.semilleroinvestigacion =[];              
            }
            else
              tieneDatos =true;
                        
          });
          if (tieneDatos==true)
                $scope.semilleroinvestigacion = result2;           
        });


      $scope.tipoinve = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT tiv_codi,tiv_desc FROM sgi_tipo_vinc'});  

      $scope.convocatoria = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT con_codi,con_desc FROM sgi_conv'});  

      $scope.productos =TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT id,Descripcion FROM sgi_tipo_prod'});  

     


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


   function addProyectoProducto(nombreProducto,selProducto,nombreProyecto,idProyecto,
                    fechaInicio,fechaTermina,finanaciacion)
   {

     var valido =true;
     var fechainiValue;
     var fechafinValue;
     var FechainiValue;
     var FechafinValue;
     var fechaini;
     var fechaterm;
     for (var i=0;i<$scope.proyectoProducto.length;i++)
     {
        if ($scope.proyectoProducto[i].idProducto==selProducto && $scope.proyectoProducto[i].idProyecto==idProyecto)
        {
          $window.alert("Ya existe en la selección");
          return;
        }
     }

          fechaini = new Date(fechaInicio);
          fechainiValue = fechaini.valueOf();
          fechaini = fechaini.getFullYear() + '-' + parseInt(fechaini.getMonth()+1) + '-' + fechaini.getDate();

          fechaterm = new Date(fechaTermina);
          fechafinValue = fechaterm.valueOf();
          fechaterm = fechaterm.getFullYear() + '-' + parseInt(fechaterm.getMonth()+1) + '-' + fechaterm.getDate();


          angular.forEach($scope.proyectoProducto,function (item){

             item.FechaInicio = new Date(item.FechaInicio + 'GMT-0500');
             FechainiValue = item.FechaInicio.valueOf();

             item.FechaTermina = new Date( item.FechaTermina + 'GMT-0500');
             FechafinValue = item.FechaTermina.valueOf();

            if ((fechainiValue>=FechainiValue && fechainiValue<=FechafinValue) || (fechafinValue>=FechainiValue && fechafinValue<=FechafinValue))
            {

              $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
              valido = false;
              return forEach.break(); 
            }

            if (fechainiValue<=FechainiValue && fechafinValue>=FechafinValue)
            {
               $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
               valido = false;
               return forEach.break(); 
            }

           
          });
       

          if (valido==true)
          {

           $scope.proyectoProducto.push({NombreProyecto:nombreProyecto,NombreProducto:nombreProducto,
           FechaInicio:fechaini,FechaTermina:fechaterm,Financiacion:finanaciacion,
            idProducto:selProducto,idProyecto:idProyecto});    
          }
   }

   $scope.onClicAddProductoProyecto = function(nombreProyecto,finanaciacion,selEntidad, 
              selProducto,nombreProducto,fechaInicio,fechaTermina){




    var idProyecto;

    if (nombreProyecto=="" || nombreProyecto==undefined)
    {
      $window.alert("Falta Nombre del Proyecto");
      return;
    }

    if (finanaciacion=="" || finanaciacion==undefined)
    {
      $window.alert("Falta finanaciación");
      return;
    }

    if (selEntidad=="" || selEntidad==undefined)
    {
      $window.alert("Falta Entidad/Convocatoria");
      return;
    }
    
    if (nombreProducto=="" || nombreProducto==undefined)
    {
      $window.alert("Falta seleccionar el Producto");
      return;
    }

     var existess = TareasResource.validaExisteRegistro.query({Tabla: "sgi_proy",Campo: "PRO_NOMB",Valor: nombreProyecto});
     
     existess.$promise.then(function (result) {
        if (result[0].existe=="false")
        {
            var  r= TareasResource.execute.query({Accion: "I",SQL:"0;sgi_proy;PRO_CODI;INSERT INTO sgi_proy " +
                                                            " (PRO_CODI,PRO_NOMB,PRO_FINA,PRO_CON_CODI) " +
                                                            " VALUES (@@,'" + nombreProyecto + "'," + finanaciacion + "," + selEntidad + ")"});
            r.$promise.then(function(result2){
                idProyecto = result2[0].valor;
                addProyectoProducto(nombreProducto,selProducto,nombreProyecto,idProyecto,
                    fechaInicio,fechaTermina,finanaciacion);
                  
            });

        }
        else
        {
          idProyecto =result[0].valor[0].PRO_CODI;           
          addProyectoProducto(nombreProducto,selProducto,nombreProyecto,idProyecto,
                    fechaInicio,fechaTermina,finanaciacion);
        }

      
    
     });                
   }



   $scope.onChangedProducto = function(selProducto)
   {

    $('#strNombreProducto').val("");
      $('#strTituloProducto').val("");

      $scope.libro =false;
      $scope.revista=false;
      $scope.software=false;

      switch(selProducto) {
           case "1":
              $scope.libro =true;
              break;
          case "2":
              $scope.revista =true;
              break;
          case "3":
              $scope.software=true;
              break;

      }      
   }

    $scope.onChangedGrup = function(idGrupo){
         $scope.grupolinea = [];
      $scope.grupolinea = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT l.lin_codi,l.lin_desc FROM sgi_grup_line_inve AS g " + 
                         " INNER JOIN sgi_line_inve AS l ON g.gli_line_inve_codi=l.lin_codi " +
                         " WHERE g.gli_grup_codi=" + idGrupo.gru_codi }); 

    };

$scope.onChangedGrupProducto = function(idGrupo,idLinea){

      $scope.grupolineaproducto = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT l.lin_codi,l.lin_desc FROM sgi_grup_line_inve AS g " + 
                         " INNER JOIN sgi_line_inve AS l ON g.gli_line_inve_codi=l.lin_codi " +
                         " WHERE g.gli_grup_codi=" + idGrupo }); 

     $scope.grupolineaproducto.$promise.then(function(result){
          $scope.proy.selLineaInvestigador=idLinea;
    });




    };


    $scope.onChangedSemillero = function(idSemillero) {

        $scope.semillerolinea = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT l.lin_codi,l.lin_desc FROM sgi_line_inve_semi AS g " + 
                         " INNER JOIN sgi_line_inve AS l ON g.lis_line_inve_codi=l.lin_codi " +
                         " WHERE g.lis_semi_codi=" + idSemillero + ""}); 

    };


   $scope.on_changedprograma = function(idPrograma){



       $scope.Programa2 = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT ESCUELA.ESC_NOMB FROM sgi_prog_acad AS PROGRAMA INNER JOIN " +
                         "sgi_escu AS ESCUELA ON  PROGRAMA.PAC_CODI = ESCUELA.ESC_CODI WHERE " +
                         "PROGRAMA.PAC_CODI =" + idPrograma }); 

   };

      $scope.agregarformacion = function(titu,tituloformacion,institucion,Agno,myformacion) {
        var existe =false;

        if (myformacion==undefined || myformacion=="")
        {
         $window.alert("Falta Nivel de Formación");          
          return; 
        }

        if ($('#tituloformacion').val()=="")
        {
          $window.alert("Falta título formación");
          $('#tituloformacion').focus();
          return;
        }

        if ($('#institucion').val()=="")
        {
          $window.alert("Falta Institución");
          $('#institucion').focus();
          return;
        }

        if ($('#Agno').val()=="" ||  parseInt($('#Agno').val())<0 )
        {
          $window.alert("Falta Año debe ser mayor que cero");
          $('#Agno').focus();
          return;
        }

        var datosformacion = TareasResource.execute.query({Accion: 'S',
                         SQL:"SELECT niv_codi,niv_nomb FROM sgi_nive_form WHERE niv_codi=" + myformacion.NIV_CODI + ""}); 


          datosformacion.$promise.then(function (result) { 

              angular.forEach($scope.informacionacademica,function(item){
              if (myformacion.NIV_NOMB!="PROFESIONAL")
                {
                 if (item.Codi==myformacion.NIV_CODI)
                  {
                    existe = true;
                  }
                }
                else
                {

                }


               });

               if (existe==true)
                  {
                     $window.alert("El nivel de Formación " + myformacion.NIV_NOMB + " ya está Incluido");
                  }
                  else
                  {
                   $scope.informacionacademica.splice(0,0,{Consecutivo:$scope.informacionacademica.length, Nombre:result[0].niv_nomb + ' ' + tituloformacion + ' ' + institucion + ' ' + Agno,Sel:false,Codi:myformacion.NIV_CODI, titulo:tituloformacion,Instituto:institucion,Agno:Agno});                      
                   $('#tituloformacion').val("");
                   $('#institucion').val("");
                   $('#Agno').val("");

                  }

          });

       

        

         
          // var numero = Enumerable.From(informacionacademica)
          //   .Where("p => p.Codi ==" + myformacion.NIV_CODI).Select();               
      };


      $scope.delformacion = function(formacion) {
        var idConsecutivo =0;
        var datos=[];
        $scope.informacionacademica.splice(formacion.$index,1);

        angular.forEach($scope.informacionacademica,function(item){
                datos.splice(0,0,{Consecutivo:idConsecutivo,Nombre:item.Nombre,Sel:false,Codi:item.Codi, titulo:item.titulo,Instituto:item.Instituto,Agno:item.Agno});                                        
                idConsecutivo = idConsecutivo+1;
             });    
        $scope.informacionacademica = datos;       
      };

$scope.delGrupoInvestigacion = function() {

       for(var i=0;i<$scope.grupoinvestigacion.length;i++)
        {
          if ($scope.grupoinvestigacion[i].Sel==true)
          {
            $scope.grupoinvestigacion.splice(i,1);
          }
        }
};


$scope.delSemilleroInvestigacion = function(){

        for(var i=0;i<$scope.semilleroinvestigacion.length;i++)
        {
          if ($scope.semilleroinvestigacion[i].Sel==true)
          {
            $scope.semilleroinvestigacion.splice(i,1);
          }
        }
};




$scope.OnClicEliminaProductoProyecto = function(){

        for(var i=0;i<$scope.proyectoProducto.length;i++)
        {
          if ($scope.proyectoProducto[i].Sel==true)
          {
            $scope.proyectoProducto.splice(i,1);
          }
        }
};

$scope.agregargrupoinvestigacion =  function(idgrupo,idlinea,fechaini,fechaterm)
{

  if (idgrupo==undefined)
  {
    $window.alert("Falta seleccionar el grupo");
    return;
  }

  if (idlinea==undefined)
  {
   $window.alert("Falta seleccionar línea");
    return; 
  }

if ($('#idFechaInicioGrupo').val()=="")
  {
   $window.alert("Falta seleccionar Fecha Inicio");
    return; 
  }


 var valido =true;
 var grupoexiste =false;
 var fechainiValue;
 var fechafinValue;
 var FechainiValue;
 var FechafinValue;
   var datosgrupo =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT gru_nomb,gru_codi FROM sgi_grup WHERE gru_codi=" + idgrupo.gru_codi + ""});


  angular.forEach($scope.grupoinvestigacion,function(item){

      if (item.IdGrupo == idgrupo.gru_codi)
      {
        grupoexiste=true;
      }   

  });  

$scope.datagrupo = datosgrupo;
$scope.datagrupo.$promise.then(function (resultgrupo) {

    var datoslinea =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT lin_desc,lin_codi FROM sgi_line_inve WHERE lin_codi=" + idlinea + ""});

      $scope.datalinea = datoslinea;
      $scope.datalinea.$promise.then(function (resultlinea) {
           fechaini = moment(fechaini,"YYYY-MM-DD").format("YYYY-MM-DD");  

          //  var day = moment(fechaini).format("D");
          //  var mounth = moment(fechaini).format("M");
          //  var year = moment(fechaini).format("YYYY");

        
          // fechaini = year + '-' + mounth + '-' + day;




          if ($('#idFechaFinGrupo').val()=="")          
            fechaterm="";                      
          else
          {
              fechaterm = moment(fechaterm,"YYYY-MM-DD").format("YYYY-MM-DD");             
          }

          // angular.forEach($scope.grupoinvestigacion,function (item){

          //    item.FechaInicio = new Date(item.FechaInicio + 'GMT-0500');
          //    FechainiValue = item.FechaInicio.valueOf();

          //    item.FechaTermina = new Date( item.FechaTermina + 'GMT-0500');
          //    FechafinValue = item.FechaTermina.valueOf();
          //  if (grupoexiste==true)
          //  {  
          //   if ((fechainiValue>=FechainiValue && fechainiValue<=FechafinValue) || (fechafinValue>=FechainiValue && fechafinValue<=FechafinValue))
          //   {

          //     $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
          //     valido = false;
          //     return forEach.break(); 
          //   }

          //   if (fechainiValue<=FechainiValue && fechafinValue>=FechafinValue)
          //   {
          //      $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
          //      valido = false;
          //      return forEach.break(); 
          //   }

          //  }
          // });
       

          if (valido==true)
          {

            $scope.grupoinvestigacion.push({NombreGrupo:resultgrupo[0].gru_nomb,IdGrupo:resultgrupo[0].gru_codi, 
                  NombreLinea:resultlinea[0].lin_desc, IdLinea:resultlinea[0].lin_codi,
                  FechaInicio:fechaini,FechaTermina:fechaterm,Sel:false});
            $scope.grupoProyecto.push({Id:resultgrupo[0].gru_codi,Nombre:resultgrupo[0].gru_nomb});
          }

          $('#idFechaInicioGrupo').val("");
          $('#idFechaFinGrupo').val("");
      });    
});

 



};

$scope.agregarSemilleroInvestigacion = function(idSemillero,idLinea,fechaInicioSemillero,fechaFinalSemillero)
{
   var valido =true;
   var fechainiValue;
   var fechafinValue;
   var FechainiValue;
   var FechafinValue;
   var fechaini;
   var fechaterm;
    var datos =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT sem_codi,sem_nomb FROM sgi_semi WHERE sem_codi=" + idSemillero + ""});
    $scope.datos = datos;    
    $scope.datos.$promise.then(function (resultSemillero){

      var datos =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT lin_codi,lin_desc FROM sgi_line_inve WHERE lin_codi =" + idLinea + ""});

        $scope.datos = datos;    
        $scope.datos.$promise.then(function (resultLinea){


            fechaini = moment(fechaInicioSemillero,"YYYY-MM-DD").format("YYYY-MM-DD");          


          if ($('#idfechaFinalSemillero').val()=="")          
            fechaterm="";                      
          else
          {
              fechaterm = moment(fechaFinalSemillero,"YYYY-MM-DD").format("YYYY-MM-DD");             
          }


          // fechaini = new Date(fechaInicioSemillero);
          // fechainiValue = fechaini.valueOf();
          // fechaini = fechaini.getFullYear() + '-' + parseInt(fechaini.getMonth()+1) + '-' + fechaini.getDate();

          // fechaterm = new Date(fechaFinalSemillero);
          // fechafinValue = fechaterm.valueOf();
          // fechaterm = fechaterm.getFullYear() + '-' + parseInt(fechaterm.getMonth()+1) + '-' + fechaterm.getDate();

        //   angular.forEach($scope.semilleroinvestigacion,function (item){

        //      item.FechaInicio = new Date(item.FechaInicio + 'GMT-0500');
        //      FechainiValue = item.FechaInicio.valueOf();

        //      item.FechaTermina = new Date( item.FechaTermina + 'GMT-0500');
        //      FechafinValue = item.FechaTermina.valueOf();

        //     if ((fechainiValue>=FechainiValue && fechainiValue<=FechafinValue) || (fechafinValue>=FechainiValue && fechafinValue<=FechafinValue))
        //     {

        //       $window.alert('la fecha está dentro de alguna fecha ya seleccionada');
        //       valido = false;
        //      return forEach.break(); 
        //     }

        //     if (fechainiValue<=FechainiValue && fechafinValue>=FechafinValue)
        //     {
        //        $window.alert('la fecha está dentro de alguna fecha ya seleccionada');
        //        valido = false;
        //        return forEach.break(); 
        //     }

        // });

          if (valido==true)
          {
             $scope.semilleroinvestigacion.push({NombreSemillero:resultSemillero[0].sem_nomb,IdSemillero:idSemillero,
                                                       NombreLinea:resultLinea[0].lin_desc,IdLinea:idLinea,
                                                       FechaInicio:fechaini,
                                                       FechaTermina:fechaterm,
                                                       Sel:false});
          }
    
    });
});
}




      $scope.uploadFile = function (input) {
 
     if (input.files && input.files[0]) {         

        var reader = new FileReader();
        reader.onload = function (e) {
            
             var dataURL = reader.result;
      var output = document.getElementById('photo-id');
      output.src = dataURL;
           
            //Sets the Old Image to new New Image
            // $('#photo-id').attr('src', e.target.result);
 
            // //Create a canvas and draw image on Client Side to get the byte[] equivalent
            // var canvas = document.createElement("canvas");
            // var imageElement = document.createElement("img");
 
            // imageElement.setAttribute('src', e.target.result);
            // canvas.width = 90;
            // canvas.height =90;
            // var context = canvas.getContext("2d");
            // context.drawImage(imageElement, 0, 0);
            // var base64Image = canvas.toDataURL("image/jpeg");
            // $('#photo-id').attr('src', base64Image);
            //Removes the Data Type Prefix 
            //And set the view model to the new value
           
            $scope.viewDatos[0].inv_foto = dataURL.replace(/data:image\/jpeg;base64,/g, '');



           // dato = base64Image.replace(/data:image\/(jpeg);base64,/g, "");
           
         // $scope.viewDatos[0].inv_foto=$scope.viewDatos[0].inv_foto.replace(new RegExp(/\//g),'|');
         // $scope.viewDatos[0].inv_foto=$scope.viewDatos[0].inv_foto.replace(new RegExp(/\+/g),'*');
            
            

           // $scope.viewDatos[0].inv_foto = $base64.encode($scope.viewDatos[0].inv_foto);
           // $scope.viewDatos[0].inv_foto=  $base64.decode($scope.viewDatos[0].inv_foto);
        }
          
        //Renders Image on Page
        reader.readAsDataURL(input.files[0]);
    }
};
 $scope.volver = function(){
    $location.path('/inicio');
 };


function actualizarTablasRelacionadas(id){
    var  executeSql;
    var fechaini;
    var fechafin;
    executeSql= TareasResource.execute.query({Accion: "D",SQL:"DELETE FROM sgi_nive_inve " +
                                                    " WHERE NIN_INV_CODI = " + id });     
    executeSql.$promise.then(function (result)
    {
      if (result[0].estado=="ok")
      {
        for(var i=0;i<$scope.informacionacademica.length;i++)
           {
           if ($scope.informacionacademica[i].Sel=="false" || $scope.informacionacademica[i].Sel==false)
              {
                  executeSql= TareasResource.execute.query({Accion: "I",SQL:id + ";INSERT INTO sgi_nive_inve " +
                   " (NIN_INV_CODI,NIN_NIV_CODI,NIN_INST,NIN_AGNO,NIN_TITU_OBTE) " +
                   " VALUES (" + id + "," + $scope.informacionacademica[i].Codi + ",'" + 
                   $scope.informacionacademica[i].Instituto + "'," + 
                   $scope.informacionacademica[i].Agno + ",'" +
                   $scope.informacionacademica[i].titulo + "')"}); 

              }
           }
          executeSql.$promise.then(function (result)
          {         
            if (result[0].estado=="ok")
               {
                  executeSql= TareasResource.execute.query({Accion: "D",SQL:"DELETE FROM sgi_inve_grup " +
                  " WHERE IGR_INVE_IDEN = " + id });                   
                      executeSql.$promise.then(function (result)
                      {
                        if (result[0].estado="ok")
                        {
                          for(var i=0;i<$scope.grupoinvestigacion.length;i++)
                            {
                               if ($scope.grupoinvestigacion[i].Sel=="false" || $scope.grupoinvestigacion[i].Sel==false)
                                 {
                                     
                                      fechaini = moment($scope.grupoinvestigacion[i].FechaInicio).format("YYYY-MM-DD");                                      
                                      // fechaini = fechaini.getFullYear() + '-' + parseInt(fechaini.getMonth()+1) + '-' + fechaini.getDate();
                                      fechafin = new Date($scope.grupoinvestigacion[i].FechaTermina);                                      
                                      // fechafin = fechafin.getFullYear() + '-' + parseInt(fechafin.getMonth()+1) + '-' + fechafin.getDate();

                                      var fecha_fin='NULL';

                                      if ($scope.grupoinvestigacion[i].FechaTermina!="")
                                      {
                                           fecha_fin ="'" + moment($scope.grupoinvestigacion[i].FechaTermina).format("YYYY-MM-DD") + "'";                                                                                
                                      }


                                      executeSql= TareasResource.execute.query({Accion: "I",SQL:"1;INSERT INTO sgi_inve_grup " +
                                      " (IGR_GRUP_CODI,igr_line_inve_codi,IGR_FECH_INIC,IGR_FECH_TERM,IGR_INVE_IDEN,IGR_TIPO_VINC_CODI,igr_regi_ingr) " +
                                      " VALUES (" + $scope.grupoinvestigacion[i].IdGrupo + "," + $scope.grupoinvestigacion[i].IdLinea + ",'" + 
                                       fechaini + "'," + 
                                       fecha_fin + "," + id + ",1,0)"});                        
                                 }                                  

                            }
                             executeSql.$promise.then(function (result){
                                 if (result[0].estado=="ok")
                                    {

                                        executeSql= TareasResource.execute.query({Accion: "D",SQL:"DELETE FROM sgi_inve_semi " +
                                        " WHERE INS_INVE_IDEN = " + id });
                                        executeSql.$promise.then(function (result)
                                        {
                                          if (result[0].estado=="ok")
                                          {
                                              for(var i=0;i<$scope.semilleroinvestigacion.length;i++)
                                                {
                                                if ($scope.semilleroinvestigacion[i].Sel=="false" || $scope.semilleroinvestigacion[i].Sel==false)
                                                   {

                                                       fechaini = moment($scope.semilleroinvestigacion[i].FechaInicio).format("YYYY-MM-DD");   
                                                        // fechafin = moment($scope.semilleroinvestigacion[i].FechaTermina).format("YYYY-MM-DD");                                      
                                                        // fechaini = fechaini.getFullYear() + '-' + parseInt(fechaini.getMonth()+1) + '-' + fechaini.getDate();
                                                        // fechafin = new Date($scope.semilleroinvestigacion[i].FechaTermina);                                      
                                                        // fechafin = fechafin.getFullYear() + '-' + parseInt(fechafin.getMonth()+1) + '-' + fechafin.getDate();

                                                        var fecha_fin='NULL';

                                                        if ($scope.semilleroinvestigacion[i].FechaTermina!="")
                                                        {
                                                             fecha_fin ="'" + moment($scope.semilleroinvestigacion[i].FechaTermina).format("YYYY-MM-DD") + "'";                                                                                
                                                        }

                                                     // fechaini = new Date($scope.semilleroinvestigacion[i].FechaInicio);                                      
                                                     // fechaini = fechaini.getFullYear() + '-' + parseInt(fechaini.getMonth()+1) + '-' + fechaini.getDate();
                                                     // fechafin = new Date($scope.semilleroinvestigacion[i].FechaTermina);                                      
                                                     // fechafin = fechafin.getFullYear() + '-' + parseInt(fechafin.getMonth()+1) + '-' + fechafin.getDate(); 

                                                     executeSql= TareasResource.execute.query({Accion: "I",SQL:"0;sgi_inve_semi;INS_CODI;INSERT INTO sgi_inve_semi " +
                                                     " (INS_CODI,INS_SEMI_CODI,ins_line_inve_codi,INS_FECH_INIC,INS_FECH_TERM,INS_INVE_IDEN) " +
                                                     " VALUES (@@," + $scope.semilleroinvestigacion[i].IdSemillero + "," + $scope.semilleroinvestigacion[i].IdLinea + ",'" + 
                                                     fechaini + "'," + 
                                                     fecha_fin + "," + id + ")"});                        
                                                   }
                                                }
                                              executeSql.$promise.then(function (result)
                                              {
                                                if (result[0].estado=="ok")
                                                { 
                                                    if ($scope.hideProyecto==false)
                                                    {

                                                        $scope.salvarProyecto();                                                        
                                                    }
                                                    else
                                                    {
                                                      $('#myModal').hide(); 
                                                        $window.alert("Guardado");
                                                        $scope.pass.strPass="";
                                                        $scope.pass.strRePass="";
                                                        $location.path('/edit-investigador/'+ id);
                                                    }                                                                                    
                                                }
                                              });
                                          }  
                                            else
                                            $window.alert(result[0].msg);
                                        });                                     
                                    }
                                      else
                                      $window.alert(result[0].msg);
                             });
                        } 
                        else
                        $window.alert(result[0].msg);                       
                      });
                }  
                else
                $window.alert(result[0].msg);                  
          });   
      }
      else
        $window.alert(result[0].msg);
    });
                 
}

$scope.save = function(investigador){

     $('#myModal').show();  

      var id = (investigador.INV_CODI || investigador.INV_CODI=="undefined") ? investigador.INV_CODI :'0' ;
 



      if (investigador.INV_USER==undefined || investigador.INV_USER=="")
      {
        $window.alert('Digite un usuario');        
        $('#strUser').focus();
        return;
      }





      if (($scope.pass.strPass!="" || $scope.pass.strPass!=undefined) || ($scope.pass.strRePass!="" || $scope.pass.strRePass!=undefined))
      {
        if ($scope.pass.strPass!=$scope.pass.strRePass)
        {
            $window.alert('Las claves no son iguales');  
            $("#strPass").focus();      
            return;
        }        
      }

      if (investigador.INV_TIPO_DOCU_CODI=="undefined" || investigador.INV_TIPO_DOCU_CODI=="")
      {
        $window.alert('Seleccione un tipo documento');
        return;
      }

      if (investigador.INV_IDEN=="undefined" || investigador.INV_IDEN=="")
      {
        $window.alert('Digite un número de documento');
        return;
      }
      

      if (investigador.INV_NOMB=="undefined" || investigador.INV_NOMB=="")
      {
        $window.alert('Digite nombre ');
        return;
      }

      if (investigador.INV_APEL=="undefined" || investigador.INV_APEL=="")
      {
        $window.alert('Digite apellido');
        return;
      }


var validaUser = TareasResource.validaExisteRegistro.query({Tabla:'sgi_inve',Campo:'inv_user',Valor:investigador.INV_USER});
  
  validaUser.$promise.then(function (resultUser){

        var re = resultUser[0].existe;
        if (re=="true" && investigador.INV_USER!=oldUser)
        {
          $window.alert('El usuario ya existe');
          $('#strUser').focus();
          return;
        }  

var validaIdentificacion = TareasResource.validaExisteRegistro.query({Tabla:'sgi_inve',Campo:'inv_iden',Valor:investigador.INV_IDEN});
  
  validaIdentificacion.$promise.then(function (result){

      if (result[0].existe=="true" && oldIdentificacion!=investigador.INV_IDEN)
      {
        $window.alert('La Identificación ya existe');
        return;
      }

      else
      {

      if(id != '0')    
      {     
        
        idInvestigador = investigador.INV_CODI;                             

        var datos =  {

        Accion: 'M',
        SQL: "UPDATE sgi_inve set  INV_IDEN = '" + investigador.INV_IDEN + "', " + 
                         " INV_TIPO_DOCU_CODI=" + investigador.INV_TIPO_DOCU_CODI + ", " +
                         " INV_NOMB='" + investigador.INV_NOMB + "', " + 
                         " inv_foto= '" + investigador.inv_foto + "', " + 
                         " INV_APEL='" + investigador.INV_APEL + "', " +
                         " INV_FECH_NACI='" + moment(new Date(investigador.INV_FECH_NACI)).format('YYYY-MM-DD')  + "', " +
                         " INV_MAIL='" + investigador.INV_MAIL + "'," +
                         " INV_TELE_CELU='" + investigador.INV_TELE_CELU  + "', " +                         
                         " INV_LINK_CVLA  = '" +  investigador.INV_LINK_CVLA  + "', " +
                         " INV_CENT_CODI = " + investigador.INV_CENT_CODI + ", " +
                         " INV_PROG_ACAD_CODI =" +  investigador.INV_PROG_ACAD_CODI + "," +                         
                         " INV_USER ='" +  investigador.INV_USER + "' " +                                                  
                         " WHERE INV_CODI =" + investigador.INV_CODI 

  };


  


      
         TareasResource.enviararchivo(datos).then(function(result) { 
             if ($scope.pass.strPass!="")
             {
                   strmd5 = md5($scope.pass.strPass);  
              var datos2 =  {

                    Accion: 'M',
                    SQL: "UPDATE sgi_inve set  INV_PASS = '" + strmd5 + "'" +                          
                         " WHERE INV_CODI =" + investigador.INV_CODI 
                    };
              TareasResource.enviararchivo(datos2).then(function(result) { 
                      
              });
            }
            actualizarTablasRelacionadas(id);                          
           });                

      }
      else
      {       

       if ($scope.pass.strRePass!="") 
           strmd5 = md5($scope.pass.strRePass);
       else
       {
        $window.alert('Debe digitar una clave para el inicio de sesión en el tab Usuario');
        return;
       }

      var viewDatos2 ={
        Accion: 'I',
        SQL: id + ";sgi_inve;INV_CODI;INSERT INTO  sgi_inve (INV_CODI,INV_IDEN,INV_TIPO_DOCU_CODI, " +
        " INV_NOMB,INV_APEL,INV_FECH_NACI,INV_MAIL,INV_TELE_CELU,inv_foto,INV_CENT_CODI,INV_PROG_ACAD_CODI,INV_LINK_CVLA,INV_USER,INV_PASS) " + 
        " VALUES (@@,'" + investigador.INV_IDEN + "'," + investigador.INV_TIPO_DOCU_CODI + ",'" + 
        investigador.INV_NOMB + "','" + investigador.INV_APEL + "','" + moment(new Date(investigador.INV_FECH_NACI)).format('YYYY-MM-DD')  + "','" + 
        investigador.INV_MAIL + "','" + investigador.INV_TELE_CELU  + "','" + investigador.inv_foto + "'," +
        investigador.INV_CENT_CODI + "," +  investigador.INV_PROG_ACAD_CODI + ",'"+ investigador.INV_LINK_CVLA + "','" + investigador.INV_USER + "','" + strmd5 + "')"
      };       

      TareasResource.enviararchivo(viewDatos2).then(function(result) { 
         idInvestigador=result.data;
            actualizarTablasRelacionadas(idInvestigador);
      });     
       
      }
    }
   });
  }); 
  };  
 })






  

  
    


  


























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