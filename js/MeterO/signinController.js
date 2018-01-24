app.controller('signinController', ['$scope','ajaxService','$rootScope','$localStorage','$window', function ($scope, ajaxService,$rootScope,$localStorage,$window) {
$scope.UserLoggedIn=sessionStorage.getItem("UserFullName");
var logoutURL="http://10.10.10.75:60000/api/metero/disconnectSession"
var idleTime = 0;
var myObj = { "SessionId": sessionStorage.getItem("SID"), "message": "logout" };
var myJSON = JSON.stringify(myObj);
$scope.logOut=function(){
myObj = { "SessionId": sessionStorage.getItem("SID"), "message": "logout" };
myJSON = JSON.stringify(myObj);
//alert(logoutURL);
	$.confirm({
   title: 'Logout?',
    content: 'Are you sure you want to logout?',
    autoClose: 'cancel|10000',
    theme: 'supervan',
    buttons: {
        logoutUser: {
            text: 'log me out',
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
   //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });

    document.getElementById('main_wrapper').onmousemove = function(){idleTime = 0;};

    function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 14) { // 15 minutes
        $.ajax({
                                                url: logoutURL,
                                                dataType: 'json',
                                                data: myJSON,
                                                method: 'post'
                                            }).done(function (response) {

                                                if(response=="success")
                                                {
                                                    alert("You have been logged out!");
                                                    sessionStorage.clear();
                                                    $window.location.href = '/IEA_AppLogin.aspx';

                                                }
                                                else
                                                {
                                                    alert('log out failed');

                                                }
                                            });
    }
}






}]);