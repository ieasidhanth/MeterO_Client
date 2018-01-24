app.controller('loginController', ['$scope','ajaxService1','$rootScope','$localStorage','$window','$cookies','$cookieStore', function ($scope, ajaxService1,$rootScope,$localStorage,$window,$cookies,$cookieStore) {
    var validateUserUrl ='http://10.10.10.75:60000/api/icontrol/validateUser';
    
    	if($cookieStore.get("Transit_username")!==undefined && $cookieStore.get("Transit_password")!==undefined)
    	{
                 $('#login-username').val($cookieStore.get("Transit_username"));
                 $('#login-password').val($cookieStore.get("Transit_password"));
                 
        }

   
    $scope.loginUser=function()
    {
    	
    	var userName = $('#login-username').val();
        var password = $('#login-password').val();
        //alert($('#login-remember').val());
        if($('#login-remember').val()==1)
        {
        	$cookies.putObject('Transit_username', userName);
        	$cookies.putObject('Transit_password', password);


        }
        //alert(userName+"----"+password);
        jsonObject=[];
        rowItem={};
        
        var myObj = { "username":userName, "password":password };
        var myJSON = JSON.stringify(myObj);
        // rowItem["username"]=username;
        // rowItem["password"]=password;
        //jsonObject.push(rowItem);
        //var data1=jsonObject;
        //alert(myJSON);
       /* ajaxService1.postReq(validateUserUrl,myJSON)
           .then(function(values)
           {
           	//$scope.$digest();
        	if(values.data[0].UserValidated=="true" && values.data[0].SessionID>0)
            {
            	$localStorage.UserId = userName;
            	$localStorage.UserFullName=values.data[0].Name;
            	$localStorage.Sessionid=values.data[0].SessionID;
            	$localStorage.UserObject=values.data[0];
            	$window.location.href = '/TransferEquip.aspx'
            	/*$.confirm({
                                  title: 'Success',
                                  content: "User logged in! Welcome"+ values.data[0].Name,
                                  type: 'Success',
                                  typeAnimated: true
                               
                              });

                
            }
            else if(values.data[0].SessionID<0)
            {
            	$.confirm({
                    icon:' fa fa-exclamation fa-2x',
                    title: 'Login Error',
                    content: '<strong>Session could not be initiated. </br> Please Try Again.</strong>',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Ok',
                            btnClass: 'btn-red',
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
                    title: 'Login Error',
                    content: '<strong>InCorrect Credentials. </br> Please Try Again.</strong>',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Ok',
                            btnClass: 'btn-red',
                            action: function(){

                            }
                        }
                    }
                });

            }

        });*/
        
        //remove from here

        $.confirm({
                          icon:'fa fa-info-circle fa-2x',
                                        title:'Log In Status',
                                        type:'dark',
                                        theme:'supervan',
                                        content: function () {
                                            var self = this;
                                            return $.ajax({
                                                url: validateUserUrl,
                                                dataType: 'json',
                                                data: myJSON,
                                                method: 'post'
                                            }).done(function (response) {


                                                if(response[0].UserValidated=="true" && response[0].SessionID>0)
                                                {
                                                //self.setContent("</br></br><i style='text-align:center' class='glyphicon glyphicon-thumbs-up fa-3x'></i>");
	                                                $localStorage.UserId = userName;
									            	$localStorage.UserFullName=response[0].Name;
									            	$localStorage.Sessionid=response[0].SessionID;
									            	$localStorage.UserObject=response[0];
									            	$window.location.href = '/TransferEquip.aspx';
	                                                

                                                }
                                                else if(response[0].SessionID<0)
                                                {
                                                self.setContentAppend('<strong>Session could not be initiated,Kindly Contact IT Team.</strong>');

                                                
                                                }
                                                else
                                                {
                                                	self.setContentAppend('<strong>Invalid Credentials, Please try again</strong>');
                                                }
                                                
                                            }).fail(function(){
                                                self.setContent('<strong>Something went wrong.Kindly Contact IT Team.</strong>');
                                            });
                                        },
                                        buttons:{
                                          Okay:{
                                                text:'Okay',
                                                action:function()
                                                {
                                                       


                                                }

                                          }

                                          }
                                        
                                 });
































































           //remove code from top


    }
    

    
   
  
}]);


