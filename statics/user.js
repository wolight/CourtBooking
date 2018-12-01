$(document).ready(function(){
	var stunum;
	var firstname;
	var lastname;
	var iconURL = $("#iconUrl").html();
	$("#icon").attr("src", iconURL);
	// update icon
	$("#change_pic").click(function(){
		var url = prompt("Enter image url: ", "");
		if (url) {
			$("#icon").src = url;
			$.ajax({
				url: '/user',
				method: 'PUT',
				contentType: 'application/json',
				data: JSON.stringify({
					"icon":url
				}),
				success: function(data){
					alert("profile image uploaded");
					location.reload();
				}
			});
		}
	});
	// User update info fetch
  function fetchUserInput() {
      var userInfo = new Object();
      var value = $.trim($("#email").val());
      if(value.length > 0) {
        userInfo.email = value;
      }
      var value=$.trim($("#phoneNum").val());
      if(value.length > 0) {
        userInfo.phoneNum = value;
      }
			var value=$.trim($("#new_pw").val());
      if(value.length > 0) {
        var rp  = $.trim($("#new_pw_c").val());
				if (value != rp) {
					alert("Two password Doesn't Match!\n Only Update other Info");
				}
				else {
					userInfo.password = value;
				}
      }
			return userInfo;
  }

	//update profile
	$("#submit_profile").click(function(){
		var userInfo = fetchUserInput();
		$.ajax({
			url: '/user',
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(userInfo),
			success: function(data){
					alert("Profile updated");
					location.reload();
			},
			error: function(res){
					if (res.status==400){
						alert("Passoword Incorrect");
					}
			}
		});
	});

	$("#bf_link").click(function(){
		$.ajax({
			url:'/user/bookings',
			method:'GET',
			contentType:'application/json',
			success:function(data){
				$("#booking_items").empty();
				for(var i=0;i<data.bookings.length;i++){
					var booking = '<div class="col-md-6 portfolio-item"><h3>'+data.bookings[i].courtName +'</h3><span> Time:</span><p>'+
					data.bookings[i].date + ' ' + data.bookings[i].starttime+ ' - ' + data.bookings[i].endtime + '</p></div>';
					$("#booking_items").append(booking);
				}
			}
		});
	});

	$("#n_link").click(function(){
		$.ajax({
			url: '/admin/news',
			method: 'GET',
			contentType: 'application/json',
			success: function(data) {
				for ( var i = 0; i < data.length; i++) {
					var news = '<div class="col-md-6 portfolio-item"><h3>'+
					data[i].news_title+'</h3><p>'+
					data[i].des+'</p><p>'+data[i].date
					+'</p></div>';
					$('#news_list').append(news);
				}
			},
			error: function(res) {
				alert("error!");
			}
		});
	});

	$("#delete").click(function() {
 		var confirm = prompt("WARNING! Retype your student number!", "");
 		var num = document.getElementById("stunum").innerHTML;
 		if (confirm == num) {
 			$.ajax({
 				type : 'DELETE',
 				url : '/user',
 				success : function() {
 					alert("You delete yourself :(");
 				}
 			});
 		}
 		else {
 			alert("Enjoy Courtbooking! :)");
 		}
 	});

})
