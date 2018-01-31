app.controller('loginController', ['$scope','ajaxService1','$rootScope','$localStorage','$window','$cookies','$cookieStore', function ($scope, ajaxService1,$rootScope,$localStorage,$window,$cookies,$cookieStore) {
    var validateUserUrl ='http://localhost:3500/api/metero/validateUser';
    
    	if($cookieStore.get("IEA_PowerApps_username")!==undefined && $cookieStore.get("IEA_PowerApps_password")!==undefined)
    	{
                 $('#login-username').val($cookieStore.get("IEA_PowerApps_username"));
                 $('#login-password').val($cookieStore.get("IEA_PowerApps_password"));
                 
        }



    $scope.launch=function(row)
    {
        //alert(row.Role_Name);
        var relocurl="";
        if(row["App_Name"]=="Transit")
        {
            relocurl="/TransferEquip.aspx";
                                                           
        }
        else if(row["App_Name"]=="MeterO")
        {
            relocurl="/MeterO.aspx";
        }
        sessionStorage.setItem('Role_Name',(row["App_Name"]));
        sessionStorage.setItem('Role_ID',(row["Role_ID"]));
        sessionStorage.setItem('UserAccessID',(row["UserAccessID"]));
        sessionStorage.setItem('App_ID',(row["App_ID"]));
        sessionStorage.setItem('App_Name',(row["App_Name"]));
        $window.location.href = relocurl;
    }
    $scope.loginUser=function()
    {
    	
    	var userName = $('#login-username').val();
        var password = $('#login-password').val();
        //alert($('#login-remember').val());
        if($('#login-remember').val()==1)
        {
        	$cookies.putObject('IEA_PowerApps_username', userName);
        	$cookies.putObject('IEA_PowerApps_password', password);


        }
        //alert(userName+"----"+password);
        jsonObject=[];
        rowItem={};
        
        var myObj = { "username":userName, "password":password };
        var myJSON = JSON.stringify(myObj);
        
        
        //remove from here

        $.confirm({
                          icon:'fa fa-info-circle fa-2x',
                                        title:'Login Status',
                                        type:'dark',
                                        theme:'Material',
                                        draggable:true,
                                        columnClass:'small',
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
	                                               //$localStorage.UserId = userName;
									            	//$localStorage.UserFullName=response[0].Name;
									            	//$localStorage.Sessionid=response[0].SessionID;
									            	//$localStorage.UserObject = response[0];
                                                    console.clear();
                                                    console.log(response[0]);
                                                    sessionStorage.setItem('UserId', (userName));
                                                    sessionStorage.setItem('UserFullName', (response[0].Name));
                                                    sessionStorage.setItem('SID', (response[0].SessionID));
                                                    sessionStorage.setItem('UserObject', (response[0]));
                                                    sessionStorage.setItem('RoleInfo',(response[0].RoleInfo));
                                                    sessionStorage.setItem('EmployeeID', (response[0].EmployeeID));
                                                    sessionStorage.setItem('Company', (response[0].Company));
                                                    sessionStorage.setItem('EmailID', (response[0].EmailID));
                                                    var roles=response[0].RoleInfo.split('#');
                                                    var loop=0;
                                                    
                                                    //User_role.apps=app_data;
                                                    
                                                    role_data=[];
                                                    for(loop=0;loop<roles.length;loop++)
                                                    {
                                                    	rowitem={};
                                                    	rowitem["App_ID"]=roles[loop].split(';')[0].split(':')[1];
                                                    	rowitem["App_Name"]=roles[loop].split(';')[1].split(':')[1];
                                                    	rowitem["Role_ID"]=roles[loop].split(';')[2].split(':')[1];
                                                    	rowitem["Role_Name"]=roles[loop].split(';')[3].split(':')[1];
                                                    	rowitem["UserAccessID"]=roles[loop].split(';')[4].split(':')[1];
                                                    	//console.log(rowitem);
                                                    	role_data.push(rowitem);

                                                    }
                                                   // console.log(role_data);
                                                    $scope.roleDatacollection=role_data;
                                                    if(role_data.length==1)
                                                    {

                                                        var app=role_data[0];
                                                        var relocurl="";
                                                        if(app["App_Name"]=="Transit")
                                                        {
                                                            relocurl="/TransferEquip.aspx";
                                                            

                                                        }
                                                        else if(app["App_Name"]=="MeterO")
                                                        {
                                                            relocurl = "/MeterO.aspx";
                                                            sessionStorage.setItem('Role_Name', (app["Role_Name"]));
                                                            sessionStorage.setItem('Role_ID', (app["Role_ID"]));
                                                            sessionStorage.setItem('UserAccessID', (app["UserAccessID"]));
                                                            sessionStorage.setItem('App_ID', (app["App_ID"]));
                                                            sessionStorage.setItem('App_Name', (app["App_Name"]));
                                                            sessionStorage.setItem('showUpdateMessage', 1);
                                                            

                                                           // $rootScope.$broadcast('loggedIn',{'EmployeeID':app["EmployeeID"]});

                                                            $window.location.href = relocurl;

                                                        }
                                                            

                                                    }
                                                    else
                                                    {
                                                        self.setContentAppend('<strong>Authentication Successfull</strong>');

                                                        for(i=0;i<role_data.length;i++)
                                                        {
                                                        	var app=role_data[i];
	                                                        var relocurl="";
	                                                        if(app["App_Name"]==="MeterO")
	                                                        {
	                                                        	
	                                                            relocurl="/MeterO.aspx";
	                                                            sessionStorage.setItem('Role_Name',(app["Role_Name"]));
	                                                            sessionStorage.setItem('Role_ID',(app["Role_ID"]));
	                                                            sessionStorage.setItem('UserAccessID',(app["UserAccessID"]));
	                                                            sessionStorage.setItem('App_ID',(app["App_ID"]));
	                                                            sessionStorage.setItem('App_Name',(app["App_Name"]));
	                                                            sessionStorage.setItem('showUpdateMessage',1);

	                                                            $window.location.href = relocurl;

	                                                        }
	                                                            
	                                                     }

                                                    }
                                                    //table for apps
                                                    
                                                    


















                                                    //self.setContentAppend("Success");
									            	//localStorage.setItem('UserId', JSON.stringify(userName));
									            	//alert(localStorage.getItem('UserId'));
									            	//$window.location.href = '/TransferEquip.aspx';
	                                                

                                                }
                                                else if(response[0].SessionID<0)
                                                {
                                                self.setContentAppend('<strong>Session could not be initiated,Kindly Contact IT Team.</strong>');

                                                
                                                }
                                                else
                                                {
                                                	self.setContentAppend('<strong>Invalid Credentials, Please try again</strong>');
                                                    return false;
                                                }
                                                
                                            }).fail(function(){
                                                self.setContent('<strong>Something went wrong.Kindly Contact IT Team.</strong>');
                                                return false;
                                            });
                                        },
                                        buttons:{
                                          Okay:{
                                                text:'Okay',
                                                action:function()
                                                {
                                                    //$('#myModal').modal('show'); 
                                                    $scope.$digest(); 

                                                      


                                                }

                                          }

                                          }
                                        
                                 });
































































           //remove code from top


    }
    

    
   
  
}]);


