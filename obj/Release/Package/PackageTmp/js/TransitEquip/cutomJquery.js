$(document).ready(function() {
	$("body").tooltip({ selector: '[data-toggle=tooltip]',
	                    placement:'top|right',
	                    container:'body' });
	
	$('#tojobdropdown').hide(); 
	$('#tolocationdropdown').hide(); 
    $("#toLocation").click(function() {
      $('#tojobdropdown').hide(); 	
      $('#tolocationdropdown').show(); 


    });
     $("#toJob").click(function() {
      $('#tojobdropdown').show(); 	
      $('#tolocationdropdown').hide(); 


    });

 /*    $('.dropdown-menu').on("click tap", function() {
      alert('clicked_outside');
  $(this).toggleClass("close");
});*/

 

 $(function(){
  $(document).click(function(){  //alert("clicked");
  $('#tojobdropdown').toggle(); //hide the button

  });
});
 var obj={'vertical':'top','horizontal':'right'}
$('#datetimepicker').datetimepicker({
                    
                    format:'MM/DD/YYYY HH:mm',
                    defaultDate: moment().format('MM/DD/YYYY HH:mm'),
                    widgetPositioning: obj,
                    focusOnShow:true
                    
                    
                    });


$('#jobDropdown').on('shown.bs.dropdown', function () {
  // do something…

  // do something…
  //alert('m shown');
/*  $(document).click(function(event) {

        if(event.target.id === '#jobDropdown' )
            return false;
        else {
              // do some this here
              $('.dropdown-menu').toggleClass("close");

        }

    });*/





});

/*$(document).on("contextmenu", "body", function (event) {
    //we won't show the default context menu
    event.preventDefault();

    //showing it close to our cursor
    $('#menu').dropdown('toggle').css({
        top: (event.pageY) + "px",
        left: (event.pageX) + "px"
    });
});*/


//$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
//alert('hello');


                    


                    


                    
                
   



});

