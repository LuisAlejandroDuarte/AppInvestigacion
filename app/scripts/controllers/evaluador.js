'use strict';

angular.module('listaTareasApp')
  .controller('EvaluadorCtrl', function($scope,$location,TareasResource,$route,$window) {
    	
      var user = JSON.parse($window.sessionStorage.getItem('usuario'));
      var investigador = JSON.parse($window.sessionStorage.getItem('investigador'));

    if (user==null || user==undefined)
    {

      $location.path('/menu');
      return;
    }   


            moment.locale('es');
         $scope.options = {                           
 				cache: false,
                height: 300,
                striped: true,
                pagination: true,                
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,
                clickToSelect: true,
                idField:'PCJU_CODI',
                toolbar: '#custom-toolbarevaluacion',
            columns: [{
                field: 'PCJU_CODI',
                title: '',                
                visible:false                                                            
            },{
                field: 'Propuesta',
                title: 'PROPUESTAS ASIGNADAS',
                align: 'left',
                widht:  50,
                valign: 'middle',
                width: 300,
                sortable: true
            }, {
                field: 'Convocatoria',
                title: 'CONVOCATORIA',
                align: 'left',
                valign: 'middle',
                sortable: true
            }, {
                field: 'PRO_TEXT',
                title: 'DESCARGAR PROPUESTA',
                align: 'left',
                valign: 'middle',
                align: 'center',
                sortable: true,
                formatter:function(value,row,index) {                                            

                       return '<a href="http://'+ row.PRO_TEXT + '" target=_blank class="ver ml10 btn btn-default btn-xs" title="Ver Documento"><span class="glyphicon glyphicon-eye-open"></span></a>' ;  

               }
            }, {
                field: 'CON_FECH_FINA',
                title: 'CARGA EVALUACIÓN PROPUESTA',
                align: 'left',               
                align: 'center',
                valign: 'middle',
                sortable: true,
                formatter:function(value,row,index) {     

                      if (row.PCJU_EVAL_PROP_LINK!=null)

                      return '<a href="http://'+ row.PCJU_EVAL_PROP_LINK + '" target=_blank class="btn btn-default btn-xs" title="Ver Documento"><span class="glyphicon glyphicon-eye-open"></span></a>' ;  
                      else

                        return "";

               }
            },{
                field: 'PCJU_EEVA_CODI',
                title: 'EVALUACIÓN TOTAL ASIGNADA',
                align: 'left',
                valign: 'middle'                            
            },{
                field: 'Edit',
                title: '',
                align: 'left',
                valign: 'middle',
                 formatter:function(value,row,index) {     

                      return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-pencil"></span></a> ' ;  

               },
                events:  window.operateEvents = {                       

                        'click .edit': function (e, value, row, index) {                                
                                 $window.sessionStorage.setItem('Propuesta',row.Propuesta); 
                                 $window.sessionStorage.setItem('Convocatoria',row.Convocatoria); 
                                 $window.sessionStorage.setItem('link',row.PCJU_EVAL_PROP_LINK); 
                                 $window.sessionStorage.setItem('nombre',row.PCJU_EVAL_PROP_NOMB); 
                                 $window.sessionStorage.setItem('total',row.PCJU_EEVA_CODI); 
                                  $window.location.href ="#/edit-evaluador/" + row.PCJU_CODI + "";   


                        }

                }
            }]
        };  


	    var datos = TareasResource.SQL({Accion:'S',SQL:'SELECT PCJ.PCJU_CODI,PCJ.PCJU_EVAL_PROP_LINK,PCJ.PCJU_EVAL_PROP_NOMB,PCJ.PCJU_EEVA_CODI, P.PRO_CODI,P.PRO_TEXT, P.PRO_NOMB AS Propuesta,C.CON_CODI, C.CON_DESC AS Convocatoria FROM sgi_prop AS P  ' +  
                ' INNER JOIN sgi_prop_conv_juez AS PCJ ON PCJ.PCJU_PCAT_CODI = P.PRO_CODI INNER JOIN sgi_conv AS C ON PCJ.PCJU_CON_CODI = C.CON_CODI WHERE PCJ.PCJU_INV_CODI=' + investigador.INV_CODI});

	    	datos.then(function(result) {

	    		$('#tableevaluacionpropuesta').bootstrapTable('load',result.data);


	    	})


       $scope.onClicSalir = function() {

       		 $location.path('/menu');

       }

       $scope.onClicKFormatos = function() {

        $window.open("https://sig.unad.edu.co/documentacion/listados-maestros/listado-maestro-formatos");

       }

      
      $scope.onOpenDocumento = function(link){

        $window.open(link);

      }
    
 });