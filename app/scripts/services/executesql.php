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


  if ($Accion=="Grupo")
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

           $gru_codi =$resultArray[0]["gru_codi"];   

           $SQL1 ="select li.lin_desc from sgi_line_inve as li inner join sgi_grup_line_inve as gli on gli.gli_line_inve_codi=li.lin_codi " . 
                  "inner join sgi_grup as g on g.gru_codi=gli.gli_grup_codi where g.gru_codi=" . $gru_codi;

            $resultArray2 = array(); 
            $resultArray[1] = array();
            $resultado2 = mysqli_query($conexion,$SQL1);
             if (mysqli_num_rows($resultado2)==0 )               
             {
               $resultArray[1]= mysqli_fetch_assoc($resultado2);                                                            
             }
             else
             {
                while ($tuple2= mysqli_fetch_assoc($resultado2)) {  
                      array_push($resultArray[1], $tuple2); 
                    }
             }

            $SQL2 ="select i.inv_nomb,i.inv_apel,ig.igr_fech_inic,ig.igr_fech_term from sgi_inve_grup as ig " . 
            " inner join sgi_inve as i on i.inv_codi=ig.igr_inve_iden where ig.igr_tipo_vinc_codi<>1 AND ig.igr_grup_codi=" . $gru_codi;

            $resultArray3 = array(); 
            $resultArray[2] = array();
            $resultado3 = mysqli_query($conexion,$SQL2);
             if (mysqli_num_rows($resultado3)==0 )               
             {
               $resultArray[2]= mysqli_fetch_assoc($resultado3);                                                            
             }
             else
             {
                while ($tuple3= mysqli_fetch_assoc($resultado3)) {  
                      array_push($resultArray[2], $tuple3); 
                    }
             }     

              $SQL3 ="select s.sem_nomb, sg.sgr_fech_inic,sg.sgr_fech_term from sgi_semi as s " . 
            " inner join sgi_grup_semi as sg on sg.sgr_semi_codi=s.sem_codi where sg.sgr_grup_codi=" . $gru_codi;

            $resultArray4 = array(); 
            $resultArray[3] = array();
            $resultado4 = mysqli_query($conexion,$SQL3);
             if (mysqli_num_rows($resultado4)==0 )               
             {
               $resultArray[3]= mysqli_fetch_assoc($resultado4);                                                            
             }
             else
             {
                while ($tuple4= mysqli_fetch_assoc($resultado4)) {  
                      array_push($resultArray[3], $tuple4); 
                    }
             }     


             $SQL4 ="select PROY.PRO_NOMB As NombreProyecto,PROD.Nombre AS NombreProducto,PROD.Id As IdProd,PROY.PRO_CODI AS IdProy," . 
                    " GP.fech_ini,GP.fech_term,GP.id_grup AS IdGrupo " .
                    " FROM sgi_grup_proy As GP INNER JOIN sgi_proy As PROY ON PROY.PRO_CODI = GP.id_proy " .
                    " INNER JOIN sgi_prod AS PROD ON PROD.Id=GP.id_prod WHERE  GP.Id_grup=" . $gru_codi;

            $resultArray5 = array(); 
            $resultArray[4] = array();
            $resultado5 = mysqli_query($conexion,$SQL4);
             if (mysqli_num_rows($resultado5)==0 )               
             {
               $resultArray[4]= mysqli_fetch_assoc($resultado5);                                                            
             }
             else
             {
                while ($tuple5= mysqli_fetch_assoc($resultado5)) {  
                      array_push($resultArray[4], $tuple5); 
                    }
             }    



             $SQL5="select pgr_plnt_codi As Id, pgr_path As Path,pgr_fech_inic As FechaInicio,pgr_fech_term AS FechaTermina,pgr_grup_codi As IdGrupo, " .
                    " pgr_plnt_codi,pgr_nombre As Nombre FROM sgi_plnt_grup WHERE pgr_grup_codi=" . $gru_codi;
        

             $resultArray6 = array(); 
            $resultArray[5] = array();
            $resultado6 = mysqli_query($conexion,$SQL5);
             if (mysqli_num_rows($resultado6)==0 )               
             {
               $resultArray[5]= mysqli_fetch_assoc($resultado6);                                                            
             }
             else
             {
                while ($tuple6= mysqli_fetch_assoc($resultado6)) {  
                      array_push($resultArray[5], $tuple6); 
                    }
             }    


        // $data =$resultArray[];
        // foreach ($data as $clave => $valor) { 


        // }  

       //  $CON_CODI =$resultArray[0]["CON_CODI"];   

       //   $SQL1 ="select distinct p.PRO_CODI, p.pro_nomb FROM sgi_prop_conv_juez as pcj inner join " .
       //        " sgi_prop as p on p.PRO_CODI = pcj.PCJU_PCAT_CODI inner join sgi_conv as c on c.CON_CODI = pcj.PCJU_CON_CODI  inner join " .
       //        " sgi_inve as i on i.INV_CODI = pcj.PCJU_INV_CODI where c.CON_CODI=" . $CON_CODI  ;
           
       // // mysqli_close($conexion);
       //  $resultArray2 = array(); 
       //  $resultArray[1] = array();
       //  $resultado2 = mysqli_query($conexion,$SQL1);
       //  $count=0;
       //  if (mysqli_num_rows($resultado2)==0 )               
       //     {
       //       $resultArray2[]= mysqli_fetch_assoc($resultado2);                                                            
       //     }
       //     else
       //     {
       //        while ($tuple= mysqli_fetch_assoc($resultado2)) {  
       //              array_push($resultArray[1], $tuple);   

       //              $resultArray[1][$count][0] = array();

       //               $SQL2 ="select inv_nomb,inv_apel FROM sgi_prop_conv_juez as pcj inner join " .
       //              " sgi_prop as p on p.PRO_CODI = pcj.PCJU_PCAT_CODI inner join sgi_conv as c on c.CON_CODI = pcj.PCJU_CON_CODI  inner join " .
       //              " sgi_inve as i on i.INV_CODI = pcj.PCJU_INV_CODI where c.CON_CODI=" . $CON_CODI . " AND p.PRO_CODI=" . $tuple['PRO_CODI'];
       //               $resultado3 = mysqli_query($conexion,$SQL2);

       //               while ($tuple2= mysqli_fetch_assoc($resultado3)) {  

       //                   array_push($resultArray[1][$count][0], $tuple2);   

       //               }

       //              $count = $count+1;
       //              // $resultArray[1][0] = $tuple;
       //        }               
       //     }
          
        mysqli_close($conexion);
        echo json_encode($resultArray);                                                        
       }    

      function ExecuteSQL($sql,$conexion) {

        $result = array(); 
        $resultado = mysqli_query($conexion,$sql);
        if (mysqli_num_rows($resultado)==0 )               
        {
          $result[]= mysqli_fetch_assoc($resultado);                                                            
        }
        else
        {
          while ($tuple= mysqli_fetch_assoc($resultado)) {                        
                $result[] = $tuple;         
          }               
        }

        return $result;

      }

      if ($Accion=="Semillero")
      {
        $IdUsuario = $d['Id'];
        $IdSemillero = $d['IdSemillero'];
        $resultArray = array();
        $SQL="select lin_codi,lin_desc AS Nombre FROM sgi_line_inve ORDER BY lin_desc";     
          array_push($resultArray, ExecuteSQL($SQL,$conexion)); 


        $SQL="seelct concat(INV_APEL,' ',INV_NOMB) AS Nombre  ,INV_CODI  FROM sgi_inve WHERE " .
          " INV_CODI!=" . $IdUsuario . " ORDER BY concat(INV_APEL,' ',INV_NOMB)";      
          array_push($resultArray, ExecuteSQL($SQL,$conexion));   

       $SQL="select PAC_CODI,PAC_NOMB AS Nombre FROM   sgi_prog_acad ORDER BY PAC_NOMB";
         array_push($resultArray, ExecuteSQL($SQL,$conexion));  

       $SQL="select TIE_CODI,TIE_NOMB AS Nombre FROM  sgi_tipo_estr ORDER BY TIE_NOMB";
         array_push($resultArray, ExecuteSQL($SQL,$conexion));  


       $SQL="select Linea.lin_desc AS Nombre,DATE_FORMAT(LineaSemillero.LIS_FECH_INI,'%d %M %Y') AS LIS_FECH_INI," . 
                " DATE_FORMAT(LineaSemillero.LIS_FECH_FINA,'%d %M %Y') As LIS_FECH_FINA ,LineaSemillero.LIS_CODI,LineaSemillero.LIS_LINE_INVE_CODI " .
                " FROM sgi_line_inve_semi AS LineaSemillero " .
                " INNER JOIN sgi_line_inve AS Linea " .
                " ON Linea.lin_codi = LineaSemillero.LIS_LINE_INVE_CODI  WHERE LineaSemillero.LIS_SEMI_CODI = " . $IdSemillero;        
        array_push($resultArray, ExecuteSQL($SQL,$conexion));          

        $SQL="select concat(investigador.INV_NOMB, ' ', investigador.INV_APEL)  AS Nombre," .
                " integrante.IS_FECH_INI,integrante.IS_FECH_FIN,integrante.IS_CODI,integrante.IS_INVE_CODI " .
                " FROM sgi_inte_semi AS integrante " .
                " INNER JOIN sgi_inve AS investigador " . 
                " ON integrante.IS_INVE_CODI = investigador.INV_CODI  WHERE integrante.IS_SEMI_CODI = " . $IdSemillero;       
        array_push($resultArray, ExecuteSQL($SQL,$conexion));       
        
        $SQL="select Programa.PAC_NOMB AS Nombre," .
             " ProgramaSemillero.PAS_FECH_INI,ProgramaSemillero.PAS_FECH_FIN,ProgramaSemillero.PAS_CODI,ProgramaSemillero.PAS_PACA_CODI " .
             " FROM sgi_prog_acad_semi AS ProgramaSemillero " .
             " INNER JOIN sgi_prog_acad AS Programa " .
             " ON ProgramaSemillero.PAS_PACA_CODI = Programa.PAC_CODI  WHERE ProgramaSemillero.PAS_SEMI_CODI = " . $IdSemillero; 
        array_push($resultArray, ExecuteSQL($SQL,$conexion));            

        $SQL="select TipoEstrategia.TIE_NOMB AS Nombre," .
              " EstrategiaSemillero.TES_CODI,EstrategiaSemillero.TES_TIES_CODI,EstrategiaSemillero.TES_DESC " .
              " FROM sgi_tipo_estr_semi AS EstrategiaSemillero " .
              " INNER JOIN sgi_tipo_estr AS TipoEstrategia " .
              " ON EstrategiaSemillero.TES_TIES_CODI = TipoEstrategia.TIE_CODI  WHERE EstrategiaSemillero.TES_SEMI_CODI = " . $IdSemillero;
        array_push($resultArray, ExecuteSQL($SQL,$conexion));             

        $SQL="select ESPRODS_CODI,ESPRODS_NOMB AS Nombre FROM sgi_esprod_semi";
        array_push($resultArray, ExecuteSQL($SQL,$conexion));
        $SQL="select  ESPROYS_CODI,ESPROYS_DESC AS Nombre FROM sgi_esproy_semi";
        array_push($resultArray, ExecuteSQL($SQL,$conexion));

        $SQL="select PPR_CODI,PPR_SEMI_CODI,PPR_INVE_CODI,PPR_PROY_CODI,PPR_PROD_CODI,PPR_EPY_CODI,PPR_EPD_CODI,PPR_FECH_INI,PPR_FECH_FIN " .
             " FROM sgi_proy_prod_semi   WHERE PPR_SEMI_CODI = " . $IdSemillero;             
        array_push($resultArray, ExecuteSQL($SQL,$conexion));     

       

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