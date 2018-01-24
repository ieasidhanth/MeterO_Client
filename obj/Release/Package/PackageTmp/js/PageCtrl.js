app.controller('PageCtrl', ['$scope','$rootScope','ajaxService','$window','$localStorage','$location', function($scope,$rootScope,ajaxService,$window,$localStorage,$location){
  
  $scope.loggedin=false;
  alert($localStorage.Sessionid);
  if ($localStorage.Sessionid>0) {
    //alert($localStorage.UserObject["UserValidated"]);
    $scope.loggedin=$localStorage.UserObject["UserValidated"];
        
    } 
    else 
    {
         
         $window.location.href='/AccessDenied.aspx';
    }
  

	
	
}]);