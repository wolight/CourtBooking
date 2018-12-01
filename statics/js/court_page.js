// Navigation Bar and Resposize
function MenuToggle() {
        var x = document.getElementById("navList");
        if (x.style.display == 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
}

function makeComments(){
	text = $('.input_text').val();
	if(text!=undefined){
		date = new Date();
            	t = date.toUTCString();
            	time = '<p>'+ t + '</p>';
            	comment = '<div class="comment">'+ text + time + '</div>';

		$('.comment_feed').append($(comment));
	}
}

function book(){

}

$(document).ready(function() {
  var photoUrl = $("#photoURL").html();
  $("#court_pic").attr("src", photoUrl);
});
