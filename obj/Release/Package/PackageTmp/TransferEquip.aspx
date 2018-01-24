<%@ Page Title="" Language="C#" MasterPageFile="~/master_page.Master" AutoEventWireup="true" CodeBehind="TransferEquip.aspx.cs" Inherits="IEA_InventoryMgmt.TransferEquip" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <link href="css/TransEquip/styles.css" rel="stylesheet"/>
    <link href="css/jquery-confirm.min.css" rel="stylesheet"/>
    <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet"/>
    
   

     <!-- Font Awesome Css-->
    <link href="css/font-awesome.min.css" rel="stylesheet"/>
    <script type="text/javascript" src="js/moment.js"></script>
    
    
    <script type="text/javascript" src="js/TransitEquip/cutomJquery.js"></script>
    <script type="text/javascript" src="js/TransitEquip/equip_app.js"></script>
    <script type="text/javascript" src="js/TransitEquip/ajaxService.js"></script>
    <script type="text/javascript" src="js/TransitEquip/radioButtonControl.js"></script>
    <script type="text/javascript" src="js/TransitEquip/jquery.inflop.bootstrap.alert.min.js"></script>
    <script type="text/javascript" src="js/jquery-confirm.min.js"></script>
    <script type="text/javascript" src="js/TransitEquip/underscore.js"></script>
    <script src="js/bootstrap-datetimepicker.min.js"></script>
    <script src="js/ngstorage.min.js"></script>
    <script type="text/javascript" src="js/PageCtrl.js"></script>
    
   
    
    <!--<script type="text/javascript" src="js/TransitEquip/getJobsCmbXControlller.js"></script>-->
    <script type="text/javascript" src="js/TransitEquip/getToJobsCmbXController.js"></script>
    <script type="text/javascript" src="js/TransitEquip/getToLocationCmbXContoller.js"></script>
    <script type="text/javascript" src="js/TransitEquip/smart-table.js"></script>
    <script type="text/javascript" src="js/TransitEquip/smartTableController.js"></script>
    <script type="text/javascript" src="js/TransitEquip/modalSmartTableController.js"></script>
    <script type="text/javascript" src="js/TransitEquip/scheduleJobController.js"></script>
    <script type="text/javascript" src="js/TransitEquip/TransferButtonController.js"></script>
    
    <script type="text/javascript" src="js/TransitEquip/signinController.js"></script>
    
    <script type="text/javascript" src="js/TransitEquip/NotificationController.js"></script>
   
    
    <!DOCTYPE html >
    <!-- Modal -->
    <div ng-app="equip_app" ng-controller="PageCtrl" ng-show="{{loggedin}}">
     <div class="container" id="PageHeading" >
         <div class="row">
            <div class="col-md-12" ng-controller="getToLocationCmbXContoller">
                <%--<ol class="breadcrumb">
                  <li><a href="#">Home</a></li>
                  <li><a href="#" class="active">Transfer Torque Tools</a></li>
                  
                </ol>--%>
                <nav class="navbar navbar-default">
                  <div class="container-fluid" ng-controller="signinController">
                    <div class="navbar-header">
                      <ol class="breadcrumb">
                          <li><a href="#">Home</a></li>
                          <li><a href="#" class="active">Transfer Torque Tools</a></li>
                  
                      </ol>
                    
                    </div>
                      <div class="container-fluid">
                      <p class="navbar-text navbar-right">Signed in as <a href="#" class="navbar-link" ng-click="logOut()">{{UserLoggedIn}}</a></p>
                      </div>
                  </div>
                </nav>
                
                <div style="float:right;" ng-controller="NotificationController">
                <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#gridSystemModalNotification">
                    <i class="glyphicon glyphicon-info-sign"></i>
                  View Batch History <!--<span class="badge">{{BatchCount}}</span>-->
                </button>
                         <div id="gridSystemModalNotification" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="gridModalLabel">Batch Alerts</h4>
      </div>
                                    <div class="modal-body">
                                        <div class="container-fluid bd-example-row">
                                            <div class="row" >
                                                <div class="col-md-12 col-sm-12 col-xs-12">
                                                    <div class="table-responsive ol-md-12 col-sm-12 col-xs-12">
                                                         <table st-table="displayedCollection" st-safe-src="Batchs" class="table">
                                                             <thead>
                                                                 <tr>
				                                                     <th colspan="5"><input st-search="" class="form-control" placeholder="Search Jobs..." type="text"/></th>
			                                                    </tr>
                                                                 <tr>
                                                                     <th st-sort="JobID">Transit Batch ID</th>
                                                                     <th st-sort="CreatedBy">CreatedBy</th>
                                                                     <th st-sort="createdTime">Batch Created On</th>
                                                                     <th>View Batch Details</th>
                                                                     <!--<th>Unlock Job</th>-->
                                                                     
                                                                 </tr>

                                                                                                        
                                                             </thead>
                                                             <tbody >
                                                                 <tr ng-repeat="Batch in displayedCollection" >
                                                                     <td>{{Batch.JobID}}</td>
                                                                     <td>{{Batch.CreatedBy}}</td>
                                                                     <td>{{Batch.createdTime}}</td>
                                                                     <td>
                                                                         <button type="button" ng-click="viewDetails(Batch)" class="btn">
                                                                             <i class="glyphicon glyphicon-info-sign"></i> Info
                                                                         </button>
                                                                         

                                                                     </td>
                                                                     <!--
                                                                     <td>
                                                                         <button type="button" ng-click="updateBatchCompletedV2(Batch)" class="btn btn-primary">
                                                                             <i class="fa fa-unlock" aria-hidden="true"></i> Unlock
                                                                         </button>

                                                                     </td>-->
                                                                 </tr>

                                                             </tbody>
                                                             <tfoot>
                                                                 <tr>
                                                                    <td colspan="4" class="text-center">
                                                                        <div st-template="pagination-viewhistory.html" st-pagination="" st-items-by-page="5" st-displayed-pages="5">                                       
                                                                        </div>
                                    
                                                                    </td>

                                                                 </tr>
                                                             </tfoot>
                                                         </table>
                                         
                                         
                                        
                                                    </div>  
                                   <!-- <div class="row">
                                          <div class="col-xs-8 col-sm-6">
                                              Level 2: .col-xs-8 .col-sm-6
                                          </div>
                                          <div class="col-xs-4 col-sm-6">
                                              Level 2: .col-xs-4 .col-sm-6
                                          </div>
                                      </div>-->
                                                </div>
                                            </div>
          
                                        </div>
                                    </div>
                                    <div class="modal-footer" ng-controller="NotificationController">
                                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        
                                    </div>
                              </div>
                            </div>
                        </div>
                </div>
                <h2>Transfer Tools to {{TransferTo.Description}}</h2>
                

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

     <div class="container" id="form_wrapper"  ng-controller="radioButtonControl" >
         <!-- 1st row-->
        <div class="row" style ="margin-top:15px;">
            <!-- row 1 column1-->
            <div class="col-md-6 col-sm-6 col-xs-6" id="labelColumn"><%--<span id="label1"><strong>From JOB</strong></span>--%>
                <!-- job dropdown previous column setting col-md-3 col-sm-4 col-xs-4
                <div class="btn-group" ng-controller="getJobsCmbXControlller" >
                    <label style="margin-left:10px;margin-top:15px;">
                      <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select JOB
                      </button>
                      <div class="dropdown-menu">
                        <li ng-repeat="a in jobs"><a ng-click="dropboxitemselected(a)">{{a.Description}}</a></li>
                      </div>
                      </label>
                 </div>-->
                <div class="btn-group" data-toggle="buttons">
                            <label class="btn active" ng-click="radioclicked('job')" >
                              <input type="radio" name='TransferLoc'    ng-model="destination" value="job" checked=""/><i class="fa fa-circle-o fa-2x"></i><i class="fa fa-check-circle-o fa-2x"></i><span> To Job</span>
                            </label>
                            <label class="btn" ng-click="radioclicked('location')" >
                              <input type="radio" name='TransferLoc1'  ng-model="destination" value="Location" checked=""/><i class="fa fa-circle-o fa-2x"></i><i class="fa fa-check-circle-o fa-2x"></i><span> To Location</span>
                            </label>
                        </div>
            </div>
            <!--row 1 column2-->
            <div class="col-md-6 col-sm-6 col-xs-6" id="control_column"  >
                        
            </div>
            <!--row1 column3-->
            <div class="col-md-3 col-sm-4 col-xs-4 col-xs-push-0" id="ValidationColumn">
                
               
                      
           </div>
        </div> 
       <!--- end of row1-->

       <!-- 2nd row-->
    
        <div class="row" style="margin-top:10px;">
            <!-- row 2 column1-->
            <div class="col-md-3 col-sm-4 col-xs-4">
                <!--<div class="btn-group" ng-show="isSelected('job')" ng-controller="getToJobsCmbXController" id="jobDropdown" >-->
                    <div class="btn" ng-show="isSelected('job')" ng-controller="getToJobsCmbXController" id="jobDropdown">
                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                            To JOB
                        </button>
                        <div class="dropdown-menu">
                            <li>
                                    <a>
                                        <div class="input-group">
                                              <div class="input-group-addon"><i class="glyphicon glyphicon-search"></i></div>
                                              <input type="text" ng-model="filterjobs" class="form-control" placeholder="search for Jobs"/>
                                              
                                              
                                  
                                         </div>
                                        
                                  </a>
                                                                   
                             </li>
                             <li role="separator" class="divider"><a></a></li>
                            
                            <li ng-repeat="a in tojobs | filter:filterjobs"><a ng-click="dropboxitemselected(a)">{{a.Description}}</a></li>
                            
                        </div>
                    </div>
                    <div class="btn" ng-show="isSelected('location')" ng-controller="getToLocationCmbXContoller">
                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            To Location
                        </button>
                        <div class="dropdown-menu">
                            <li>
                                    <a>
                                        <div class="input-group">
                                              <div class="input-group-addon"><i class="glyphicon glyphicon-search"></i></div>
                                              <input type="text" ng-model="filterlocations" class="form-control" placeholder="search for Locations">
                                  
                                         </div>
                                  </a>
                             </li>
                            <li role="separator" class="divider"><a></a></li>
                            <li ng-repeat="ab in toLocations | filter:filterlocations"><a ng-click="dropboxtoLocitemselected(ab)">{{ab.Description}}</a></li>
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
            <div class="col-md-3 col-sm-4 col-xs-4" ng-controller="getDataCtrl">

                <!--<label style="margin-left: 10px;">
                    <button type="button" ng-click="addRandomItem(row)" class="btn btn-sm btn-success">
                        <i class="glyphicon glyphicon-plus"></i>Add orphan equipment
                    </button>
                </label>-->
            </div>
       </div>
       <!--- end of row4-->
       

       <!-- row 5-- <img id="mySpinner" src="img/gear.gif"/>>
        <div class="row" style="margin-top:10px;">
            <!-- row 5 column 1-->
            <div class="col-md-12 col-sm-12 col-xs-12" ng-controller="getDataCtrl">
                <div id="loader" style="text-align:center;" ng-show="showTableLoadspinner">
                    <i class="fa fa-cog fa-spin fa-4x" aria-hidden="true"></i>
                    
                    <h3 ng-show="showTableLoadspinner">Loading Torque Tools from ViewPoint...</h3>
                </div>
                <div class="table-responsive ol-md-12 col-sm-12 col-xs-12" ng-show="showTableLoad">
                    <table st-table="displayedCollection" st-safe-src="rowCollection" class="table">
                        <thead>
                            <tr style="border:none;">
                                <th style="border:none;">
                                   
                                </th>
                                <th style="border:none;">
                                   
                                </th>
                                <th style="border:none;">
                                    <label  ><h3>{{EquipmenttableHeading.Description}} Tools for transfer</h3></label>
                                </th>
                                <th style="border:none;"></th>
                                <th style="border:none;"></th>
                                <th style="border:none;">
                                    <ul class="list-inline">
                                        <li class="pull-left" >
                                            <div><label style="margin-top:5px;" > Items Per Page</label></div>
                                        </li>
                                        <li class="pull-right">
                                            <input class="form-control" style="width:80px;margin:auto" type="number" value="42" id="itemsByPage" ng-model="itemsByPage" placeholder="Items Per Page"/>
                                        </li>
                                    </ul>
                                    

                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:center;border:none !important"></th>
                                <th style="text-align:center;border:none !important"></th>
                                <th st-sort="SerialNO">Serial No</th>
                                <th st-sort="EquipmentID">Tool ID</th>
                                <th st-sort="EDescription">Tool Description</th>
                                <th st-sort="AssignedJob">Currently Assigned To</th>
                                <!--<th st-sort="Locked">Locked</th>-->
                                <%--<th>History</th>--%>
                                
                            </tr>
                            <tr>
                                <th style="text-align:center;border:none !important">

                                </th>
                                <th style="text-align:center;border:none !important">

                                </th>
                                <th>
                                    <input st-search="SerialNo" placeholder="search for Serial No" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="EquipmentID" placeholder="search for Equipment ID" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="Description" placeholder="search for Description" class="input-sm form-control" type="search" />
                                </th>
                                <th>
                                    <input st-search="JobDescription" placeholder="search for Assigned Job" class="input-sm form-control" type="search" />
                                </th>
                                <%--<th>
                                   <input st-search="Locked" placeholder="search.." class="input-sm form-control" style="width:70px;" type="search" />
                                </th>--%>
                            </tr>
                            <!--<tr>
				<th colspan="5"><input st-search="" class="form-control" placeholder="global search ..." type="text"/></th>
			</tr>-->
                        </thead>
                        <tbody>
                            <tr st-select-row="row" st-select-mode="multiple" ng-repeat="row in displayedCollection" ng-click="rowSelect(row)">
                                   <td style="white-space: nowrap;width: 1%;border:none !important">
                                    
                                    <%--<i class="fa fa-lock fa-2x" aria-hidden="true" ng-show="{{row.Locked}}"></i>--%>

                                   <!-- <button type="button" ng-click="$event.stopPropagation();viewHistory(row);" class="btn btn-primary">-->
                                       
                                                  <a ng-show="{{row.Attachment}}" data-toggle="tooltip" data-placement="top"  title="{{((row.AttachToEquip)+' - '+(row.AttachmentDesc))}}" href="#" class="btn"  ng-click="$event.stopPropagation();" ><i class="fa fa-link fa-1x"  aria-hidden="true" ></i></a>
                                                
                                           
                                      
                                       
                                       
                                      
                                    <!--</button>-->
                                    

                                   
                                    
                                </td>
                                <td style="white-space: nowrap;width: 1%;border:none !important">
                                    <a data-toggle="tooltip" data-placement="top" title="Track History" class="btn" ng-click="$event.stopPropagation();viewHistory(row);" > <i class="fa fa-search-plus fa-1x"  aria-hidden="true"></i></a>

                                </td>
                                
                                <td>{{row.SerialNo}}</td>
                                <td>{{row.EquipmentID}}</td>
                                <td>{{row.Description}}</td>
                                <td>{{row.JobDescription}}</td>
                             

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
                                
                                
                                
                                <td colspan="6" class="text-center" style="border:none !important;">
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
            <div class="col-md-12" style="text-align:center" ng-controller="TransferButtonController">
                
             <button type="button"  class="btn btn-sm btn-danger" data-toggle="modal"  ng-click="validate()">
			        <i class="glyphicon glyphicon-calendar"></i> Create Batch
		   </button>
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
                     <div class="modal-header" ng-controller="modalSmartTableController">
                         <button type="button" class="close" data-dismiss="modal" id="modalclose" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                         <h4 class="modal-title" id="gridModalLabel">Equipments for transfer to {{TransferTo.Description}}</h4>
                         <br />
                         <div class="alert alert-warning" role="alert" ng-show="showNoRowselectedwarning">
                          <strong>Warning!</strong> No equipments selected.
                         </div>
                     </div>
                     <div class="modal-body">
                         <div class="container-fluid bd-example-row">
                            <!-- <div class="row">
                                 <div class="col-md-4">.col-md-4</div>
                                 <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
                             </div>-->
                             <!--<div class="row">
                                 <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
                                 <div class="col-md-2 col-md-offset-4">.col-md-2 .col-md-offset-4</div>
                             </div>-->
                             <!--<div class="row">
                                 <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
                             </div>-->
                             <div class="row" >
                                 <div class="col-md-12 col-sm-12 col-xs-12">
                                     <div class="table-responsive col-md-12 col-sm-12 col-xs-12" ng-controller="modalSmartTableController">
                                         <table st-table="displayedCollection" st-safe-src="selectedRowCollection" class="table">
                                             <thead>
                                                 <tr>
				                                     <th colspan="5"><input st-search="" class="form-control" placeholder="Filter equipments.." type="text"/></th>
			                                    </tr>
                                                 <tr>
                                                     <th st-sort="SerialNO">Serial No</th>
                                                     <th st-sort="EquipmentID">Tool ID</th>
                                                     <th st-sort="EDescription">Tool Description</th>
                                                     <th st-sort="AssignedJob">Currently Assigned To</th>
                                                     <th> Remove Equipment</th>
                                                 </tr>

                                                 <!--<tr>
                                                     <th>
                                                         <input st-search="SerialNo" placeholder="search for Serial No" class="input-sm form-control" type="search" />
                                                     </th>
                                                     <th>
                                                         <input st-search="EquipmentID" placeholder="search for Equipment ID" class="input-sm form-control" type="search" />
                                                     </th>
                                                     <th>
                                                         <input st-search="Description" placeholder="search for Description" class="input-sm form-control" type="search" />
                                                     </th>
                                                     <th>
                                                         <input st-search="JobDescription" placeholder="search for Assigned Job" class="input-sm form-control" type="search" />
                                                     </th>
                                                 </tr>-->
                                               
                                             </thead>
                                             <tbody >
                                                 <tr ng-repeat="row1 in displayedCollection" >
                                                     <td>{{row1.SerialNo}}</td>
                                                     <td>{{row1.EquipmentID}}</td>
                                                     <td>{{row1.Description}}</td>
                                                     <td>{{row1.JobDescription}}</td>

                                                     <td>
                                                         <button type="button" ng-click="modalRowDelete(row1)" class="btn btn-sm btn-danger">
                                                             <i class="glyphicon glyphicon-remove-circle"></i>
                                                         </button>
                                                     </td>
                                                 </tr>

                                             </tbody>
                                             <tfoot>
                                                 <tr>
                                                     <td colspan="4" class="text-center">
                                                         <div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="10"></div>
                                                     </td>

                                                 </tr>
                                             </tfoot>
                                         </table>
                                         
                                         <!--<span style="float:right;"><h4> <span class="label label-info"><i class="glyphicon glyphicon glyphicon-cog"></i> {{SelectedItemCount}} tool/s in the job</span></h4></span>-->

                                         <div class='col-sm-6'>
                                                <div class="form-group">
                                                    <strong>Select Job Date: </strong>
                                                    <div class='input-group date' id='datetimepicker'>
                                                        
                                                        <input type='text' class="form-control" id="jobdatetime"/>
                                                        <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                 </div>
                                    
                                        </div>

                               
                            </div>
                            <div class="col-sm-6">
                                
                                <span style="float:right;margin-top:10px;"><h4> <span class="label label-info"><i class="glyphicon glyphicon glyphicon-cog"></i> {{SelectedItemCount}} tool/s in the batch</span></h4></span>
                            </div>

                                        
                                     </div>  
                                   <!-- <div class="row">
                                          <div class="col-xs-8 col-sm-6">
                                              Level 2: .col-xs-8 .col-sm-6
                                          </div>
                                          <div class="col-xs-4 col-sm-6">
                                              Level 2: .col-xs-4 .col-sm-6
                                          </div>
                                      </div>-->
                                 </div>
                                 
                     
                   
                             </div>

                          
                     <div class="modal-footer" ng-controller="scheduleJobController" >
                      
                            
                                        
                         
                         <input type="text" name="hidden_input" ng-model="TransferTo" ng-hide="true"/>
                         
                         <button type="button"  class="btn " data-dismiss="modal" ng-click="reload()">Cancel Batch</button>
                         <button type="button"  class="btn btn-primary" ng-click="schedule()">Transfer</button>
                     </div>
                </div>
             </div>
                </div>
         

            </div>
      </div>  
        
        </div>    
</asp:Content>
