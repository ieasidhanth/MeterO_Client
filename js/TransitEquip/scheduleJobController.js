app.controller('scheduleJobController', ['$scope','$rootScope','ajaxService','$window','$localStorage', function($scope,$rootScope,ajaxService,$window,$localStorage){
  jsonObject1=[];
  //var postScheduleUrl="http://localhost:60000/api/icontrol/ScheduleBatch";
  var postScheduleUrl="http://localhost:60000/api/icontrol/TransferBatch";

	$scope.schedule=function()
	{
		if($rootScope.equipmentsSelected.length==0)
            {
                     alert('No Equipments Selected!!');

            }
            else
            {

            		var targetItem=$rootScope.TransferTo;
            		//console.log(targetItem.target);
            		console.log("selected items "+$rootScope.equipmentsSelected.length);

                        var jobdate=$("#jobdatetime").val();
                        //alert(jobdate);
                        jsonObject1=[];
            		angular.forEach($rootScope.equipmentsSelected, function(item)
                                    {
                                          console.log("Item is :"+item+" and attachment ="+item.Attachment);
                                    	console.log("item slected "+item.EquipmentID);
                                    	rowitem ={};
                                    	//var d= new Date("2011-04-20 09:30:51.01");
                                    	//rowitem["Mth"]= d.getMonth() + 1 + '/' + d.getDate() + '/' +  d.getFullYear();
                                    	rowitem["Equipment"]=item.EquipmentID;
                                    	if(targetItem.target=="job")
                                    	{
                                    		rowitem["ToJob"]=targetItem.Job;
                                    		rowitem["ToLocation"]="";

                                    	}
                                    	else if(targetItem.target=="location")
                                    	{
                                    		//alert($rootScope.equipmentsSelected);
                                    		rowitem["ToLocation"]=targetItem.EMLoc;
                                    		rowitem["ToJob"]="";

                                    	}
                                          rowitem["TransferLocDescription"]=targetItem.Description;
                                    	rowitem["SerialNo"]=item.SerialNo;
                                    	rowitem["EquipmentDescription"]=item.Description;
                                          rowitem["jobDate"]=jobdate;
                                          rowitem["CreatedBy"]=sessionStorage.getItem("UserFullName");
                                          rowitem["CreatedByUserID"]=sessionStorage.getItem("UserId");
                                          
                                          if(item.Attachment)
                                          {                                          
                                                
                                                rowitem["HasAttachment"]=item.Attachment;
                                                rowitem["AttachedEquip"]=item["AttachToEquip"];
                                                rowitem["AttachedEquipDesc"]=item.AttachmentDesc;
                                                rowitem["AttachmentList"]=item.AttachmentList;








                                          }
                                          else
                                          {
                                                rowitem["HasAttachment"]="false";
                                                rowitem["AttachedEquip"]="";
                                                rowitem["AttachedEquipDesc"]="";
                                                rowitem["AttachmentList"]=item.AttachmentList;

                                          }
                                          // attachment code ends here
                                          //alert(rowitem["HasAttachment"]);
                                          jsonObject1.push(rowitem);





                                    });

                   console.log("----------------------");
                   console.log(jsonObject1);
                   //console.log($scope.TransferTo);
                   var data1 = jsonObject1;
                   //alert(JSON.stringify(data1));
                   var postdata=JSON.stringify(data1);
                   console.log(jsonObject1);


                     //test code
                      $.confirm({
                          icon:'fa fa-info-circle fa-2x',
                                        title:'Transfer Status',
                                        columnClass: 'large',
                                        type:'dark',
                                        theme:'Material',
                                        content: function () {
                                            var self = this;
                                            return $.ajax({
                                                url: postScheduleUrl,
                                                dataType: 'json',
                                                data: postdata,
                                                method: 'post'
                                            }).done(function (response) {

                                                if(response=="Success")
                                                {
                                                //self.setContent("</br></br><i style='text-align:center' class='glyphicon glyphicon-thumbs-up fa-3x'></i>");
                                                self.setContentAppend('</br><strong>Equipments sucessfully transferred</strong>');
                                                self.setTitle(response);
                                                self.buttons.Okay.show();
                                                self.buttons.Cancel.hide();

                                                }
                                                else if(response=="failed")
                                                {
                                                //self.setContent("</br></br><i style='text-align:center' class='glyphicon glyphicon-thumbs-down fa-3x'></i>");
                                                self.setContentAppend('<strong>Something went downhill, Contact Administrator</strong>');
                                                self.setTitle(response);
                                                self.buttons.Okay.show();
                                                self.buttons.Cancel.hide();

                                                }
                                                else
                                                {
                                                      
                                                      self.setContentAppend('</br><strong>Error batch could not be transferred!</strong></br>');
                                                      self.setContentAppend('</br><strong>Note: The following tools have previous transfer date greater than selected transfer date</strong></br>');
                                                      var stBldr='';
                                                      stBldr+="<div class='table-responsive'>";
                                                      stBldr+="<table class='table table-reflow'>";
                                                      stBldr+="<thead class='thead-inverse'>";
                                                      stBldr+='<tr>';
                                                      stBldr+='<th>Tool ID</th>';
                                                      stBldr+='<th>Tool Description</th>';
                                                      stBldr+='<th>Last Transfer Date</th>';
                                                      stBldr+='</tr>';
                                                      stBldr+="</thead>";
                                                      stBldr+="<tbody>";
                                                      
                                                      var faultyList=response.split('$');
                                                      for(var x=0;x<faultyList.length;x++)
                                                      {
                                                            stBldr+='<tr>';
                                                            stBldr+='<td>'+faultyList[x].split('#')[0]+'</td><td>'+faultyList[x].split('#')[1]+'</td><td>'+faultyList[x].split('#')[2]+'</td>';
                                                            stBldr+='</tr>';
                                                            
                                                            

                                                      }
                                                      stBldr+="</tbody>";
                                                      stBldr+='</table>';
                                                      stBldr+='</div>';

                                                      self.setContentAppend(stBldr);

                                                      self.setContentAppend('</br><strong>Try changing transfer date for the entire batch or removing the above equipment/s from the batch.</strong></br>');
                                                      self.buttons.Cancel.setText("Okay");
                                                      self.buttons.Cancel.show();
                                                      self.buttons.Okay.hide();
                                                      $scope.$digest();

                                                      
                                                }
                                                
                                            }).fail(function(){
                                                self.setContent('Something went wrong.');
                                            });
                                        },
                                        buttons:{
                                          Okay:{
                                                text:'Okay',
                                                action:function()
                                                {
                                                    jsonObject1.splice(1,jsonObject1.length);
                                                    $scope.flushItems();
                                                    $window.location.reload();      


                                                }

                                          },
                                          Cancel:{
                                                text:'Cancel',
                                                action:function()
                                                {


                                                }
                                          }

                                          }
                                        
                                 });

                      //remove top from here






































































                   
/*                   ajaxService.postReq(postScheduleUrl,JSON.stringify(data1)).then(function(values){


                        //alert(values.data);
                        if(values.data=="Success")
                        {
                              $.confirm({
                                  title: 'Success!',
                                  content: 'Perfect!! Your batch is scheduled in ViewPoint. Kindly post the batch after 20 mins',
                                  type: 'green',
                                  typeAnimated: true,
                                  buttons: {
                                      Continue: {
                                          text: 'Continue',
                                          btnClass: 'btn-green',
                                          action: function(){
                                                $window.location.reload();
                                          }
                                      }
                                  }
                              });



                        }
                        else if(values.data=="faliure")
                        {
                              $.confirm({
                                  title: 'Encountered an error!',
                                  content: 'Something went downhill, this may be serious',
                                  type: 'red',
                                  typeAnimated: true,
                                  buttons: {
                                      tryAgain: {
                                          text: 'Try again',
                                          btnClass: 'btn-red',
                                          action: function(){
                                                $window.location.reload();
                                          }
                                      },
                                      close: function () {
                                          $window.location.reload();
                                      }
                                  }
                              });

                        }


                   });*/

                   //jsonObject1.splice(1,jsonObject1.length);
                   //$scope.flushItems();
            }



	}


	$scope.flushItems=function()
	{
		$rootScope.equipmentsSelected.splice(1,$rootScope.equipmentsSelected.length+1);
		$rootScope.equipmentsSelected.splice(0,1);
		console.log($rootScope.equipmentsSelected);
		console.log("length of array of selected items "+$rootScope.equipmentsSelected.length);
		$rootScope.$broadcast('flushItems',{});
		//$window.location.reload()
		
	}

      $scope.reload=function()
      {
            $window.location.reload();

      }

	
	
}]);