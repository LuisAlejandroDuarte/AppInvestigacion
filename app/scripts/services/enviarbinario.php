<?php
	 $id = $_POST['id'];
	 $tipo =$_POST['tipo'];
	
	 if ($tipo==1)	 
	 {
	 	$dirTexto = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/TEXTO';
	 	if (!file_exists($dirTexto))			
			mkdir( $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/TEXTO', 0700);			
	 }
	 else
	 {
		$dirTexto = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/RESO';
		if (!file_exists($dirTexto))			
			mkdir( $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/RESO', 0700);		
	 }

	if (copy($_FILES['file']['tmp_name'],$dirTexto .'/id_' . $id . '_' . $_FILES['file']['name'] )) {

		$status = 'Ok';
	} else {

		$status = 'Error al subir el archivo';

	}
	echo preg_replace("[\n|\r|\n\r]", "", $status);
?>



