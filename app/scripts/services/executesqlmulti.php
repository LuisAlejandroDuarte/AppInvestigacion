<?php

	 require_once("config.php");  
	  $d= json_decode(file_get_contents("php://input"),TRUE); 
      $resultadoselect ='';
   	   $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)
       or die("Lo sentimos pero no se pudo conectar a nuestra db");

	 for ($i=0; $i <count($d); $i++) { 
	 		$SQL= $d[$i]['SQL'];

	 		switch ($d[$i]['Accion']) {
	 			case 'S':

	 				 $resultArray = array(); 
      				 $resultado = mysqli_query($conexion,$SQL);
            		 if (mysqli_num_rows($resultado)==0 )               
                 			$resultArray[] = null;
           			 else
              			while ($tuple= mysqli_fetch_assoc($resultado)) {                        
                        		$resultArray[] = $tuple;         
                     	}  
                     $resultadoselect =$resultadoselect . ';' . json_encode($resultArray);
            		    
            		 $message[0]['estado']='ok';
	 			break;
	 			case "I" :
	 			
	 				  $result = mysqli_query($conexion,$SQL);  
       	   			  if ($result)      
              			$message[0] = array('estado'=>'ok','msg' =>'Insertado','valor'=>$result);
          			  else          			  
              			$message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$SQL);              		              		  
       	   			//  echo json_encode($message);  
	 			break;

	 			case "U" :
	 				 $result = mysqli_query($conexion,$SQL);  
       	   			 if ($result)      
              			$message[0] = array('estado'=>'ok','msg' =>'Actualizado','valor'=>$result);
          			 else
              			$message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$SQL);
       	   			//echo json_encode($message);   
	 			break;
	 			case "D" :
	 				  $result = mysqli_query($conexion,$SQL);  
           			  if ($result)      
              			 $message[0] = array('estado'=>'ok','msg' =>'Eliminado','valor'=>$result);
          			  else
              			$message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$SQL);
           			  //echo json_encode($message);   

 				break;
	 			
	 			default:
	 				
	 				break;
	 		}	 		

	 }

	if ($d[0]['Accion']!='S')
	{	
	  if ($message[0]['estado'] =="fallo")
		 	{
		 		echo "Falló";
		 	}
		 	else
		 		echo "ok";
	}
	else

		echo $resultadoselect;  

	 // if ($d[0]['Accion']!='S'
	 // {
		//  if ($message[0]['estado'] =="fallo")
		//  	{
		//  		echo "Falló";
		//  	}
		//  	else
		//  		echo "ok";
	 // }

	// foreach($d as $posicion=>$jugador)
	// {
	// 	echo "El " . $posicion . " es " . $jugador;
	// }
// $equipo = array('portero'=>'Cech', 'defensa'=>'Terry', 'medio'=>'Lampard', 'delantero'=>'Torres');
 
// foreach($equipo as $posicion=>$jugador)
// 	{
// 	echo "El " . $posicion . " es " . $jugador;
// 	}
	 
       
?>       