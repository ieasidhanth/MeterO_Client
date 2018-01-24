app.directive('ngModelOnblur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
            
            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });         
            });
        }
    };
});
function MyCtrl($scope) {
      $scope.$watch('rowCollection', function(scope, current, previous) {
    console.log("Watch ran");
    if (current != previous) {
      var actuallyChanged = true;
      for (var i = 0; i < current.length; i++) {
        if (current[i].NewHr == "") {
          actuallyChanged = false;
          break;
        }
      }
      if (actuallyChanged) {
        console.log("Value changed");
        //console.log(angular.toJson($scope.Fields));
        // Imagin that "updatedElem" returned from server
        
      }
    }
  }, true);

}