 <?php

 require_once("config.php");  
	 $datos= json_decode(file_get_contents("php://input"),true); 
     
      $Lista = $datos['Lista'];
      $idProy = $datos['idProy'];
      $idInve = $datos['idInve'];

	  $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)
      or die("Lo sentimos pero no se pudo conectar a nuestra db");

      $dat=""; 
      foreach ($Lista as $valor) {  

      	$queryMax ="SELECT MAX(Id) as m FROM sgi_prod ";
              

                $result = mysqli_query($conexion,$queryMax);                
             
                if (mysqli_num_rows($result)>0)
                   {                   
                       $maximo= mysqli_fetch_array($result);
                       $valorMaximo = $maximo[0] + 1;                    
                   }

			$SQL="INSERT INTO sgi_prod (Id,Nombre,id_tipo) VALUES (" . $valorMaximo . ",'" . $valor["NombreProducto"] . "'," . $valor["IdTipoProducto"] . ")";

  		    $result = mysqli_query($conexion,$SQL);   

  		    $SQL="INSERT INTO sgi_prod_proy (id_proy,id_prod,id_inve,fecha,titulo) VALUES (" . $idProy . "," . $valorMaximo . "," . $idInve . ",'" . $valor["Fecha"] . "','" . $valor["TituloProducto"] . "')";
			
  			$result = mysqli_query($conexion,$SQL);   


  			$fecha = $valor["Fecha"];
   			
		}

		echo $fecha;
      //echo $Lista;

?>      