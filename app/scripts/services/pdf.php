<?php
require_once("fpdf.php");  

	$markers = json_decode(file_get_contents("php://input",false),true); 

	//echo count($markers->{'formacion'});
	//  $pdf = new FPDF('P','mm','A4');
	
	//  $pdf->AddPage(); 
	//  $pdf->SetMargins(10, 10); 
 //     $pdf->SetAutoPageBreak(true, 10);

		
			
	
      
 //   	//	echo "<pre>"; print_r($markers['datos']['inv_apel']);

	// $pdf->SetTitle("INVESTIGADOR " . $markers['datos']['inv_apel'],true);
	//  $pdf->Header("INVESTIGADOR");
	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,30,"Nombre : ");
	//  $pdf->SetFont('Arial');	 
	//  $pdf->Text(47,30,utf8_decode($markers['datos']['inv_nomb']));

	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,40,"Apellido : ");
	//  $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	 
	//  $pdf->Text(47,40,utf8_decode($markers['datos']['inv_apel']));


	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,50,"Identificacion : ");
 //     $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	 
	//  $pdf->Text(62,50,utf8_decode($markers['datos']['inv_iden']));


	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,60,"Fecha Nacimiento : ");
	//  $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	  
	//  $pdf->Text(75,60,$markers['datos']['inv_fech_naci']);


	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,70,utf8_decode("Programa Académico : "));
	//  $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	 
	//  $pdf->Text(85,70,utf8_decode($markers['datos']['pac_nomb']));

	//   $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(85,90,utf8_decode('FORMACION ACADÉMICA'));

	 
	
	


	//   $i=5;	

	//  $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	 
	//   $data =$markers['formacion'];
	//  foreach ($data as $clave => $valor) {
	//  	 $academica =$markers['formacion'][$clave];
	 	 
	//  	 $linea = $i;
	//  	 $pdf->SetFont('Arial','IB',13);	 
	//  	 $pdf->Text(20,90+$linea+5,utf8_decode($academica['niv_nomb']));	 	 

	//  	 $pdf->SetFont('Arial');
	//  	 $pdf->SetFontSize(12);	 	 
	//  	 $pdf->Text(20,90+$linea+10,utf8_decode($academica['nin_inst']));
	//  	 $pdf->Text(20,90+$linea+15,utf8_decode($academica['nin_titu_obte']));
	//  	 $pdf->Text(20,90+$linea+20,utf8_decode($academica['nin_agno'])); 		 	
	//  	 $i=$linea+25;	
	//  }

	//  // $pdf->AddPage();
	
	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(80,95+$i,utf8_decode('INFORMACIÓN INVESTIGATIVA'));

	//  $i=100+$i;	

	//  $pdf->SetFont('Arial','IB',13);	 

	//  $pdf->Text(20,$i,utf8_decode("GRUPOS"));
		
	//  $data =$markers['grupo'];



	//   foreach ($data as $clave => $valor) {
	//  	 $gru =$markers['grupo'][$clave];	 		 	
	//  	 //echo print_r($grupo);
	//  	 $pdf->SetFont('Arial');
	//  	 $pdf->SetFontSize(12);	 	
	//  	 $linea = $i; 
	//  	 $pdf->Text(20,$linea+10,utf8_decode($gru['gru_nomb']));
	//  	 $pdf->Text(20,$linea+15,"Inicio  : " . utf8_decode($gru['igr_fech_inic']));
	//  	 $pdf->Text(20,$linea+20,"Termina : " . utf8_decode($gru['igr_fech_term'])); 		 	
	//  	 $i=$linea+25;	
	//   }



	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(80,$i,utf8_decode('PROYECTOS'));
	 	
		
	//  $data =$markers['proyecto'];



	//   foreach ($data as $clave => $valor) {
	//  	 $gru =$markers['proyecto'][$clave];	 		 	
	//  	 //echo print_r($grupo);
	//  	 $pdf->SetFont('Arial');
	//  	 $pdf->SetFontSize(12);	 	
	//  	 $linea = $i; 
	//  	 $pdf->Text(20,$linea+10,utf8_decode($gru['pro_nomb']));
				 	 		 	
	//  	 $i=$linea+5;	
	//   }
	 
	 
	//    $pdf->SetFont('Arial','B',16);	 
	
	//    	$i=10+$i;

	//    $data =$markers['producto'];
	 
	//     $pdf->Text(80,$i,utf8_decode('PRODUCTOS'));
	//   foreach ($data as $clave => $valor) {
	//  	 $pro =$markers['producto'][$clave];	 		 	
	//  	 //echo print_r($grupo);
	//  	 $pdf->SetFont('Arial');
	//  	 $pdf->SetFontSize(12);	 	
	//  	 $linea = $i; 
	//  	 $pdf->Text(20,$linea+10,utf8_decode($pro['Nombre']));
				 	 		 	
	//  	 $i=$linea+5;	
	//   }


	//    $pdf->Text(80,$i+10,utf8_decode('PRODUCTOS'));
	//      $pdf->Text(80,$i+15,utf8_decode('PRODUCTOS'));
	//       $pdf->Text(80,$i+20,utf8_decode('PRODUCTOS'));
	//      $pdf->Text(80,$i+25,utf8_decode('PRODUCTOS'));

	//    $pdf->Output("../../../app/investigador.pdf","D");


	require_once('../libs/PDF/tcpdf.php');
// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor($markers['datos']['inv_nomb'] . ' ' . $markers['datos']['inv_apel']);
$pdf->SetTitle('INVESTIGADOR ' . $markers['datos']['inv_apel']);
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');
// set default header data
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, 'INVESTIGADOR', $markers['datos']['inv_nomb'] . ' ' . $markers['datos']['inv_apel'], array(0,64,255), array(0,64,128));
$pdf->setFooterData(array(0,64,0), array(0,64,128));
// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
// set auto page breaks
$pdf->SetAutoPageBreak(FALSE, PDF_MARGIN_BOTTOM);
// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}
// ---------------------------------------------------------
// set default font subsetting mode
$pdf->setFontSubsetting(true);
// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
$pdf->SetFont('helvetica', '', 14, '', true);
// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();
// set text shadow effect
$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));
// Set some content to print


				//DATOS PERSONALES

$pdf->SetFont('helvetica', 'B', 13, '', true);
$pdf->Text(80,30,'DATOS PERSONALES');
$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,50,'Nombres : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(73,50,utf8_decode(utf8_encode($markers['datos']['inv_nomb'])));

$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,60,'Apellidos : ');
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(73,60,utf8_decode(utf8_encode($markers['datos']['inv_apel'])));


$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,70,utf8_decode(utf8_encode('Identificación : ')));
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(73,70,utf8_encode($markers['datos']['inv_iden']));


$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,80,utf8_encode('Fecha Nacimiento : '));
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(73,80,utf8_encode($markers['datos']['inv_fech_naci']));

$pdf->SetFont('helvetica', 'B', 12, '', true);
$pdf->Text(15,90,utf8_decode(utf8_encode('Programa Académico : ')));
$pdf->SetFont('helvetica', '', 12, '', true);
$pdf->Text(73,90,utf8_decode(utf8_encode($markers['datos']['pac_nomb'])));




						//FORMACIÓN ACADÉMICA


$pdf->SetFont('helvetica', 'B', 13, '', true);
$pdf->Text(80,110,utf8_decode(utf8_encode('FORMACION ACADÉMICA')));

$i=120;
	 $data =$markers['formacion'];
	 foreach ($data as $clave => $valor) {
	 	 $academica =$markers['formacion'][$clave];
	 	 
	 	  if ($i>=260) 
	 	 	{
	 	 		$i=10;
	 	 		$pdf->AddPage();
	 	 			
	 	 	}


	 	 
	 	 $linea = $i;
	 	  $pdf->SetFont('helvetica', 'B', 12, '', true); 
	 	  $pdf->Text(15,$linea+5,utf8_decode(utf8_encode($academica['niv_nomb'])));	 	 

	 	  $pdf->SetFont('helvetica', '', 11, '', true);  
	 	  $pdf->Text(15,$linea+10,utf8_decode(utf8_encode($academica['nin_inst'])));
	 	  $pdf->Text(15,$linea+15,utf8_decode(utf8_encode($academica['nin_titu_obte'])));
	 	  $pdf->Text(15,$linea+20,$academica['nin_agno']); 
	 	
	 	 $i=$linea+25;	
	 }


//GRUPOS
$i=$i+10;

$pdf->SetFont('helvetica', 'B', 13, '', true);
$pdf->Text(80,$i,utf8_decode(utf8_encode('GRUPOS')));
			


	 $data =$markers['grupo'];
	 foreach ($data as $clave => $valor) {
	 	 $grupo =$markers['grupo'][$clave];
	 	 
	 	 if ($i>=260) 
	 	 	{
	 	 		$i=10;
	 	 		$pdf->AddPage();
	 	 			
	 	 	}


	 	 $linea = $i;
         $pdf->SetFont('helvetica', 'B', 12, '', true); 
	 	 $pdf->Text(15,$linea+10,utf8_decode($grupo['gru_nomb']));
 	 	 $pdf->SetFont('helvetica', '', 11, '', true);  
	  	 $pdf->Text(15,$linea+15,"Inicio  : " . utf8_decode($grupo['igr_fech_inic']));
	  	 $pdf->Text(15,$linea+20,"Termina : " . utf8_decode($grupo['igr_fech_term'])); 		  	 	          
	 	 $i=$linea+30;	

	 	 
	 }


//$pdf->Text(62,50,utf8_decode($markers));
// $html = <<<EOD
// <h1>Welcome to <a href="http://www.tcpdf.org" style="text-decoration:none;background-color:#CC0000;color:black;">&nbsp;<span style="color:black;">TC</span><span style="color:white;">PDF</span>&nbsp;</a>!</h1>
// <i>This is the first example of TCPDF library.</i>
// <p>This text is printed using the <i>writeHTMLCell()</i> method but you can also use: <i>Multicell(), writeHTML(), Write(), Cell() and Text()</i>.</p>
// <p>Please check the source code documentation and other examples for further information.</p>
// <p style="color:#CC0000;">TO IMPROVE AND EXPAND TCPDF I NEED YOUR SUPPORT, PLEASE <a href="http://sourceforge.net/donate/index.php?group_id=128076">MAKE A DONATION!</a></p>
// EOD;
// // Print text using writeHTMLCell()
// $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

// ---------------------------------------------------------
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('example_001.pdf', 'D');

?>