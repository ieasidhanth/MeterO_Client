<%@ Page Title="" Language="C#" MasterPageFile="~/master_page.Master" AutoEventWireup="true" CodeBehind="MeterO.aspx.cs" Inherits="IEA_InventoryMgmt.TransferEquip" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <link href="css/MeterO/styles.css" rel="stylesheet"/>
    <link href="css/jquery-confirm.min.css" rel="stylesheet"/>
    <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet"/>
    <link href="css/jquery-te-1.4.0.css" rel="stylesheet"/>
    <link href="css/bootstrap-toggle.css" rel="stylesheet"/>
    <script>
        
    </script>
   

     <!-- Font Awesome Css-->
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script type="text/javascript" src="js/moment.js"></script>
    <script src="/bower_components/angular-touch/angular-touch.js"></script>
    <script type="text/javascript" src="js/angular-long-press.js"></script>
    <script type="text/javascript" src="js/bootstrap-toggle.min.js"></script>
    <script type="text/javascript" src="js/MeterO/cutomJquery.js"></script>
    <script type="text/javascript" src="js/TransitEquip/equip_app.js"></script>
    <script type="text/javascript" src="js/MeterO/ajaxService.js"></script>
    <script type="text/javascript" src="js/MeterO/radioButtonControl.js"></script>
    <script type="text/javascript" src="js/MeterO/jquery.inflop.bootstrap.alert.min.js"></script>
    <script type="text/javascript" src="js/jquery-confirm.min.js"></script>
    <script type="text/javascript" src="js/MeterO/underscore.js"></script>
    <script src="js/bootstrap-datetimepicker.min.js"></script>
    <script src="js/ngstorage.min.js"></script>
    <script type="text/javascript" src="js/MeterO/MeterSubmitController.js"></script>
    <script type="text/javascript" src="js/MeterO/lrDragNDrop.js"></script>
    <script type="text/javascript" src="js/MeterO/editBehavior.js"></script>
    <script type="text/javascript" src="js/PageCtrl.js"></script>
    <!--<script type="text/javascript" src="js/MeterO/getJobsCmbXControlller.js"></script>-->
    <script type="text/javascript" src="js/MeterO/getToJobsCmbXController.js"></script>
    <script type="text/javascript" src="js/MeterO/getToLocationCmbXContoller.js"></script>
    <script type="text/javascript" src="js/stStickyHeader.js"></script>
    <script type="text/javascript" src="js/MeterO/smart-table.js"></script>
    <script type="text/javascript" src="js/MeterO/smartTableController.js"></script>
    <script type="text/javascript" src="js/MeterO/modalSmartTableController.js"></script>
    <script type="text/javascript" src="js/MeterO/scheduleJobController.js"></script>
    <script type="text/javascript" src="js/MeterO/TransferButtonController.js"></script>
    <script type="text/javascript" src="js/MeterO/TransferButtonController.js"></script>
    <script type="text/javascript" src="js/MeterO/navTabController.js"></script>
    <script type="text/javascript" src="js/MeterO/signinController.js"></script>
    <script type="text/javascript" src="js/MeterO/MeterSubmitController.js"></script>
    <script type="text/javascript" src="js/MeterO/EditEquipmentsController.js"></script>
    <script type="text/javascript" src="js/MeterO/NotificationController.js"></script>
    <script type="text/javascript" src="js/jquery-te-1.4.0.js"></script>
    <style type="text/css">
    #warning-message { display: none; }
    @media only screen and (orientation:portrait){
        #main_wrapper { display:none; }
        #warning-message { display:block; }
    }
    @media only screen and (orientation:landscape){
        #warning-message { display:none; }
    }
</style>
    
    <!DOCTYPE html >
    <!-- Modal -->
    <div ng-app="equip_app" id="main_wrapper" ng-controller="PageCtrl" >
     <div class="container" id="PageHeading"  >
         <script>

             var showalert = sessionStorage.getItem('showUpdateMessage');
          
          //   alert(stBldr);
             if (showalert==1) {
                 $.confirm({
                     title: '<i class="fa fa-gear" aria-hidden="true"></i>&nbsp;&nbsp;Version Update: MeterO <sub> v1.2</sub>',
                     
                     content: '' +
                     '<hr>'+
                    '<div class="container">' +
                    '<span> Slider Switch available.</span></br></br>' +
                    '&nbsp;&nbsp;<span><i class="fa fa-thumb-tack" aria-hidden="true"></i></span><span>  Ability to filter equipments pending for Meter submit.</span></br></br>' +
                    '&nbsp;&nbsp;<span><i class="fa fa-thumb-tack" aria-hidden="true"></i></span><span>  Equipment row highlighted once meter reading is successfilly saved.</span></br></br>' +
                     '<span> Notes Feature Available.</span></br></br>' +
                    '&nbsp;&nbsp;<span><i class="fa fa-thumb-tack" aria-hidden="true"></i></span><span>  Ability to add Notes to equipment.</span></br></br>' +
                    '&nbsp;&nbsp;<span><i class="fa fa-thumb-tack" aria-hidden="true"></i></span><span>  Delete all notes for the job from Manage Equipments tab.</span></br></br>' +
                    '</div>',
                     columnClass: 'large',
                     theme:'dark',
                    
                     buttons: {
                         Ok: {
                             text: 'Ok',
                             btnClass: 'btn-primary',
                             action: function () {
                                 sessionStorage.setItem('showUpdateMessage', 0);

                             }
                         }
                     }
                 });

             }
             else {
                 //do nothing
             }
         </script>
         <div class="row">
            <div class="col-md-12" ng-controller="getToLocationCmbXContoller">
               
                <nav class="navbar navbar-default">
                  <div class="container-fluid" ng-controller="signinController">
                    <div class="navbar-header">
                      <ol class="breadcrumb">
                          
                          <li style="float:left !important;"><a href="#" ><img src="img/MeterO.png" /></a>&nbsp;&nbsp;<span class="label label-default" style="font-size:15px">MeterO   <sub>v1.2</sub></span></li>
                          
                          
                  
                      </ol>
                    
                    </div>
                      <div class="container-fluid">
                      <p class="navbar-text navbar-right">Signed in as <a href="#" class="navbar-link" ng-click="logOut()">{{UserLoggedIn}}</a></p>
                      </div>
                  </div>
                </nav>
                
                
                <h2>JOB: {{TransferTo.Description}}</h2>
                

            </div>
         </div>
         <div class="row">
            <div class="col-md-12" >
               <!---alert boxes-->
                 <div  id="transfertoNotselected">
                   
                 </div> 
                

            </div>
         </div>

     </div>


    <div style="margin-top:30px" ng-app="equip_app">

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist" id="Tablist" style="border-bottom:hidden !important" ng-controller="navTabController">
        <li role="presentation" class="active tab_select_css" style="float:left !important;" ><a href="#meterentry" aria-controls="home" role="tab" data-toggle="tab"  >Meter Entry</a></li>
        <li role="presentation" style="float:left !important" class="tab_select_css" ng-click="review()" ><a href="#metersubmit" aria-controls="profile"  role="tab" data-toggle="tab"    >Review Submission</a></li>
        <li role="presentation" ng-show="{{ShowEditEquipmentsTab}}" style="float:left !important" class="tab_select_css" ng-click="editEquipments()" ><a href="#editEquipments" aria-controls="profile"  role="tab" data-toggle="tab"    >Manage Equipments</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="meterentry">

            <div class="container" id="form_wrapper"  ng-controller="radioButtonControl"  >
             
         <!-- 1st row-->
        
       <!--- end of row1-->

       <!-- 2nd row-->
    
        <div class="row" style="margin-top:30px;">
            <!-- row 2 column1-->
            <div class="col-md-3 col-sm-4 col-xs-4" style="margin-left:25px !important">
                <!--<div class="btn-group" ng-show="isSelected('job')" ng-controller="getToJobsCmbXController" id="jobDropdown" >-->
                    <div class="btn" ng-controller="getToJobsCmbXController" id="jobDropdown">
                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                            Select JOB &nbsp;
                        </button>
                        <div class="dropdown-menu">
                            <li style="float:unset !important">
                                    <a>
                                        <div class="input-group">
                                              <div class="input-group-addon"><i class="glyphicon glyphicon-search"></i></div>
                                              <input type="text" ng-model="filterjobs" class="form-control" placeholder="search for Jobs"/>
                                              
                                              
                                  
                                         </div>
                                        
                                  </a>
                                                                   
                             </li>
                             <li role="separator" class="divider"><a></a></li>
                            
                            <li ng-repeat="a in tojobs | filter:filterjobs" style="float:unset !important"><a ng-click="dropboxitemselected(a)">{{(a.Job)+'-'+(a.Description)}}</a></li>
                            
                        </div>
                    </div>
                   
               <!-- </div>-->
                
          </div>
       </div>

        <!--- end of row2-->

         <!-- row 3-->
         <%-- <div class="row" style="margin-top:10px;">
                <!-- row 3 column 1-->
                <div class="col-md-6 col-lg-12" >
                    <label style="margin-left:10px;" ><h3>{{EquipmenttableHeading.Description}} Torque Tools available for transfer</h3></label>
                </div>
              <div class="col-md-6 col-lg-12" >
                    <label style="margin-left:10px;" ><h3>{{EquipmenttableHeading.Description}} Torque Tools available for transfer</h3></label>
                </div>
          </div>--%>
        <!--- end of row3-->
         

         <!-- 4th row-->

        <div class="row" style="margin-top:10px;">
            <!-- row 4 column 1-->
            
       </div>
       <!--- end of row4-->
       

       <!-- row 5-- <img id="mySpinner" src="img/gear.gif"/>>
        <div class="row" style="margin-top:10px;">
            <!-- row 5 column 1-->
            <div class="col-md-12 col-sm-12 col-xs-12" ng-controller="getDataCtrl">
                <div id="loader" style="text-align:center;" ng-show="showTableLoadspinner">
                    
                    
                    <h3 ng-show="showTableLoadspinner">Select a Job to view Equipments</h3>
                </div>
                <div class="table-responsive ol-md-12 col-sm-12 col-xs-12" ng-show="showTableLoad">
                    <table st-table="displayedCollection" st-safe-src="rowCollection" class="table table-fixed-header" >
                        <thead>
                              <tr>
                                <th style="border:none;">
                                 <button class="btn btn-sm btn-primary" type="button" aria-haspopup="true" aria-expanded="false" ng-click="Email()" >
                                    <i class="fa fa-share" aria-hidden="true"></i>&nbsp;Export List
                                </button>
                                   
                                </th>
                                
                                <th style="border:none;" ></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <%--<th style="border:none;"></th>
                                <th style="border:none;"></th>--%>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;">
                                  
                                    

                                </th>
                                <th style="border:none;">
                                   <%-- <label class="checkbox-inline"> <input type="checkbox" id="toggle-event"  data-toggle="toggle"> Switch to remaining equipments.</label>--%>
                                    <ul class="list-inline">
                                        
                                        <li class="pull-right">
                                            <input type="checkbox" id="toggle-event"  data-toggle="toggle" data-size="small" data-off="All" data-on="Remaining" data-onstyle="success" data-width="100" ng-click="toggleOffByInput()"/>
                                        </li>
                                    </ul>
                                </th>
                            </tr>
                            <tr style="border:none;">
                                
                                
                                <th style="border:none;" ><label  >Total Equipments:&nbsp{{ecount}}</label></th>
                                <th style="border:none;" ><label  >Showing:&nbsp{{ShowingCurrentCount}}</label></th>
                              
                                <th style="border:none;"><button type="button" class="btn btn-info btn-sm" ng-click="refresh()"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;Refresh</button></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <%--<th style="border:none;"></th>
                                <th style="border:none;"></th>--%>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;">
                                    <ul class="list-inline">
                                        <li class="pull-right" >
                                            <div><label >Page Items</label></div>
                                        </li>
                                        <li class="pull-right">
                                            <input class="form-control" style="width:80px;margin:auto" type="number" value="42" id="itemsByPage" ng-model="itemsByPage" placeholder="Items Per Page"/>
                                        </li>
                                    </ul>
                                    

                                </th>
                            </tr>
                          
                            <tr>
                                <th>Notes</th>                             
                                <th st-sort="EquipmentID">Equipment No.</th>
                                <th st-sort="SerialNO">Serial No.</th>
                                <th st-sort="Description">Description</th>
                                <th st-sort="LicenseNumber">License No.</th>
                                <%--<th st-sort="HourReading">Last Rec Hrs</th>
                                <th st-sort="OdoReading">Last Rec Odo</th>--%>
                                
				<th st-sort="udReferenceNumber">Ref Num</th>
                                <th >New Hour</th>
                                <th >New Odo</th>
                                <th >
                                     <button type="button"  class="btn btn-sm btn-primary" ng-click="SaveAll(row)"  ng-hide="true">
					                    Save All
				                    </button>
                                </th>
                                
                                
                            </tr>
                            <tr>
                                 <th>
                                    <input st-search="HasNotes" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="Equipment" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="SerialNo" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                
                                <th>
                                    <input st-search="Description" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="LicenseNumber" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                               <%-- <th>
                                    
                                </th>
                                <th>
                                    
                                </th>--%>
                                <%--<th>
                                    <%--<input st-search="JobAssign" placeholder="" class="input-sm form-control" type="search" />
                                </th>--%>
                                <th>
                                    <input st-search="udReferenceNumber" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                
                            </tr>
                            
                        </thead>
                        <tbody >
                            <tr  ng-repeat="row in displayedCollection" ng-class="getClass(row)"  on-long-press="alert(row)" on-touch-end="onTouchEnd()" prevent-click="true" >
                                <td>
                                    <span>
                                        <button type="button" class="btn btn-circle btn-group-sm btn-primary" ng-click="addnotes(row)">
                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                    </span>
                                    <%--<span>
                                        <button type="button" class="btn btn-circle btn-primary btn-group-sm">
                                            <i class="fa fa-envelope" aria-hidden="true"></i>
                                        </button>
                                    </span>--%>
                                </td> 
                                <td>{{row.Equipment}}</td>
                                <td>{{row.SerialNo}}</td>
                                <td>{{row.Description}}</td>
                                <td>{{row.LicenseNumber}}</td>
                                <%--<td>{{row.HourReading}}</td>
                                <td>{{row.OdoReading}}</td>--%>
                                
                                <td>{{row.udReferenceNumber}}</td>
                                <td>
				                    <input  placeholder="" class="input-sm form-control number-only" type="number"  pattern="[0-9.]*" step="any"   title="Non Negative number" ng-model="row.NewHr" value="{{row.NewHr}}"ng-model-options="{updateOn: 'blur'}" style="width:100px !important"/>
				                </td>
                                <td>
				                    <input  placeholder="" class="input-sm form-control number-only" type="number"  pattern="[0-9.]*" step="any" title="Non Negative number" ng-model="row.NewOdo" value="{{row.NewOdo}}" ng-model-options="{updateOn: 'blur'}" style="width:100px !important"/>
				                 </td>
                                <td>
				                    <button type="button"  class="btn btn-sm btn-primary" ng-click="save(row)" style="float:right">
					                    Save
				                    </button>
				                 </td>
                             

                                <!--<td>
				<button type="button" ng-click="removeItem(row)" class="btn btn-sm btn-danger">
					<i class="glyphicon glyphicon-remove-circle">
					</i>
				</button>
				</td>-->
                            </tr>
                            

                        </tbody>
                        <tfoot>
                            <tr>
                                
                                
                                
                                <td colspan="11" class="text-center" style="border:none !important;">
                                    <div st-template="pagination.html" st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5">                                       
                                    </div>
                                    
                                </td>
                                
                                
                                
                            </tr>
                            
                            
                        </tfoot>
                    </table>
                </div>
               



            </div>
       </div>
      <!--- end of row5-->

      <!-- row 6-->
         <div class="row" style="margin-top: 10px;">
             <!--- row 6 column 1-->
             <!--<div class="col-md-6 col-lg-12" ng-controller="getToLocationCmbXContoller">
                 <label style="margin-left: 10px;">
                     <h3>Transfer to {{TransferTo.Description}}</h3>
                 </label>
             </div>-->
        </div>
      <!-- end of row6-->
      <!-- row7-->
        <div class="row" style="margin-top:10px;margin-bottom:10px">
          
       </div>





        </div>
        <div role="tabpanel" class="tab-pane fade" id="metersubmit" >
            <div class="container" id="form_wrapper">
             
      

        <div class="row" style="margin-top:10px;">
            <!-- row 4 column 1-->
          
       </div>
       <!--- end of row4-->
       

       <!-- row 5-- <img id="mySpinner" src="img/gear.gif"/>>
        <div class="row" style="margin-top:10px;">
            <!-- row 5 column 1-->
            <div class="col-md-12 col-sm-12 col-xs-12" ng-controller="MeterSubmitController" >
               
                <div class="table-responsive ol-md-12 col-sm-12 col-xs-12" >
                    <table st-table="displayedCollection" st-safe-src="rowCollection1" class="table" >
                        <thead>
                            <tr>
                                <th style="border:none;" colspan="10">
                                    <label  >Readings saved successfully for &nbsp{{reviewecount}} / {{TotalJobEquipments}} equipments</label>
                                </th>

                            </tr>
                            <tr style="border:none;">
                                <th style="border:none;" ng-show="showAdminControl" ></th>
                                <th style="border:none;">
                                <th style="border:none;">
                                    
                                </th>
                                <th style="border:none;" ></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;width:150px !important;text-align:right !important">
                                    <div>
                                                <label>Page Items</label></div>
                                    

                                </th>
                                <th style="border:none;">
                                    <ul class="list-inline">
                                       <%-- <li class="pull-left" >
                                            <div style="text-align:right;"><label >Page Items</label></div>
                                        </li>--%>
                                        <li class="pull-right">
                                            <input class="form-control" style="width:70px;margin:auto" type="number" value="42" id="itemsByPage" ng-model="itemsByPage" placeholder="Items Per Page"/>
                                        </li>
                                    </ul>
                                    

                                </th>
                            </tr>
                            <tr>
                                <th style="border:none;" ng-show="showAdminControl"></th>
                                <th st-sort="HasNotes">Notes</th>                                
                                <th st-sort="EquipmentID">Equipment No.</th>
                                <th st-sort="SerialNO">Serial No.</th>
                                <th st-sort="Description">Description</th>
                                <th st-sort="LicenseNumber">License No.</th>
                                <th st-sort="HourReading">Last Rec Hrs</th>
                                <th st-sort="OdoReading">Last Rec Odo</th>
                                <th st-sort="AssignedJob">Job Assign</th>
                                <th >New Hour</th>
                                <th >New Odo</th>
                                <th st-sort="CreatedBy">Entered By</th>
                                
                                
                            </tr>
                            <tr>
                               <th style="border:none;" ng-show="showAdminControl"></th>
                                <th>
                                    <input st-search="HasNotes" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="Equipment" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="SerialNo" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                
                                <th>
                                    <input st-search="Description" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="LicenseNumber" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    
                                </th>
                                <th>
                                    
                                </th>
                                <th>
                                    <input st-search="JobAssign" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    
                                </th>
                                <th>
                                    
                                </th>
                                <th>
                                    <%--<input st-search="CreatedBy" placeholder="" class="input-sm form-control" type="search" />--%>
                                </th>

                                
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr  ng-repeat="row in displayedCollection" >
                                <td ng-show="showAdminControl">
                                    <button type="button" ng-click="removeItem(row)" class="btn btn-circle btn-warning">
					                    <i class="glyphicon glyphicon-remove"> </i>
				                    </button>
                                </td>
                                <td style="text-align:center"> 
                                    <button type="button" ng-click="showNotes(row)" class="btn btn-primary btn-sm " ng-show="{{row.HasNotes}}">
					                    <i class="fa fa-sticky-note" aria-hidden="true"></i>
				                    </button>

                                </td>   
                                <td>{{row.Equipment}}</td>
                                <td>{{row.SerialNo}}</td>
                                <td>{{row.Description}}</td>
                                <td>{{row.LicenseNumber}}</td>
                                <td>{{row.HourReading}}</td>
                                <td>{{row.OdoReading}}</td>
                                <td>{{row.JobAssign}}</td>
                                <td>
				                    {{row.NewHr}}
				                </td>
                                <td>
				                    {{row.NewOdo}}
				                 </td>
                                <td>
				                    {{row.CreatedBy}}
				                 </td>
                                
                             

                                <!--<td>
				<button type="button" ng-click="removeItem(row)" class="btn btn-sm btn-danger">
					<i class="glyphicon glyphicon-remove-circle">
					</i>
				</button>
				</td>-->
                            </tr>
                            

                        </tbody>
                        <tfoot>
                            <tr>
                                
                                
                                
                                <td colspan="10" class="text-center" style="border:none !important;">
                                    <div st-template="pagination_review.html" st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5">                                       
                                    </div>
                                    
                                </td>
                                
                                
                                
                            </tr>
                            <tr>
                                
                                
                                
                                <td colspan="10" class="text-center" style="border:none !important;" ng-show="{{showSubmit}}" >
                                    <button type="button"  class="btn btn-sm btn-danger"  ng-click="verifyEquipSubmit()" 
			                            <i class="glyphicon glyphicon-calendar"></i> Submit
		                            </button>
                                    
                                </td>
                                
                                
                                
                            </tr>
                            
                            
                        </tfoot>
                    </table>
                </div>
               



            </div>
       </div>
      <!--- end of row5-->

      <!-- row 6-->
         <div class="row" style="margin-top: 10px;">
             <!--- row 6 column 1-->
             <!--<div class="col-md-6 col-lg-12" ng-controller="getToLocationCmbXContoller">
                 <label style="margin-left: 10px;">
                     <h3>Transfer to {{TransferTo.Description}}</h3>
                 </label>
             </div>-->
        </div>
      <!-- end of row6-->
      <!-- row7-->
        <div class="row" style="margin-top:10px;margin-bottom:10px">
          
       </div>

        </div>
        <div role="tabpanel" class="tab-pane" id="editEquipments">
            <div class="container" id="form_wrapper">
             
      

        <div class="row" style="margin-top:30px;" ng-controller="EditEquipmentsController">
            <!-- row 4 column 1-->
            <div class="col-md-3 col-sm-4 col-xs-4" style="margin-left:35px !important">
                 <button class="btn btn-sm btn-primary" type="button" aria-haspopup="true" aria-expanded="false" ng-click="EmailQuery()">
                                        <i class="fa fa-share" aria-hidden="true"></i>&nbsp;Submit Query to EM
               </button>
            </div>
             
          
       </div>
       <!--- end of row4-->
       

       <!-- row 5-- <img id="mySpinner" src="img/gear.gif"/>
        <div class="row" style="margin-top:10px;">
            <!-- row 5 column 1-->
            <div class="col-md-12 col-sm-12 col-xs-12" ng-controller="EditEquipmentsController" style="margin-top:30px;">
                <div class="table-responsive ol-md-12 col-sm-12 col-xs-12">
                    <table st-table="displayedCollection" st-safe-src="equipCollection" class="table">
                        <thead>
                            <%--<tr style="border: none;">
                                <th style="border: none;">
                                    <button class="btn btn-sm btn-primary" type="button" aria-haspopup="true" aria-expanded="false" ng-click="EmailQuery()">
                                        <i class="fa fa-share" aria-hidden="true"></i>&nbsp;Submit Query to EM
                                    </button>

                                </th>
                            </tr>--%>
                            <tr style="border: none;">
                                 
                                 <th style="border:none;" ></th>
                                 <th style="border:none;" >
                                     
                                 </th>
                                <th style="border: none;">
                                    <%--<label>Total Equipments:&nbsp{{ecount}}</label>--%>
                                </th>
                               
                                <th style="border: none;"></th>
                                <th style="border: none;"></th>
                                <th style="border: none;"></th>
                                <th style="border: none;"></th>
                                <th style="border: none;width:150px !important;text-align:right !important">
                                     <div>
                                                <label>Page Items</label></div>
                                </th>


                                <th style="border: none;">
                                    <ul class="list-inline">
                                        <%--<li class="pull-left">
                                            <div>
                                                <label>Items Per Page</label></div>
                                        </li>--%>
                                        <li class="pull-right">
                                            <input class="form-control" style="width: 80px; margin: auto" type="number" value="42" id="itemsByPage" ng-model="itemsByPage" placeholder="Items Per Page" />
                                        </li>
                                    </ul>


                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:center;border:none !important;width: 1%;" ></th>
                                <th>Notes &nbsp;&nbsp;<span><button type="button" class="btn btn-circle btn-danger" ng-click="clearall()"><i class="fa fa-trash" aria-hidden="true"></i></button></span></th>
                                <th st-sort="EquipmentID">Equipment No.</th>
                                <th st-sort="SerialNO">Serial No.</th>
                                <th st-sort="Description">Description</th>
                                <th st-sort="LicenseNumber">License No.</th>

                                <th st-sort="AssignedJob">Job Assign</th>
                                <th st-sort="udReferenceNumber" style="width:100px;">Reference</br> Number</th>



                            </tr>
                            <tr>
                                 <th style="text-align:center;border:none !important;width: 1%;">

                                </th>
                                <th>
                                    <input st-search="HasNotes" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="Equipment" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="SerialNo" placeholder="" class="input-sm form-control" type="search" />
                                </th>

                                <th>
                                    <input st-search="Description" placeholder="" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="LicenseNumber" placeholder="" class="input-sm form-control" type="search" />
                                </th>

                                <th>
                                    <input st-search="JobAssign" placeholder="" class="input-sm form-control" type="search" />
                                </th>

                                <th>
                                    <input st-search="udReferenceNumber" placeholder="" class="input-sm form-control" type="search" style="width:100px;" />
                                </th>


                            </tr>

                        </thead>
                        <tbody>
                            <tr ng-repeat="row in displayedCollection">
                                <td style="white-space: nowrap;width: 50px !important;border:none !important;text-align:left">
                                    <button type="button"  class="btn btn-sm btn-primary" ng-click="emailEquipment(row)" >
					                    <i class="fa fa-envelope" aria-hidden="true"></i>
				                    </button>

                                </td>
                                <td>{{row.Notes}}</td> 
                                <td><%--<span>
                                    <button type="button" class="btn btn-sm btn-primary" ng-click="emailEquipment(row)">
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                    </button>
                                </span>&nbsp;--%>{{row.Equipment}}</td>
                                <td>{{row.SerialNo}}</td>
                                <td>{{row.Description}}</td>
                                <td>{{row.LicenseNumber}}</td>

                                <td>{{row.JobAssign}}</td>
                                <td>

                                    <input placeholder="" class="input-sm form-control number-only" type="text" ng-model="row.udReferenceNumber" value="{{row.udReferenceNumber}}" ng-model-options="{updateOn: 'blur'}" style="width:100px;" />



                                </td>
                                <td style="border: none !important;text-align:right;">
                                    <button type="button" class="btn btn-sm btn-danger" ng-click="update(row)">
                                        Update
                                    </button>
                                </td>




                                <!--<td>
				<button type="button" ng-click="removeItem(row)" class="btn btn-sm btn-danger">
					<i class="glyphicon glyphicon-remove-circle">
					</i>
				</button>
				</td>-->
                            </tr>


                        </tbody>
                        <tfoot>
                            <tr>



                                <td colspan="10" class="text-center" style="border: none !important;">
                                    <div st-template="pagination_review.html" st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5">
                                    </div>

                                </td>



                            </tr>
                            <tr>



                                <td colspan="10" class="text-center" style="border: none !important;" ng-show="{{showSubmit}}">
                                    <button type="button" class="btn btn-sm btn-danger">
                                        <i class="glyphicon glyphicon-calendar"></i>Submit
                                    </button>

                                </td>



                            </tr>


                        </tfoot>
                    </table>
                </div>
               



            </div>
       </div>



        </div>
        <div role="tabpanel" class="tab-pane" id="settings">...</div>
      </div>

    </div>

     

     <!-- end of row7-->

        
        <!-- <div id="myModal" class="modal fade" role="dialog">
             <div class="modal-dialog">

                 Modal content
                 <div class="modal-content">
                     <div class="modal-header">
                         <button type="button" class="close" data-dismiss="modal">&times;</button>
                         <h4 class="modal-title">Modal Header</h4>
                     </div>
                     <div class="modal-body">
                         <p>To be Transfered</p>
                         <div ng-controller="getDataCtrl">
                             <li ng-repeat="a in equipmentsSelected track by $index"><a>Equipment ID {{a.Equipment}}  Equipment Name {{a.Description}} </a></li>
                         </div>
                     </div>
                     <div class="modal-footer">
                         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                     </div>
                 </div>

             </div>
         </div>-->

         <!--- modal grid--->
         <div id="gridSystemModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
             <div class="modal-dialog modal-lg" role="document">
                 <div class="modal-content">
                     <div class="modal-header">
                         <button type="button" class="close" data-dismiss="modal" id="modalclose" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                         <h4 class="modal-title" id="gridModalLabel"></h4>
                         <br />
                         
                     </div>
                     <div class="modal-body">
                         <div class="container-fluid bd-example-row">
                           
                             <div class="row" >
                                 <div class="col-md-12 col-sm-12 col-xs-12">
                                     <div class="table-responsive col-md-12 col-sm-12 col-xs-12" ng-controller="MeterSubmitController">
                                         <table st-table="displayedCollection" st-safe-src="remainingEquipments" class="table">
                                             <thead>
                                                 
                                                 <tr>
                                                     <th style="text-align:center;border:none !important"></th>
                                                     <th st-sort="EquipmentID" style="white-space: nowrap;">Tool ID</th>
                                                     <th st-sort="SerialNO">Serial No</th>
                                                     
                                                     <th st-sort="EDescription">Tool Description</th>
                                                    
                                                     
                                                 </tr>

                                               
                                             </thead>
                                             <tbody >
                                                 <tr ng-repeat="row1 in displayedCollection" >
                                                     <td style="white-space: nowrap;width: 1%;border:none !important"><i class="fa fa-link fa-1x"  aria-hidden="true" ng-show="{{row1.Attachment}}" data-toggle="tooltip" data-placement="top"  title="{{((row1.AttachToEquip)+' - '+(row1.AttachmentDesc))+' will be included in batch'}}" href="#" class="btn"  ng-click="$event.stopPropagation();"  ></i></td>
                                                     <td>{{row1.EquipmentID}}</td>
                                                     <td>{{row1.SerialNo}}</td>
                                                     
                                                     <td>{{row1.Description}}</td>
                                                     <td>{{row1.JobDescription}}</td>

                                                     
                                                 </tr>

                                             </tbody>
                                             <tfoot>
                                                 <tr>
                                                     <td colspan="5" class="text-center" style="border:none !important;">
                                                         <div st-template="pagination_modal_select.html" st-pagination="" st-items-by-page="5" st-displayed-pages="10"></div>
                                                     </td>

                                                 </tr>
                                             </tfoot>
                                         </table>
                                         
                                         <!--<span style="float:right;"><h4> <span class="label label-info"><i class="glyphicon glyphicon glyphicon-cog"></i> {{SelectedItemCount}} tool/s in the job</span></h4></span>-->

                                     </div>  
                                 
                                 </div>
                                 
                     
                   
                             </div>

                          
                     <div class="modal-footer" ng-controller="scheduleJobController" >
                      
                            
                                        
                         
                         
                         <button type="button"  class="btn " data-dismiss="modal" ng-click="reload()">Cancel</button>
                         <button type="button"  class="btn btn-primary" ng-click="">Submit</button>
                     </div>
                </div>
             </div>
                </div>
         

            </div>
         </div>  
        
        </div> 
    
    <div id="warning-message">
    this website is only viewable in landscape mode
    </div>   
</asp:Content>
