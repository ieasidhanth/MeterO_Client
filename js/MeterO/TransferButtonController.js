app.controller('TransferButtonController', ['$scope','$rootScope', function($scope,$rootScope){
	$scope.validate=function(){
		if($rootScope.TransferTo!=null)
		{
			if($rootScope.equipmentsSelected.length==0)
			{
				$rootScope.showNoRowselectedwarning=true;

			}
			else
			{
				$rootScope.showNoRowselectedwarning=false;
				$rootScope.SelectedItemCount= $rootScope.equipmentsSelected.length;
				//alert($rootScope.equipmentsSelected.length);

			}
		  $('#gridSystemModal').modal();

		}
		else
		{
			$('#transfertoNotselected').showBootstrapAlertDanger('Error: Please select a transfer location', Bootstrap.ContentType.Text, true, 4000);
			$("html, body").animate({ scrollTop: 0 }, "slow");

		}
		
		
	}
	
}]);