app.controller('signinController', ['$scope','ajaxService','$rootScope','$localStorage','$window', function ($scope, ajaxService,$rootScope,$localStorage,$window) {
$scope.UserLoggedIn=sessionStorage.getItem("UserFullName");
var logoutURL="http://10.10.10.75:60000/api/metero/disconnectSession"

$scope.logOut=function(){
var myObj = { "SessionId": sessionStorage.getItem("SID"), "message": "logout" };
var myJSON = JSON.stringify(myObj);
alert(logoutURL);
	$.confirm({
   title: 'Logout?',
    content: 'Are you sure you want to logout?',
    autoClose: 'cancel|10000',
    theme: 'supervan',
    buttons: {
        logoutUser: {
            text: 'logus out',
            action: function () {
                //$.alert('The user was logged out');
                return $.ajax({
                                                url: logoutURL,
                                                dataType: 'json',
                                                data: myJSON,
                                                method: 'post'
                                            }).done(function (response) {

                                                if(response=="success")
                                                {

                                                	sessionStorage.clear();
    			                                    $window.location.href = '/IEA_AppLogin.aspx';

                                                }
                                                else
                                                {
                                                	alert('log out failed');

                                                }
                                            });
                
            }
        },
        cancel: function () {
           // $.alert('canceled');
        }
    }
});



}




}]);