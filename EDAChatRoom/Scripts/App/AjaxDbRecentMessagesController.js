$(function() {
    $.getJSON("DbRecentMessages/Get", function(data) {
            console.log(data);
        }).fail(function(data) {
        console.log(data.responseText);
    });
});