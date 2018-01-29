app.controller('MeterSubmitController', ['$scope','ajaxService','$rootScope','$localStorage','$window', function ($scope, ajaxService,$rootScope,$localStorage,$window) {
var selectedJob="";
var Role_ID=sessionStorage.getItem("Role_ID").replace(/(^"|"$)/g, '');
var submitUrl="http://localhost:60000/api/metero/SubmitReadings";
var verifyremainingequipmentsURL="http://localhost:60000/api/metero/reviewremainingEquipments";

if((parseInt(Role_ID)==parseInt(3)) || (parseInt(Role_ID)==parseInt(2)) || (parseInt(Role_ID)==parseInt(1)))
{
    
    $scope.showSubmit=true;
}
else
{
    $scope.showSubmit=false;
}
$scope._roleID=sessionStorage.getItem("Role_ID");
if($scope._roleID==2 || $scope._roleID==1)
{
    $scope.showAdminControl=true;
}
else
{
    $scope.showAdminControl=false;

}
console.log(" From meter submit controller"+$scope.showAdminControl);
console.log(" From meter submit controller"+$scope.showSubmit);
$scope.verifyEquipSubmit=function()
{
    
    if($scope.rowCollection1.length>0)
    {
        angular.forEach($scope.rowCollection1, function(item)
    {
     item["JobDesc"]=$rootScope.TransferTo["Description"];

    });
    var postdata=JSON.stringify($scope.rowCollection1);
  /*  ajaxService.postReq(verifyremainingequipmentsURL,postdata)
               .then(function(values){
                //console.log(values.data);
                
                 

                 $scope.remainingEquipments= values.data;
               
                 //$rootScope.showTableLoad=true;
                 //$rootScope.showTableLoadspinner=false;
                 
                 //alert(equipmentcount);
                 //$scope.$apply();
                // alert($scope.remainingEquipments);
                 $('#gridSystemModal').modal('show');
                 
                //$scope.$digest();
             
               // $scope.status = values.data[0];
                //console.log(values[0]);
        });*/
    $.ajax({
                                    url: verifyremainingequipmentsURL,
                                    data:postdata,
                                    dataType: 'json',
                                    method: 'post'
                                }).done(function (response) {
                                    $scope.remainingEquipments=response;
                                       var stBldr='';
       
                                       stBldr+="<div>";
                                           
                                                stBldr+='&nbsp;&nbsp;<span><i class="fa fa-thumb-tack" aria-hidden="true"></i></span><span><strong> Total Equipments on job: '+ $rootScope.TotalJobEquipments+'</strong></span></br></br>';
                                                stBldr+='&nbsp;&nbsp;<span><i class="fa fa-thumb-tack" aria-hidden="true"></i></span><span><strong> Readings saved for equipments: '+ $scope.rowCollection1.length+'</strong></span></br></br>';
                                           if(response.length>0)
                                           {
                                                                stBldr+='<span><strong>For remaining equipments last recorded readings will be submitted.</strong></span></br>';
                                                                stBldr+='<span><strong>Click on below link to review remaining equipments.</strong></span>';
                                                            stBldr+="</div></br>";
                                                           stBldr+="<div>"
                                                           stBldr+='&nbsp;&nbsp;&nbsp<a href="#" data-toggle="collapse" data-target="#details"><strong>Remaining Equipments </strong></a>';
                                                           stBldr+="</div>"
                                                           stBldr+="&nbsp;&nbsp;&nbsp<div id='details' class='collapse table'>";
                                                           stBldr+="<table class='table table-hover table-striped'>";
                                                                    stBldr+='<tr>';
                                                                                                stBldr+='<th >EquipmentID</th>';
                                                                                                stBldr+='<th>Description</th>';
                                                                                                stBldr+='<th>Last Rec Odo</th>';
                                                                                                stBldr+='<th>Last Rec Hrs</th>';
                                                                                                angular.forEach(response, function(item){
                                                                                                                                                    
                                                                                                 stBldr+='<tr>';
                                                                                                 stBldr+='<td >'+item["Equipment"]+'</td>';
                                                                                                 stBldr+='<td>'+item["Description"]+'</td>';
                                                                                                 stBldr+='<td>'+item["OdoReading"]+'</td>';
                                                                                                 stBldr+='<td>'+item["HourReading"]+'</td>';
                                                                                                 stBldr+='</tr>';
                                                                                                                                                        
                                                                                                                                                    

                                                                                                });

                                                                                                                                            
                                                                                                                                                
                                                           stBldr+="</table>";    
                                                           stBldr+="</div>";

                                           }
                                            
                                       
                                       stBldr+='<p><strong>I confirm that all readings are accurate. Press proceed to submit or cancel to continue adding more  meter readings</strong></p>';
       
                                  
                                    $.confirm({
                                                                icon:' fa fa-exclamation fa-2x',
                                                                title: 'Submit Summary',
                                                                columnClass:'medium',
                                                                content: stBldr,
                                                                type: 'dark',
                                                                typeAnimated: true,
                                                                buttons: {
                                                                    Proceed: {
                                                                        text: 'Proceed',
                                                                        btnClass: 'btn-primary',
                                                                        action: function(){
                                                                                            // Loop through the params and split the key and the value
                                                                                            $.confirm({
                                                                                                        title:'Submit Readings',
                                                                                                        content: function () {
                                                                                                            
                                                                                                            var submitData=JSON.stringify($scope.rowCollection1);
                                                                                                            var self = this;
                                                                                                            return $.ajax({
                                                                                                                url: submitUrl,
                                                                                                                data:submitData,
                                                                                                                dataType: 'json',
                                                                                                                method: 'post'
                                                                                                            }).done(function (response) {
                                                                                                                if(response=="Success")
                                                                                                                {
                                                                                                                    self.setContent('<strong>Your Meter readings were submitted successfully</strong>');
                                                                                                                    

                                                                                                                }
                                                                                                                else if(response=="Fail")
                                                                                                                {
                                                                                                                    self.setContent('<strong>Your Meter readings were not submitted. Kindly contact the administrator</strong>');
                                                                                                                    

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
                                                                    Cancel:{
                                                                        text: 'Cancel',
                                                                        btnClass: 'btn-danger',
                                                                        action: function(){
                                                                        }

                                                                    }
                                                                }
                                            });
                                                                
                                                            }).fail(function(){
                                                                self.setContent('Something went wrong.');

                                                            });

    }
    else
    {
        $.alert({
    title: 'Alert!',
    content: "Kindly enter reading for atleast one equipment.",
    });

    }
	//$scope.remainingEquipments=[];
	
    
    //alert($scope.remainingEquipments);
    

}

$scope.Submit=function()
{
    if($scope.rowCollection1.length>0)
    {
        jsonObject=[];
    jsonObject.push($scope.rowCollection1);
    
    $.confirm({
    title: 'Submit Readings',
    content: '<strong>You are about to submit Meter and Hour Readings for '+ $rootScope.TransferTo["Description"]+"</br></br> Please press OK to continue</strong>",
    autoClose: 'cancel|50000',
    buttons: {
        Ok: function(){
                this.buttons.cancel.disable();
               $.confirm({
                            title:'Submit Readings',
                            content: function () {
                                angular.forEach($scope.rowCollection1, function(item)
                                    {
                                        item["JobDesc"]=$rootScope.TransferTo["Description"];

                                    });
                                var postdata=JSON.stringify($scope.rowCollection1);
                                var self = this;
                                return $.ajax({
                                    url: submitUrl,
                                    data:postdata,
                                    dataType: 'json',
                                    method: 'post'
                                }).done(function (response) {
                                    if(response=="Success")
                                    {
                                        self.setContent('<strong>Your Meter readings were submitted successfully</strong>');
                                        

                                    }
                                    else if(response=="Fail")
                                    {
                                        self.setContent('<strong>Your Meter readings were not submitted. Kindly contact the administrator</strong>');
                                        

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
        ,
        cancel: function () {
            
        }
    }
});

    }
    else
    {
        $.alert({
    title: 'Alert!',
    content: "Kindly enter reading for atleast one equipment.",
    });

    }
    
}
$scope.showNotes=function(row)
{
    $.alert({
    title: 'Note for equipment '+row.Equipment,
    content: row.Notes,
});
}

$scope.removeItem=function(row)
{
    //alert(row.Equipment);
    var jsonObject=[];
    jsonObject.push(row);
    var deleterowURL="http://localhost:60000/api/metero/deleteTransaction";
    var postdata=JSON.stringify(jsonObject);
     $.confirm({
                            title:'Delete '+row.Equipment+' status' ,
                            content: function () {
                                
                                var self = this;
                                return $.ajax({
                                    url: deleterowURL,
                                    data:postdata,
                                    dataType: 'json',
                                    method: 'post'
                                }).done(function (response) {
                                    if(response=="Success")
                                    {
                                        var index = $scope.rowCollection1.indexOf(row);
                                                    if (index !== -1) {
                                                        $scope.rowCollection1.splice(index, 1);
                                                        $rootScope.reviewecount=$rootScope.reviewecount-1;
                                                        $scope.$digest();
                                                        self.setContent('<strong>Equipment was deleted successfully.</strong>');
                                                    }
                                        
                                        

                                    }
                                    else if(response=="Fail")
                                    {
                                        self.setContent('<strong>Delete Failed./strong>');
                                        

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
	

//alert($scope.Role_ID);
$rootScope.$on('metersubmittabchanged', function (event, args) {
        var jobId =args.jobId;
        //alert('from smarttable'+jobId);
        selectedJob=args.jobId;
        var reviewEquipmentssurl='http://localhost:60000/api/metero/reviewSubmit';
        var data = { 'jobId': selectedJob };
        
        var reviewequipmentcount=0;
        ajaxService.postReq(reviewEquipmentssurl,data)
               .then(function(values){
                //console.log(values.data);
                
                 

                 $scope.rowCollection1 = values.data;
                  angular.forEach($scope.rowCollection1, function(item)
                {

                              
                              reviewequipmentcount++;
                              
                });
                 //$rootScope.showTableLoad=true;
                 //$rootScope.showTableLoadspinner=false;
                 $rootScope.reviewecount=reviewequipmentcount;
                 //alert(equipmentcount);
                 $scope.$digest();
                //$scope.$digest();
             
               // $scope.status = values.data[0];
                //console.log(values[0]);
        });
        
        
    });

$rootScope.$on('toJobdropboxchanged', function (event, args) {
        var jobId =args.jobId;
        //alert('from smarttable'+jobId);
        selectedJob=args.jobId;
        
        
    });








}]);