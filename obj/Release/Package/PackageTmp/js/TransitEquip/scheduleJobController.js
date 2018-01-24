app.controller('scheduleJobController', ['$scope','$rootScope','ajaxService','$window','$localStorage', function($scope,$rootScope,ajaxService,$window,$localStorage){
  jsonObject1=[];
  //var postScheduleUrl="http://10.10.10.75:60000/api/icontrol/ScheduleBatch";
  var postScheduleUrl="http://10.10.10.75:60000/api/icontrol/TransferBatch";

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
            		angular.forEach($rootScope.equipmentsSelected, function(item)
                                    {
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
                                          rowitem["CreatedBy"]=$localStorage.UserFullName;
                                          rowitem["CreatedByUserID"]=$localStorage.UserId;
                                    	//rowitem["DateIn"]=d.getMonth() + 1 + '/' + d.getDate() + '/' +  d.getFullYear();
                                    	//rowitem["TimeIn"]=d.getHours()+":"+d.getMinutes();
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

                                                }
                                                else
                                                {
                                                //self.setContent("</br></br><i style='text-align:center' class='glyphicon glyphicon-thumbs-down fa-3x'></i>");
                                                self.setContentAppend('<strong>Something went downhill, Contact Administrator</strong>');
                                                self.setTitle(response);

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
                                                    $window.location.reload();      


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

                   jsonObject1.splice(1,jsonObject1.length);
                   $scope.flushItems();
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