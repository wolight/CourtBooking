

document.getElementById("up_info").onclick = function(){ShowContent("court_info")};
document.getElementById("u_link").onclick = function(){ShowContent("user_list")};
document.getElementById("c_link").onclick = function(){ShowContent("court_list")};
document.getElementById("up_news").onclick = function(){ShowContent("update_news")};
document.getElementById("new_court").onclick = function(){ShowContent("create_court")};
document.getElementById("new_sport").onclick = function(){ShowContent("create_sport")};
//document.getElementById("submit_profile").onclick = SubmitChange();

function ShowContent(content){
	var obj = ["court_info","court_list","user_list", "create_court", "create_sport", "update_news"];

	for (var item in obj){
		if (obj[item] != content){
			var temp = document.getElementsByClassName(obj[item]);
			for(var i=0; i< temp.length;i++){
				temp[i].style.display = "none";
			}

		}
		else{
			var temp = document.getElementsByClassName(obj[item]);
			for(var i=0; i< temp.length;i++){
				temp[i].style.display = "block";
			}
		}
	}
}

$(document).ready(function(){
	// court info update/delete
	$('#get_gourt_info').click(function(){
		var courtId = $("#courtId").val();
		$.ajax({
			url: '/court/'+courtId,
			method: 'GET',
			contentType: 'application/json',
			success: function(data) {
				$("#UcourtName").empty();
				$('#UcourtName').append(data.courtName);
				$('#Upolicy').val(data.policy);
				$('#Udescription').val(data.description) ;
				$('#Ulocation').val(data.location);
				$('#photo').val(data.photo);
				$("#Usports").empty();
				for (var i = 0; i < data.sports.length; i++){
					var element = '<p>'+ data.sports[i].sportName + '</p>';
					$("#Usports").append(element);
				}
			},
			error: function(req) {
				$('#usergetresult').append(req);
			}
		});
	});


	$("#updatecourt").click(function(){
		var courtId = $("#courtId").val();
		var policy = $(this).siblings("#Upolicy").val();
		var description = $(this).siblings("#Udescription").val();
		var location = $(this).siblings("#Ulocation").val();
		var photo = $(this).siblings("#photo").val();
		$.ajax({
			url: '/court/'+courtId+'/edit',
			method: 'PUT',
			statusCode:{

			},
			contentType: 'application/json',
			data: JSON.stringify({
				"policy":policy,
				"description":description,
				"location":location,
				"photo":photo
			}),
			success: function(data){
				alert("Update Successfully");
			}
		});
	});


	$("#deletecourt").click(function(){
		var courtId = $("#courtId").val();
		$.ajax({
			url: '/court/' + courtId,
			method: 'DELETE',
			contentType: 'application/json',
			success: function(result){
				alert("Court has been deleted");
			}
		});
	});

	// get all users
	$("#u_link").click(function(){
		$.ajax({
			type: 'GET',
			url: '/admin/users',
			success: function(response) {
				$("#userlist").empty();
				for (var i=0; i< response.users.length;i++){
					var result = '<div class="col-lg-4 col-sm-6 text-center">'+
					'<img class="img-circle img-responsive img-center" src='+
					response.users[i].icon+' alt="icon"><h3> Student Number: '+
					response.users[i].studentNum+'</h3><p> Firstname: '
					 + response.users[i].firstname
					+ '</p><p>Lastname: ' + response.users[i].lastname
					+ '</p><p>email: '+response.users[i].email+'</p><p>Phone: '
					+response.users[i].phoneNum + '</p></div>';
					$('#userlist').append(result);
				}
			}
		});
	});

	$("#delete_user").click(function(){
		var studentNum = $(this).siblings("#stunum").val();
		$.ajax({
			url: '/user/' + studentNum,
			method: 'DELETE',
			contentType: 'application/json',
			success: function(result){
				alert("User has been suspended");
			}
		});
	});


	// create new court

	$("#create_court").click(function(){
		var courtName = $(this).siblings("#name").val();
		var location = $(this).siblings("#location").val();
		var description = $(this).siblings("#description").val();
		var photo = $(this).siblings("#photo").val();
		var policy = $(this).siblings("#policy").val();
		$.ajax({
			url: '/court',
			method: 'POST',
			contentType: 'application/json',
			data:JSON.stringify({
				"courtName": courtName,
				"location": location,
				"description": description,
				"photo":photo,
				"policy":policy
			}),
			success: function(data, textStatus, jqXHR) {
				var msg = 'new court has been created';
				alert(msg);
			}
		});

	});

	$("#add_new_sport").click(function(){
		var courtId = $(this).siblings("#courtId").val();
		var sport = $(this).siblings("#sport").val();
		$.ajax({
			url: '/court/'+courtId+'/sport',
			method:'POST',
			contentType:'application/json',
			statusCode:{
				403:function(){alert("court not found")}
			},
			data: JSON.stringify({
				"courtId":courtId,
				"sportName":sport
			}),
			success:function(data){
				alert('add new sport to court');
			}
		});
	});

	// get all courts
	$("#c_link").click(function(){
		$.ajax({
			type: 'GET',
			url: '/admin/courts',
			success: function(response) {
				$("#courtlist").empty();
				for (var i=0; i< response.courts.length;i++){
					var result = '<div><img class="pic" src='+response.courts[i].photo+' alt="pic"><p> Court ID: '+
					response.courts[i]._id+'</p><p> Court Name: '
					 + response.courts[i].courtName
					+ '</p><p>description: ' + response.courts[i].description
					+ '</p><p>location: '+response.courts[i].location+'</p><p>Policy: '
					+response.courts[i].policy + '</p></div>';
					$('#courtlist').append(result);
				}
			}
		});
	});


	$("#create_news").click(function(){
		var news_title = $(this).siblings("#title").val();
		var des = $(this).siblings("#des").val();
		var temp = new Date();
		var date = temp.toUTCString();
		$.ajax({
			url: '/admin/news',
			method: 'POST',
			contentType: 'application/json',
			data:JSON.stringify({
				"news_title": news_title,
				"des": des,
				"date": date
			}),
			success: function(data, textStatus, jqXHR) {
				alert("News posted");
			}
		});

	});

})
