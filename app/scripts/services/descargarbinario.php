<?php

	
	 $tipo = $_POST['tipo'];
	
	  if ($tipo==1)	 
	 {
	 	$dirTexto = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . '/AppInvestigacion/TEXTO/';
	
	 }
	 else
	 {
		$dirTexto = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . '/AppInvestigacion/RESO/';
		
	 }	

	 	echo $dirTexto;	


?>