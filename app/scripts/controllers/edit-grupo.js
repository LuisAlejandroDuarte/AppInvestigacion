'use strict';

angular.module('listaTareasApp')
  .controller('ControladorEditGrupo', function($scope,$cookieStore,$location,datosGrupo,TareasResource,$route,$window,$http) {

             
var user = $cookieStore.get('usuario');
var IdGrupo = $route.current.params.idGrupo;
var idInve="";
        if ($route.current.params.idGrupo==0)
        {
            $scope.datos2 =
            [{
              Grupo:"",
              igr_codi:"",
              gru_codi:"",
              gru_colc_codi:"",
              gru_cate_colc:"",
              inv_codi:"",
              Fecha:"",
              Investigador:"",
              selArea:"",
              selCentro:""
            }]          
        }
        else
            $scope.datos2 = datosGrupo;

       $scope.dateInputSettings =
            {
                width: 120,
                height: 20,
                formatString:'yyyy-MM-dd',
                max:new Date()
            }


      $scope.jqxPanelSettingsProyecto=
      {
        height: "100",
        autoUpdate:true,
        theme:'bootstrap',
        width:"1000"
      }

      $scope.jqxPanelSettingsPlan =
      {
        height: "100",
        autoUpdate:true,
        theme:'bootstrap',
        width:"800"
      }

         $scope.jqxPanelSettings =
            {             

              height: "100",
              autoUpdate:true,
              theme:'bootstrap'
             
            }
        $scope.jqxButtonsSettings =
        {
          theme: 'metro'
        }
           $scope.jqxWindowSettings = {
                maxHeight: 500, maxWidth: 480, minHeight: 30, minWidth: 50, height: 250, width: 400,
                resizable: false, isModal: true, autoOpen: false, modalOpacity: 0.3,showCloseButton:true
            }



      var id_inve=0;

       $scope.investigador2 = datosGrupo;
        $scope.investigador2.$promise.then(function(investigador){

            if (investigador[0].inv_codi==undefined)            
                id_inve=1;            
            else
                id_inve=investigador[0].inv_codi;              

                         $scope.datos = TareasResource.execute.query({Accion: 'S',
                         SQL: ' select I.inv_nomb As Nombre,I.inv_apel As Apellido,C.CEN_CODI AS IdCentro, C.cen_nomb As Centro,Z.zon_nomb As ' + 
                         ' ZONA,E.esc_nomb AS Escuela,P.pac_nomb AS Programa ' +
                         ' from sgi_inve AS I INNER JOIN sgi_cent AS C ON I.inv_cent_codi = C.cen_codi INNER JOIN sgi_zona AS Z ON ' +
                         ' Z.zon_codi=C.cen_zona_codi INNER JOIN sgi_prog_acad As P ON P.pac_codi = I.inv_prog_acad_codi INNER JOIN ' +
                         ' sgi_escu AS E ON E.esc_codi = P.pac_escu_codi WHERE I.inv_codi=' +  user[0].Id_inve }); 

                            $scope.area =TareasResource.execute.query({Accion:'S',SQL:'SELECT ARE_CODI,ARE_NOMB from sgi_area'});
                            $scope.area.$promise.then(function(result){  
                                $scope.listArea =result;
                                $scope.centro =TareasResource.execute.query({Accion:'S',SQL:'SELECT CEN_CODI,CEN_NOMB from sgi_cent'});
                                $scope.centro.$promise.then(function(result){  
                                        $scope.listCentro =result;
                                            $scope.datos2[0].selArea = investigador[0].selArea;                 
                                        });
                              });  

                         $scope.NombreGrupo =  investigador[0].Grupo;
                         $scope.FechaCreaGrupo = investigador[0].Fecha;
                       


                         $scope.datos.$promise.then(function(result){

                              $scope.NombreInvestigador = result[0].Nombre;
                              $scope.ApellidoInvestigador = result[0].Apellido;
                              $scope.CentroInvestigador = result[0].Centro;
                              $scope.ZonaInvestigador = result[0].ZONA;  
                              $scope.ProgramaInvestigador = result[0].Programa;  
                              $scope.EscuelaInvestigador = result[0].Escuela;  

                         });

        });
        
 $scope.uploadFile = function(arch)
 {
  var tipo;
  var replace;

    if (arch.files[0].size>750000)
    {
      $window.alert("El Archivo debe ser menor a 750 k");
      return;
    }

     $scope.nameArch = arch.files[0].name;


     tipo = arch.files[0].type.split("\/");
    // var fs = require('fs');

    // fs.createReadStream(arch.value).pipe(fs.createWriteStream('/AppInvestigacion/' + arch.value));
      var data;
     var reader = new FileReader();
        reader.onload = function (e) {
            var dato = e.target.result;
            data= new Uint8Array(dato);
            replace = "data:" + tipo[0] + "\/" + tipo[1] + ";base64,";
            $scope.ArrayBuffer = dato;                    
        }
     reader.readAsDataURL(arch.files[0]);        

    //   var fd = new FormData();
    // //Take the first selected file
    // fd.append("file", arch.files[0]);

    //   $http.post('/AppInvestigacion', fd, {
    //     withCredentials: true,
    //     headers: {'Content-Type': undefined }
    // }).success('').error('ffd');
    $scope.$apply();
 }
        // $scope.listProyectos =TareasResource.execute.query({Accion: 'S',
        //                  SQL: 'SELECT pro_codi,pro_nomb FROM sgi_proy'}); 

        //   $scope.listProyectos.$promise.then(function(result)
        //   {
        //         var dat = result;
        //   });

       
       
        $scope.tipoVinculacion = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT tiv_codi,tiv_desc FROM sgi_tipo_vinc'}); 


  	   $scope.listLineasInvestigacion = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT lin_codi,lin_desc FROM sgi_line_inve'}); 

  	   $scope.listInvestigador = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT inv_codi, CONCAT(inv_apel," ",inv_nomb) AS Nombre FROM sgi_inve'}); 

  	    $scope.listSemillero = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT sem_codi,sem_nomb AS Nombre FROM sgi_semi'}); 		
   		
  	    var LineasInvestigacion = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT GL.gli_codi As Id,LI.lin_codi As Id2, LI.lin_desc As Nombre,GL.gli_fech_inic AS FechaInicia, " +
                         " GL.gli_fech_term As FechaTermina, 1 AS tipo FROM " + 
                         " sgi_grup As G INNER JOIN sgi_grup_line_inve AS GL ON " +
                         " G.gru_codi = GL.gli_grup_codi INNER JOIN sgi_line_inve AS LI ON " +
                         " LI.lin_codi = GL.gli_line_inve_codi " + 
                         " WHERE G.gru_codi = " +  IdGrupo + " AND GL.gli_fech_term is null "}); 

        var  tieneDatos=false;
          $scope.LineasInvestigacion  =[];      
            LineasInvestigacion.$promise.then(function(result){
                angular.forEach(result, function(value, key){
                  if (value.Id==undefined || value.Id=="")   
                  {                             
                    $scope.LineasInvestigacion  =[];                                
                  }
                  else
                  {
                    tieneDatos =true;
                  }
                              
                });
                if (tieneDatos==true)
                      $scope.LineasInvestigacion = result;           
            });


  	   var  Investigadores = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT IG.igr_codi AS Id,I.inv_codi AS Id2, CONCAT(I.inv_apel,'',I.inv_nomb) AS Nombre," +
                         " IG.igr_fech_inic AS FechaInicia,IG.igr_fech_term AS FechaTermina,IG.igr_tipo_vinc_codi AS IdVincula, " + 
                         " 2 AS Tipo FROM " + 
                         " sgi_grup As G INNER JOIN sgi_inve_grup AS IG ON " +
                         " G.gru_codi = IG.igr_grup_codi INNER JOIN sgi_inve AS I ON " +
                         " I.inv_codi = IG.igr_inve_iden " + 
                         " WHERE IG.igr_grup_codi = " +  IdGrupo + " AND IG.igr_fech_term is null "});   
           var tieneDatos1=false;
           
             $scope.Investigadores  =[];   
            Investigadores.$promise.then(function(result1){
                angular.forEach(result1, function(value, key){
                  if (value.Nombre==undefined ||value.Nombre=="")                                
                  {
                    $scope.Investigadores  =[];                                
                  }
                  else
                  {
                    idInve =idInve + value.Id2  + ',';
                    tieneDatos1 =true;
                  }
                              
                });
                if (tieneDatos1==true)
                {
                     $scope.Investigadores = result1;  
                     idInve = idInve.substring(0,idInve.length-1); 
                     if (idInve!="")
                     {
                     $scope.listProyectos =  TareasResource.execute.query({Accion: 'S',
                          SQL: "SELECT P.pro_nomb,P.pro_codi FROM sgi_proy As P INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE " +
                          " PI.id_inve IN (" + idInve + ") "});

                      $scope.listProyectos.$promise.then(function(result){

                       $scope.Proyectos =  TareasResource.execute.query({Accion: 'S',
                          SQL: "SELECT PROY.PRO_NOMB As NombreProyecto,PROD.Nombre AS NombreProducto,PROD.Id As IdProd,PROY.PRO_CODI AS IdProy,GP.fech_ini,GP.fech_term,GP.id_grup AS IdGrupo " +
                               " FROM sgi_grup_proy As GP INNER JOIN sgi_proy As PROY ON PROY.PRO_CODI = GP.id_proy " +
                               " INNER JOIN sgi_prod AS PROD ON PROD.Id=GP.id_prod WHERE  GP.Id_grup=" + IdGrupo + " AND GP.Id_inve="+ user[0].Id_inve });


                        $scope.Proyectos.$promise.then(function(result){
                          if (result[0].NombreProyecto !=undefined)                          
                            $scope.Proyectos =result;
                          else
                            $scope.Proyectos =[];    

                           $scope.planTrabajo = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT pgr_plnt_codi As Id, pgr_path As Path,pgr_fech_inic As FechaInicio,pgr_fech_term AS FechaTermina,pgr_grup_codi As IdGrupo, ' +
                         ' pgr_plnt_codi,pgr_nombre As Nombre FROM sgi_plnt_grup WHERE pgr_grup_codi=' + IdGrupo}); 

                          $scope.planTrabajo.$promise.then(function(plan){

                            if (plan[0].pgr_plnt_codi!=undefined)                            
                               $scope.planTrabajo=plan;                              
                            else
                              $scope.planTrabajo=[];
                          });
                        });
                      });
                    }


                                  
                }
            }); 


            var Semilleros = TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT GS.sgr_codi AS Id, S.sem_nomb AS Nombre,GS.sgr_fech_inic As FechaInicia, " + 
                         " GS.sgr_fech_term As FechaTermina, S.sem_codi AS Id2,3 As Tipo FROM " + 
                         " sgi_grup As G INNER JOIN sgi_grup_semi AS GS ON " +
                         " G.gru_codi = GS.sgr_grup_codi INNER JOIN sgi_semi AS S ON " +
                         " S.sem_codi = GS.sgr_semi_codi " + 
                         " WHERE GS.sgr_grup_codi = " +  $route.current.params.idGrupo + ""});
             var tieneDatos2=false;
             $scope.Semilleros  =[]; 
            Semilleros.$promise.then(function(result2){
                angular.forEach(result2, function(value, key){
                  if (value.Nombre==undefined || value.Nombre=="")                                
                  {
                    $scope.Semilleros  =[];                                
                  }
                  else
                  {
                    tieneDatos2 =true;
                  }
                              
                });
                if (tieneDatos2==true)
                      $scope.Semilleros = result2;           
            }); 

   $scope.OnClicEliminarLineaInvestigacion = function(linea,item)
   {  
      if (linea.Id==0)
      {
        $scope.LineasInvestigacion.splice(item.$index,1);
      }
      else 
      {
            $('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = linea.Nombre;
            $scope.FechaInicia = linea.FechaInicia;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Líneas de Investigación";
            $scope.idMain = linea;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =1;
            $('#window').jqxWindow({height:210});
             // $scope.LineasInvestigacion.splice(linea.$index,1);          
             
            // $scope.jqxWindowSettings.apply('setContent','Hiola');
             $scope.jqxWindowSettings.apply('open');
      }
   }   

   $scope.OnClicEliminarProyecto = function(proy,item)
   {
    if (proy.IdGrupo==0)
    {
       $scope.Proyectos.splice(item.$index,1);
    }
    else
    {
       //$('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = proy.NombreProyecto;
            $scope.FechaInicia = proy.fech_ini;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Proyectos";
            $scope.idMain = proy;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =4;
            $('#window').jqxWindow({height:210});
            $scope.jqxWindowSettings.apply('open');
    }
   }

   $scope.OnClicEliminarPlan = function(plan,sele)
   {
    if (plan.IdGrupo==0)    
       $scope.planTrabajo.splice(sele.$index,1);           

     else
     {
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = plan.Nombre;
            $scope.FechaInicio = plan.FechaInicio;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Plan";
            $scope.idMain = plan;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =5;
            $('#window').jqxWindow({height:210});
            $scope.jqxWindowSettings.apply('open');
     }
    
   }

   $scope.OnClicAddPlan = function(Arch,Nombre)
   {
      if ($scope.planTrabajo==undefined)
        $scope.planTrabajo = [];

     if (Arch=="" || Arch==undefined) 
     {
       $window.alert('Seleccione un documento');
       return;
     }
     if (Nombre=="" || Nombre==undefined) 
     {
       $window.alert('Digite un Nombre');
       return;
     }
     var fecha = new Date();



      $scope.planTrabajo.splice(0,0,{Path:$scope.ArrayBuffer,FechaInicio:fecha,FechaTermina:null,Nombre:Nombre,IdGrupo:0});     
      $scope.nameArch="";
      $('#nombrePlan').val("");
   }

$scope.OnClicDescargarPlan = function(a,b)
{  
  $window.open(a);
  
}

   $scope.addProyecto = function(proy,prod)
   {
    //"PROY.PRO_NOMB As NombreProyecto,PROD.Nombre AS NombreProducto,PROD.Id As IdPROD,PROY.PRO_CODI AS IDPROY "
    if (proy==undefined)
    {
      $window.alert('Seleccione un proyecto');
      return;
    }

    if (prod==undefined)
    {
      $window.alert('Seleccione un producto');
      return;
    }

    var existe =false;

    angular.forEach($scope.Proyectos, function(value, key){

      if (value.fech_term==null)
      {
        if (value.IdProy==proy.pro_codi && value.IdProd==prod.Id)     
            existe=true;
      }

    })

    if (existe==true)
    {
        $window.alert('Ya está seleccionado');
        return;
    }

    if ($scope.Proyectos==undefined) $scope.Proyectos = [];
    var fecha = new Date();
    $scope.Proyectos.splice(0,0,{NombreProyecto:proy.pro_nomb,NombreProducto:prod.nombre,IdProy:proy.pro_codi,IdProd:prod.Id,IdGrupo:0,fech_ini:fecha,fech_term:null});

   }

   $scope.Ok = function()
   {
     
    var heightPanel;
   
          if ($scope.idMain.accion=='Add' && $scope.idMain.tipo==1)
     {

        if ($scope.FechaInicia=="" || $scope.FechaInicia==null)
        {
          $('#jdFechaInicia').popover({title:'Advertencia',content:'Seleccione una Fecha de Inicio',delay: { 'show': 50, 'hide': 10 },placement:'right'});
          $('#jdFechaInicia').popover('show');
          return;
        }
        else          
        {
          if ($( "#cmdTipoGrupo option:selected" ).text()=="")
          {
              $('#cmdTipoGrupo').popover({title:'Advertencia',content:'Seleccione una Opción',delay: { 'show': 50, 'hide': 10 },placement:'right'});
              $('#cmdTipoGrupo').popover('show');
              return;
          }
          else
          {

            $scope.jqxWindowSettings.apply('close');
            $scope.LineasInvestigacion.splice(0,0,{Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:$scope.FechaInicia,FechaTermina:null,Id:$scope.idMain.Id,Id2:$scope.selTipoGrupo.Id});                                         
          }
        }
     }

     if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==1)
     {
       if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }

       
         if ($scope.idMain.accion=='Add' && $scope.idMain.tipo==2)
            {
            if ($scope.FechaInicia=="" || $scope.FechaInicia==null)
                {
                  $('#jdFechaInicia').popover({title:'Advertencia',content:'Seleccione una Fecha de Inicio',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                  $('#jdFechaInicia').popover('show');
                return;
                }
            else          
            {
              if ($( "#cmdTipoGrupo option:selected" ).text()=="")
              {
                $('#cmdTipoGrupo').popover({title:'Advertencia',content:'Seleccione una Opción',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                $('#cmdTipoGrupo').popover('show');
                return;
              }
              else
              {

              
                var existe=false;
               angular.forEach($scope.Investigadores, function(value, key){
                  if (value.Id2 == $scope.selTipoGrupo.Id)
                  {
                    existe=true;
                  }
               });
               if (existe==false)
                   {
                    $scope.Investigadores.splice(0,0,{Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:$scope.FechaInicia,FechaTermina:null,Id:$scope.idMain.Id,Id2:$scope.selTipoGrupo.Id,IdVincula:$scope.selTipoVinculacion.tiv_codi});                   
                    $scope.jqxWindowSettings.apply('close');
                  }
               else
                $window.alert("Ya está seleccionado");     
             }  
           }
     }

     if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==2)
     {
       if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');

          }
     }
       
        if ($scope.idMain.accion=='Add' && $scope.idMain.tipo==3)
            {
            if ($scope.FechaInicia=="" || $scope.FechaInicia==null)
                {
                  $('#jdFechaInicia').popover({title:'Advertencia',content:'Seleccione una Fecha de Inicio',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                  $('#jdFechaInicia').popover('show');
                return;
                }
            else          
            {
              if ($( "#cmdTipoGrupo option:selected" ).text()=="")
              {
                $('#cmdTipoGrupo').popover({title:'Advertencia',content:'Seleccione una Opción',delay: { 'show': 50, 'hide': 10 },placement:'right'});
                $('#cmdTipoGrupo').popover('show');
                return;
              }
          else
          {

            $scope.jqxWindowSettings.apply('close');
            $scope.Semilleros.splice(0,0,{Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:$scope.FechaInicia,FechaTermina:null,Id:$scope.idMain.Id,Id2:$scope.selTipoGrupo.Id});
          }
        }
     }

     if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==3)
     {
       if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }

      if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==4)
     {
         if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.fech_term = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }
      if ($scope.idMain.accion=="Del" && $scope.idMain.tipo==5)
     {
         if ($scope.FechaTermina=="" || $scope.FechaTermina==null)
        {
          $('#jdFechaTermina').popover({title:'Advertencia',content:'Seleccione una Fecha de Terminación',delay: { 'show': 50, 'hide': 10 },placement:'top'});
          $('#jdFechaTermina').popover('show');
          return;
        }
         else
          {            
           // $scope.LineasInvestigacion.push({Nombre:$scope.selTipoGrupo.Nombre,FechaInicia:datos.FechaInicia,FechaTermina:datos.FechaTermina,Id:datos.Id});      
           $scope.idMain.FechaTermina = $('#jdFechaTermina').val();
           $scope.jqxWindowSettings.apply('close');
          }
     }

}
   


                 

   $scope.OnClicEliminarIntegranteGrupo = function(integrante)
     { 


         if (integrante.Id2==user[0].Id_inve ) 
         {
          $window.alert('No se puede eliminar el Investigador Actual');
          return;
         }

         if (integrante.Id==0)
      {
         $scope.Investigadores.splice(integrante.$index,1); 
         if ($scope.Investigadores.length==0)
         {
          $scope.listProyectos =[];
         }
         else
         {
          var myId = new Array($scope.Investigadores.length);
                var cont =0;
                angular.forEach($scope.Investigadores, function(value, key){
                  myId[cont] = value.Id2;
                  cont = cont +1;
                  idInve = myId.join();
                });

                 //idInve = idInve.substring(0,idInve.length-1); 
                 if (idInve!="")
                     {
                      $scope.listProyectos =  TareasResource.execute.query({Accion: 'S',
                      SQL: "SELECT P.pro_nomb,P.pro_codi FROM sgi_proy As P INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE " +
                      " PI.id_inve IN (" + idInve + ") "});
                      $scope.listProyectos.$promise.then(function(result){
                            var r = result;
                      });
                     }   
          }       
      }
      else 
      {
            $('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = integrante.Nombre;
            $scope.FechaInicia = integrante.FechaInicia;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Integrante del Grupo";
            $scope.idMain = integrante;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =2;
            $('#window').jqxWindow({height:210});
             // $scope.LineasInvestigacion.splice(linea.$index,1);          
             
            // $scope.jqxWindowSettings.apply('setContent','Hiola');
             $scope.jqxWindowSettings.apply('open');
      }        
     }   

   $scope.OnClicAddLineaInvestigacion = function(linea)
   {
     $scope.hideCmdTipoGrupo=false;
       $scope.hideVinculacion = true;
      $('#jdFechaInicia').popover('destroy');
     $('#cmdTipoGrupo').popover('destroy');

      

        $scope.listTipoGrupo = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT lin_codi AS Id,lin_desc AS Nombre FROM sgi_line_inve'}); 

        $('#cmdLinea').popover('destroy');
        $scope.titleEditar = "Líneas de Investigación";
        $scope.tipoGrupo = "Seleccione Línea Investigación";

        $scope.idMain = {
                        Nombre:"",
                        FechaInicia:null,
                        FechaTermina:null,
                        Id:0,
                        Id2:0,
                        tipo:1,
                        accion:'Add'
                      };  
         $scope.FechaInicia=null;  
         $scope.Nombre="";                          
         $scope.hideVinculacion = true;   
         $scope.hideFechaTermina =true;  
         
         $('#window').jqxWindow({height:230});             
         $scope.jqxWindowSettings.apply('open');
       

      //$scope.LineasInvestigacion.push({Nombre:linea.lin_desc,FechaInicia:null,FechaTermina:null,IdLinea:linea.lin_codi});      

   }    
  
  $scope.OnClicAddIntegrante = function(integrante)
  {
      $scope.hideCmdTipoGrupo=false;
      $scope.hideVinculacion = false;
      $('#jdFechaInicia').popover('destroy');
     $('#cmdTipoGrupo').popover('destroy');


          $scope.tipoVinculacion = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT tiv_codi,tiv_desc FROM sgi_tipo_vinc'}); 

        $scope.listTipoGrupo = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT inv_codi AS Id, CONCAT(inv_apel," ",inv_nomb) AS Nombre FROM sgi_inve WHERE sgi_inve.INV_CODI!=' + user[0].Id_inve }); 

        $('#cmdLinea').popover('destroy');
        $scope.titleEditar = "Integrantes del Grupo";
        $scope.tipoGrupo = "Seleccione Integrante";

        $scope.idMain = {
                        Nombre:"",
                        FechaInicia:null,
                        FechaTermina:null,
                        Id:0,
                        Id2:0,
                        tipo:2,
                        accion:'Add'
                      };  
         $scope.FechaInicia=null;  
         $scope.Nombre="";                                 
         $scope.hideFechaTermina =true;  
         
         $('#window').jqxWindow({height:310});             
         $scope.jqxWindowSettings.apply('open');
       


     // $scope.Investigadores.push({Nombre:integrante.Nombre,Fecha:null,IdInvestigador:integrante.inv_codi});
  }

  $scope.OnClicAddSemillero = function(semillero)
  {
     $scope.hideCmdTipoGrupo=false;
       $scope.hideVinculacion = true;
      $('#jdFechaInicia').popover('destroy');
     $('#cmdTipoGrupo').popover('destroy');

      

        $scope.listTipoGrupo = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT sem_codi As Id,sem_nomb AS Nombre FROM sgi_semi'}); 

        $('#cmdLinea').popover('destroy');
        $scope.titleEditar = "Semilleros del Grupo";
        $scope.tipoGrupo = "Seleccione Semillero";

        $scope.idMain = {
                        Nombre:"",
                        FechaInicia:null,
                        FechaTermina:null,
                        Id:0,
                        Id2:0,
                        tipo:3,
                        accion:'Add'
                      };  
         $scope.FechaInicia=null;  
         $scope.Nombre="";                          
         $scope.hideVinculacion = true;   
         $scope.hideFechaTermina =true;  
         
         $('#window').jqxWindow({height:230});             
         $scope.jqxWindowSettings.apply('open');
       




    //$scope.Semilleros.push({Nombre:semillero.Nombre,Fecha:null,IdSemillero:semillero.sem_codi})
  }

$scope.OnClicEliminarSemilleroGrupo = function(semillero)
{

   if (semillero.Id==0)
      {
         $scope.Semilleros.splice(semillero.$index,1);           
      }
      else 
      {
            $('#jdFechaTermina').popover('destroy');  
            $scope.hideFechaTermina ="false";      
            $scope.tipoGrupo = "Nombre";
            $scope.Nombre = semillero.Nombre;
            $scope.FechaInicia = semillero.FechaInicia;
            $scope.FechaTermina =null;
            $scope.hidelblNombre =false;
            $scope.hideVinculacion = true;
            $scope.hideCmdTipoGrupo=true;
            $scope.hideVinculacion = true;
            $scope.titleEditar = "Semillero del Grupo";
            $scope.idMain = semillero;
            $scope.idMain.accion="Del";
            $scope.idMain.tipo =3;
            $('#window').jqxWindow({height:210});
             // $scope.LineasInvestigacion.splice(linea.$index,1);          
             
            // $scope.jqxWindowSettings.apply('setContent','Hiola');
             $scope.jqxWindowSettings.apply('open');
      }         
}
 $scope.volver = function(){
        $location.path('/grupo'); 
    };
  $scope.OnChangeProyecto = function(proyecto)
  {
     $scope.listProductos =  TareasResource.execute.query({Accion: 'S',
                          SQL: "SELECT P.nombre,P.Id FROM sgi_prod_proy As PP INNER JOIN sgi_prod AS P ON P.Id = PP.id_prod WHERE " +
                          " PP.id_proy =" + proyecto.pro_codi  });                      

  }


  $scope.OnChangeInvestigador = function(inve)
  {
    var datos =inve;

    $scope.listProyectos =  TareasResource.execute.query({Accion: 'S',
    SQL: "SELECT P.pro_nomb,P.pro_codi FROM sgi_proy As P INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE " +
    " PI.id_inve=" + inve.Id2});


  }


  $scope.actualizarTablas = function(idGrupo)
  {
    var executeSql;
    var result;

    executeSql = TareasResource.execute.query({Accion:'D',
                   SQL:"DELETE FROM sgi_grup_line_inve WHERE gli_grup_codi=" + idGrupo + " AND " +
                   " gli_fech_term is  null "});
       executeSql.$promise.then(function (result){
        if (result[0].estado=="ok")
        {
            angular.forEach($scope.LineasInvestigacion, function(value, key){                    

                var fecha = '';
                
                  
                  if (value.FechaTermina!=null)
                  {
                    fecha =value.FechaTermina;
                  
                    executeSql = TareasResource.execute.query({Accion:'M',                 
                    SQL:"UPDATE sgi_grup_line_inve set gli_fech_term ='" + value.FechaTermina + "' WHERE gli_codi=" + value.Id + ""});
                                                 
                   }
                   else
                     executeSql = TareasResource.execute.query({Accion:'I',                 
                    SQL:idGrupo+";INSERT INTO sgi_grup_line_inve (gli_grup_codi,gli_fech_inic,gli_line_inve_codi) " +
                    " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.Id2 + ")"});
            });

          executeSql.$promise.then(function (result){
          if (result[0].estado=="ok")
              {
                executeSql = TareasResource.execute.query({Accion:'D',
                   SQL:"DELETE FROM sgi_inve_grup WHERE igr_grup_codi=" + idGrupo + " AND " +
                   " igr_fech_term is  null AND   IGR_TIPO_VINC_CODI<>1 AND igr_regi_ingr=1"});
                   executeSql.$promise.then(function (result){
                  if (result[0].estado=="ok")
                      {
                         angular.forEach($scope.Investigadores, function(value, key){                                                                          
                            if (value.FechaTermina!=null)
                            {
                              var fecha ="";

                              fecha =value.FechaTermina;
                            
                              executeSql = TareasResource.execute.query({Accion:'M',                 
                              SQL:"UPDATE sgi_inve_grup set  igr_fech_term='" + value.FechaTermina + "' WHERE igr_codi=" + value.Id + ""});
                                                           
                             }
                             else
                                if(value.Id2 !=user[0].Id_inve)
                                  {
                                   executeSql = TareasResource.execute.query({Accion:'I',                                               
                                  SQL:idGrupo+";INSERT INTO sgi_inve_grup (igr_grup_codi,igr_fech_inic,igr_tipo_vinc_codi,igr_inve_iden,igr_regi_ingr) " +
                                  " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.IdVincula + "," + value.Id2 + ",1)"});
                                 }
                            });

                          executeSql.$promise.then(function (result) {
                          if (result[0].estado=="ok")
                          {

                            executeSql = TareasResource.execute.query({Accion:'D',
                            SQL:"DELETE FROM sgi_grup_semi WHERE sgr_grup_codi=" + idGrupo + " AND " +
                            " sgr_fech_term is  null "});

                             executeSql.$promise.then(function (result) {
                             if (result[0].estado=="ok")
                             {
                                angular.forEach($scope.Semilleros, function(value, key){                                                                          
                                if (value.FechaTermina!=null)
                                {                                
                                
                                  executeSql = TareasResource.execute.query({Accion:'M',                 
                                  SQL:"UPDATE sgi_grup_semi set sgr_fech_term='" + value.FechaTermina + "' WHERE sgr_codi=" + value.Id + ""});
                                                               
                                 }
                                 else
                                   executeSql = TareasResource.execute.query({Accion:'I',                 
                                  SQL:idGrupo+";INSERT INTO sgi_grup_semi (sgr_grup_codi,sgr_fech_inic,sgr_semi_codi) " +
                                  " VALUES (" + idGrupo +",'"+ value.FechaInicia + "'," + value.Id2 + ")"});
                                 });  

                                 var  Investigadores = TareasResource.execute.query({Accion: 'S',
                                                       SQL: "SELECT IG.igr_codi AS Id,I.inv_codi AS Id2, CONCAT(I.inv_apel,'',I.inv_nomb) AS Nombre," +
                                                       " IG.igr_fech_inic AS FechaInicia,IG.igr_fech_term AS FechaTermina,IG.igr_tipo_vinc_codi AS IdVincula, " + 
                                                       " 2 AS Tipo FROM " + 
                                                       " sgi_grup As G INNER JOIN sgi_inve_grup AS IG ON " +
                                                       " G.gru_codi = IG.igr_grup_codi INNER JOIN sgi_inve AS I ON " +
                                                       " I.inv_codi = IG.igr_inve_iden " + 
                                                       " WHERE IG.igr_grup_codi = " +  idGrupo + " AND IG.igr_fech_term is null "});   
                                         var tieneDatos1=false;
           
                                 $scope.Investigadores  =[];   
                                Investigadores.$promise.then(function(result1){
                                    angular.forEach(result1, function(value, key){
                                      if (value.Nombre==undefined ||value.Nombre=="")                                
                                      {
                                        $scope.Investigadores  =[];                                
                                      }
                                      else
                                      {
                                        idInve =idInve + value.Id2  + ',';
                                        tieneDatos1 =true;
                                      }
                                                  
                                    });
                                    if (tieneDatos1==true)
                                    {
                                         $scope.Investigadores = result1;  
                                         idInve = idInve.substring(0,idInve.length-1); 
                                         if (idInve!="")
                                         {
                                         $scope.listProyectos =  TareasResource.execute.query({Accion: 'S',
                                              SQL: "SELECT P.pro_nomb,P.pro_codi FROM sgi_proy As P INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE " +
                                              " PI.id_inve IN (" + idInve + ") "});

                                          $scope.listProyectos.$promise.then(function(result){
                                               $scope.listProyectos = [];
                                            var ProyectoProducto =  TareasResource.execute.query({Accion:'D',
                                                SQL:"DELETE FROM sgi_grup_proy WHERE id_inve=" + user[0].Id_inve + " AND " +
                                                " id_grup="+ IdGrupo + ""});

                                            ProyectoProducto.$promise.then(function(result){

                                                   if (result[0].estado=="ok")
                      {








                         angular.forEach($scope.Proyectos, function(value, key){                                                                          
                            if (value.fech_term!=null)
                            {                              
                            
                               executeSql = TareasResource.execute.query({Accion:'I',                                               
                                  SQL:idGrupo+";INSERT INTO sgi_grup_proy (id_proy,id_prod,id_grup,id_inve,fech_ini,fech_term) " +
                                  " VALUES (" + value.IdProy +"," + value.IdProd +"," + IdGrupo +"," + user[0].Id_inve + ",'"+ value.fech_ini + "','"+ value.fech_term + "')"});
                                                           
                             }
                             else                                                              
                                   executeSql = TareasResource.execute.query({Accion:'I',                                               
                                  SQL:idGrupo+";INSERT INTO sgi_grup_proy (id_proy,id_prod,id_grup,id_inve,fech_ini) " +
                                  " VALUES (" + value.IdProy +"," + value.IdProd +"," + IdGrupo +"," + user[0].Id_inve + ",'"+ value.fech_ini + "')"});
                                    executeSql.$promise.then(function(result1){
                                      var re = result1[0].msg;
                                    });

                                
                            });
                        
                  var plan =  TareasResource.execute.query({Accion:'D',
                                                SQL:"DELETE FROM sgi_plnt_grup WHERE  " +
                                                " pgr_grup_codi="+ IdGrupo + ""});

                      plan.$promise.then(function(result){
                          


                        angular.forEach($scope.planTrabajo, function(value, key){  
                           if (value.FechaTermina!=null)
                            {

                               var datos2 =  {
                                    Accion: 'I',
                                    SQL: "I;INSERT INTO  sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic,pgr_fech_term,pgr_path) " +
                                      " VALUES (" + idGrupo +",'" + value.Nombre +"','"+ value.FechaInicio + "','"+ value.FechaTermina + "','" + value.Path  + "')"
                                  };
                                  TareasResource.enviararchivo(datos2).then(function(result) { 
                                        var r = result;
                                  });                  
                                
                            }

                            else
                                {
                                  
                                var datos2 =  {
                                    Accion: 'I',
                                    SQL: "I;INSERT INTO  sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic,pgr_path) " +
                                    " VALUES (" + idGrupo +",'" + value.Nombre +"','"+ value.FechaInicio + "','" + value.Path  + "')"
                                  };
                                  TareasResource.enviararchivo(datos2).then(function(result) { 
                                        var r = result;
                                        $scope.showAceptar = true;
                                  });                  
                                }

                                  // executeSql = TareasResource.execute.query({Accion:'I',                                               
                                  // SQL:"1;INSERT INTO  sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic,pgr_path) " +
                                  // " VALUES (" + idGrupo +",'" + value.Nombre +"','"+ value.FechaInicio + "','" + value.Path  + "')"});                              

                        });
                      });


                            $window.alert('Guardado');
                            $location.path('/edit-grupo/'+ idGrupo);
                      }
                                               
                                            });
                                           
                                          });
                                        }


                                                      
                                    }
                                }); 

                             }
                                                       
                           });
                          }
                        });
                      }
                  });
              }
          });
        }              
    });
  }

  function formatoFecha(fecha) {
           var mes;   
         var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];

         var dat = fecha.split("-");

        if (dat[1]==Meses[0]) mes =1;
        if (dat[1]==Meses[1]) mes =2;
        if (dat[1]==Meses[2]) mes =3;
        if (dat[1]==Meses[3]) mes =4;
        if (dat[1]==Meses[4]) mes =5;
        if (dat[1]==Meses[5]) mes =6;
        if (dat[1]==Meses[6]) mes =7;
        if (dat[1]==Meses[7]) mes =8;
        if (dat[1]==Meses[8]) mes =9;
        if (dat[1]==Meses[9]) mes =10;
        if (dat[1]==Meses[10]) mes =11;
        if (dat[1]==Meses[11]) mes =12;



            return dat[2] + "-" + mes + "-" + dat[0];

      }



  $scope.save = function(datos)
  {
    $scope.showAceptar = false;
    if ($scope.datos2[0].Grupo=="")
    {
      $window.alert("Falta Nombre del Grupo");
      return;
    }

    if ($('#FechaCreaGrupo').val()=="")
    {
      $window.alert("Falta seleccioanr fecha");
      return;
    }

    if ($scope.datos2[0].selArea=="")
    {
      $window.alert("Falta seleccionar Área");
      return;
    }

    if ($scope.datos2[0].selCentro=="")
    {
      $window.alert("Falta seleccionar Centro");
      return;
    }
    


    var fecha = formatoFecha($('#FechaCreaGrupo').val());

    var id = (datos.gru_codi) ? datos.gru_codi :'0' ;
    var mes =0;
    var agno =0;      
    
     if (id==0 || id==undefined)
     {

         
          var d =  $scope.datos;
         var Query= TareasResource.execute.query({Accion: 'I',
                         SQL: "1;INSERT INTO sgi_grup " + 
                         " (gru_nomb,gru_fech_ini,gru_area_codi,gru_cent_codi,gru_colc_codi,gru_cate_colc) " +
                         " VALUES ('" + $scope.datos2[0].Grupo + "','" + fecha + "'," + $scope.datos2[0].selArea + "," + 
                          + $scope.datos2[0].selCentro + ",'" + $scope.datos2[0].gru_colc_codi + "','"+ $scope.datos2[0].gru_cate_colc + "')"});

          Query.$promise.then(function(result){

            Query = TareasResource.execute.query({Accion:'S',SQL:'SELECT Max(gru_codi) AS Maximo FROM sgi_grup'});
            Query.$promise.then(function(result){

            id = result[0].Maximo;
            IdGrupo=id;
           
               // Query = TareasResource.execute.query({Accion:'S',SQL:'SELECT igr_inve_iden  FROM sgi_inve_grup' + 
               //   " WHERE igr_inve_iden=" + user[0].Id_inve + " AND igr_grup_codi =" + id });
               //  Query.$promise.then(function(result){

                        Query= TareasResource.execute.query({Accion: 'I', 
                         SQL: id + "1;INSERT INTO sgi_inve_grup " + 
                         " (igr_inve_iden,igr_grup_codi,igr_fech_inic,igr_tipo_vinc_codi) " +
                         " VALUES ("+ user[0].Id_inve + "," + id + ",'" + fecha + "',1)"});              

              Query.$promise.then(function(result){

                $scope.actualizarTablas(id);  

              });                        

      
            

            
            });
          });

     }
     else
     {
       var Query= TareasResource.execute.query({Accion: 'M',
                         SQL: "UPDATE sgi_grup " + 
                         " set gru_nomb='" + $scope.datos2[0].Grupo + "',gru_fech_ini='" + fecha + "' ,gru_area_codi=" + $scope.datos2[0].selArea + ", " + 
                         " gru_cent_codi=" + $scope.datos2[0].selCentro + ",gru_colc_codi='" + $scope.datos2[0].gru_colc_codi + "'," + 
                         " gru_cate_colc='"+ $scope.datos2[0].gru_cate_colc + "' WHERE gru_codi =" + id + " "});
           Query.$promise.then(function(result){

            if (result[0].estado=="ok")
            {
                  $scope.actualizarTablas(id);        
            }
            else 
              $window.alert(result[0].msg);
          });

      
     }
  }

  $scope.OnclickJdFechaInicia = function()
  {
    if ($('#jdFechaInicia').val()!="")
    {
      $('#jdFechaInicia').popover('destroy');
    }
  }

 $scope.OnclickJdFechaTermina = function()
 {
    if ($('#jdFechaTermina').val()!="")
    {
      $('#jdFechaTermina').popover('destroy');
    }
 }
  
  $scope.OnChangedCmdTipoGrupo = function()
  {
    $('#cmdTipoGrupo').popover('destroy');
  }
});  	