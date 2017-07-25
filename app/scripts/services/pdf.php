<?php
require_once("fpdf.php");  

	$markers = json_decode(file_get_contents("php://input"),true); 

	//echo count($markers->{'formacion'});
	 $pdf = new FPDF();
	 $pdf->AddPage();
      
   

	//  $pdf->SetTitle("INVESTIGADOR " . $markers->{'datos'}->{'inv_apel'},true);
	//  $pdf->Header("INVESTIGADOR");
	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,30,"Nombre : ");
	//  $pdf->SetFont('Arial');	 
	//  $pdf->Text(47,30,$markers->{'datos'}->{'inv_nomb'});

	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,40,"Apellido : ");
	//  $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	 
	//  $pdf->Text(47,40,$markers->{'datos'}->{'inv_apel'});


	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,50,"Identificacion : ");
 //     $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	 
	//  $pdf->Text(62,50,$markers->{'datos'}->{'inv_iden'});


	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,60,"Fecha Nacimiento : ");
	//  $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	  
	//  $pdf->Text(75,60,$markers->{'datos'}->{'inv_fech_naci'});


	//  $pdf->SetFont('Arial','B',16);	 
	//  $pdf->Text(20,70,"Programa Academico : ");
	//  $pdf->SetFont('Arial');	 
	//  $pdf->SetFontSize(12);	 
	//  $pdf->Text(85,70,$markers->{'datos'}->{'pac_nomb'});


	 $pdf->Text(85,90,'FORMACION ACADEMICA');

	 $i=0;
	 foreach ($markers['formacion'] as $value) {
	    
	 	 $pdf->Text(85,90+$i,$value['nin_titu_obte']);
	 	 $i=$i+5;

	}


	  $pdf->Output("../../../app/investigador.pdf","D");


?>