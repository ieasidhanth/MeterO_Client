//1.
app.service('empservice'['$http', function ($http) {
    this.get = function () {
         
        var accesstoken = sessionStorage.getItem('accessToken');
 
        var authHeaders = {};
        console.log(accesstoken);
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
 
        var response = $http({
            url: "http://10.10.10.75:60000/api/employeeapi/get",
            method: "GET",
            headers: authHeaders
        });
        return response;
    };
}]);