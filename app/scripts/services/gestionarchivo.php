<?php
 require_once("config.php");  




class GestionArchivo
{
	var $tipos = array
	  (
	  array('CONTEXTO','sgi_conv','CON_TEXT','CON_TEXT_NOMB','CON_CODI'),
	  array('CONRESO','sgi_conv','CON_RESO','CON_RESO_NOMB','CON_CODI'),
	  array('PROTEXTO','sgi_prop','PRO_TEXT','PRO_TEXT_NOMB','PRO_CODI'),
	  array('PROCARTA','sgi_prop','PRO_CART_AVAL','PRO_CART_NOMB','PRO_CODI'),
	  array('SEMILLERO','sgi_doc_semi','docu_text','docu_nomb','id')
	  );

	 var $_file='';
	 var $_tipo=-1;
	 var $_id=-1;
	 var $_nameFileOld='';
	 
	function __construct($file,$tipo,$id,$nameFileOld='')
	{
		
		$this->_file = $file;
		$this->_tipo = $tipo;
		$this->_id=$id;
		$this->_nameFileOld = $nameFileOld;

	}


	function copyFile()
	{
		$dirTexto = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0];		
		//echo json_encode($this->_file);
	 	if (!file_exists($dirTexto)) 
			mkdir( $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0], 0777);			
	 		
		if(copy($this->_file['tmp_name'],$dirTexto .'/id_' . $this->_id . '_' . $this->_file['name']))
		{
			$dirTexto = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0];

			$nameFileArch = $dirTexto .'/id_' . $this->_id . '_' . $this->_file['name'];
			$this->updateReg($nameFileArch);
		}
		//echo $this->tipos[$this->_tipo][0];
	}

	function copyFile2()
	{
		$dirTexto = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0];		
		//echo json_encode($this->_file);
	 	if (!file_exists($dirTexto)) 
			mkdir( $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0], 0777);			
	 		
		if(copy($this->_file,$dirTexto .'/id_' . $this->_id . '_' . $this->_nameFileOld))
		{
			$dirTexto = $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0];

			$nameFileArch = $dirTexto .'/id_' . $this->_id . '_' . $this->_nameFileOld;
			$this->updateReg2($nameFileArch);
		}
		//echo $this->tipos[$this->_tipo][0];
	}

	function deleteFile()
	{
		$dirTexto = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0];

		if (file_exists($dirTexto) && $this->_nameFileOld!="")
	 	{			
			unlink($_SERVER['DOCUMENT_ROOT'] .'/AppInvestigacion/' . $this->tipos[$this->_tipo][0] . '/' . $this->_nameFileOld);		
			$this->updateRegNULL();
		}
		//echo $dirTexto . '/' . $this->_nameFileOld;
	}


	private function updateReg($file)
	{
		$conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)
        or die("Lo sentimos pero no se pudo conectar a nuestra db");

        $SQL ="UPDATE " .  $this->tipos[$this->_tipo][1] . " set " . $this->tipos[$this->_tipo][2] . "='" . $file . "'," 
        . $this->tipos[$this->_tipo][3] . "='id_" . $this->_id . "_" . $this->_file['name']  . "' WHERE " . $this->tipos[$this->_tipo][4] . '=' . $this->_id;
        
        $result = mysqli_query($conexion,$SQL);  

      
	}

	private function updateReg2($file)
	{
		$conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)
        or die("Lo sentimos pero no se pudo conectar a nuestra db");

        $SQL ="UPDATE " .  $this->tipos[$this->_tipo][1] . " set " . $this->tipos[$this->_tipo][2] . "='" . $file . "'," 
        . $this->tipos[$this->_tipo][3] . "='id_" . $this->_id . "_" . $this->_nameFileOld  . "' WHERE " . $this->tipos[$this->_tipo][4] . '=' . $this->_id;
        
        $result = mysqli_query($conexion,$SQL);  

      
	}


	private function updateRegNULL()
	{
		$conexion= mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME)
        or die("Lo sentimos pero no se pudo conectar a nuestra db");

         $SQL ="UPDATE " .  $this->tipos[$this->_tipo][1] . " set " . $this->tipos[$this->_tipo][2] . "=NULL, " .
         $this->tipos[$this->_tipo][3] . "=NULL WHERE " . $this->tipos[$this->_tipo][4] . '=' . $this->_id;

         $result = mysqli_query($conexion,$SQL);  
         

	}
}


?>