$(document).ready(function() {
    $("#filter-toggle").click(function() {
        if ($("#filter-content").is(':visible')) {
            $("#filter-content").slideUp();
        } else {
            $("#filter-content").slideDown();
        }
    });
});

$(document).ready(function() {
    $("input.timepicker").timepicker({
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '1',
        maxTime: '12:00pm',
        defaultTime: '11',
        startTime: '1:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
});

$(document).ready(function() {
    $("#reset-button").click(function() {
        $(".filter-form").trigger("reset");
    });
});

$(document).ready(function() {
    $(".search-button").click(function() {
        $('#results-list').empty();
        $.ajax({
            url: '/search?court=' + $('.search-field').val(),
            type: 'GET',
            data: $('.filter-form').serialize(),
            success: function(res) {
                console.log(res.length + ' courts found');
                if (res.length == 0) {
                    alert('No court found!');
                } else {
                    generate_result(res);
                }
            }
        });
    });
});

//generate html for results
function generate_result(courts) {
    for (c in courts) {
        var id = courts[c]._id;
        var name = courts[c].courtName;
        var description = courts[c].description;
        var location = courts[c].location;
        var photo = courts[c].photo;

        var html = '<div class="result">' +
            '<h3 class="court-name">' + name + '</h3>' +
            '<div class="info-container">' +
            '<div class="court-info">Location: <span>' + location + '</div>' +
            '<div class="court-info">Open hours: <span>09:00 to 18:00</span></div>' +
            '<div class="court-info">Open days: <span>Mon, Wed, Fri</span></div>' +
            '</div>' +
            '<div class="pic-container">' +
            '<img class="court-pic" src="' + photo + '">' +
            '<div class="court-pic"></div>' +
            '<div class="book-button-container">' +
            '<button class="book-button" name="' + id + '">Book now!</button>' +
            '</div>' +
            '</div>' +
            '</div>'

        $('#results-list').append(html);
    }
}

//remove duplicate
//http://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
function unique(array) {
    array = array.filter(function(i, index, self) {
        return index == self.indexOf(i);
    });

    return array;
}

//get all locations in database to populate location filter
$(document).ready(function() {
    $.ajax({
        url: '/search/all_location',
        type: 'GET',
        success: function(res) {
            var locations = [];
            for (i in res) {
                locations.push(res[i].location);
            }

            locations = unique(locations);
            locations.forEach(function(loc) {
                $('#location-option').append($('<option>', {
                    value: loc,
                    text: loc
                }));
            });
        }
    });

    //get all sports in database to populate sport filter
    $.ajax({
        url: '/search/all_sport',
        type: 'GET',
        success: function(res) {
            var sports = [];
            for (i in res) {
                sports.push(res[i].sportName);
            }

            sports = unique(sports);
            sports.forEach(function(s) {
                $('#sport-option').append(
                    '<input type="radio" name="sport" value="' + s + '">' + s + '<br>'
                );
            });
        }
    });

    //check if there are any quick search happening
    $.ajax({
        url: '/qs',
        type: 'GET',
        success: function(res) {
            if (res == '') {
                return;
            } else {
                $.ajax({
                    url: '/search?court=' + res,
                    type: 'GET',
                    success: function(res) {
                        console.log(res.length + ' courts found');
                        if (res.length == 0) {
                            alert('No court found!');
                        } else {
                            generate_result(res);
                        }
                    }
                });
            }
        }
    });
});


//redirect to court page
$(document).on('click', '.book-button', function() {
    $(location).attr('href', '/court?id=' + $(this).attr('name'));
});