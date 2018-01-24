app.controller('getDataCtrl', ['$scope','ajaxService','$rootScope', function ($scope, ajaxService,$rootScope) {

    
    var equipments = [];
    var descriptions = [];
    var manufacturers = [];
    //var data = { 'jobId': '1000' };
    var data = {  };
    var getEquipmentssurl = 'http://10.10.10.75:60000/api/icontrol/gettorquetools';
    //ajax service call for page load
    $rootScope.showTableLoad=false;
    $rootScope.showTableLoadspinner=true;

    ajaxService.getReq(getEquipmentssurl,data)
               .then(function(values){
                console.log(values.data);
                $rootScope.showTableLoadspinner=false;
                $scope.rowCollection = values.data;
                $rootScope.showTableLoad=true;
               // $scope.status = values.data[0];
                console.log(values[0]);
        });

   
 

    
    //for handling dropdownchanged event
    $rootScope.$on('dropboxchanged', function (event, args) {
        var jobId =args.jobId;
        var data = { 'jobId': jobId };
        //alert('from smarttable'+jobId);
        ajaxService.postReq(getEquipmentssurl,data)
               .then(function(values){
                //console.log(values.data);
                $scope.rowCollection = values.data;
               //$scope.$digest();
             
               // $scope.status = values.data[0];
                //console.log(values[0]);
        });
    });





//for handling flush event
      $rootScope.$on('flushItems', function (event, args) {
        //alert("flush fired");
        angular.forEach($scope.rowCollection, function(item){
            item.isSelected=false;

        });
    });

      $rootScope.$on('resetscope', function (event, args) {
        $scope.$digest();

      });

      //for handling modal close event
      $rootScope.$on('removerow', function (event, args) {
        
        angular.forEach($scope.rowCollection, function(item){
            item.isSelected=false;

        });

       angular.forEach($rootScope.equipmentsSelected,function(item){
        var row=_.findWhere($scope.rowCollection, {SerialNo: item["SerialNo"]});
        row.isSelected=true;
        $scope.$digest();
        
        //deselct all
        if($rootScope.equipmentsSelected.length==0)
        {
            angular.forEach($scope.rowCollection, function(item){
            item.isSelected=false;

        });

        $scope.$digest();

        }

       });

       // console.log("Equipments selected :"+$rootScope.equipmentsSelected);
       
    });

    function syncEquipmentsSelected(item)
    {
        angular.forEach($scope.rowCollection,function(row){
            if(item["SerialNo"]==row["SerialNo"])
            {
                row.isSelected=true;
            }
            else
            {
                row.isSelected=false;
            }

        });

        

    }




                



            var tableLoadFlag =-1;
            $rootScope.equipmentsSelected=[{}];
            $rootScope.equipmentsSelected.splice(0,1);
            var isalreadyadded=-1;
/*            $scope.$watch('displayedCollection', function(row1){
              
              // get selected row
              row1.filter(function(r) {
                //check if in array or not
                isalreadyadded=search(row1,$rootScope.equipmentsSelected)
                if(isalreadyadded>0)
                    console.log("row found at position "+isalreadyadded+1);
                else
                    console.log("row not found");
                 if (r.isSelected & isalreadyadded<0) {

                    var i=-1;
                    console.log("function call for search    :   row "+r.Equipment+" Collection "+$rootScope.equipmentsSelected)
                    i=search(r,$rootScope.equipmentsSelected);
                    console.log(i);
                    //alert(index);
                    if(i<0)
                    {
                        tableLoadFlag =1;
                        $rootScope.equipmentsSelected.push(r);
                        console.log("element added "+r.Equipment);
                        console.log("collection length "+ $rootScope.equipmentsSelected.length)

                    }
                   //console.log(r);
                   

                 }
                 else if (i>0 & tableLoadFlag>0)
                 {
                    
                    var index =-1;
                    if($rootScope.equipmentsSelected)
                    $rootScope.equipmentsSelected.pop();
                    index=search(row1,$rootScope.equipmentsSelected);
                    if(index>0)
                    {
                        $rootScope.equipmentsSelected.splice(index,1);
                    }


                 }
                 else
                 {
                    //alert("doing nothing");
                 }
              })
            }, true);*/
             $rootScope.deleteRowIndex=-1;
            search=function (row){
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
        


tableLoadFlag=0;
function addRow(row)
{
    console.log("adding row with equipment id"+ row.SerialNo);
    $rootScope.equipmentsSelected.push(row);


};

function removeRow()
{
    
        console.log("removing element at position "+$rootScope.deleteRowIndex);
        $rootScope.equipmentsSelected.splice($rootScope.deleteRowIndex,1);



}

$scope.rowSelect =function(row)
{
    if($rootScope.TransferTo!=null)
    {
    //alert('selected row with equipment id '+row.SerialNo);
    //alert($rootScope.TransferTo["Job"]);
    //alert(row["JobID"]);
    if($rootScope.TransferTo["Job"]==row["JobID"])
    {
        row.isSelected=false;
        $.confirm({
                    icon:' fa fa-exclamation fa-2x',
                    title: 'Error',
                    content: '<strong>Tool origin and destination are same </br> This tool cannot be selected</strong>',
                    type: 'dark',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Ok',
                            btnClass: 'btn-red',
                            action: function(){

                            }
                        }
                    }
                });

    }
    else
    {
         if(row.isSelected)
    {
        //alert('selected row with equipment id '+row.Equipment);
        if(row["Locked"]=='false')
        {
            //alert('Locked');
        
        var i=-1;
       // i=search(row);
        if(i<0)
        {
            addRow(row);
        }
        else
        {

        }
     }
     else
     {
        row.isSelected=false;

     }
    }
     else if(!row.isSelected)
    {
        // tableLoadFlag=1;
        console.log("removing row with equipment id "+row.SerialNo);
        
        search(row);

        removeRow();
        
    }

    }

    
   
 }
 else
 {
    //alert('Please select transfer location');
    row.isSelected=false;
    $.confirm({
                    icon:' fa fa-exclamation fa-1x',
                    title: 'Warning',
                    content: 'Please select a destination location',
                    type: 'dark',
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Ok',
                            btnClass: 'btn-default',
                            action: function(){
                                $("html, body").animate({ scrollTop: 0 }, "slow");

                            }
                        }
                    }
                });

 }
}



    /*//for no of selected items.Note history is not maintained
    $scope.$watch('displayedCollection', function (newVal) {
        console.log("selected items: " + newVal.filter(function (item) {
            return item.isSelected;
        }).length);
    }, true);*/



    //adding and removing data
    var id = 1;
    function generateRandomItem(id) {

        var equipment = equipments[Math.floor(Math.random() * 3)];
        var description = descriptions[Math.floor(Math.random() * 3)];
        var Manufacturer = manufacturers[Math.floor(Math.random() * 3)];
        

        return {
            id: id,
            Equipment: equipment,
            Description: description,
            Manufacturer: new Date(Manufacturer),
            
        }
    }
    $scope.itemsByPage = 10;
    $scope.rowCollection = [];

    for (id; id < 5; id++) {
        $scope.rowCollection.push(generateRandomItem(id));
    }

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }

    //for unlock batch event
    $rootScope.$on('BatchUnlocked', function (event, args) {
        //alert("yabadabadoo");
        $rootScope.showTableLoadspinner=true;
        $rootScope.showTableLoad=false;
       /* $.ajax({
                 url: getEquipmentssurl,
                 dataType: 'json',
                 data: JSON.stringify(data),
                 method: 'GET'
               }).done(function (response) 
                    {
 
                      $rootScope.showTableLoadspinner=false;
                      console.log(response[0]);
                      $scope.rowCollection = response;
                      $rootScope.showTableLoad=true;
                            
                                    
                    }).fail(function()
                        {
                                    
                        });*/

        ajaxService.getReq(getEquipmentssurl,data)
               .then(function(values){
                console.log(values.data);
                $rootScope.showTableLoadspinner=false;
                $scope.rowCollection = values.data;
                $rootScope.showTableLoad=true;
               // $scope.$digest();
                
        });
      


    });

    $scope.viewHistory=function(row){
            //alert("hello");
            var data=row.EquipmentID;
            var myObj = { "EquipmentID":row.EquipmentID};
            var myJSON = JSON.stringify(myObj);
            var getEquipmentHistoryURL="http://10.10.10.75:60000/api/icontrol/TrackEquipment";
            ajaxService.postReq(getEquipmentHistoryURL,myJSON)
                                            .then(function(values)
                                            {
                                                var stBldr='';
                                                stBldr+="<div class='table-responsive'>";
                                                stBldr+="<table class='table table-reflow'>";
                                                stBldr+="<thead class='thead-inverse'>";
                                                stBldr+='<tr>';
                                                stBldr+='<th>#</th>';
                                                stBldr+='<th>Date In</th>';
                                                stBldr+='<th>Time In</th>';
                                                stBldr+='<th>Transferred To</th>';
                                                stBldr+='<th>Initiated On</th>';
                                                stBldr+='<th>Initiated By</th>';
                                                stBldr+='</tr>';
                                                stBldr+="</thead>";
                                                stBldr+="<tbody>";
                                                stBldr+='<tr>';
                                                var count=1;
                                                $.each(values.data,function(i,v){
                                                stBldr+='<tr>';
                                                if($(v)[0].JobDesc=="" && $(v)[0].LocationDesc!="")
                                                {
                                                    var TransferedTo= $(v)[0].LocationDesc;

                                                }
                                                else if($(v)[0].JobDesc!="" && $(v)[0].LocationDesc=="")
                                                {
                                                    var TransferedTo= $(v)[0].JobDesc;


                                                }
                                                stBldr+='<td>'+count+'</td>'+'<td>'+$(v)[0].DateIn.split("T",1)+'</td><td>'+$(v)[0].TimeIn.split("T")[1]+'</td><td>'+TransferedTo+'</td><td>'+$(v)[0].CreatedDate.split("T",1)+'</td><td>'+$(v)[0].CreatedBy+'</td>';
                                                stBldr+='</tr>';
                                                count++;
                                                });
                                                stBldr+="</tbody>";
                                                stBldr+='</table>';
                                                stBldr+='</div>';

                                                var str=$(stBldr);
                                               // alert(str);
                                                $.confirm({
                                                          columnClass:'large',
                                                          icon:'glyphicon glyphicon-info-sign',
                                                          title: 'Recent 10 Transfers for '+row.EquipmentID+': '+row.Description,
                                                          content: str,
                                                          containerFluid:true,
                                                          type: 'dark',
                                                          typeAnimated: true,
                                                          buttons: {
                                                              Continue: {
                                                                  text: 'Back',
                                                                  btnClass: 'btn-primary',
                                                                  action: function(){
                                                                        //$window.location.reload();
                                                                  }
                                                              }
                                                          }
                                                });
        //alert(item.EquipmentID);
                                            })
  
}}]);


