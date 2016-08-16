<?php  

 require_once("Rest.inc.php");

 require_once("config.php");  

 class Api extends Rest {  

   private $conexion;  

   private $_metodo;  

   private $_argumentos; 

   private $consulta; 

   private $query;

   public function __construct() {  

     parent::__construct();  

    // $this->conectarDB();  

   }    



   private function devolverError($id) {  

     $errores = array(  

       array('estado' => "error", "msg" => "petición no encontrada"),  //0

       array('estado' => "error", "msg" => "petición no aceptada"),   //1

       array('estado' => "error", "msg" => "petición sin contenido"),  //2

       array('estado' => "error", "msg" => "Usuario o clave incorrectas"), //3

       array('estado' => "error", "msg" => "error borrando usuario"),  //4

       array('estado' => "error", "msg" => "error actualizando nombre de usuario"),//5

       array('estado' => "error", "msg" => "error buscando usuario por email"),  //6

       array('estado' => "error", "msg" => "error creando usuario"),  //7

       array('estado' => "error", "msg" => "usuario ya existe"),  //8

       array('Usuario' => "null")  //9

     );  

     return $errores[$id];  

   }  

   public function procesarLLamada() {  

     if (isset($_REQUEST['url'])) {  

       //si por ejemplo pasamos explode('/','////controller///method////args///') el resultado es un array con elem vacios;

       //Array ( [0] => [1] => [2] => [3] => [4] => controller [5] => [6] => [7] => method [8] => [9] => [10] => [11] => args [12] => [13] => [14] => )

       $url = explode('/', trim($_REQUEST['url']));  

       //con array_filter() filtramos elementos de un array pasando función callback, que es opcional.

       //si no le pasamos función callback, los elementos false o vacios del array serán borrados 

       //por lo tanto la entre la anterior función (explode) y esta eliminamos los '/' sobrantes de la URL

       $url = array_filter($url);  

       $this->_metodo = strtolower(array_shift($url));  

       $this->_argumentos = $url;  

       $func = $this->_metodo;  

       if ((int) method_exists($this, $func) > 0) {  

         if (count($this->_argumentos) > 0) {  

           call_user_func_array(array($this, $this->_metodo), $this->_argumentos);  

         } else {//si no lo llamamos sin argumentos, al metodo del controlador  

           call_user_func(array($this, $this->_metodo));  

         }  

       }         

       else  

         $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 404);  

     }  

    // $this->mostrarRespuesta($this->convertirJson($this->devolverError(0)), 404);  

   }  

   private function convertirJson($data) {  

     return json_encode($data);  

   }  

   

   private function usuarios() {  

     if ($_SERVER['REQUEST_METHOD'] != "GET") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



      $conexion=pg_connect("host=localhost port=5433 dbname=BDInvestigador user=postgres password=Lu1sAlej0")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

     

   $query = "Select * from \"USER\"";

     $result = pg_query($conexion,$query);    

       if (pg_num_rows($result)>0)

     {

         $usua=pg_fetch_array($result);

         $respuesta['Id']=$usua['id'];

          $respuesta['Usuario']=$usua['Usuario'];

          $respuesta['clave']=$usua['clave'];        

      }    

       $this->mostrarRespuesta($this->convertirJson($respuesta), 200);  

       

     $this->mostrarRespuesta($this->devolverError(2), 204);  

       

   

     

   }  



private function granarea() {

   if ($_SERVER['REQUEST_METHOD'] != "GET") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



      $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

     

   $query = "Select \"GAR_CODI\",\"GAR_NOMB\" from \"SGI_GRAN_AREA\" Order by  \"GAR_CODI\" ";

    //$query = "select * from granarea_list('S')";

     $result = pg_query($conexion,$query);    

       if (pg_num_rows($result)>0)

     {

      $resultArray = array();                 

        while ($tuple= pg_fetch_assoc($result)) {

            $resultArray[] = $tuple;        

        }          

        $this->mostrarRespuesta($this->convertirJson($resultArray), 200);            

     }  

}

    

  private function granareaId() {

   if ($_SERVER['REQUEST_METHOD'] != "POST") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



     $granAreaID= (int)$_REQUEST['IdGranArea'];

     

 

      $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

     

   $query = "Select  * from \"SGI_GRAN_AREA\" where \"GAR_CODI\" = $granAreaID";

     $result = pg_query($conexion,$query);    

       if (pg_num_rows($result)>0)

     {

      $grupo=pg_fetch_array($result);

       //$grupo= ($result);



      // $respuesta = array('GAR_CODI' => $grupo['GAR_CODI'], "GAR_NOMB" => $grupo['GAR_NOMB']);



         // $respuesta['GAR_CODI']= $grupo['GAR_CODI'];

         // $respuesta['GAR_NOMB']= $grupo['GAR_NOMB'];

         

       //  $this->mostrarRespuesta($this->convertirJson($respuesta), 200); 

       // array_values(pg_fetch_all($result))

     // $resultArray = array(); 

    // $tuple= pg_fetch_all($result)   

  // $respuesta['hola'] = $grupo; 



   $this->mostrarRespuesta($this->convertirJson($grupo), 200);     

    //  $resultArray2 = array();    

        // while ($tuple= pg_fetch_all($result)) {

        //   //$resultArray[] = $tuple;  

        //     $resultArray['hola'] = $query; //array_values($tuple);  

        //    // console.log($tuple); 

        //    //   $resultArray['dat'] = $tuple;  

        //     $this->mostrarRespuesta($this->convertirJson($resultArray), 200);            

        // }          

       

     }  



}



private function updateGranArea() {

   if ($_SERVER['REQUEST_METHOD'] != "POST") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



      



    $regArea= json_decode(file_get_contents("php://input"),true); 

     

     $id= (int)$regArea['idArea'];

     $arraydatos = $regArea['datosGranArea'];

     $nombre = $arraydatos['GAR_NOMB'];

     $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");



    $query = "Update \"SGI_GRAN_AREA\" set \"GAR_NOMB\" = '$nombre' where \"GAR_CODI\" = $id";



  

     // $query = "Select Max(\"GAR_CODI\") As maximo from \"SGI_GRAN_AREA\"";

      $result = pg_query($conexion,$query);   

      if ($result)      

        $message = array('estado'=>'ok','msg' =>'Actualizado');

       else

        $message = array('estado'=>'fallo','msg' =>'No se pudo modificar el registro');



      $this->mostrarRespuesta($this->convertirJson($message), 200);  

     // if (pg_num_rows($result)>0)

     // {

     //     $regmaximo= pg_fetch_array($result);

     //     $maximo['max']= (int)$regmaximo['maximo'] + 1;

     // }

     

    $conexion= null;









    //$this->mostrarRespuesta($this->convertirJson($customer), 200);     

      

   

   



}

private function insertGranArea() {

   if ($_SERVER['REQUEST_METHOD'] != "POST") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



      

    $regArea= json_decode(file_get_contents("php://input"),true); 

     

    // $id= (int)$regArea['idArea'];

     $arraydatos = $regArea['datosGranArea'];

     $nombre = $arraydatos['GAR_NOMB'];

     $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");





    $query = "Select Max(\"GAR_CODI\") As maximo from \"SGI_GRAN_AREA\"";

     $result = pg_query($conexion,$query);   

     if (pg_num_rows($result)>0)

     {

         $regmaximo= pg_fetch_array($result);

         $maximo= (int)$regmaximo['maximo'] + 1;

     }



    $query = "insert into \"SGI_GRAN_AREA\" (\"GAR_CODI\",\"GAR_NOMB\") VALUES ( $maximo,'$nombre')";



  

     // $query = "Select Max(\"GAR_CODI\") As maximo from \"SGI_GRAN_AREA\"";

      $result = pg_query($conexion,$query);   

      if ($result)      

        $message = array('estado'=>'ok','msg' =>'Ingresado');

       else

        $message = array('estado'=>'fallo','msg' =>'No se pudo ingresar el registro');



      $this->mostrarRespuesta($this->convertirJson($message), 200);  

    

     

    $conexion= null;





}



private function area() {

   if ($_SERVER['REQUEST_METHOD'] != "GET") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



       $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

     

   $query = "select area.\"ARE_CODI\", area.\"ARE_NOMB\",granarea.\"GAR_NOMB\" from \"SGI_AREA\" as area  join \"SGI_GRAN_AREA\" as granarea on

      granarea.\"GAR_CODI\" = area.\"ARE_GRAN_AREA_CODI\" ";

    //$query = "select * from granarea_list('S')";

     $result = pg_query($conexion,$query);    

       if (pg_num_rows($result)>0)

     {

      $resultArray = array();                 

        while ($tuple= pg_fetch_assoc($result)) {

            $resultArray[] = $tuple;        

        }          

        $this->mostrarRespuesta($this->convertirJson($resultArray), 200);            

     }  

}





private function areaId() {

   if ($_SERVER['REQUEST_METHOD'] != "POST") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



     $areaID= (int)$_REQUEST['IdArea'];

     

 

       $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

     

   $query =  "select area.\"ARE_CODI\", area.\"ARE_NOMB\",granarea.\"GAR_NOMB\", area.\"ARE_GRAN_AREA_CODI\" from \"SGI_AREA\" as area  join \"SGI_GRAN_AREA\" as granarea on

      granarea.\"GAR_CODI\" = area.\"ARE_GRAN_AREA_CODI\"  where area.\"ARE_CODI\" = $areaID";

     $result = pg_query($conexion,$query);    

       if (pg_num_rows($result)>0)

     {

       $grupo=pg_fetch_array($result);

         $respuesta['ARECODI']= $grupo['ARE_CODI'];

         $respuesta['ARENOMB']= $grupo['ARE_NOMB'];

         $respuesta['GARNOMB']= $grupo['GAR_NOMB'];

         $respuesta['AREGRANAREACODI']= $grupo['ARE_GRAN_AREA_CODI'];

         $respuesta['value']=2;

         $this->mostrarRespuesta($this->convertirJson($respuesta), 200);           

     }  



}



private function updateArea() {

   if ($_SERVER['REQUEST_METHOD'] != "POST") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



      



    $regArea= json_decode(file_get_contents("php://input"),true); 

     

     $idArea= (int)$regArea['idArea'];

     $idGranArea = (int)$regArea['idGranArea'];

     $nombreArea = $regArea['nombreArea'];

     $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");



     $query = "Update \"SGI_AREA\" set \"ARE_NOMB\" = '$nombreArea',\"ARE_GRAN_AREA_CODI\" =  $idGranArea  where \"ARE_CODI\" = $idArea";



  

     // $query = "Select Max(\"GAR_CODI\") As maximo from \"SGI_GRAN_AREA\"";

      $result = pg_query($conexion,$query);   

      if ($result)      

        $message = array('estado'=>'ok','msg' =>'Actualizado');

       else

        $message = array('estado'=>'fallo','msg' =>'No se pudo modificar el registro');



      $this->mostrarRespuesta($this->convertirJson($message), 200);  

     // if (pg_num_rows($result)>0)

     // {

     //     $regmaximo= pg_fetch_array($result);

     //     $maximo['max']= (int)$regmaximo['maximo'] + 1;

     // }

     

    $conexion= null;









    //$this->mostrarRespuesta($this->convertirJson($customer), 200);     

       



}



private function insertArea() {

   if ($_SERVER['REQUEST_METHOD'] != "POST") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



      



    $datos= json_decode(file_get_contents("php://input"),true); 

     

      $arraydatos = $datos['datosArea'];

     $idGranArea = (int)$arraydatos['AREGRANAREACODI'];

     $nombreArea = $arraydatos['ARENOMB'];

     $conexion=pg_connect("host=localhost port=3306 dbname=investigador user=root password=admin")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");





       $query = "Select Max(\"ARE_CODI\") As maximo from \"SGI_AREA\"";

     $result = pg_query($conexion,$query);   

     if (pg_num_rows($result)>0)

     {

         $regmaximo= pg_fetch_array($result);

         $maximo= (int)$regmaximo['maximo'] + 1;

     }



    

      $query = "insert into \"SGI_AREA\" (\"ARE_CODI\",\"ARE_NOMB\",\"ARE_GRAN_AREA_CODI\") VALUES ( $maximo,'$nombreArea',$idGranArea)";

  

     // $query = "Select Max(\"GAR_CODI\") As maximo from \"SGI_GRAN_AREA\"";

      $result = pg_query($conexion,$query);   

      if ($result)      

        $message = array('estado'=>'ok','msg' =>'Actualizado');

       else

        $message = array('estado'=>'fallo','msg' =>'No se pudo modificar el registro');



      $this->mostrarRespuesta($this->convertirJson($message), 200);  

     // if (pg_num_rows($result)>0)

     // {

     //     $regmaximo= pg_fetch_array($result);

     //     $maximo['max']= (int)$regmaximo['maximo'] + 1;

     // }

     

    $conexion= null;









    //$this->mostrarRespuesta($this->convertirJson($customer), 200);     

      

   

   



}



 private function grupo() {  

     if ($_SERVER['REQUEST_METHOD'] != "GET") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  



      $conexion=pg_connect("host=localhost port=5433 dbname=BDInvestigador user=postgres password=Lu1sAlej0")

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

     

   $query = "Select * from \"SGI_GRUP\" ";

     $result = pg_query($conexion,$query);    

       if (pg_num_rows($result)>0)

     {

      $resultArray = array();                 

        while ($tuple= pg_fetch_assoc($result)) {

            $resultArray[] = $tuple;        

        }          

        $this->mostrarRespuesta($this->convertirJson($resultArray), 200);            

     }  

}    

       



   private function login() {  

    if ($_SERVER['REQUEST_METHOD'] != "GET") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 405);  

     }  

     

        



      $usuario= $_REQUEST['Usuario'];

      $pwd=  $_REQUEST['Contrasena']; 

      

    

     

           $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

    





      $query = "Select * from sgi_user where USE_USUA='" . $usuario . "' and USE_CLAV='" . $pwd . "'";



//$message[0] =array('Id' => '0','clave'=> $pwd,'Usuario' => $usuario,'sql'=>$query); 

       

//$this->mostrarRespuesta($this->convertirJson($message), 200);  

       $result = mysqli_query($conexion,$query);

    

       if (mysqli_num_rows($result)>0)

        {

         $usua= mysqli_fetch_array($result);



         

         $message[0] = array('Id_tipo'=>$usua['USE_COD_TIPO'], 'Id' => $usua['USE_CODI'],'Usuario' => $usua['USE_USUA']);

       

          $this->mostrarRespuesta($this->convertirJson($message), 200);     

        }

        else

        {

        $message[0]  = array('msg' => 'Usuario o clave Incorrectos');

          $this->mostrarRespuesta($this->convertirJson($message), 405); 

        }







        // else

        // {

        //   $respuesta['show']= 'true';

        //   $respuesta['message']= 'El login o clave inválidos';

        //    $this->mostrarRespuesta($this->convertirJson($respuesta), 200);    

        //   // $this->mostrarRespuesta($this->convertirJson($respuesta), 200);      

        //    //$this->mostrarRespuesta($this->convertirJson($respuesta), 200);  

        // }  

  

   }



   private function validaExisteRegistro($Tabla,$Campo,$Valor)

   {

           $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)

      or die("Lo sentimos pero no se pudo conectar a nuestra db");



     $query = "Select * from " . $Tabla . " where " . $Campo . "='" . $Valor . "'";



     $result = mysqli_query($conexion,$query); 

      

    if (mysqli_num_rows($result)>0 )

    {

      $datos = array(); 

     $datos[]=  mysqli_fetch_assoc($result);

     $message[0] = array('estado'=>'err','msg' =>'Ya existe el registro','existe'=>'true','valor'=>$datos);



     $this->mostrarRespuesta($this->convertirJson($message), 200);  

    } 

    else

    {

      $message[0] = array('estado'=>'err','msg' =>'No existe el registro','existe'=>'false','valor'=>$result);



      $this->mostrarRespuesta($this->convertirJson($message), 200);  

    }

    

    // $message[0] = array('estado'=>'err','msg' =>$query);



    //   $this->mostrarRespuesta($this->convertirJson($message), 200);  



   }



   private function execute()

   {

     //  if ($_SERVER['REQUEST_METHOD'] != "GET") {  

     //   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     // }  



     if ($_SERVER['REQUEST_METHOD'] != "POST") {  

       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     }  





      $datos= json_decode(file_get_contents("php://input"),true); 

     

      $Accion = $datos['Accion'];

      $SQL = $datos['SQL'];



      



     $query = $SQL;

     

      $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

    





       switch ($Accion) {

        case 'S':





         // $arrayName = array(array("SQL"=> $conexion));

         //    $this->mostrarRespuesta($this->convertirJson($arrayName), 200);  

            

        //      $resultArray = array();                 

        // while ($tuple= pg_fetch_assoc($result)) {

        //     $resultArray[] = $tuple;        

        // }          

        // $this->mostrarRespuesta($this->convertirJson($resultArray), 200);  

           

 // $resultArray['GAR_NOMB'] = $SQL;

 // $this->mostrarRespuesta($this->convertirJson($resultArray), 200); 

        

$resultArray = array(); 

//$row = array();

     $result = mysqli_query($conexion,$query); 

      

    if (mysqli_num_rows($result)==0 )

    {

            $resultArray[]= mysqli_fetch_assoc($result);

         // $resultArray = array(array('INV_IDEN' => null, "INV_NOMB" => null,"INV_APEL"=>null));

          

 

           $this->mostrarRespuesta($this->convertirJson($resultArray), 200);  

            

    }

    else

    {

       while ($tuple= mysqli_fetch_assoc($result)) {

          $resultArray[] = $tuple;         

        }   

      $this->mostrarRespuesta($this->convertirJson($resultArray), 200);  



       

          



     }

       

          break;

        case 'M':

             

           $query =str_replace("|", "/", $query); 

           $query =str_replace("*", "+", $query); 

           $result = mysqli_query($conexion,$query);           

          if ($result)      

          {

              $message[0] = array('estado'=>'ok','msg' =>'Actualizado','sql'=>$query);

              $this->mostrarRespuesta($this->convertirJson($message), 200);  

          }

          else

          {

              $message[0] = array('estado'=>'error','msg' => mysqli_error($conexion),'sql'=>$query);

              $this->mostrarRespuesta($this->convertirJson($message), 405);  

          }



          

          break;

        case 'D':

                 

           $result = mysqli_query($conexion,$query); 

          if ($result)      

          {

              $message[0] = array('estado'=>'ok','msg' =>'Eliminado');

               $this->mostrarRespuesta($this->convertirJson($message), 200);  

          }

          else

          {

             $message = array('estado'=>'errores','msg' => mysqli_error($conexion));

               $this->mostrarRespuesta($this->convertirJson($message), 404);

                

          }

          



         

          break; 

        case 'I':

            

        // $message[0] = array('estado'=>'fallo','msg' => $query,'valor'=>1);

  



           $div_query= explode(";",$query);

          

           

          if ($div_query[0]==0)

          {

               $queryMax ="SELECT MAX(" . $div_query[2] . ") as m FROM  " . $div_query[1] ;

              



                $result = mysqli_query($conexion,$queryMax);                

             

                if (mysqli_num_rows($result)>0)

                   {

                   

                       $maximo= mysqli_fetch_array($result);



                       $valorMaximo = $maximo[0] + 1; 



                    

                   }

                $queryInsert =str_replace("@@", $valorMaximo, $div_query[3]); 



          }

          else

          {

            $queryInsert=$div_query[1];

            $valorMaximo = $div_query[0];

          }



                     

          $result = mysqli_query($conexion,$queryInsert);   

          

        

          if ($result)      

              $message[0] = array('estado'=>'ok','msg' =>'Insertado','valor'=>$valorMaximo);

          else

              $message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$queryInsert);



           $this->mostrarRespuesta($this->convertirJson($message), 200);  

          break;         

        default:

          # code...

          break;

      }



   }

  



private function createProyectoProducto($Lista,$idProy,$idInve)

{





      $message[0] = array('lista'=>$Lista,'idProyecto' =>$idProy,'idInvestigador'=>$idInve);  

      $this->mostrarRespuesta($this->convertirJson($message), 200);  

}



private function executeSQL($Accion,$SQL)

   {

     //  if ($_SERVER['REQUEST_METHOD'] != "GET") {  

     //   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);  

     // }  



    



      



     $query = $SQL;

     

      $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)

      or die("Lo sentimos pero no se pudo conectar a nuestra db");

    





       switch ($Accion) {

        case 'S':





         // $arrayName = array(array("SQL"=> $conexion));

         //    $this->mostrarRespuesta($this->convertirJson($arrayName), 200);  

            

        //      $resultArray = array();                 

        // while ($tuple= pg_fetch_assoc($result)) {

        //     $resultArray[] = $tuple;        

        // }          

        // $this->mostrarRespuesta($this->convertirJson($resultArray), 200);  

           

 // $resultArray['GAR_NOMB'] = $SQL;

 // $this->mostrarRespuesta($this->convertirJson($resultArray), 200); 

        

$resultArray = array(); 

//$row = array();

     $result = mysqli_query($conexion,$query); 

      

    if (mysqli_num_fields($result)==0 )

    {

            $resultArray[]= mysqli_fetch_assoc($result);

         // $resultArray = array(array('INV_IDEN' => null, "INV_NOMB" => null,"INV_APEL"=>null));

        //  printf(mysqli_num_rows($result));

          $message[0] = array('count'=>'0');  

           $this->mostrarRespuesta($this->convertirJson($message), 200);  

            

    }

    else

    {

      //printf('mysqli_num_rows($result)');

       while ($tuple= mysqli_fetch_assoc($result)) {

          $resultArray[] = $tuple;         

        } 

         $message[0] = array('estado'=>mysqli_num_rows($result),'msg' =>'Actualizado','sql'=>$query);  

      $this->mostrarRespuesta($this->convertirJson($resultArray), 200);  

 

       

          



     }

       

          break;

        case 'M':

             

           $query =str_replace("|", "/", $query); 

           $query =str_replace("*", "+", $query); 

           $result = mysqli_query($conexion,$query);           

          if ($result)      

          {

              $message[0] = array('estado'=>'ok','msg' =>'Actualizado','sql'=>$query);

              $this->mostrarRespuesta($this->convertirJson($message), 200);  

          }

          else

          {

              $message[0] = array('estado'=>'error','msg' => mysqli_error($conexion),'sql'=>$query);

              $this->mostrarRespuesta($this->convertirJson($message), 405);  

          }



          

          break;

        case 'D':

                 

           $result = mysqli_query($conexion,$query); 

          if ($result)      

          {

              $message[0] = array('estado'=>'ok','msg' =>'Eliminado');

               $this->mostrarRespuesta($this->convertirJson($message), 200);  

          }

          else

          {

             $message = array('estado'=>'errores','msg' => mysqli_error($conexion));

               $this->mostrarRespuesta($this->convertirJson($message), 404);

                

          }

          



         

          break; 

        case 'I':

            

        // $message[0] = array('estado'=>'fallo','msg' => $query,'valor'=>1);

  



           $div_query= explode(";",$query);

          

           

          if ($div_query[0]==0)

          {

               $queryMax ="SELECT MAX(" . $div_query[2] . ") as m FROM  " . $div_query[1] ;

              



                $result = mysqli_query($conexion,$queryMax);                

             

                if (mysqli_num_rows($result)>0)

                   {

                   

                       $maximo= mysqli_fetch_array($result);



                       $valorMaximo = $maximo[0] + 1; 



                    

                   }

                $queryInsert =str_replace("@@", $valorMaximo, $div_query[3]); 



          }

          else

          { 

            $queryInsert=$div_query[1];

            $valorMaximo = $div_query[0];

          }



                     

          $result = mysqli_query($conexion,$queryInsert);   

          

        

          if ($result)      

              $message[0] = array('estado'=>'ok','msg' =>'Insertado','valor'=>$valorMaximo);

          else

              $message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$queryInsert);



           $this->mostrarRespuesta($this->convertirJson($message), 200);  

          break;         

        default:

          # code...

          break;

      }



   }





}

 $api = new Api();  

 $api->procesarLLamada();