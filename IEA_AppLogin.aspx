<%@ Page Title="" Language="C#" MasterPageFile="~/master_page.Master" AutoEventWireup="true" CodeBehind="IEA_AppLogin.aspx.cs" Inherits="IEA_InventoryMgmt.Icontrol_login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<link href="css/jquery-confirm.min.css" rel="stylesheet"/>
<link href="css/font-awesome.min.css" rel="stylesheet"/>
<script type="text/javascript" src="js/ngstorage.min.js"></script>
    <script type="text/javascript" src="js/MeterO/smart-table.js"></script>
<script type="text/javascript" src="js/Login/login_app.js"></script>
<script type="text/javascript" src="js/Login/ajaxService.js"></script>
<script type="text/javascript" src="js/Login/loginController.js"></script>
<script type="text/javascript" src="js/angular-cookies.min.js"></script>
<script type="text/javascript" src="js/jquery-confirm.min.js"></script>
 





    <div class="container" ng-app="login_app" ng-controller="loginController">
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Select App to Launch</h4>
                  </div>
                  <div class="modal-body">
                      <p ><strong>You have access to the following application. Select your application</strong></p>
                 
                    <div class="table-responsive col-md-12 col-sm-12 col-xs-12" ng-controller="loginController">
                             <br/>
                        <br/>
                        <table class="table" st-table="{{roleDatacollection}}">
                            <thead >
                                <tr>
                                    <th style="text-align:center;border:none !important">App Name</th>
                                    <th style="text-align:center;border:none !important">Access Level</th>
                                    <th style="text-align:center;border:none !important"></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="row in roleDatacollection" style="text-align:center;border:none !important">
                                    <td style="text-align:center;border:none !important">
                                                         
                                                             {{row.App_Name}}
                                                             
                                                         
                                     </td>
                                    <td style="text-align:center;border:none !important">
                                                         
                                                             {{row.Role_Name}}
                                                             
                                                         
                                     </td>
                                    
                                                                                         
                                  <td style="text-align:center;border:none !important">
                                                         <button type="button" ng-click="launch(row)" class="btn btn-sm btn-primary"  >
                                                             Launch
                                                             
                                                         </button>
                                  </td>
                                </tr>
                                
                            </tbody>
                            
                        </table>
                 </div>
                  </div>
                  <div class="modal-footer">
                    
                  </div>
                </div>
              </div>
          </div>
        <div id="loginbox" style="margin-top: 50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2" >
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title">Sign In</div>
                    <!--<div style="float: right; font-size: 80%; position: relative; top: -10px"><a href="#">Forgot password?</a></div>-->
                </div>

                <div style="padding-top: 30px" class="panel-body">

                    <div style="display: none" id="login-alert" class="alert alert-danger col-sm-12"></div>

                    <form id="loginform" class="form-horizontal" role="form">

                        <div style="margin-bottom: 25px" class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input id="login-username" type="text" class="form-control" name="username" value="" placeholder="username or email" autocomplete="on">
                        </div>

                        <div style="margin-bottom: 25px" class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input id="login-password" type="password" class="form-control" name="password" placeholder="password - same as Windows Password" autocomplete="on" ng-keypress="myFunct($event)">
                        </div>



                        <div class="input-group">
                            <div class="checkbox">
                                <label>
                                    <input id="login-remember" type="checkbox" name="remember" value="1"/>
                                    Remember me
                                    
                                </label>
                            </div>
                        </div>


                        <div style="margin-top: 10px" class="form-group">
                            <!-- Button -->

                            <div class="col-sm-12 controls">
                                <a id="btn-login" class="btn btn-success"  ng-click="loginUser()">Login  </a>
                                <!-- <a id="btn-fblogin" href="#" class="btn btn-primary">Login with Facebook</a> -->

                            </div>
                        </div>

                        <!--
                        <div class="form-group">
                            <div class="col-md-12 control">
                                <div style="border-top: 1px solid#888; padding-top: 15px; font-size: 85%">
                                    Don't have an account! 
                                        <a href="#" onclick="$('#loginbox').hide(); $('#signupbox').show()">Sign Up Here
                                        </a>
                                </div>
                            </div>
                        </div>-->
                    </form>



                </div>
            </div>
        </div>
        <div id="signupbox" style="display: none; margin-top: 50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title">Sign Up</div>
                    <div style="float: right; font-size: 85%; position: relative; top: -10px"><a id="signinlink" href="#" onclick="$('#signupbox').hide(); $('#loginbox').show()">Sign In</a></div>
                </div>
                <div class="panel-body">
                    <form id="signupform" class="form-horizontal" role="form">

                        <div id="signupalert" style="display: none" class="alert alert-danger">
                            <p>Error:</p>
                            <span></span>
                        </div>



                        <div class="form-group">
                            <label for="email" class="col-md-3 control-label">Email</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="email" placeholder="Email Address">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="firstname" class="col-md-3 control-label">First Name</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="firstname" placeholder="First Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lastname" class="col-md-3 control-label">Last Name</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="lastname" placeholder="Last Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-md-3 control-label">Password</label>
                            <div class="col-md-9">
                                <input type="password" class="form-control" name="passwd" placeholder="Password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="icode" class="col-md-3 control-label">Invitation Code</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="icode" placeholder="">
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- Button -->
                            <div class="col-md-offset-3 col-md-9">
                                <button id="btn-signup" type="button" class="btn btn-info"><i class="icon-hand-right"></i>&nbsp Sign Up</button>
                                <!-- <span style="margin-left:8px;">or</span>  -->
                            </div>
                        </div>
                        <!--
                                <div style="border-top: 1px solid #999; padding-top:20px"  class="form-group">
                                    
                                    <div class="col-md-offset-3 col-md-9">
                                        <button id="btn-fbsignup" type="button" class="btn btn-primary"><i class="icon-facebook"></i>   Sign Up with Facebook</button>
                                    </div>                                           
                                        
                                </div>
                                -->


                    </form>
                </div>
            </div>




        </div>
    </div>
</asp:Content>
