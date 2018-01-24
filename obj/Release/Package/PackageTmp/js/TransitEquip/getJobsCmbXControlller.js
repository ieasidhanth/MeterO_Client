app.controller('getJobsCmbXControlller',['$rootScope', '$scope','ajaxService', function ($rootScope, $scope,ajaxService) {
    

    var getJobsUrl='http://10.10.10.75:60000/api/icontrol/getjobs';
    $scope.jobs;
    $scope.selectedItem;

   // $scope.users = UserService.all();
    //alert($scope.users);
    $scope.dropboxitemselected = function (item) {

        $scope.selectedItem = item;
        $rootScope.EquipmenttableHeading = item;
        //UserService.prepForBroadcast($scope.selectedItem);
        //alert($scope.selectedItem.Job); 
        $rootScope.$broadcast('dropboxchanged',{'jobId':$scope.selectedItem.Job});


        
        
    }
    ajaxService.getReq(getJobsUrl,{})
               .then(function(values){
                $scope.jobs = values.data;

    });
    /*getJobs();
    function getJobs() {
        //alert('m in function');
        var url = 'http://10.10.10.75:60000/api/icontrol/getjobs';
        var results = $http({
            method: 'GET',
            url: url
        });
        results.then(function (values) {
            $scope.jobs = values.data;
            

        })

    };*/

   

}]);