app.service("ajaxService1", ['$http', function($http){
	this.postReq = function(url1, data){

	return $http({
			method: 'POST', 
			url: url1, 
			data:data
		});
			
		}
	this.getReq=function(url2,data){
		return $http({
			   method: 'GET',
               url: url2

		});
	}


	
}]);