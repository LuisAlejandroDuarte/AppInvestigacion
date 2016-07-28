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
	  array('PROCARTA','sgi_prop','PRO_CART_AVAL','PRO_CART_NOMB','PRO_CODI')
	  );

if ($accion=='Ingresar')
{	 	
	 foreach ($_FILES as $attrName => $valuesArray) {  
		$atributos = $attrName;
	 	foreach ($tipos as $key => $value) {		 			
	 			if ($value[0] == $attrName)	 			
	 				$idtipo = $key;	 				 			
	 	} 		

	 	$archivo = new GestionArchivo($_FILES[$attrName],$idtipo, $id);
 	    $archivo->copyFile();
	 }
}

if ($accion=='Eliminar')
{	 	
	 foreach ($_FILES as $attrName => $valuesArray) {  
		$atributos = $attrName;
	 	foreach ($tipos as $key => $value) {		 			
	 			if ($value[0] == $attrName)	 			
	 				$idtipo = $key;	 				 			
	 	} 		

	 	$archivo = new GestionArchivo($_FILES[$attrName],$idtipo, $id);
 	    $archivo->copyFile();
	 }
}
	 
	
?>



