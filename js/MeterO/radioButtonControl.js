app.controller('radioButtonControl', ['$scope', function($scope){
	$scope.destination="";
	

	$scope.radioclicked=function(selectedVal){
		//alert('clicked');
		$scope.destination=selectedVal;
		//alert('destination set to '+$scope.destination);
		

	};
	$scope.isSelected=function(location){
		//alert("destination value "+$scope.destination);
		//alert("location value "+location);
		//alert(location === $scope.destination);

		return location === $scope.destination;
		
	};
	/*$scope.isHidden=true;
	$scope.ShowHide=function(){
		$scope.isHidden=$scope.isHidden ? false : true;
	}
*/
}]);