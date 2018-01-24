<%@ Page Title="" Language="C#" MasterPageFile="~/master_page.Master" AutoEventWireup="true" CodeBehind="AccessDenied.aspx.cs" Inherits="IEA_InventoryMgmt.AccessDenied" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
  <link href="css/font-awesome.min.css" rel="stylesheet"/>  
    
    

   <div class="jumbotron">
  <div class="container" style="height:30%;">
    
     
      
     <div class="alert alert-danger" role="alert">
            <button type="button" class="close"  aria-label="Close"><span aria-hidden="true"></span></button>
            <strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>Warning!</strong> Unauthorized access. This is being reported!
      </div>
      <div style="text-align:center"><i class="fa fa-refresh  fa-5x fa-spin" aria-hidden="true"></i></div>
      
    </div>

</div> 


</asp:Content>
