<?php

 require_once("gestionarchivo.php");  
	// var_dump($_POST);
	// var_dump($_FILES);

$id = $_POST['id'];
$archFileOld = $_POST['archFileOld'];
$accion = $_POST['accion'];

 $tipos = array
  (
  array('CONTEXTO','sgi_conv','CON_TEXT'),
  array('CONRESO','sgi_conv','CON_RESO'),
  array('PROTEXTO','sgi_prop','PRO_TEXT'),
  array('PROCARTA','sgi_prop','PRO_CART_AVAL')
  );

if ($accion=='Ingresar')
{	 	
	 foreach ($_FILES as $attrName => $valuesArray) {  
		$atributos = $attrName;
	 	foreach ($tipos as $key => $value) {		 			
	 			if ($value[0] == $attrName)	 			
	 				$tipo = $key;	 				 			
	 	} 		

	 	$archivo = new GestionArchivo($_FILES[$attrName],$tipo, $id);
 	    $archivo->copyFile();
	 }
}
	 echo $tipo;
	
?>



