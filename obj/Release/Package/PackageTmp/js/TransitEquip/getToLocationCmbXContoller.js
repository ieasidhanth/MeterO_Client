app.controller('getToLocationCmbXContoller', ['$scope','$rootScope','ajaxService', function($scope,$rootScope,ajaxService){

	var getJobsUrl='http://10.10.10.75:60000/api/icontrol/getLocations';
    $scope.toLocations;
    $scope.toLocationSelectedItem;

   // $scope.users = UserService.all();
    //alert($scope.users);
    $scope.dropboxtoLocitemselected = function (item) {
    	
        item["target"]="location";
        //console.log(item);
        $scope.toLocationSelectedItem = item;
        
        $rootScope.TransferTo=item;
        $('html, body').animate({scrollTop : 0},400);
        console.log($rootScope.TransferTo);
        //UserService.prepForBroadcast($scope.selectedItem);
        //alert($scope.selectedItem.Job); 
        //$rootScope.$broadcast('dropboxchanged',{'jobId':$scope.selectedItem.Job});


        
        
    }
    ajaxService.getReq(getJobsUrl,{})
               .then(function(values){
                $scope.toLocations = values.data;

    });
	
}]);