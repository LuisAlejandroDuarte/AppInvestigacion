<?php

	 require_once("config.php");  
	 $datos= json_decode(file_get_contents("php://input"),true); 
     
      $Accion = $datos['Accion'];
      $SQL = $datos['SQL'];

	  $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)
      or die("Lo sentimos pero no se pudo conectar a nuestra db");
	

      if ($Accion=='I')
      {
          $query= $SQL;  
      	  $div_query= explode(";",$query);
          
          if ($div_query[0]=='I')
          {
            $queryInsert=$div_query[1] . ";" . $div_query[2];
            $valorMaximo = $div_query[0];
          
            $result = mysqli_query($conexion,$queryInsert);   
           if ($result)      
              $message[0] = array('estado'=>'ok','msg' =>'Insertado','valor'=>$valorMaximo);
            else
              $message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'valor'=>$queryInsert);

              echo $message[0]['valor'];            
          }
           
          else 
          { 
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
              $message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'valor'=>$queryInsert);

    		echo $message[0]['valor'];	
        }          
      }
      
      else
      {
          if ($Accion=='ADJUNTO')
          {
            $result = mysqli_query($conexion,$SQL);   
            if ($result)      
              {
                  $message[0] = array('estado'=>'ok','msg' =>'INGRESADO@' . mysqli_insert_id($conexion) ,'sql'=>$SQL);
                //  $this->mostrarRespuesta($this->convertirJson($message), 200);  
              }
              else
              {
                  $message[0] = array('estado'=>'error','msg' => mysqli_error($conexion),'sql'=>$SQL);
                 // $this->mostrarRespuesta($this->convertirJson($message), 405);  
              }
              echo $message[0]['msg'];
          } 

          else
            {

           $result = mysqli_query($conexion,$SQL);   
            if ($result)      
              {
                  $message[0] = array('estado'=>'ok','msg' =>'Actualizado','sql'=>$SQL);
                //  $this->mostrarRespuesta($this->convertirJson($message), 200);  
              }
              else
              {
                  $message[0] = array('estado'=>'error','msg' => mysqli_error($conexion),'sql'=>$SQL);
                 // $this->mostrarRespuesta($this->convertirJson($message), 405);  
              }
              echo $message[0]['msg'];
            }
      }
    
	
?>