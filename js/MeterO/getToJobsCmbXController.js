app.controller('getToJobsCmbXController', ['$scope','$rootScope','ajaxService', function($scope,$rootScope,ajaxService){
	
    //get to jobs
	var getToJobsUrl='http://localhost:60000/api/metero/getjobs';
    $scope.tojobs;
    $scope.selectedItemToJobs;
   // $scope.users = UserService.all();
    //alert($scope.users);
    $scope.dropboxitemselected = function (item) {
       // $("#toggle-event").prop("checked", false).change();
        //$('#toggle-event').change();
       // $scope.$digest();
        //$('#toggle-event').bootstrapToggle('off');
        //$scope.$digest();
        item["target"]="job";
        $scope.selectedItem = item;
        $rootScope.TransferTo=item;
        //$('#toggle-event').attr('checked', false); 
       // alert(document.getElementById("toggle-event").checked);
        
        //UserService.prepForBroadcast($scope.selectedItem);
        //alert($scope.selectedItem.Job); 
        $rootScope.$broadcast('toJobdropboxchanged',{'jobId':$scope.selectedItem.Job});
        $('html, body').animate({scrollTop : 0},800);
        //$('#toggle-event').bootstrapToggle();
        $('#toggle-event').bootstrapToggle('off');

        
        
    }
    ajaxService.getReq(getToJobsUrl,{})
               .then(function(values){
                $scope.tojobs = values.data;

    });
	
}])