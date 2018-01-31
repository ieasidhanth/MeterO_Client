app.controller('getPersonalEquipments', ['$scope','ajaxService','$rootScope','$localStorage','$filter', function ($scope, ajaxService,$rootScope,$localStorage,$filter) {
    //$('#toggle-event').prop('checked')=false;
    //$('#toggle-event').attr('checked', false);
    var employeeID= sessionStorage.getItem("EmployeeID");
    var prCo=sessionStorage.getItem("Company");
    var emailID=sessionStorage.getItem("EmailID");
    var userName=sessionStorage.getItem("UserId");
    var getPesonalEquipmentsURL='http://localhost:3500/api/metero/getPersonalEquipments';
    var AddTripURL='http://localhost:3500/api/metero/AddTripDetails';
    var UpdateTripUrl='';
    var getPendingLogs='http://localhost:3500/api/metero/getPendingDailyLogs';
    var payloadData_pendinglogs={ 'employeeID': employeeID,PrCo:prCo };
    var data = { 'employeeID': employeeID };
     //$scope.x_1=[{}];
    $scope.itemCountPage=3;
    ajaxService.postReq(getPesonalEquipmentsURL,data)
               .then(function(values){
                //console.log(values.data);
                
                 angular.forEach(values.data, function(item)
                {

                              
                              //equipmentcount++;
                              
                });
                 //console.log($scope.rowCollection);
                 //unfiltered_list=values.data;
                 $scope.personalEquipmentCollection = values.data;
                 //$rootScope.showTableLoad=true;
                // $rootScope.showTableLoadspinner=false;
                 //$scope.ecount=equipmentcount;
                // $rootScope.TotalJobEquipments=equipmentcount;
                 //alert(equipmentcount);
                //$scope.$digest();
                //$scope.$digest();
             
               // $scope.status = values.data[0];
                //console.log(values[0]);
        });
               ajaxService.postReq(getPendingLogs,payloadData_pendinglogs)
               .then(function(values){
                //console.log(values.data);
                
                 angular.forEach(values.data, function(item)
                {

                              
                              //equipmentcount++;
                              
                });
                 
                 $scope.pendingslogs = values.data;
                 $scope.displayedCollection_pendingLogs=values.data;
                
        });

$scope.log=function(row)
{
    $.confirm({
    title:row.Description,
    columnClass: 'medium',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<div class="row">'+
            '<div class="col-sm-12">'+
                '<label>Trip Date</label>'+
                '<div class="form-group">'+
                '<div class="input-group date" id="datetimepicker_trip">'+
                    '<input type="text" class="form-control" id="datetimepicker_trip_val" />'+
                    '<span class="input-group-addon">'+
                        '<span class="glyphicon glyphicon-calendar"></span>'+
                    '</span>'+
                '</div>'+
            '</div>'+
            '</div>'+

     '</div></br>'+
     '<div class="row">'+
           '<div class="col-sm-12">'+
                '<label for="tripcat">Trip Purpose</label>'+
                  '<select class="form-control" id="tripcat">'+
                    '<option>Business</option>'+
                    '<option>Personal</option>'+
                   '</select>'+
            '</div>'+
     '</div></br>'+
    '<div class="row">'+
           '<div class="col-sm-12">'+
                '<label>Trip Description</label>' +
                '<textarea rows="1" cols="50" type="text" style="resize:none;" wrap="hard"  class="tripdesc form-control" maxlength="50">'+''+'</textarea>' +
                '<p><strong><em>* max Description length is 50 characters</em></strong></p>'+
           '</div>'+
     '</div></br>'+
    '<div class="row">'+
            
            '<div class="col-sm-12">'+
                '<label>From</label>'+
                '<input type="text" class=" tripFrom form-control" value="'+''+'" >'+
            '</div>'+
     '</div></br>'+
     '<div class="row">'+
            
            '<div class="col-sm-12">'+
                '<label>To</label>'+
                '<input type="text" class="tripTo form-control" value="'+''+'" >'+
            '</div>'+
     '</div></br>'+
     '<div class="row">'+
            
            '<div class="col-sm-12">'+
                '<label>Miles</label>'+
                '<input type="text" class="tripMiles form-control" value="'+''+'" required>'+
            '</div>'+
     '</div></br>'+
    
    '</div>'+
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Save',
            btnClass: 'btn-blue',
            action: function () {
                                    var TripDate=$('#datetimepicker_trip_val').val();
                                    var TripCat=$('#tripcat').val();
                                    var TripDesc = this.$content.find('.tripdesc').val();
                                    var TripFrom=this.$content.find('.tripFrom').val();
                                    var TripTo=this.$content.find('.tripTo').val();
                                    var TripMiles=this.$content.find('.tripMiles').val();
                                   
                                    var payLoad={
                                      PrCo:prCo,
                                      EmployeeID:employeeID,
                                      EmailID:emailID,
                                      EquipmentID:row.Equipment,
                                      EmCo:"",
                                      EquipmentDesc:row.Description,
                                      TDate:TripDate,
                                      TDesc:TripDesc,
                                      TFrom:TripFrom,
                                      TTo:TripTo,
                                      TCat:TripCat,
                                      TMiles:TripMiles,
                                      TSubmittedDate:"",
                                      TStatus:"",
                                      TCreatedBy:userName,
                                      TCreatedDate:""



                                    }

                                    var jsonObject=[];

                                    jsonObject.push(payLoad);
                                    var postdata=JSON.stringify(jsonObject);
                                    console.log(postdata);
                                    $.confirm({
                                    title: 'Save Status',
                                    content: function () {
                                    var self = this;
                                    return $.ajax({
                                                    url: AddTripURL,
                                                    dataType: 'json',
                                                    data: postdata,
                                                    method: 'post'
                                                }).done(function (response) {
                                                    if(response=="Success")
                                                    {
                                                        self.setContent("<strong>"+response+"</strong>");
                                                        ajaxService.postReq(getPendingLogs,payloadData_pendinglogs)
                                                         .then(function(values){
                                                         
                                                                                                                    
                                                           $scope.pendingslogs = values.data;
                                                           $scope.displayedCollection_pendingLogs=values.data;
                                                          
                                                    });
                                                        
                                                        

                                                    }
                                                    else
                                                    {
                                                        self.setContent("<strong>"+response+"</strong>");

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
                  S_A:{
                          text: 'Save & Add',
                            btnClass: 'btn-blue',
                            action: function () {

                            }

                        },
                  cncl:{
                    text: 'cancel',
                            btnClass: 'btn-danger',
                            action: function () {

                            }

                  } 

},
 onContentReady: function () {
        var self = this;
        $('#datetimepicker_trip').datetimepicker();
    }
});

}

$scope.editDetails=function(row)
{
  $.confirm({
    title:row.Trip_ID,
    columnClass: 'medium',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<div class="row">'+
            '<div class="col-sm-12">'+
                '<label>Trip Date</label>'+
                '<div class="form-group">'+
                '<div class="input-group date" id="datetimepicker_trip">'+
                    '<input type="text" class="form-control" id="datetimepicker_trip_val" value="'+row.TripDate+'" />'+
                    '<span class="input-group-addon">'+
                        '<span class="glyphicon glyphicon-calendar"></span>'+
                    '</span>'+
                '</div>'+
            '</div>'+
            '</div>'+

     '</div></br>'+
     '<div class="row">'+
           '<div class="col-sm-12">'+
                '<label for="tripcat">Trip Purpose</label>'+
                  '<select class="form-control" id="tripcat">'+
                    '<option>Business</option>'+
                    '<option>Personal</option>'+
                   '</select>'+
            '</div>'+
     '</div></br>'+
    '<div class="row">'+
           '<div class="col-sm-12">'+
                '<label>Trip Description</label>' +
                '<textarea rows="1" cols="50" type="text" style="resize:none;" wrap="hard"  class="tripdesc form-control" maxlength="50">'+row.Trip_Desc+'</textarea>' +
                '<p><strong><em>* max Description length is 50 characters</em></strong></p>'+
           '</div>'+
     '</div></br>'+
    '<div class="row">'+
            
            '<div class="col-sm-12">'+
                '<label>From</label>'+
                '<input type="text" class=" tripFrom form-control" value="'+row.Trip_From+'" >'+
            '</div>'+
     '</div></br>'+
     '<div class="row">'+
            
            '<div class="col-sm-12">'+
                '<label>To</label>'+
                '<input type="text" class="tripTo form-control" value="'+row.Trip_To+'" >'+
            '</div>'+
     '</div></br>'+
     '<div class="row">'+
            
            '<div class="col-sm-12">'+
                '<label>Miles</label>'+
                '<input type="text" class="tripMiles form-control" value="'+row.Miles+'" required>'+
            '</div>'+
     '</div></br>'+
    
    '</div>'+
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Update',
            btnClass: 'btn-blue',
            action: function () {
                                    var TripDate=$('#datetimepicker_trip_val').val();
                                    var TripCat=$('#tripcat').val();
                                    var TripDesc = this.$content.find('.tripdesc').val();
                                    var TripFrom=this.$content.find('.tripFrom').val();
                                    var TripTo=this.$content.find('.tripTo').val();
                                    var TripMiles=this.$content.find('.tripMiles').val();
                                   
                                    var payLoad={
                                      PrCo:prCo,
                                      EmployeeID:employeeID,
                                      EmailID:emailID,
                                      EquipmentID:row.Equipment,
                                      EmCo:"",
                                      EquipmentDesc:row.Description,
                                      TDate:TripDate,
                                      TDesc:TripDesc,
                                      TFrom:TripFrom,
                                      TTo:TripTo,
                                      TCat:TripCat,
                                      TMiles:TripMiles,
                                      TSubmittedDate:"",
                                      TStatus:"",
                                      TCreatedBy:userName,
                                      TCreatedDate:""



                                    }

                                    var jsonObject=[];

                                    jsonObject.push(payLoad);
                                    var postdata=JSON.stringify(jsonObject);
                                    console.log(postdata);
                                    $.confirm({
                                    title: 'Save Status',
                                    content: function () {
                                    var self = this;
                                    return $.ajax({
                                                    url: UpdateTripUrl,
                                                    dataType: 'json',
                                                    data: postdata,
                                                    method: 'post'
                                                }).done(function (response) {
                                                    if(response=="Success")
                                                    {
                                                         self.setContent("<strong>"+response+"</strong>");
                                                         ajaxService.postReq(getPendingLogs,payloadData_pendinglogs)
                                                         .then(function(values){
                                                         
                                                                                                                    
                                                           $scope.pendingslogs = values.data;
                                                           $scope.displayedCollection_pendingLogs=values.data;
                                                          
                                                    });
                                                        
                                                        

                                                    }
                                                    else
                                                    {
                                                        self.setContent("<strong>"+response+"</strong>");

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
                  
                  cncl:{
                    text: 'cancel',
                            btnClass: 'btn-danger',
                            action: function () {

                            }

                  } 

},
 onContentReady: function () {
        var self = this;
        $('#datetimepicker_trip').datetimepicker();
    }
});
}





             



               
               
                        




}]);


