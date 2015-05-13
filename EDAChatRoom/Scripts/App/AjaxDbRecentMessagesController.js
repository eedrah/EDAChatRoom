$(function() {
    $.getJSON("DbRecentMessages/Get", function(data) {
            console.log(data);
        }).fail(function() {
            alert("didnt work");
        });
});