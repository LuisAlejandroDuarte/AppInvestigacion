<?php

 require_once("gestionarchivo.php");  
	// var_dump($_POST);
	// var_dump($_FILES);

$id = $_POST['id'];
$accion = $_POST['accion'];
$archFileOld = $_POST['archFileOld'];
$tipo = $_POST['tipo'];


$tipos = array
	  (
	  array('CONTEXTO','sgi_conv','CON_TEXT','CON_TEXT_NOMB','CON_CODI'),
	  array('CONRESO','sgi_conv','CON_RESO','CON_RESO_NOMB','CON_CODI'),
	  array('PROTEXTO','sgi_prop','PRO_TEXT','PRO_TEXT_NOMB','PRO_CODI'),
	  array('PROCARTA','sgi_prop','PRO_CART_AVAL','PRO_CART_NOMB','PRO_CODI'),
	  array('SEMILLERO','sgi_doc_semi','DOCU_RUTA','DOCU_NOMB','DOCU_CODI')
	  );

	if ($accion=='Ingresar')
	{	 	
		$valores = array();
		 foreach ($_FILES as $attrName => $valuesArray) {  

			$atributos = $attrName;
			array_push($valores,$valuesArray);
			
		 	foreach ($tipos as $key => $value) {		 			
		 			if ($value[0] == $attrName)	 	
		 			{		
		 				$idtipo = $key;	 	
		 				echo json_encode($key);
		 			}

		 	} 		


		 	$archivo = new GestionArchivo($_FILES[$attrName],$idtipo, $id);
	 	    $archivo->copyFile();
		 }
		
	}

	$nombres='';
	if ($accion=='Ingresar2')
	{	 	
		echo json_decode($id)[0];
		foreach($_FILES['SEMILLERO']['tmp_name'] as $key => $tmp_name ){
			
			$file_name = $key.$_FILES['SEMILLERO']['name'][$key];
			$archivo = new GestionArchivo($_FILES['SEMILLERO']['tmp_name'][$key],4, json_decode($id)[$key],$file_name);
			 $archivo->copyFile2();

		}

		//  foreach ($_FILES['SEMILLERO'] as $attrName => $valuesArray) {  			
		// //	 $identi = explode("_", $attrName);					 			
		//  	echo json_encode($attrName);
		//  	$archivo = new GestionArchivo($_FILES['SEMILLERO'],4, $id);

	 // 	   // $archivo->copyFile();
		//  }		
		
		  // echo json_encode($_FILES['SEMILLERO']);

		// $count = count($_FILES['SEMILLERO']['name']);
		// 	for ($i = 0; $i < $count; $i++) {
		// 		echo $_FILES['SEMILLERO']['name'][$i];
		// 		$archivo = new GestionArchivo($_FILES['SEMILLERO']['name'][$i],4, $id);
  //   		}
	}

	

	if ($accion=='Actualizar')
	{	 

			 $t = explode("@", $tipo);
			 $arch =explode("@", $archFileOld);
			// $borrado = explode("*", $arch);
			 $result="";
			 if ($t[0]=="CONTEXTO")
			 {

				 foreach ($t as $key => $value) {

				 	if ($_FILES[$value])	
				 	{			 		
				 		$archivo = new GestionArchivo($_FILES[$value],$key, $id,$arch[$key*2]);
		 	    		$archivo->deleteFile();
		 	    		$archivo->copyFile();

				 	}			 				 
				 	else
				 	{			 		
				 		if ($arch[(2*$key)+1]=="")
				 		{
				 			$archivo = new GestionArchivo(null,$key, $id,$arch[$key*2]);
		 	    			$archivo->deleteFile();	 

				 		}			 		    		
				 	}
				 }			
			 }
			 else

			 {
			 		foreach ($t as $key => $value) {

				 	if ($_FILES[$value])	
				 	{			 		
				 		$archivo = new GestionArchivo($_FILES[$value],$key+2, $id,$arch[$key*2]);
		 	    		$archivo->deleteFile();
		 	    		$archivo->copyFile();

				 	}			 				 
				 	else
				 	{			 		
				 		if ($arch[(2*$key)+1]=="")
				 		{
				 			$archivo = new GestionArchivo(null,$key+2, $id,$arch[$key*2]);
		 	    			$archivo->deleteFile();	 

				 		}			 		    		
				 	}
				 }
			 }

	}
	 	
?>



