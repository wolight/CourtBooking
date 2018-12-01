document.getElementById("bf_link").onclick = function(){ShowContent("booking_history")};
document.getElementById("n_link").onclick = function(){ShowContent("notification")};
document.getElementById("up_link").onclick = function(){ShowContent("info")};

function ShowContent(content){
	var obj = ["info","notification","booking_history"];

	for (var item in obj){
		if (obj[item] != content){
			document.getElementById(obj[item]).style.display = "none";
		}
		else{
			document.getElementById(obj[item]).style.display = "block";
		}
	}
}
