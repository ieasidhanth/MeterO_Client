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
            url: "http://localhost:3500/api/employeeapi/get",
            method: "GET",
            headers: authHeaders
        });
        return response;
    };
}]);