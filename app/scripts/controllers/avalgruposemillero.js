'use strict';

angular.module('listaTareasApp')

  .controller('avalgruposemillero', function($scope,$location,TareasResource,$route,$window) {

  	$('#myModal').hide(); 

  	moment.locale('es');
  	   $scope.optionsGrupo = {                                                      
                height: 200,
                striped: true,
                pagination: true,                
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,
                clickToSelect: true,
                idField:'gru_codi',   
                toolbar: '#toolbargrupo',             
            columns: [{               
                field: 'Grupo',
                title: 'GRUPO',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'Fecha',
                title: 'FECHA DE CREACIÓN',
                align: 'left',
                valign: 'middle',
                sortable: true,
                 formatter: function(value, row, index) {
                    return moment(value).format("DD MMMM YYYY");

                 }

            }, {
                field: 'Investigador',
                title: 'Director',
                align: 'left',
                valign: 'middle',
                sortable: true
            } , {
                field: 'gru_aval_inst',
                title: 'Avalado',
                align: 'center',
                valign: 'middle',
                width: '25',
                checkbox:false,                
                 formatter: function(value, row, index) {

                 	var check;
                 	check =(value==1)? 'checked':'';

					return '<input class="edit" type="checkbox" class="chk" data-ID="' + row.gru_codi + '" ' + check + ' />';
					
				},
				events:window.operateEvents = {
			        'click .edit': function (e, value, row, index) {
			            row.gru_aval_inst = (value=='1')? '0':'1';			            
			        }			       
			    }

            }]

        };

        var datos = {
        	Accion:'S',
        	SQL:'SELECT IG.igr_grup_codi,G.gru_nomb AS Grupo,G.gru_codi,G.gru_aval_inst,' + 
            ' G.gru_fech_ini AS Fecha,CONCAT(I.inv_nomb," ",I.inv_apel) As Investigador ' + 
            ' FROM sgi_inve_grup AS IG  INNER JOIN sgi_grup AS G ON G.gru_codi = IG.igr_grup_codi ' + 
            ' INNER JOIN sgi_inve As I ON I.inv_codi = IG.igr_inve_iden  WHERE IG.igr_tipo_vinc_codi=1'
        }

        var grupo = TareasResource.SQL(datos);
        	grupo.then(function(result){

        		$('#tablegrupo').bootstrapTable('load',result.data);

        	});

       $scope.optionsSemillero = {                                                      
                height: 200,
                striped: true,
                pagination: true,                
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,
                clickToSelect: true,
                idField:'sem_codi',   
                toolbar: '#toolbarsemillero',             
            columns: [{               
                field: 'sem_nomb',
                title: 'SEMILLERO',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'SEM_FECH_CREA',
                title: 'FECHA DE CREACIÓN',
                align: 'left',
                valign: 'middle',
                sortable: true,
                 formatter: function(value, row, index) {
                    return moment(value).format("DD MMMM YYYY");

                 }

            }, {
                field: 'Investigador',
                title: 'Director',
                align: 'left',
                valign: 'middle',
                sortable: true
            } , {
                field: 'SEM_AVAL_UNAD',
               title: 'Avalado',
                align: 'center',
                valign: 'middle',
                width: '25',
                checkbox:false,                
                 formatter: function(value, row, index) {

                 	var check;
                 	check =(value==1)? 'checked':'';

					return '<input type="checkbox" class="edit" class="chk" data-ID="' + row.sem_codi + '" ' + check + ' />';
					
				},
				events:window.operateEvents = {
			        'click .edit': function (e, value, row, index) {
			            row.SEM_AVAL_UNAD = (value=='1')? '0':'1';			            
			        }			       
			    }

            }]

        };

        var datos = {
        	Accion:'S',
        	SQL:'SELECT semi.sem_codi,semi.sem_nomb, semi.SEM_FECH_CREA,semi.SEM_AVAL_UNAD,concat(inve.inv_nomb, " ",inv_apel) As Investigador ' + 
        		' FROM sgi_semi as semi inner join sgi_inve_semi as inve_semi on inve_semi.INS_SEMI_CODI= semi.SEM_CODI' +
				' inner join sgi_inve as inve on inve.INV_CODI=inve_semi.INS_INVE_IDEN'
        }

        var grupo = TareasResource.SQL(datos);
        	grupo.then(function(result){

        		$('#tablesemillero').bootstrapTable('load',result.data);

        	});   	
    $scope.onButtonAceptar = function() {

  		$('#myModal').show(); 
    	var semillero = $('#tablesemillero').bootstrapTable('getData');
    	var grupo = $('#tablegrupo').bootstrapTable('getData');

    	var update = [];

    	angular.forEach(semillero,function(value,key){

    		update.splice(0,0,{Accion:'U',SQL:'UPDATE sgi_semi set SEM_AVAL_UNAD=' + value.SEM_AVAL_UNAD + ' WHERE SEM_CODI=' + value.sem_codi })

    	});

    	angular.forEach(grupo,function(value,key){

    		update.splice(0,0,{Accion:'U',SQL:'UPDATE sgi_grup set gru_aval_inst=' + value.gru_aval_inst + ' WHERE gru_codi=' + value.gru_codi })

    	});


	  	var actualiza = TareasResource.SQLMulti(update);
    		actualiza.then(function() {

 				$('#myModal').hide();

    		});

    };

		$scope.onClicSalir = function() {

			  $window.location.href = "#/menuAdministracionGeneral/";
			
	    };

  });