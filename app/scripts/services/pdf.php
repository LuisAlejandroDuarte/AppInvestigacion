<?php
require_once("fpdf.php");  

	$markers = json_decode(file_get_contents("php://input"),true); 

	//echo count($markers->{'formacion'});
	 $pdf = new FPDF();
	
	 $pdf->AddPage(); 
	 $pdf->SetMargins(10, 10); 
        $pdf->SetAutoPageBreak(true, 10);

		
		
	
      
   	//	echo "<pre>"; print_r($markers['datos']['inv_apel']);

	$pdf->SetTitle("INVESTIGADOR " . $markers['datos']['inv_apel'],true);
	 $pdf->Header("INVESTIGADOR");
	 $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(20,30,"Nombre : ");
	 $pdf->SetFont('Arial');	 
	 $pdf->Text(47,30,utf8_decode($markers['datos']['inv_nomb']));

	 $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(20,40,"Apellido : ");
	 $pdf->SetFont('Arial');	 
	 $pdf->SetFontSize(12);	 
	 $pdf->Text(47,40,utf8_decode($markers['datos']['inv_apel']));


	 $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(20,50,"Identificacion : ");
     $pdf->SetFont('Arial');	 
	 $pdf->SetFontSize(12);	 
	 $pdf->Text(62,50,utf8_decode($markers['datos']['inv_iden']));


	 $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(20,60,"Fecha Nacimiento : ");
	 $pdf->SetFont('Arial');	 
	 $pdf->SetFontSize(12);	  
	 $pdf->Text(75,60,$markers['datos']['inv_fech_naci']);


	 $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(20,70,utf8_decode("Programa Académico : "));
	 $pdf->SetFont('Arial');	 
	 $pdf->SetFontSize(12);	 
	 $pdf->Text(85,70,utf8_decode($markers['datos']['pac_nomb']));

	  $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(85,90,utf8_decode('FORMACION ACADÉMICA'));

	 
	
	


	  $i=5;	

	 $pdf->SetFont('Arial');	 
	 $pdf->SetFontSize(12);	 
	  $data =$markers['formacion'];
	 foreach ($data as $clave => $valor) {
	 	 $academica =$markers['formacion'][$clave];
	 	 
	 	 $linea = $i;
	 	 $pdf->SetFont('Arial','IB',13);	 
	 	 $pdf->Text(20,90+$linea+5,utf8_decode($academica['niv_nomb']));	 	 

	 	 $pdf->SetFont('Arial');
	 	 $pdf->SetFontSize(12);	 	 
	 	 $pdf->Text(20,90+$linea+10,utf8_decode($academica['nin_inst']));
	 	 $pdf->Text(20,90+$linea+15,utf8_decode($academica['nin_titu_obte']));
	 	 $pdf->Text(20,90+$linea+20,utf8_decode($academica['nin_agno'])); 		 	
	 	 $i=$linea+25;	
	 }

	 // $pdf->AddPage();
	
	 $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(80,95+$i,utf8_decode('INFORMACIÓN INVESTIGATIVA'));

	 $i=100+$i;	

	 $pdf->SetFont('Arial','IB',13);	 

	 $pdf->Text(20,$i,utf8_decode("GRUPOS"));
		
	 $data =$markers['grupo'];



	  foreach ($data as $clave => $valor) {
	 	 $gru =$markers['grupo'][$clave];	 		 	
	 	 //echo print_r($grupo);
	 	 $pdf->SetFont('Arial');
	 	 $pdf->SetFontSize(12);	 	
	 	 $linea = $i; 
	 	 $pdf->Text(20,$linea+10,utf8_decode($gru['gru_nomb']));
	 	 $pdf->Text(20,$linea+15,"Inicio  : " . utf8_decode($gru['igr_fech_inic']));
	 	 $pdf->Text(20,$linea+20,"Termina : " . utf8_decode($gru['igr_fech_term'])); 		 	
	 	 $i=$linea+25;	
	  }



	 $pdf->SetFont('Arial','B',16);	 
	 $pdf->Text(80,$i,utf8_decode('PROYECTOS'));
	 	
		
	 $data =$markers['proyecto'];



	  foreach ($data as $clave => $valor) {
	 	 $gru =$markers['proyecto'][$clave];	 		 	
	 	 //echo print_r($grupo);
	 	 $pdf->SetFont('Arial');
	 	 $pdf->SetFontSize(12);	 	
	 	 $linea = $i; 
	 	 $pdf->Text(20,$linea+10,utf8_decode($gru['pro_nomb']));
				 	 		 	
	 	 $i=$linea+5;	
	  }
	 
	 
	   $pdf->SetFont('Arial','B',16);	 
	
	   	$i=10+$i;

	   $data =$markers['producto'];
	 
	    $pdf->Text(80,$i,utf8_decode('PRODUCTOS'));
	  foreach ($data as $clave => $valor) {
	 	 $pro =$markers['producto'][$clave];	 		 	
	 	 //echo print_r($grupo);
	 	 $pdf->SetFont('Arial');
	 	 $pdf->SetFontSize(12);	 	
	 	 $linea = $i; 
	 	 $pdf->Text(20,$linea+10,utf8_decode($pro['Nombre']));
				 	 		 	
	 	 $i=$linea+5;	
	  }


	   $pdf->Text(80,$i+300,utf8_decode('PRODUCTOS'));

	  $pdf->Output("../../../app/investigador.pdf","D");


?>