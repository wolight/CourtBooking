$(document).ready(function(){
$('#new_booking').on("submit",createBooking);
$('#check').on("click",check);
});


function createBooking(){
      var confirmation=confirm("Confirm booking?");
      var start = $("#startime").val();
      var end = $("#endtime").val();
      if(check()){
      	alert("This time has already been booked!")
      }
      if((start - end > 1) or (start < end)){
      	alert("Invalid time");
      }
      else{
        $.ajax({
          method:"POST",
          url:'/booking',
          dataType : "json",
          data: $(this).serialize()
      });
  }

  else{
  return false;
  }
  }

function check() {
      $.ajax({
          type : "GET",
          url : "/booking",
          dataType : "json",
          data: JSON.stringify(userInfo),
          contentType: "application/json; charset=utf-8",
          success: function(){alert("Choose another time!");}
      });
    }
