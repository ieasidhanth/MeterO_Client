app.controller('getDataCtrl', ['$scope','ajaxService','$rootScope','$localStorage','$filter', function ($scope, ajaxService,$rootScope,$localStorage,$filter) {
    //$('#toggle-event').prop('checked')=false;
    //$('#toggle-event').attr('checked', false); 
    var unfiltered_list;
    var equipments = [];
    var descriptions = [];
    var manufacturers = [];
    var selectedJob="";
    $scope.ShowingCurrentCount='All';
    //var data = { 'jobId': '1000' };
    var data = {  };
    var getEquipmentssurl = 'http://10.10.10.75:60000/api/icontrol/gettorquetools';
    //ajax service call for page load
    $rootScope.showTableLoad=false;
    $rootScope.showTableLoadspinner=true;
    $scope.toggleOffByInput=function()
    {
    	alert('clicked');
    }
    $(function() {
    $('#toggle-event').change(function() {
     // alert('Toggle: ' + $(this).prop('checked'));
      var show_switch=$(this).prop('checked');
      if(show_switch==true)
      {
      	//alert("M on");
      $scope.rowCollection = $filter('filter')($scope.rowCollection, { Saved_MeterO: "false" });
      $scope.ShowingCurrentCount=$scope.rowCollection.length;
      	$scope.$digest();
      
      }
      else
      {
      	 $scope.rowCollection = unfiltered_list;
      	 $scope.ShowingCurrentCount='All';
      	$scope.$digest();

      }
    })
  })
/*
    ajaxService.getReq(getEquipmentssurl,data)
               .then(function(values){
                console.log(values.data);
                $rootScope.showTableLoadspinner=false;
                $scope.rowCollection = values.data;
                $rootScope.showTableLoad=true;
               // $scope.status = values.data[0];
                console.log(values[0]);
        });
*/
var filterFloat = function(value) {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
      .test(value))
      return Number(value);
  return NaN;
}
$scope.SaveAll=function(item)
{
	console.clear();
   	var all_rows_validated=false;
    var collection=$scope.rowCollection;
    var collection_faulty=[];
    var collection_passed=[];
   	//alert("save all clicked");
   	
   	//alert(collection.length);
   	for(var i=0;i<collection.length;i++)
   	{
   		//alert('Element '+collection[1].Equipment+" New HR"+collection[1].NewHr+"New Odo"+collection[1].NewOdo);
   		if(collection[i].NewHr=="" && collection[i].NewOdo=="")
   		{
   			//alert('Removing '+collection[i].Equipment);
   			collection_faulty.push(collection[i]);
   			//collection.splice(i,1);
   			
   		}
   		 else if(collection[i].NewHr!="" && collection[i].NewOdo=="")
		{
							   		collection[i].NewOdo=collection[i].OdoReading;
							   		if(validatedecimal(collection[i].NewHr))
							   		{
							   			if(validateHrReading_saveAll(collection[i]))
							   			{
							   				collection_passed.push(collection[i]);
							   				

							   			}
							   			else
							   			{
							   				collection_faulty.push(collection[i]);
   											//collection.splice(i,1);
							   			}

							   		}
							   		else
							   		{
							   			collection_faulty.push(collection[i]);
   										//collection.splice(i,1);
							   			
							   		}

		}
	else if(collection[i].NewOdo!="" && collection[i].NewHr=="" )
   	{
   		collection[i].NewHr=collection[i].HourReading;
   		if(validatedecimal(collection[i].NewOdo))
   		{
   			if(validateOdoReading_saveall(collection[i]))
	   		{
	   			collection_passed.push(collection[i]);

	   		}
	   		else
	   		{
	   			collection_faulty.push(collection[i]);
   				//collection.splice(i,1);
	   		}

   		}
   		else
   		{
   			collection_faulty.push(collection[i]);
   			//collection.splice(i,1);
   		}
   		

   	}
   	else
   	{
   		if(validatedecimal(collection[i].NewHr))
   		{
   			if(validatedecimal(collection[i].NewOdo))
   			{
   				if(validateOdoReading_saveall(collection[i]) && validateHrReading_saveAll(collection[i]))
	   			{
	   				collection_passed.push(collection[i]);
	   				

	   			}
	   			else
	   			{
	   				collection_faulty.push(collection[i]);
   			       // collection.splice(i,1);
	   			}

	   		}
   			else
   			{
   				collection_faulty.push(collection[i]);
   			    //collection.splice(i,1);

   			}
   			

   		}
   		else
   		{
   			collection_faulty.push(collection[i]);
   			//collection.splice(i,1);
   		}
   		

   	}




   	}
   	if(collection_passed.length>0)
   	{
   		var jsonObject=[];
   			angular.forEach(collection_passed, function(item)
    		{

                             
                             








                                item.Job=selectedJob;
							    item.CreatedBy=sessionStorage.getItem('UserId');
							    var date=new Date();
							    item.CreatedDate=date.toDateString();
							    jsonObject.push(item);
                              
                });
   	
   	var postScheduleUrl="http://10.10.10.75:60000/api/metero/addTransaction";
    var postdata=JSON.stringify(jsonObject);
    var proceed=false;
    if(collection_faulty.length>0)
    {
    	var stBldr='';
    	stBldr+="<strong>Out of "+$scope.rowCollection.length+" equipments; "+ collection_faulty.length +" have faulty readings.</br></br>";
  	                                        	/*stBldr+="<div class='table-responsive'>";
												stBldr+="<table class='table table-reflow'>";
												stBldr+="<thead class='thead-inverse'>";
												stBldr+='<tr>';
												stBldr+='<th>#</th>';
                                                stBldr+='<th>Equipment No</th>';
												stBldr+='<th>Description</th>';
												stBldr+='</tr>';
												stBldr+="</thead>";
												stBldr+="<tbody>";
												stBldr+='<tr>';
												var count=1;*/
												/*$.each(collection_faulty,function(i,v){
												//stBldr+='<tr>';
												//stBldr+='<td>'+count+'</td>'+'<td>'+$(v)[0].Equipment+'</td>'+'<td>'+$(v)[0].Description+'</td>';
												stBldr+=$(v)[0].Equipment+"   </br>";
												//stBldr+='</tr>';
												//count++;
												});*/
												stBldr+='<strong><p>Only '+collection_passed.length+' out of '+$scope.rowCollection.length+' equipments will be saved</p></br></br></strong>';
												/*$.each(collection_passed,function(i,v){
												//stBldr+='<tr>';
												//stBldr+='<td>'+count+'</td>'+'<td>'+$(v)[0].Equipment+'</td>'+'<td>'+$(v)[0].Description+'</td>';
												stBldr+=$(v)[0].Equipment+"   </br>";
												//stBldr+='</tr>';
												//count++;
												});*/
												/*stBldr+="</tbody>";
												stBldr+='</table>';
												stBldr+='</div>';
												stBldr+='</br>';*/
												stBldr+='<strong><p>Press Ok to proceed or cancel to review faulty equipments</p></strong>';

												var str=$(stBldr);

  	                                        	$.confirm({
  	                                        		      
  	                                        		      icon:'glyphicon glyphicon-info-sign',
						                                  title: 'Faulty readings!',
						                                  content: str,
						                                  containerFluid:true,
						                                  type: 'dark',
						                                  typeAnimated: true,
						                                  buttons: {
						                                      Ok: {
						                                          text: 'Ok',
						                                          btnClass: 'btn-primary',
						                                          action: function(){

						                                                $.ajax({
                                                url: postScheduleUrl,
                                                dataType: 'json',
                                                data: postdata,
                                                method: 'post'
                                            }).done(function (response) {

                                                if(response=="Success")
                                                {
                                                	$.confirm({
											                    icon:' fa fa-exclamation fa-2x',
											                    title: 'Save Reading Status',
											                    content: '<strong>Reading Saved Successfully</strong>',
											                    type: 'dark',
											                    typeAnimated: true,
											                    buttons: {
											                        ok: {
											                            text: 'Ok',
											                            btnClass: 'btn-primary',
											                            action: function(){
											                            	row.Saved_MeterO='true';
											                            	$scope.$digest();

											                            }
											                        }
											                    }
											                });
                                                  
                                                

                                                }
                                                
                                                else
                                                {
                                                	$.confirm({
											                    icon:' fa fa-exclamation fa-2x',
											                    title: 'Save Reading Status',
											                    content: '<strong>Save Failed!</strong>',
											                    type: 'dark',
											                    typeAnimated: true,
											                    buttons: {
											                        ok: {
											                            text: 'Ok',
											                            btnClass: 'btn-primary',
											                            action: function(){

											                            }
											                        }
											                    }
											                });
                                                      
                                                      

                                                      
                                                }
                                                
                                            }).fail(function(){
                                                
                                            });
						                                          }
						                                      },
						                                      Cancel:{
						                                      	text:'Cancel',
						                                      	btnClass: 'btn-primary',
						                                          action: function(){
						                                                proceed=false;
						                                                
						                                          }

						                                      }
						                                  }
                              					});

    }
    alert(proceed);
    if(proceed==true)
    {
    	alert('posting data');
    	

    }
    

   	}
   	else
   	{
   		alert("No Equipments have valid readings");
   	}
   
}
var newHrCount=0;
var newOdoCount=0;
var editedNewHr=[];
var editedNewOdo=[];
$scope.$watch(
                    "rowCollection",
                    function(newValue,oldValue,scope){
                    	
                    	var flag_run_watch=true;
                    	for(var i=0;i<oldValue.length;i++)
                    	{
                    		if(oldValue[i].Equipment===undefined)
                    		{
                    			flag_run_watch=false;
                    			break;

                    		}
                    	}
                    	if(flag_run_watch)
                    	{
                    		console.log("Watch Ran");
                    	console.log(newValue);
                    	console.log(oldValue);

                    	}
                    	
                    	
                    	


					      
					      
                    	
                    	
                    },
                    true // Object equality (not just reference).
                );


         $scope.checkNewHr=function(row)
         {
         	if(row.NewHr!="")
         	{
         	if(editedNewHr.length>0)
         	{
         		for(var i=0;i<editedNewHr.length;i++)
         		{
         			if(editedNewHr[i].Equipment==row["Equipment"])
         			{
         				if(editedNewHr[i].NewHr!=row["NewHr"])
         				{
         					editedNewHr.splice(editedNewHr,i);
         					editedNewHr.push(row);

         				}
         			}
         		}

         	}
         	else
         	{
         		editedNewHr.push(row);
         	}
         	console.log("Changed HR value "+editedNewHr.length);
          }
         }





function validatedecimal(inputval)
   {
   	
   		var num=parseFloat(inputval);
   		//alert(num);
	    var cleanNum = num.toFixed(2);
	    //alert(cleanNum);
	    //alert(num/cleanNum);
	    
	    	if(num/cleanNum < 1){
	        return false;
	        }
	        else
	        {
	        	return true;
	        }

	    
	    
	    

   	
    //alert(inputval);
    


   }
   function validate_row(row)
   {
   	if((row.NewHr=="" || isNaN(row.NewHr) || row.NewHr==null) && (row.NewOdo=="" || isNaN(row.NewOdo) || row.NewOdo==null))
   	{
   		$.alert({
		    title: 'Alert!',
		    content: 'Please enter a reading!',
		});
   		return false;
   	}
   	else if(row.NewHr!="" && (row.NewOdo==="" || isNaN(row.NewOdo) || row.NewOdo==null ))
   	{
   		row.NewOdo=row.OdoReading;
   		row.NewHr=parseFloat(row.NewHr).toFixed(2);
   		if(validatedecimal(row.NewHr))
   		{
   			if(validateHrReading(row))
   			{
   				return true;

   			}
   			else
   			{
   				return false;
   			}

   		}
   		else
   		{
   			$.alert({
		    title: 'Alert!',
		    content: 'Please enter 2 decimals only!',
			});
   			return false;
   		}

   	}
   	else if(row.NewOdo!="" && (row.NewHr==="" || isNaN(row.NewHr) || row.NewHr==null ))
   	{
   		row.NewHr=row.HourReading;
   		row.NewOdo=parseFloat(row.NewOdo).toFixed(2);
   		if(validatedecimal(row.NewOdo))
   		{
   			if(validateOdoReading(row))
	   		{
	   			return true;

	   		}
	   		else
	   		{
	   			return false;
	   		}

   		}
   		else
   		{
   			$.alert({
		    title: 'Alert!',
		    content: 'Please enter 2 decimals only!',
			});
   			return false;
   		}
   		

   	}
   	else
   	{
   		row.NewOdo=parseFloat(row.NewOdo).toFixed(2);
   		row.NewHr=parseFloat(row.NewHr).toFixed(2);
   		if(validatedecimal(row.NewHr))
   		{
   			if(validatedecimal(row.NewOdo))
   			{
          if((row.NewOdo> row.OdoReading) && (row.NewHr>row.HourReading))
          {
            return true;

          }
          else if((row.NewOdo== row.OdoReading) && (row.NewHr==row.HourReading))
          {
            $.alert({
            title: 'Alert!',
            content: 'Readings are similar to previously recorded readings, Kindly enter atleast a reading different from previously recorded readings',
            });
            return false;

          }
          else if((row.NewOdo== row.OdoReading) && (row.NewHr>row.HourReading))
          {
            return true;
          }
          else if((row.NewOdo> row.OdoReading) && (row.NewHr==row.HourReading))
          {
            return true;

          }
          else if((row.NewOdo< row.OdoReading) && (row.NewHr==row.HourReading))
          {
            $.confirm({
                    title: 'Alert',
                    columnClass: 'medium',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<p><strong><em>Enter a reading greater  than the previous Odometer reading</em></strong></p></br>'+
                    '<div>'+
                            '<div>'+
                                '<label> Previous  recorded Odometer in viewpoint are</label>&nbsp;&nbsp;'+
                                '<label style="color:red;">'+row.OdoReading+'</label>'+
                            '</div>'+
                                                      
                     '</div>'+

                     '</br>'+
                     '<div><p><strong>* press ok to enter readings again</strong></p></div>'
                   ,
                    buttons: {
                        
                    Ok: function () {
                        // bind to events
                       
                    }
                }
                });
            return false;
          }
          else if((row.NewOdo== row.OdoReading) && (row.NewHr<row.HourReading))
          {
            $.confirm({
                    title: 'Alert',
                    columnClass: 'medium',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<p><strong><em>Enter a reading greater  than the previous Hour reading</em></strong></p></br>'+
                    '<div>'+
                            '<div>'+
                                '<label> Previous  recorded Hours in viewpoint are</label>&nbsp;&nbsp;'+
                                '<label style="color:red;">'+row.HourReading+'</label>'+
                            '</div>'+
                                                      
                     '</div>'+

                     '</br>'+
                     '<div><p><strong>* press ok to enter readings again</strong></p></div>'
                   
                   ,
                    buttons: {
                        
                    Ok: function () {
                        // bind to events
                       
                    }
                }
                });
            return false;

          }
          else if((row.NewOdo< row.OdoReading) && (row.NewHr<row.HourReading))
          {
            $.confirm({
                    title: 'Alert',
                    columnClass: 'medium',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<p><strong><em>Enter a reading greater  than the previous Hour reading</em></strong></p></br>'+
                    '<div>'+
                            '<div>'+
                                '<label> Previous  recorded Hours in viewpoint are</label>&nbsp;&nbsp;'+
                                '<label style="color:red;">'+row.HourReading+'</label>'+
                            '</div>'+
                                                      
                     '</div>'+

                     '</br>'+
                     '<div class="form-group">' +
                    '<p><strong><em>Enter a reading greater  than the previous Odometer reading</em></strong></p></br>'+
                    '<div>'+
                            '<div>'+
                                '<label> Previous  recorded Hours in viewpoint are</label>&nbsp;&nbsp;'+
                                '<label style="color:red;">'+row.OdoReading+'</label>'+
                            '</div>'+
                                                      
                     '</div>'+
                     '<div><p><strong>* press ok to enter readings again</strong></p></div>'
                   
                   ,
                    buttons: {
                        
                    Ok: function () {
                        // bind to events
                       
                    }
                }
                });

            return false;

          }
          else if((row.NewOdo> row.OdoReading) && (row.NewHr<row.HourReading))
          {
            $.confirm({
                    title: 'Alert',
                    columnClass: 'medium',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<p><strong><em>Enter a reading greater  than the previous Hour reading</em></strong></p></br>'+
                    '<div>'+
                            '<div>'+
                                '<label> Previous  recorded Hours in viewpoint are</label>&nbsp;&nbsp;'+
                                '<label style="color:red;">'+row.HourReading+'</label>'+
                            '</div>'+
                                                      
                     '</div>'+

                     '</br>'+
                     '<div><p><strong>* press ok to enter readings again</strong></p></div>'
                   
                   ,
                    buttons: {
                        
                    Ok: function () {
                        // bind to events
                       
                    }
                }
                });
            return false;

          }
          else if((row.NewOdo< row.OdoReading) && (row.NewHr>row.HourReading))
          {
            $.confirm({
                    title: 'Alert',
                    columnClass: 'medium',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<p><strong><em>Enter a reading greater  than the previous Odometer reading</em></strong></p></br>'+
                    '<div>'+
                            '<div>'+
                                '<label> Previous  recorded Odometer in viewpoint are</label>&nbsp;&nbsp;'+
                                '<label style="color:red;">'+row.OdoReading+'</label>'+
                            '</div>'+
                                                      
                     '</div>'+

                     '</br>'+
                     '<div><p><strong>* press ok to enter readings again</strong></p></div>'
                   ,
                    buttons: {
                        
                    Ok: function () {
                        // bind to events
                       
                    }
                }
                });
            return false;
          }
          else
          {
            return false;
          }
          
   				/*if(validateOdoReading(row) )
	   			{
	   				return true;

	   			}
	   			else if(validateHrReading(row))
	   			{
	   				return true;
	   			}
          else
          {
            return false;
          }*/

	   		}
   			else
   			{
   				$.alert({
			    title: 'Alert!',
			    content: 'Please enter 2 decimals only for the Odometer!',
				});
   			    return false;

   			}
   			

   		}
   		else
   		{
   			$.alert({
			    title: 'Alert!',
			    content: 'Please enter 2 decimals only for the Hour Meter!',
				});
   			return false;
   		}
   		

   	}
   }
 $scope.save=function(row)
 {
   	var row_element=$(this);
   	if(validate_row(row))
   	{
    row.Job=selectedJob;
    row.CreatedBy=sessionStorage.getItem('UserId');
    var date=new Date();
    row.CreatedDate=date.toDateString();
    console.clear();
    console.log(row);
    var jsonObject=[];
    jsonObject.push(row);
    var postScheduleUrl="http://10.10.10.75:60000/api/metero/addTransaction";
    var postdata=JSON.stringify(jsonObject);
    $.ajax({
                                                url: postScheduleUrl,
                                                dataType: 'json',
                                                data: postdata,
                                                method: 'post'
                                            }).done(function (response) {

                                                if(response=="Success")
                                                {
                                                	$.confirm({
											                    icon:' fa fa-exclamation fa-2x',
											                    title: 'Save Reading Status',
											                    content: '<strong>Reading Saved Successfully</strong>',
											                    type: 'dark',
											                    typeAnimated: true,
											                    buttons: {
											                        ok: {
											                            text: 'Ok',
											                            btnClass: 'btn-primary',
											                            action: function(){
											                            	//background-color:#DFF0D8;
                                                                            //font-weight:bold;
                                                                            row.Saved_MeterO="true";
                                                                            $scope.$digest();
                                                                            $scope.$digest();
                                                                            //$scope.$digest();

											                            	


											                            }
											                        }
											                    }
											                });
                                                  
                                                

                                                }
                                                
                                                else
                                                {
                                                	$.confirm({
											                    icon:' fa fa-exclamation fa-2x',
											                    title: 'Save Reading Status',
											                    content: '<strong>Save Failed!</strong>',
											                    type: 'dark',
											                    typeAnimated: true,
											                    buttons: {
											                        ok: {
											                            text: 'Ok',
											                            btnClass: 'btn-primary',
											                            action: function(){

											                            }
											                        }
											                    }
											                });
                                                      
                                                      

                                                      
                                                }
                                                
                                            }).fail(function(){
                                                
                                            });
   	}
 
                                        


   }

     function validateHrReading(row)
     {
     	//alert(row.HourReading);
     	//alert(parseFloat(row.NewHr)+'---'+parseFloat(0).toFixed(2));
     	if(parseFloat(row.NewHr).toFixed(2)>=parseFloat(0).toFixed(2))
       {
     	
     		
     			
     				if(row.NewHr>row.HourReading)
     				{
     					return true;

     				}
     				else
     				{
     					
     					//alert("Enter a reading greater or equal than the previous hour reading");
     					$.confirm({
								    title: 'Alert',
								    columnClass: 'medium',
								    content: '' +
								    '<form action="" class="formName">' +
								    '<div class="form-group">' +
								    '<p><strong><em>Enter a reading greater  than the previous Hour reading</em></strong></p></br>'+
								    '<div>'+
								            '<div>'+
								                '<label> Previous  recorded Hours in viewpoint are</label>&nbsp;&nbsp;'+
								                '<label style="color:red;">'+row.HourReading+'</label>'+
								            '</div>'+
								           								            
								     '</div>'+

								     '</br>'+
								     '<div><p><strong>* press ok to enter readings again</strong></p></div>'
								   
								   ,
								    buttons: {
								        
								    Ok: function () {
								        // bind to events
								       
								    }
								}
								});
     					/*$.alert({
					    title: 'Alert!',
					    content: 'Enter a reading greater or equal than the previous Hour reading',
						});*/
     					return false;
     				}

     			
     			

     		
     		

     	}
     	else
     	{
     		//alert("Kindly enter a non Zero Hr reading");
     			
     		$.alert({
					    title: 'Alert!',
					    content: 'Kindly enter a non Zero Hr reading',
						});
     		return false;

     	}

     }
     function validateOdoReading(row)
     {
     	if(row.NewOdo>=parseFloat(0.00))
       {
     	
     		
     			
     				if(row.NewOdo>row.OdoReading)
     				{
     					return true;
     					

     				}
     				else
     				{
     					//alert("Enter a reading greater than the previous Odometer reading");
     					$.confirm({
								    title: 'Alert',
								    columnClass: 'medium',
								    content: '' +
								    '<form action="" class="formName">' +
								    '<div class="form-group">' +
								    '<p><strong><em>Enter a reading greater  than the previous Odometer reading</em></strong></p></br>'+
								    '<div>'+
								            '<div>'+
								                '<label> Previous  recorded Odometer in viewpoint are</label>&nbsp;&nbsp;'+
								                '<label style="color:red;">'+row.OdoReading+'</label>'+
								            '</div>'+
								           								            
								     '</div>'+

								     '</br>'+
								     '<div><p><strong>* press ok to enter readings again</strong></p></div>'
								   ,
								    buttons: {
								        
								    Ok: function () {
								        // bind to events
								       
								    }
								}
								});
     					/*$.alert({
					    title: 'Alert!',
					    content: 'Enter a reading greater than the previous Odometer reading',
						});*/
     					return false;
     				}

     			
     			

     		
     		

     	}
     	else
     	{
     		//alert("Kindly enter a non Zero Hr reading");
     		$.alert({
					    title: 'Alert!',
					    content: 'Kindly enter a non Zero Odo reading',
						});
     		return false;

     	}

     }
     function validateHrReading_saveAll(row)
     {
     	if(row.NewHr>0)
       {
     	
     		
     			
     				if(row.NewHr>=row.HourReading)
     				{
     					return true;

     				}
     				else
     				{
     					
     					//alert("Enter a reading greater or equal than the previous hour reading");
     					
     					return false;
     				}

     			
     			

     		
     		

     	}
     	else
     	{
     		//alert("Kindly enter a non Zero Hr reading");
     		
     		return false;

     	}

     }


     function validateOdoReading_saveall(row)
     {
     	if(row.NewOdo>0)
       {
     	
     		
     			
     				if(row.NewOdo>=row.OdoReading)
     				{
     					return true;
     					

     				}
     				else
     				{
     					//alert("Enter a reading greater than the previous Odometer reading");
     					
     					return false;
     				}

     			
     			

     		
     		

     	}
     	else
     	{
     		//alert("Kindly enter a non Zero Hr reading");
     		
     		return false;

     	}

     }
     $rootScope.$on('NotesCleared', function (event, args) {
     	angular.forEach($scope.rowCollection, function(item)
                {

                              
                              item["HasNotes"]="false";
                              
                });
     	$scope.$digest();
     });

$scope.getClass = function (row) {
	
    return {
    
      Enter: row.Saved_MeterO==='true'
    };
  };
   

   

 

    
    //for handling dropdownchanged event
    $rootScope.$on('toJobdropboxchanged', function (event, args) {
        var jobId =args.jobId;
       // $("#toggle-event").prop("checked", false).change();
        //alert('from smarttable'+jobId);
        selectedJob=args.jobId;
        getEquipmentssurl='http://10.10.10.75:60000/api/metero/getequipments';
        var reviewEquipmentssurl='http://10.10.10.75:60000/api/metero/reviewSubmit';
        var data = { 'jobId': jobId };
        var equipmentcount=0;
        var reviewequipmentcount=0;
        ajaxService.postReq(getEquipmentssurl,data)
               .then(function(values){
                //console.log(values.data);
                
                 angular.forEach(values.data, function(item)
                {

                              
                              equipmentcount++;
                              
                });
                 //console.log($scope.rowCollection);
                 unfiltered_list=values.data;
                 $scope.rowCollection = values.data;
                 $rootScope.showTableLoad=true;
                 $rootScope.showTableLoadspinner=false;
                 $scope.ecount=equipmentcount;
                 $rootScope.TotalJobEquipments=equipmentcount;
                 //alert(equipmentcount);
                //$scope.$digest();
                //$scope.$digest();
             
               // $scope.status = values.data[0];
                //console.log(values[0]);
        });
         ajaxService.postReq(reviewEquipmentssurl,data)
               .then(function(values){
                //console.log(values.data);
                 $scope.rowCollection1 = values.data;
                 angular.forEach($scope.rowCollection1, function(item)
                {

                              
                              reviewequipmentcount++;
                              
                });
                 //console.log($scope.rowCollection);
                 
                 //$rootScope.showTableLoad=true;
                 //$rootScope.showTableLoadspinner=false;
                 $rootScope.reviewecount=reviewequipmentcount;
                 //alert($rootScope.reviewecount);
                $scope.$digest();
                $scope.$digest();
                $('#toggle-event').prop('checked', false).change();
               // $scope.status = values.data[0];
                //console.log(values[0]);
        });
    });

    $scope.refresh=function()
    {
    	
    	
    	var getEquipmentssurl1='http://10.10.10.75:60000/api/metero/getequipments';
        var reviewEquipmentssurl1='http://10.10.10.75:60000/api/metero/reviewSubmit';
        var data = { 'jobId': selectedJob };
        var equipmentcount=0;
        var reviewequipmentcount=0;
       
        ajaxService.postReq(getEquipmentssurl1,data)
               .then(function(values){
                //console.log(values.data);
                
                 angular.forEach(values.data, function(item)
                {

                              
                              equipmentcount++;
                              
                });
                 //console.log($scope.rowCollection);
                 unfiltered_list=values.data;
                 $scope.rowCollection = values.data;
                 $rootScope.showTableLoad=true;
                 $rootScope.showTableLoadspinner=false;
                 $scope.ecount=equipmentcount;
                 $rootScope.TotalJobEquipments=equipmentcount;
                 //alert(equipmentcount);
                //$scope.$digest();
                //$scope.$digest();
             
               // $scope.status = values.data[0];
                //console.log(values[0]);
        });
         ajaxService.postReq(reviewEquipmentssurl1,data)
               .then(function(values){
                //console.log(values.data);
                 $scope.rowCollection1 = values.data;
                 angular.forEach($scope.rowCollection1, function(item)
                {

                              
                              reviewequipmentcount++;
                              
                });
                 //console.log($scope.rowCollection);
                 
                 //$rootScope.showTableLoad=true;
                 //$rootScope.showTableLoadspinner=false;
                 $rootScope.reviewecount=reviewequipmentcount;
                 //alert($rootScope.reviewecount);
                $scope.$digest();
                $scope.$digest();
                $scope.$digest();
                $scope.$digest();
               // $scope.status = values.data[0];
                //console.log(values[0]);
                $('#toggle-event').prop('checked', false).change();
        });

    }

    





//for handling flush event
      $rootScope.$on('flushItems', function (event, args) {
        //alert("flush fired");
        angular.forEach($scope.rowCollection, function(item){
            item.isSelected=false;

        });
    });

      $rootScope.$on('resetscope', function (event, args) {
        $scope.$digest();

      });

      //for handling modal close event
      $rootScope.$on('removerow', function (event, args) {
        
        angular.forEach($scope.rowCollection, function(item){
            item.isSelected=false;

        });

       angular.forEach($rootScope.equipmentsSelected,function(item){
        var row=_.findWhere($scope.rowCollection, {SerialNo: item["SerialNo"]});
        row.isSelected=true;
        $scope.$digest();
        
        //deselct all
        if($rootScope.equipmentsSelected.length==0)
        {
            angular.forEach($scope.rowCollection, function(item){
            item.isSelected=false;

        });

        $scope.$digest();

        }

       });

       // console.log("Equipments selected :"+$rootScope.equipmentsSelected);
       
    });

    function syncEquipmentsSelected(item)
    {
        angular.forEach($scope.rowCollection,function(row){
            if(item["SerialNo"]==row["SerialNo"])
            {
                row.isSelected=true;
            }
            else
            {
                row.isSelected=false;
            }

        });

        

    }




                



            var tableLoadFlag =-1;
            $rootScope.equipmentsSelected=[{}];
            $rootScope.equipmentsSelected.splice(0,1);
            var isalreadyadded=-1;
/*            $scope.$watch('displayedCollection', function(row1){
              
              // get selected row
              row1.filter(function(r) {
                //check if in array or not
                isalreadyadded=search(row1,$rootScope.equipmentsSelected)
                if(isalreadyadded>0)
                    console.log("row found at position "+isalreadyadded+1);
                else
                    console.log("row not found");
                 if (r.isSelected & isalreadyadded<0) {

                    var i=-1;
                    console.log("function call for search    :   row "+r.Equipment+" Collection "+$rootScope.equipmentsSelected)
                    i=search(r,$rootScope.equipmentsSelected);
                    console.log(i);
                    //alert(index);
                    if(i<0)
                    {
                        tableLoadFlag =1;
                        $rootScope.equipmentsSelected.push(r);
                        console.log("element added "+r.Equipment);
                        console.log("collection length "+ $rootScope.equipmentsSelected.length)

                    }
                   //console.log(r);
                   

                 }
                 else if (i>0 & tableLoadFlag>0)
                 {
                    
                    var index =-1;
                    if($rootScope.equipmentsSelected)
                    $rootScope.equipmentsSelected.pop();
                    index=search(row1,$rootScope.equipmentsSelected);
                    if(index>0)
                    {
                        $rootScope.equipmentsSelected.splice(index,1);
                    }


                 }
                 else
                 {
                    //alert("doing nothing");
                 }
              })
            }, true);*/
             $rootScope.deleteRowIndex=-1;
            search=function (row){
                //console.log("row"+row);
                //console.log("array length "+myArray.length);
               // console.log("searching row with equipmentId "+row.Equipment);
                //console.log("in collection with length "+$rootScope.equipmentsSelected.length);
                if($rootScope.equipmentsSelected.length==0)
                    return -1;
                else
                {       /*console.log($rootScope.equipmentsSelected.length);
                        var j=0; 
                        for (j=0; j < $rootScope.equipmentsSelected.length; j++;) 
                        {
                            var elemnet=$rootScope.equipmentsSelected[j];
                            console.log("comparing element id "+elemnet.Equipment +" with element id "+row.Equipment);
                                if ($rootScope.equipmentsSelected[j]["Equipment"] === row.Equipment) 
                                {
                                    return j;
                                }
                                else
                                {
                                    return -1;
                                }
                                console.log(j);

                        }*/
                        var searchindex=0;
                        angular.forEach($rootScope.equipmentsSelected, function(item)
                        {

                              if(item.SerialNo == row.SerialNo)
                              {
                                console.log("element found at "+searchindex);
                                $rootScope.deleteRowIndex=searchindex;
                                console.log("set deleterowindex to "+$rootScope.deleteRowIndex);
                                 return searchindex;

                              }
                              searchindex++;
                        });
               }
                
            }
        


tableLoadFlag=0;
function addRow(row)
{
    console.log("adding row with equipment id"+ row.SerialNo);
    $rootScope.equipmentsSelected.push(row);


};

function removeRow()
{
    
        console.log("removing element at position "+$rootScope.deleteRowIndex);
        $rootScope.equipmentsSelected.splice($rootScope.deleteRowIndex,1);



}





    /*//for no of selected items.Note history is not maintained
    $scope.$watch('displayedCollection', function (newVal) {
        console.log("selected items: " + newVal.filter(function (item) {
            return item.isSelected;
        }).length);
    }, true);*/



    //adding and removing data


    //add to the real data holder




    //for unlock batch event


   

 function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}
$scope.Email=function()
{
	var mailtoURL="http://10.10.10.75:60000/api/metero/EmailEquipments/"

	$.confirm({
    title: 'Email List!',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Enter email address</label>' +
    '<input type="text" placeholder="Enter email address" class="name form-control" required />' +
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Email',
            btnClass: 'btn-blue',
            action: function () {
                var email = this.$content.find('.name').val();

                /*if(!name){
                    $.alert('provide a valid name');
                    return false;
                }*/
                if(!validateEmail(email))
                {
                	$.alert('provide a valid name');
                    return false;

                }

/*
                $.ajax({
                                    url: mailtoURL,
                                    data:postdata,
                                    dataType: 'json',
                                    type: 'POST'
                                })*/
                
                
               // $.alert('Your name is ' + name);
               $.confirm({
                            title:'Export Equipment List',
                            content: function () {
                                angular.forEach($scope.rowCollection, function(item)
                                    {
                                        item["JobDesc"]=$rootScope.TransferTo["Description"];
                                        item["EmailTo"]=email;

                                    });
                                var postdata=JSON.stringify($scope.rowCollection);
                                var self = this;
                                return $.post(mailtoURL,postdata,function(data,status){}).done(function (response) {
                                    if(response=="Success")
                                    {
                                        self.setContent('<strong>Export Successful</strong>');
                                        

                                    }
                                    else if(response=="Fail")
                                    {
                                        self.setContent('<strong>Export Failed</strong>');
                                        

                                    }
                                    
                                    
                                }).fail(function(){
                                    self.setContent('Something went wrong.');

                                });
                                 },
                            buttons:{
                                Ok:function(){
                                    
                                }
                            }
                        });


            }
        },
        cancel: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});

}


$scope.addnotes=function(row)
{
	//alert(row.Notes);
	var updateUrl="http://10.10.10.75:60000/api/metero/updateNotesViewpoint/"
	var UpdateNotes;
	if((row.Notes)===null)
	{
		UpdateNotes="";

	}
	else
	{
		UpdateNotes=row.Notes;
	}
	
	
    
	$.confirm({
    title: 'Equipment No: '+row.Equipment,
    columnClass: 'medium',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<div class="row">'+
            '<div class="col-md-6">'+
                '<label>Last Recorded Hours</label>'+
                '<input type="text" class="form-control" value="'+row.HourReading+'" readonly>'+
            '</div>'+
            '<div class="col-md-6">'+
                '<label>Last Recorded Odo</label>'+
                '<input type="text" class="form-control" value="'+row.OdoReading+'" readonly>'+
            '</div>'+
     '</div></br>'+
    '<label>Enter Notes below</label>' +
    '<textarea rows="1" cols="50" type="text" style="resize:none;" wrap="hard"  class="name form-control" maxlength="50">'+UpdateNotes+'</textarea>' +
    '<p><strong><em>* max note length is 50 characters</em></strong></p>'+
    '</div>'+
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Update Note',
            btnClass: 'btn-blue',
            action: function () {
                var notes = this.$content.find('.name').val();
                row.Notes=notes;
                $scope.$digest();
                var jsonObject=[];

				jsonObject.push(row);
			    var postdata=JSON.stringify(jsonObject);
			    $.confirm({
                        title: 'Update Status',
                        content: function () {
                            var self = this;
                            return $.ajax({
                                url: updateUrl,
                                dataType: 'json',
                                data: postdata,
                                method: 'post'
                            }).done(function (response) {
                                if(response=="Success")
                                {
                                    self.setContent("<strong>Note updated successfully</strong>");
                                    row.HasNotes="true";
                                    $scope.$digest();
                                    $scope.$digest();
                                    

                                }
                                else
                                {
                                    self.setContent("<strong>Note updated successfully</strong>");

                                }


                                
                            }).fail(function(){
                                self.setContent('Something went wrong.');
                            });
                        }
                    });
              
        },
        cancel: function () {
            //close
        },
    },
    Cancel: function () {
        // bind to events
       
    }
}
});
}






}]);


