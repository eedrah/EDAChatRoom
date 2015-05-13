function GetRecentMessages() {

    $.getJSON("DbRecentMessages/Get", function(data) {
            console.log(data);
        }).fail(function(data, textstatus, errorthrown) {
            alert(data.responseText);
            alert(textstatus);
            alert(errorthrown);
    });
};