app.controller('signinController', ['$scope','ajaxService','$rootScope','$localStorage','$window', function ($scope, ajaxService,$rootScope,$localStorage,$window) {
$scope.UserLoggedIn=$localStorage.UserFullName;
var logoutURL="http://10.10.10.75:60000/api/icontrol/disconnectSession"

$scope.logOut=function(){
var myObj = { "SessionId":$localStorage.Sessionid, "message":"logout" };
var myJSON = JSON.stringify(myObj);

	$.confirm({
   title: 'Logout?',
    content: 'Are you sure you want to logout?',
    autoClose: 'cancel|10000',
    theme: 'supervan',
    buttons: {
        logoutUser: {
            text: 'logme out',
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
                                                	$window.localStorage.clear();
    			                                    $window.location.href = '/Icontrol_login.aspx';

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