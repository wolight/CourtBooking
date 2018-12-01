$(document).ready(function() {
    $("#nav-toggle").click(function() {
        if ($("#nav-list").is(':visible')) {
            $("#nav-list").slideUp();
        } else {
            $("#nav-list").slideDown();
        }
    });

    $("#login-button").click(function() {
        $('#login-popup').css("visibility", "visible");
    });
    $("#logout-button").click(function() {
        $.ajax({
            type: 'GET',
            url: '/logout',
            success: function(data) {
                alert("Log out!");
                window.location.href = '/';
            }
        });
    });


    $(document).keypress(function(k) {
        if (k.keyCode == 13) {
            k.preventDefault();
            var court = $('#header-search').val();
            if (court) {
                $.ajax({
                    type: 'POST',
                    url: '/qs',
                    data: JSON.stringify({ "court": court }),
                    contentType: 'application/json; charset=UTF-8'
                });
                $(location).attr('href', '/search');
            }
        }
    });
});