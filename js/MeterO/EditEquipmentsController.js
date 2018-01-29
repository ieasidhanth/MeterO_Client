app.controller('EditEquipmentsController', ['$scope','ajaxService','$rootScope','$localStorage','$window', function ($scope, ajaxService,$rootScope,$localStorage,$window) {
var selectedJob="";
$scope._roleID=sessionStorage.getItem("Role_ID");
if($scope._roleID==3 || $scope._roleID==2 || $scope._roleID==1)
{
    $scope.showAdminControl=true;
}
else
{
    $scope.showAdminControl=false;

}
$scope.clearall=function()
{
    
    var clearURL="http://localhost:60000/api/metero/ClearAllNotes";
    var postdata={'jobId': selectedJob};
   // alert(postdata);
   // console.log(postdata);
    $.confirm({
    title: 'Clear All Notes',
    content: 'Are you sure you want to clear notes for all equipments?',
    buttons: {
        Yes: function () {
            
            $.confirm({
                        title: 'Status',
                        content: function () {
                            var self = this;
                            return $.ajax({
                                url: clearURL,
                                data: JSON.stringify(postdata),
                                method: 'post'
                            }).done(function (response) {
                                if(response!=null)
                                {
                                    self.setContent("Notes successfully cleared");
                                    
                                    self.setTitle("Success");
                                    $scope.equipCollection=response;
                                    $scope.$digest();
                                    $rootScope.$broadcast('NotesCleared',{'jobId':selectedJob});

                                }
                                else
                                {
                                    self.setContent("Notes could not be cleared");
                                    self.setTitle("Failed");

                                }


                                
                            }).fail(function(){
                                self.setContent('Something went wrong.');
                            });
                        }
                    });
        },
        No: function () {
            
        }
    }
});

}

//alert($scope.Role_ID);
$rootScope.$on('editEquiptabchanged', function (event, args) {
        var jobId =args.jobId;
        //alert('from smarttable'+jobId);
        selectedJob=args.jobId;
        var getEquipmentssurl='http://localhost:60000/api/metero/getequipments';
        
        var data = { 'jobId': selectedJob };
        
        var equipcount=0;
        ajaxService.postReq(getEquipmentssurl,data)
               .then(function(values){
                //console.log(values.data);
                 angular.forEach(values.data, function(item)
                {

                              
                              equipcount++;
                              
                });
                 
                 $scope.ecount=equipcount;
                 $scope.equipCollection = values.data;
                 
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

$rootScope.update=function(row)
{
    //alert(row.Equipment);
    if(row.udReferenceNumber=="")
    {
                $.alert({
            title: 'Alert!',
            content: 'Invalid reference number!',
        });
                return false;
    }
    var date=new Date();
    row.CreatedDate=date.toDateString();
    console.clear();
    console.log(row);
    var jsonObject=[];
    jsonObject.push(row);
    var postScheduleUrl="http://localhost:60000/api/metero/updateEquipment";
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
                                                                title: 'Update Status',
                                                                content: '<strong>Reference number updated successfully</strong>',
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
                                                
                                                else
                                                {
                                                    $.confirm({
                                                                icon:' fa fa-exclamation fa-2x',
                                                                title: 'Update Status',
                                                                content: '<strong>Update Failed!</strong>',
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
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}


$rootScope.emailEquipment=function(row)
{
   // alert(row.Equipment);
    var mailtoURL="http://localhost:60000/api/metero/sendEmailQuery";
    var jsonObject=[];
    $.confirm({
    title: 'Submit Query',
    columnClass:'large',
    draggable:'true',
    content: '' +
    '<script>function process(e,sender) { var code = (e.keyCode ? e.keyCode : e.which); if (code == 13) {console.log(e);var textareaId=e.target.id;var val=$("#"+textareaId).val($("#"+textareaId).val()+"</br>");}}</script>'+
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Compose Email</label>' +
    '<input type="text" id="subject"  class="name form-control" value="Subject: Query for equipment '+row.Equipment+' - '+row.Description+' Job: '+$rootScope.TransferTo["Description"]+'" required />' +
    '<input type="text" id="ccemail" placeholder="CC To: Provide your email address" class="name form-control" required />' +
    
    '<div class="form-group"><textarea class="form-control"  rows="10" id="emailBody" onkeypress="process(event, this)" placeholder="Message Body"></textarea></div>'+
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Email',
            btnClass: 'btn-blue',
            action: function () {
                var subject=this.$content.find('#subject').val();
                var jobDesc=$rootScope.TransferTo["Description"];
                var email = this.$content.find('#ccemail').val();
                var emailBody = this.$content.find('#emailBody').val();
                emailBody.replace("\n", "<br />");
                var json={ "sub":subject,"fromemail":email,"body":emailBody,"job":jobDesc

                }
                jsonObject.push(json)
                console.log(jsonObject);
               // alert(emailBody);
                if(email=="")
                {
                    $.alert('provide a valid email');
                    return false;

                }
                if(emailBody=="")
                {
                    $.alert('Message cannot be blank');
                    return false;

                }

                /*if(!name){
                    $.alert('provide a valid name');
                    return false;
                }*/
                if(!validateEmail(email))
                {
                    $.alert('provide a valid email');
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
                            title:'Submit Query',
                            content: function () {
                                
                                var self = this;
                                return $.post(mailtoURL,JSON.stringify(jsonObject),function(data,status){}).done(function (response) {
                                    if(response=="success")
                                    {
                                        self.setContent('<strong>Query successfully submitted</strong>');
                                        

                                    }
                                    else if(response=="Fail")
                                    {
                                        self.setContent('<strong>Mail could not be sent</strong>');
                                        

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



$rootScope.EmailQuery=function()
{
    var mailtoURL="http://localhost:60000/api/metero/sendEmailQuery";
    var jsonObject=[];
    $.confirm({
    title: 'Submit Query',
    columnClass:'large',
    draggable:'true',
    content: '' +
    '<script>function process(e,sender) { var code = (e.keyCode ? e.keyCode : e.which); if (code == 13) {console.log(e);var textareaId=e.target.id;var val=$("#"+textareaId).val($("#"+textareaId).val()+"</br>");}}</script>'+
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Compose Email</label>' +
    '<input type="text" id="subject"  class="name form-control" value="Subject: Query From '+$rootScope.TransferTo["Description"]+'" required />' +
    '<input type="text" id="ccemail" placeholder="CC To: Provide your email address" class="name form-control" required />' +
    
    '<div class="form-group"><textarea class="form-control" onkeypress="process(event, this)" rows="10" id="emailBody" placeholder="Message Body"></textarea></div>'+
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Email',
            btnClass: 'btn-blue',
            action: function () {
                var subject=this.$content.find('#subject').val();
                var jobDesc=$rootScope.TransferTo["Description"];
                var email = this.$content.find('#ccemail').val();
                var emailBody = this.$content.find('#emailBody').val();
                emailBody.replace("\n", "<br />");
                var json={ "sub":subject,"fromemail":email,"body":emailBody,"job":jobDesc

                }
                jsonObject.push(json)
                console.log(jsonObject);
               // alert(emailBody);
                if(email=="")
                {
                    $.alert('provide a valid email');
                    return false;

                }
                if(emailBody=="")
                {
                    $.alert('Message cannot be blank');
                    return false;

                }

                /*if(!name){
                    $.alert('provide a valid name');
                    return false;
                }*/
                if(!validateEmail(email))
                {
                    $.alert('provide a valid email');
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
                            title:'Submit Query',
                            content: function () {
                                
                                var self = this;
                                return $.post(mailtoURL,JSON.stringify(jsonObject),function(data,status){}).done(function (response) {
                                    if(response=="success")
                                    {
                                        self.setContent('<strong>Query successfully submitted</strong>');
                                        

                                    }
                                    else if(response=="Fail")
                                    {
                                        self.setContent('<strong>Mail could not be sent</strong>');
                                        

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








}]);