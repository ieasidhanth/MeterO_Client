app.controller('modalSmartTableController', ['$scope','$rootScope','ajaxService','$window', function($scope,$rootScope,ajaxService,$window){

	$scope.selectedRowCollection = $rootScope.equipmentsSelected;

    $("#modalclose").click(function () {
    // put your default event here
    //alert("hello");
    if($rootScope.equipmentsSelected.length==0)
    {
        $rootScope.$broadcast('resetscope',{});
    }
    });
    
    console.log($scope.selectedRowCollection);
    if($scope.selectedRowCollection.length==0)
    {
        $rootScope.showNoRowselectedwarning=true;

    }
    else
    {
        $rootScope.showNoRowselectedwarning=false;

    }
    

	modalsearch=function (row){
                //console.log("row"+row);
                //console.log("array length "+myArray.length);
               // console.log("searching row with equipmentId "+row.Equipment);
                //console.log("in collection with length "+$rootScope.equipmentsSelected.length);
                if($rootScope.equipmentsSelected.length==0)
                    return -1;
                else
                {       /*console.log($rootScope.equipmentsSelected.length);
                        var j=0; 
                        for (j=0; j < $rootScope.equipmentsSelected.length; j++;) 
                        {
                            var elemnet=$rootScope.equipmentsSelected[j];
                            console.log("comparing element id "+elemnet.Equipment +" with element id "+row.Equipment);
                                if ($rootScope.equipmentsSelected[j]["Equipment"] === row.Equipment) 
                                {
                                    return j;
                                }
                                else
                                {
                                    return -1;
                                }
                                console.log(j);

                        }*/
                        var searchindex=0;
                        angular.forEach($rootScope.equipmentsSelected, function(item)
                        {

                              if(item.SerialNo == row.SerialNo)
                              {
                                console.log("element found at "+searchindex);
                                $rootScope.deleteRowIndex=searchindex;
                                console.log("set deleterowindex to "+$rootScope.deleteRowIndex);
                                 return searchindex;

                              }
                              searchindex++;
                        });
               }
                
            }
        



function modalremoveRow()
{
    
        console.log("removing element at position "+$rootScope.deleteRowIndex);
        console.log($rootScope.equipmentsSelected.length);
        $rootScope.equipmentsSelected.splice($rootScope.deleteRowIndex,1);
        $rootScope.$broadcast('removerow',{});



}

$scope.modalRowDelete =function(row)
{
    $.confirm({
    icon:'fa fa-info-circle fa-2x',
    title: 'Remove tool',
    columnClass: 'medium',
    type:'red',
    animation:'RotateYR',
    closeAnimation:'RotateXR',
    autoClose: 'Cancel|8000',
    content: '<b>Caution: You are about to remove the following tool </b></br></br><b> Tool Description:</b><strong>'+row.Description+"</strong></br></br><b> Tool Serial No: </b><strong>"+row.SerialNo+"</strong></br></br><b> Tool ID: </b><strong>"+row.EquipmentID+"</strong>",
    buttons:{
        Yes:{
            text: 'Proceed',
            btnClass: 'btn-primary',
            keys: ['enter', 'p'],
            action: function(){
                // button action.
                console.log("removing row with equipment id "+row.SerialNo);
                
                modalsearch(row);

                modalremoveRow();
                $rootScope.SelectedItemCount--;
                $scope.$digest();
                $scope.selectedRowCollection = $rootScope.equipmentsSelected;
                $scope.$digest();
               
                //$rootScope.$digest();
                if($rootScope.equipmentsSelected.length==0)
                    {
                        $rootScope.showNoRowselectedwarning=true;

                    }
                    else
                    {
                        $rootScope.showNoRowselectedwarning=false;

                    }

                    }

        },
        Cancel:{
            action: function(){
                // button action.
                //alert('clicked no');
            }

        }
    }
    });
  /*  alert('You Are about to remove\n Equipment Description: '+row.Description+"\n Equipment Serial No: "+row.SerialNo+"\n Equipment ID: "+row.EquipmentID);

    
        console.log("removing row with equipment id "+row.SerialNo);
        
        modalsearch(row);

        modalremoveRow();
        $rootScope.SelectedItemCount--;
        if($rootScope.equipmentsSelected.length==0)
            {
                $rootScope.showNoRowselectedwarning=true;

            }
            else
            {
                $rootScope.showNoRowselectedwarning=false;

            }*/
        
   
}


	
}])