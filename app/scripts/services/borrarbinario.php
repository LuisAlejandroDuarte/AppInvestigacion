<?php

	 $id = $_POST['id'];
	 $tipo =$_POST['tipo'];
	 $nombre_fichero =$_POST['nombre'];
	 
	  if ($tipo==1)	 
	 {
	 	$dirTexto = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/TEXTO/' . $nombre_fichero;
	 	if (file_exists($dirTexto))
	 	{			 		
	 			unlink($_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/TEXTO/' . $nombre_fichero);	
	 					
		}
	 }
	 else
	 {
		$dirTexto = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/RESO/' . $nombre_fichero;

		if (file_exists($dirTexto))
	 	{			
			unlink($_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/RESO/' . $nombre_fichero);		
		}
		
	 }	

	 	echo "Ok";	


?>