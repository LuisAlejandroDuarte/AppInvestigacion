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
  $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH,'Convocatoria', $markers['datos'][0]['CON_DESC'], array(0,64,255), array(0,64,128));

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

$i=30;

$data =$markers['datos'][0];

$pdf->SetFont('helvetica', 'B', 13, '', true);
$pdf->Text(80,$i,'CONVOCATORIA');

$pdf->SetFont('helvetica', 'B', 11, '', true);
$pdf->Text(15,$i+10,'Nombre : ');	 	


$pdf->SetFont('helvetica', '', 11, '', true);
$pdf->Text(35,$i+10,$data['CON_DESC']);	 	

$pdf->SetFont('helvetica', 'B', 11, '', true);
$pdf->Text(15,$i+20,'Tipo Convocatoria : ');	 	

$pdf->SetFont('helvetica', '', 11, '', true);
$pdf->Text(55,$i+20,$data['TCO_DESC']);	 	


$pdf->SetFont('helvetica', 'B', 11, '', true);
$pdf->Text(15,$i+30,'Inicia : ');	 	

$pdf->SetFont('helvetica', '', 11, '', true);
$pdf->Text(55,$i+30,$data['CON_FECH_INIC']);	 


$pdf->SetFont('helvetica', 'B', 11, '', true);
$pdf->Text(15,$i+40,'Termina : ');	 	

$pdf->SetFont('helvetica', '', 11, '', true);
$pdf->Text(55,$i+40,$data['CON_FECH_FINA']);		

$pdf->SetFont('helvetica', 'B', 13, '', true);
$pdf->Text(80,$i+55,'PROPUESTAS');
		
$i=$i+50;
$linea=0;
	  $data =$markers['datos'][1];
	  foreach ($data as $clave => $valor) {
	 	 $propuesta =$markers['datos'][1][$clave];
	 	 if ($i>=260) 
	 	 	{
	 	 		$i=10;
	 	 		$pdf->AddPage();
	 	 			
	 	 	}

	 	 $pdf->SetFont('helvetica', 'BI', 11, '', true);  	
	 	 $linea = $i; 
	 	 $pdf->Text(15,$linea+15,$propuesta['pro_nomb']);	 	
	 	 $i=$linea+10;
	 //	$data1 =$markers['datos'][1][$clave];
	 	$data1 =$markers['datos'][1][$clave][0];
	 	// echo print_r($data1[0]);
	 	//$i=$linea+15
	 	 foreach ($data1 as $clave2 => $valor2) {
	 	 	 
	 	 	
	 	 	
	 	 	// echo print_r($valor2['inv_nomb']);
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
	 	
	 	  $i=$linea+5;	

	  }	 
			
$pdf->Output('example_002.pdf', 'D');

?>