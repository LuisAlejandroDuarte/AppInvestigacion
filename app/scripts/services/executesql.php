<?php

  set_time_limit(0);

	 require_once("config.php");  

	  $d= json_decode(file_get_contents("php://input"),TRUE); 

     

       $Accion = $d['Accion'];

       $SQL = $d['SQL'];



	   $conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)

       or die("Lo sentimos pero no se pudo conectar a nuestra db");



      



      if ($Accion=="S")

      {

            $resultArray = array(); 

      	$resultado = mysqli_query($conexion,$SQL);

            if (mysqli_num_rows($resultado)==0 )               

            {

                  $resultArray[]= mysqli_fetch_assoc($resultado);                                                            

            }



           else

           {

              while ($tuple= mysqli_fetch_assoc($resultado)) {                        

                        $resultArray[] = $tuple;         

                     }               

           }



           mysqli_close($conexion);

           echo json_encode($resultArray);                                

                          

       }


      if ($Accion=="Convocatoria")
      {

        $resultArray = array(); 
        $resultado = mysqli_query($conexion,$SQL);
        if (mysqli_num_rows($resultado)==0 )               
           {
             $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
           }
           else
           {
              while ($tuple= mysqli_fetch_assoc($resultado)) {                        
                    $resultArray[] = $tuple;         
              }               
           }

        // $data =$resultArray[];
        // foreach ($data as $clave => $valor) { 


        // }  

        $CON_CODI =$resultArray[0]["CON_CODI"];   

         $SQL1 ="select distinct p.PRO_CODI, p.pro_nomb FROM sgi_prop_conv_juez as pcj inner join " .
              " sgi_prop as p on p.PRO_CODI = pcj.PCJU_PCAT_CODI inner join sgi_conv as c on c.CON_CODI = pcj.PCJU_CON_CODI  inner join " .
              " sgi_inve as i on i.INV_CODI = pcj.PCJU_INV_CODI where c.CON_CODI=" . $CON_CODI  ;
           
       // mysqli_close($conexion);
        $resultArray2 = array(); 
        $resultArray[1] = array();
        $resultado2 = mysqli_query($conexion,$SQL1);
        $count=0;
        if (mysqli_num_rows($resultado2)==0 )               
           {
             $resultArray2[]= mysqli_fetch_assoc($resultado2);                                                            
           }
           else
           {
              while ($tuple= mysqli_fetch_assoc($resultado2)) {  
                    array_push($resultArray[1], $tuple);   

                    $resultArray[1][$count][0] = array();

                     $SQL2 ="select inv_nomb,inv_apel FROM sgi_prop_conv_juez as pcj inner join " .
                    " sgi_prop as p on p.PRO_CODI = pcj.PCJU_PCAT_CODI inner join sgi_conv as c on c.CON_CODI = pcj.PCJU_CON_CODI  inner join " .
                    " sgi_inve as i on i.INV_CODI = pcj.PCJU_INV_CODI where c.CON_CODI=" . $CON_CODI . " AND p.PRO_CODI=" . $tuple['PRO_CODI'];
                     $resultado3 = mysqli_query($conexion,$SQL2);

                     while ($tuple2= mysqli_fetch_assoc($resultado3)) {  

                         array_push($resultArray[1][$count][0], $tuple2);   

                     }

                    $count = $count+1;
                    // $resultArray[1][0] = $tuple;
              }               
           }
          
        mysqli_close($conexion);
        echo json_encode($resultArray);                                                        
       }


       if ($Accion=="I")

       {

       	  $result = mysqli_query($conexion,$SQL);  

       	   if ($result)      

              $message[0] = array('estado'=>'ok','msg' =>'Insertado','valor'=>mysqli_insert_id($conexion));

          else

              $message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$SQL);



             mysqli_close($conexion);

       	   echo json_encode($message);   

       }

   		

   	  if ($Accion=="U")

       {

       	  $result = mysqli_query($conexion,$SQL);  

       	   if ($result)      

              $message[0] = array('estado'=>'ok','msg' =>'Actualizado','valor'=>$result);

          else

              $message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$SQL);

             mysqli_close($conexion);

       	   echo json_encode($message);   

       } 	



        if ($Accion=="D")

       {

          $result = mysqli_query($conexion,$SQL);  

           if ($result)      

              $message[0] = array('estado'=>'ok','msg' =>'Eliminado','valor'=>$result);

          else

              $message[0] = array('estado'=>'fallo','msg' => mysqli_error($conexion),'sql'=>$SQL);

             mysqli_close($conexion);

           echo json_encode($message);   

       }



// Get the current response code and set a new one



?>        