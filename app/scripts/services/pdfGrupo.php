<?php
	require_once("fpdf.php");  
	require_once('../libs/PDF/tcpdf.php');

	$markers = json_decode(file_get_contents("php://input",false),true); 

	//echo print_r($markers);

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Convocatoria');
 $pdf->SetTitle('LISTADO');
 $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
// // set default header data
// $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, 'INVESTIGADOR', $markers['datos']['inv_nomb'] . ' ' . $markers['datos']['inv_apel'], array(0,64,255), array(0,64,128));
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH,'Grupo', $markers['datos']['gru_nomb'], array(0,64,255), array(0,64,128));

$pdf->setFooterData(array(0,64,0), array(0,64,128));
// // set header and footer fonts
 $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
 $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
// // set default monospaced font
 $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
// // set margins
 $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
 $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
 $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
// // set auto page breaks
 $pdf->SetAutoPageBreak(FALSE, PDF_MARGIN_BOTTOM);
// // set image scale factor
 $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
// // set some language-dependent strings (optional)
 if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
 	require_once(dirname(__FILE__).'/lang/eng.php');
 	$pdf->setLanguageArray($l);
 }
// // ---------------------------------------------------------
// // set default font subsetting mode
 $pdf->setFontSubsetting(true);
// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
 $pdf->SetFont('helvetica', '', 14, '', true);
// Add a page
// This method has several options, check the source code documentation for more information.
 $pdf->AddPage();
// // set text shadow effect
 $pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));
// Set some content to print

$i=25;

$data =$markers['datos'];

$pdf->SetFont('helvetica', 'B', 14, '', true);
$pdf->Text(85,$i,'Datos');


$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+10,'Nombre : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(60,$i+10,$data['gru_nomb']);


$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+20,'Fecha Inicio : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(60,$i+20,$data['gru_fech_ini']);

$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+30,'Fecha Termina : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(60,$i+30,$data['gru_fech_term']);

$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+40,'Código colciencias : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(60,$i+40,$data['gru_colc_codi']);


$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+50,'Área : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(60,$i+50,$data['are_nomb']);




$pdf->SetFont('helvetica', 'B', 14, '', true);
$pdf->Text(15,$i+70,'Director grupo');

$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+80,'Nombre : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(40,$i+80,$data['inv_nomb'] . ' ' . $data['inv_apel']);


$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+90,'Zona : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(40,$i+90,$data['zon_nomb']);

$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+100,'Centro : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(40,$i+100,$data['centro2']);


$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+110,'Escuela : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(40,$i+110,$data['esc_nomb']);

$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,$i+120,'Programa : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(40,$i+120,$data['pac_nomb']);


$i=170;

$data =$markers['integrante'];

if ($data!=null)
{
	$pdf->SetFont('helvetica', 'B', 14, '', true);
	$pdf->Text(15,$i,'Integrantes del Grupo');


	 foreach ($data as $clave2 => $valor2) {	 	 	 	 	 	 	 	 	
	 		 if ($i>=260) 
		 	 	{
		 	 		$i=10;
		 	 		$pdf->AddPage();
		 	 			
		 	 	}
	 	   $linea = $i; 		
	 	   $pdf->SetFont('helvetica', '', 11, '', true);  				 	 
	 	   $pdf->Text(18,$linea+10,$valor2['inv_nomb'] . ' ' . $valor2['inv_apel']);
	 	   $i=$linea+5;		 	
	}
}

$data =$markers['investigacion'];
if ($data!=null)
{
	$i=$i+15;

	if ($i>=260) 
 	 	{
 	 		$i=20;
 	 		$pdf->AddPage();
 	 			
 	 	}
	$pdf->SetFont('helvetica', 'B', 14, '', true);
	$pdf->Text(15,$i,'Líneas de Investigación');
	foreach ($data as $clave2 => $valor2) {	 	 	 	 	 	 	 	 	
	 		 if ($i>=260) 
		 	 	{
		 	 		$i=10;
		 	 		$pdf->AddPage();
		 	 			
		 	 	}
	 	   $linea = $i; 		
	 	   $pdf->SetFont('helvetica', '', 11, '', true);  				 	 
	 	   $pdf->Text(18,$linea+10,$valor2['lin_desc']);
	 	   $i=$linea+5;		 	
	}
}



$data =$markers['semillero'];

if ($data!=null)
{
	$i=$i+15;
	if ($i>=260) 
 	 	{
 	 		$i=20;
 	 		$pdf->AddPage();
 	 			
 	 	}
	$pdf->SetFont('helvetica', 'B', 14, '', true);
	$pdf->Text(15,$i,'Semilleros');
	foreach ($data as $clave2 => $valor2) {	 	 	 	 	 	 	 	 	
	 		 if ($i>=260) 
		 	 	{
		 	 		$i=10;
		 	 		$pdf->AddPage();
		 	 			
		 	 	}
	 	   $linea = $i; 		
	 	   $pdf->SetFont('helvetica', '', 11, '', true);  				 	 
	 	   $pdf->Text(18,$linea+10,$valor2['sem_nomb']);
	 	   $i=$linea+5;		 	
	}
}

$data =$markers['produccion'];
if ($data!=null)
{
	$i=$i+15;

	if ($i>=260) 
 	 	{
 	 		$i=20;
 	 		$pdf->AddPage();
 	 			
 	 	}
	$pdf->SetFont('helvetica', 'B', 14, '', true);
	$pdf->Text(15,$i,'Producción del Grupo de Investigación');
	foreach ($data as $clave2 => $valor2) {	 	 	 	 	 	 	 	 	
	 		
	 	   $linea = $i; 		
	 	   $pdf->SetFont('helvetica', '', 11, '', true);  		 	   			 	 
	 	   $pdf->Text(18,$linea+10,"Proyecto: " . $valor2['NombreProyecto']);
	 	   $pdf->Text(18,$linea+15,"Producto: " . $valor2['NombreProducto']);
	 	   $pdf->Text(18,$linea+20,"Fecha Inicia: " . $valor2['fech_ini']);
	 	   $pdf->Text(18,$linea+25,"Fecha Termina: " . $valor2['fech_term']);
	 	    if ($i>=260) 
		 	 	{
		 	 		$i=10;
		 	 		$pdf->AddPage();
		 	 			
		 	 	}
	 	   $i=$linea+30;		 	
	}
}

$data =$markers['plantrabajo'];
if ($data!=null)
{
	$i=$i+5;
	if ($i>=260) 
 	 	{
 	 		$i=20;
 	 		$pdf->AddPage();
 	 			
 	 	}

	$pdf->SetFont('helvetica', 'B', 14, '', true);
	$pdf->Text(15,$i,'Plan de Trabajo Grupo');
	foreach ($data as $clave2 => $valor2) {	 	 	 	 	 	 	 	 	
	 		 if ($i>=260) 
		 	 	{
		 	 		$i=20;
		 	 		$pdf->AddPage();
		 	 			
		 	 	}
	 	   $linea = $i; 		
	 	   $pdf->SetFont('helvetica', '', 11, '', true);  		 	   			 	 
	 	   $pdf->Text(18,$linea+10,"Nombre: " . $valor2['Nombre']);	 	  
	 	   $pdf->Text(18,$linea+15,"Fecha Inicia: " . $valor2['FechaInicio']);
	 	   $pdf->Text(18,$linea+20,"Fecha Termina: " . $valor2['FechaTermina']);
	 	   $i=$linea+5;		 	
	}
}

			
$pdf->Output('example_002.pdf', 'D');

?>