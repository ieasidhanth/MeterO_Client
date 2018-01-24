<%@ Page Title="" Language="C#" MasterPageFile="~/master_page.Master" AutoEventWireup="true" CodeBehind="MgmtConsole.aspx.cs" Inherits="IEA_InventoryMgmt.MgmtConsole" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--<div ng-app="myApp" class="container-fluid">
  
            <div class="row">
                <div class="col-md-6" ng-controller="demoController as demo">
                  <h3>ngTable directive</h3>
                  <table ng-table="demo.tableParams" class="table table-condensed table-bordered table-striped">
                    <tr ng-repeat="row in $data">
                      <td title="'ID'" filter="{ID: 'number'}" sortable="'ID'">{{row.ID}}</td>
                      <td title="'Username'" filter="{Username: 'text'}" sortable="'Username'">{{row.Username}}</td>
                      <td title="'password'" filter="{password: 'text'}" sortable="'password'">{{row.password}}</td>
                      <td title="'address'" filter="{address: 'text'}" sortable="'address'">{{row.address}}</td>
                    </tr>
                  </table>
                </div>
    
              <!---
            <div class="col-md-6" ng-controller="dynamicDemoController as demo">
              <h3>ngTableDynamic directive</h3>
              <table ng-table-dynamic="demo.tableParams with demo.cols" class="table table-condensed table-bordered table-striped">
                <tr ng-repeat="row in $data">
                  <td ng-repeat="col in $columns">{{row[col.field]}}</td>
                </tr>
              </table>
            </div>-->   
          </div>


        
        <div  ng-controller="demoController">
            <input id="btnLogin" type="button" value="Login" ng-click="getdata()"/></td>
            <div class="row">
                <div class="col-md-6" >
                         <table class="table table-condensed table-bordered table-striped">
                            <tr ng-repeat="row in rdata">
                              <td title="'ID'" >{{row.ID}}</td>
                              <td title="'Username'" >{{row.Username}}</td>
                              <td title="'password'" >{{row.password}}</td>
                              <td title="'address'">{{row.address}}</td>
                            </tr>
                        </table>
                </div>
            </div>
        </div>
        
        </div>--%>
       <div ng-app="testapp" class="row">
        <div   ng-controller="treecontroller"     class="col-xs-6 col-md-4">
            <abn-tree tree-data="example_treedata"></abn-tree>
        </div>
        <div  class="col-xs-12 col-sm-6 col-md-8" ng-controller="testcontroller">
            <div ui-grid="{ data: myData }" class="form-group table-responsive" ></div>
       </div>
        
    </div>


</asp:Content>
