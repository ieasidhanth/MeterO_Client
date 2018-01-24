app.controller('NotificationController', ['$scope','$rootScope','ajaxService','$window', function($scope,$rootScope,ajaxService,$window){
var getBatchIds='http://10.10.10.75:60000/api/icontrol/getInProgressBatchIDs';
var getBtachEquipments='http://10.10.10.75:60000/api/icontrol/getBatchDetails';
var updateBatchURL='http://10.10.10.75:60000/api/icontrol/updateBatch';

$scope.Batchs=[{}];
$scope.BatchCount=0;
ajaxService.getReq(getBatchIds,{})
               .then(function(values){
                $scope.Batchs = values.data;
                console.log($scope.Batchs);
                var count =0;
                angular.forEach($scope.Batchs,function(item)
				 {
				 	count++;

				 });
                $scope.BatchCount=count;

    });

  

  $scope.viewDetails=function(row)
  {
  	//alert(row.JobID);
  	var data=row.JobID;
  	ajaxService.postReq(getBtachEquipments,JSON.stringify(data))
  	                                        .then(function(values)
  	                                        {
  	                                        	var stBldr='';
  	                                        	stBldr+="<div class='table-responsive'>";
												stBldr+="<table class='table table-reflow'>";
												stBldr+="<thead class='thead-inverse'>";
												stBldr+='<tr>';
												stBldr+='<th>#</th>';
												stBldr+='<th>SerialNo</th>';
												stBldr+='<th>EquipmentID</th>';
												stBldr+='<th>Equipment Description</th>';
												stBldr+='<th>Scheduled for Transfer to</th>';
												stBldr+='<th>Scheduled Date</th>';
												stBldr+='</tr>';
												stBldr+="</thead>";
												stBldr+="<tbody>";
												stBldr+='<tr>';
												var count=1;
												$.each(values.data,function(i,v){
												stBldr+='<tr>';
												stBldr+='<td>'+count+'</td>'+'<td>'+$(v)[0].SerialNo+'</td><td>'+$(v)[0].EquipmentID+'</td><td>'+$(v)[0].EquipmentName+'</td><td>'+$(v)[0].TransferLocName+'</td><td>'+$(v)[0].jobDate+'</td>';
												stBldr+='</tr>';
												count++;
												});
												stBldr+="</tbody>";
												stBldr+='</table>';
												stBldr+='</div>';

												var str=$(stBldr);

  	                                        	$.confirm({
  	                                        		      columnClass:'large',
  	                                        		      icon:'glyphicon glyphicon-info-sign',
						                                  title: 'Batch Details for JobID '+row.JobID,
						                                  content: str,
						                                  containerFluid:true,
						                                  type: 'dark',
						                                  typeAnimated: true,
						                                  buttons: {
						                                      Continue: {
						                                          text: 'Back',
						                                          btnClass: 'btn-primary',
						                                          action: function(){
						                                                //$window.location.reload();
						                                          }
						                                      }
						                                  }
                              					});
                              					//alert(values.data);


  	                                        });

  }

  /*$scope.updateBatchCancel=function(row)
  {
  	var batchID=row.JobID;
  	var message="Cancel";
  	jsonObject=[];
  	rowItem={};
  	rowItem["jobId"]=batchID;
  	rowItem["message"]=message;
    jsonObject.push(rowItem);
    var data1=jsonObject;
    $.confirm({
    title:'Success',
    content: function () {
        var self = this;
        return $.ajax({
            url: updateBatchURL,
            dataType: 'json',
            data: JSON.stringify(data1),
            method: 'post'
        }).done(function (response) {
            self.setContent('BatchID: ' + batchID+' sucessfully updated');
            self.setContentAppend("<i class='glyphicon glyphicon-thumbs-up'></i>");
            self.setTitle(response);
        }).fail(function(){
            self.setContent('Something went wrong.');
        });
    },
    contentLoaded: function(data, status, xhr){
    	ajaxService.getReq(getBatchIds,{})
               .then(function(values){
                $scope.Batchs = values.data;
                console.log($scope.Batchs);
                var count =0;
                angular.forEach($scope.Batchs,function(item)
				 {
				 	count++;

				 });
                $scope.BatchCount=count;

    });

    }
});
}*/

/*   $scope.updateBatchCompleted=function(row)
  {
  	//alert("m inside update");
  	var batchID=row.JobID;
  	var message="Completed";
  	jsonObject=[];
  	rowItem={};
  	rowItem["jobId"]=batchID;
  	rowItem["message"]=message;
    jsonObject.push(rowItem);
    var data1=jsonObject;
    $.confirm({
    title:'Success',
    content: function () {
        var self = this;
        return $.ajax({
            url: updateBatchURL,
            dataType: 'json',
            data: JSON.stringify(data1),
            method: 'post'
        }).done(function (response) {
            self.setContent('BatchID: ' + batchID+' sucessfully updated');
            self.setContentAppend("</br></br><i style='text-align:center' class='glyphicon glyphicon-thumbs-up fa-3x'></i>");
            self.setTitle(response);
        }).fail(function(){
            self.setContent('Something went wrong.');
        });
    }
});
    

  	
  }*/

  $scope.updateBatchCompletedV2 =function(row)
{

	var batchID=row.JobID;
  	var message="Completed";
  	jsonObject=[];
  	rowItem={};
  	rowItem["jobId"]=batchID;
  	rowItem["message"]=message;
    jsonObject.push(rowItem);
    var data1=jsonObject;
    

    $.confirm({
    icon:'fa fa-info-circle fa-2x',
    title: 'Unlock Job ID: '+batchID,
    columnClass: 'medium',
    type:'dark',
    animation:'RotateYR',
    closeAnimation:'RotateXR',
    autoClose: 'Cancel|8000',
    content: '<b>Caution: You are about to unlock the equipments in Job ID: '+batchID+'</br></br> Please make sure the batch is processed/cancelled in ViewPoint',
    buttons:{
        Yes:{
            text: 'Continue',
            btnClass: 'btn-primary',
            keys: ['enter', 'p'],
            action: function()
            {
                // button action.
                 $.confirm({
                 	        icon:'fa fa-info-circle fa-2x',
						    title:'Success',
						    type:'green',
						    content: function () {
						        var self = this;
						        return $.ajax({
						            url: updateBatchURL,
						            dataType: 'json',
						            data: JSON.stringify(data1),
						            method: 'post'
						        }).done(function (response) {

						        	
						            self.setContent("</br></br><i style='text-align:center' class='glyphicon glyphicon-thumbs-up fa-5x'></i>");
						            self.setContentAppend('</br><strong>JobID: ' + batchID+' sucessfully unlocked</strong>');
						            self.setTitle(response);
						        }).fail(function(){
						            self.setContent('Something went wrong.');
						        });
						    },
						    buttons:{
						    	Okay:{
						    		text:'Okay',
						    		action:function()
						    		{
										ajaxService.getReq(getBatchIds,{})
							               .then(function(values){
							                $scope.Batchs = values.data;
							                console.log($scope.Batchs);
							                var count =0;
							                angular.forEach($scope.Batchs,function(item)
											 {
											 	count++;

											 });
							                $scope.BatchCount=count;
							                
							                $rootScope.$broadcast('BatchUnlocked',{});

							    		});


						    		}

						    	}

						    	}
						    
					   });
					   

             

            }

        },
        Cancel:{
            action: function()
            {
                
            }

        }
    }
    });

    
        
   
}

$scope.resetScope1=function()
    {
    	
    	$rootScope.$broadcast('BatchUnlocked',{});
    	

    }






	
}]);