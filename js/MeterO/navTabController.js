app.controller('navTabController', ['$scope','ajaxService','$rootScope','$localStorage','$window', function ($scope, ajaxService,$rootScope,$localStorage,$window) {
$scope.UserLoggedIn=sessionStorage.getItem("UserFullName");
$scope.Role_ID=sessionStorage.getItem("Role_ID");

if($scope.Role_ID==3)
{
	$scope.ShowEditEquipmentsTab=true;
	$scope.ShowEMEquipments=true;
	$scope.ShowPersonalEquipmentEntry=false;
    $scope.activePane='MeterEntry';
	
}
else if($scope.Role_ID==4)
{
	$scope.ShowEditEquipmentsTab=false;
	$scope.ShowEMEquipments=true;
	$scope.ShowPersonalEquipmentEntry=false;
	$scope.activePane='MeterEntry';

}
else if($scope.Role_ID==2)
{
	$scope.ShowPersonalEquipmentEntry=true;
	$scope.ShowEditEquipmentsTab=true;
	$scope.ShowEMEquipments=true;
	$scope.activePane='MeterEntry';

}
else if($scope.Role_ID==5)
{

	$scope.ShowPersonalEquipmentEntry=true;
	$scope.ShowEMEquipments=false;
	$scope.ShowEditEquipmentsTab=false;
	$scope.activePane='PersonalEntry';

}
var selectedJob="";
$scope.review=function(tab)
{
	$rootScope.$broadcast('metersubmittabchanged',{'jobId':selectedJob});
}
//alert($scope.Role_ID);

$rootScope.$on('toJobdropboxchanged', function (event, args) {
        var jobId =args.jobId;
        //alert('from smarttable'+jobId);
        selectedJob=args.jobId;
        
        
    });

$scope.editEquipments=function(tab)
{
	$rootScope.$broadcast('editEquiptabchanged',{'jobId':selectedJob});
}








}]);