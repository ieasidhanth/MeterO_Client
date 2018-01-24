app.controller('getToJobsCmbXController', ['$scope','$rootScope','ajaxService', function($scope,$rootScope,ajaxService){
	
    //get to jobs
	var getToJobsUrl='http://10.10.10.75:60000/api/icontrol/getjobs';
    $scope.tojobs;
    $scope.selectedItemToJobs;
   // $scope.users = UserService.all();
    //alert($scope.users);
    $scope.dropboxitemselected = function (item) {
        item["target"]="job";
        $scope.selectedItem = item;
        $rootScope.TransferTo=item;
        
        //UserService.prepForBroadcast($scope.selectedItem);
        //alert($scope.selectedItem.Job); 
        $rootScope.$broadcast('toJobdropboxchanged',{'jobId':$scope.selectedItem.Job});
        $('html, body').animate({scrollTop : 0},800);


        
        
    }
    ajaxService.getReq(getToJobsUrl,{})
               .then(function(values){
                $scope.tojobs = values.data;

    });
	
}])