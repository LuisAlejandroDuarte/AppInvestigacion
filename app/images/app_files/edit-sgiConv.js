'use strict';

angular.module('listaTareasApp')

  .controller('editSgiConv', function($scope,$location,datos,TareasResource,$route) {

    $scope.datosConvocatoria = TareasResource.execute.query({Accion: 'S',
                         SQL: 'SELECT TCO_CODI,TCO_DESC FROM SGI_TIPO_CONV'}); 

    $scope.viewDatos = datos;


   var id = ($route.current.params.idSgiConv) ? parseInt($route.current.params.idSgiConv) :0 ;
      
     if(id > 0)          
       {
          $scope.buttonText = 'Actualizar';
          $scope.tiTulo ='Editando Convocatoria';
        }
     else
      {
       $scope.buttonText = 'Guardar';
         $scope.tiTulo ='Creando Convocatoria';
      }

          $scope.save = function(reg){

         var id = (reg.CON_CODI) ? parseInt(reg.CON_CODI) :0 ;
      // $location.path('/sgiConv');
      if(id > 0)    
      {
        // $scope.sql = 'UPDATE "SGI_GRAN_AREA" set  "GAR_NOMB" =@@' + gran.GAR_NOMB + '@@ WHERE "GAR_CODI" =' + gran.GAR_CODI ;
        
         $scope.SQL =  "UPDATE SGI_CONV set  CON_NUME = '" + reg.CON_NUME + "', " + 
                         " CON_DESC = '" + reg.CON_DESC + "', CON_TEXT = '" + reg.CON_TEXT +"'," +
                         " CON_FECH_INIC='" + reg.CON_FECH_INIC + "'," +
                         " CON_FECH_FINA='" + reg.CON_FECH_FINA + "', CON_TIPO_CONV_CODI =" + 
                         reg.CON_TIPO_CONV_CODI + " WHERE CON_CODI ="  + reg.CON_CODI ;

 if(reg.CON_FECH_INIC == '') 
    $scope.fechaIni= 'null';
  else
   $scope.fechaIni=  reg.CON_FECH_INIC; 
  
  if(reg.CON_FECH_FINA == '') 
    $scope.fechaFin= 'null';
  else
   $scope.fechaFin= reg.CON_FECH_FINA ; 

        $scope.viewDatos2= TareasResource.execute.query({Accion: 'M',
                         SQL: "UPDATE SGI_CONV set  CON_NUME = " + reg.CON_NUME + ", " + 
                         " CON_DESC='" + reg.CON_DESC + "', CON_TEXT='" + reg.CON_TEXT + "'," +
                         " CON_FECH_INIC='" + $scope.fechaIni + "'," +
                         " CON_FECH_FINA='" + $scope.fechaFin + "',CON_TIPO_CONV_CODI=" + 
                         reg.CON_TIPO_CONV_CODI + " WHERE CON_CODI =" + reg.CON_CODI }); 

       

      }
      else
      {       

       if(reg.CON_FECH_INIC == '' || reg.CON_FECH_INIC==undefined) 
    $scope.fechaIni= 'null';
  else
   $scope.fechaIni= '***' + reg.CON_FECH_INIC + '***'; 
  
  if(reg.CON_FECH_FINA == '' || reg.CON_FECH_FINA==undefined) 
    $scope.fechaFin= 'null';
  else
   $scope.fechaFin= '***' + reg.CON_FECH_FINA + '***'; 

$scope.SQL =  id + ";SGI_CONV;CON_CODI;INSERT INTO  SGI_CONV " + 
                         " (CON_CODI,CON_NUME,CON_DESC,CON_TEXT,CON_FECH_INIC,CON_FECH_FINA,CON_TIPO_CONV_CODI) " + 
                         " VALUES (@@," + reg.CON_NUME + ",'" + reg.CON_DESC + "'," +
                         " '" + reg.CON_TEXT + "','" + $scope.fechaIni +"','" + $scope.fechaFin + "'," + reg.CON_TIPO_CONV_CODI + ")";

      $scope.viewDatos2= TareasResource.execute.query({Accion: 'I',
                         SQL: id + ';SGI_CONV;CON_CODI;INSERT INTO  "SGI_CONV" ' + 
                         ' ("CON_CODI","CON_NUME","CON_DESC","CON_TEXT","CON_FECH_INIC","CON_FECH_FINA","CON_TIPO_CONV_CODI") ' + 
                         ' VALUES (@@,' + reg.CON_NUME + ',***'+ reg.CON_DESC + '***,' +
                         '***'+ reg.CON_TEXT +'***,'+ $scope.fechaIni +','+ $scope.fechaFin +',' + reg.CON_TIPO_CONV_CODI + ')' }); 
      }


      //$location.path('/granarea'); 
    
      
      
    }; 

   $scope.CON_FECH_INIC = new Date();
   $scope.CON_FECH_FINA = new Date();
  $scope.selectedDateAsNumber = Date.UTC(2014, 10, 22);
  // $scope.fromDate = new Date();
  // $scope.untilDate = new Date();
  $scope.getType = function(key) {
    return Object.prototype.toString.call($scope[key]);
  };

  $scope.clearDates = function() {
    $scope.selectedDate = null;
  };
   $scope.volver = function(){
        $location.path('/sgiConv'); 
    };
});

 // bepsy ballesteros