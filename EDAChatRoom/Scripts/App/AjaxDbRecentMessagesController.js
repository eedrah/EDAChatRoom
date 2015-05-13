function GetRecentMessages() {
    //On success returns all messages in RecentMessages table. 
    //properties of Id. Username. MessageText. MessageTime
    $.getJSON("DbRecentMessages/Get", function(data) {
            AppendRecentMessagesToPage(data);
        }).fail(function(data, textstatus, errorthrown) {
            alert(data.responseText);
            alert(textstatus);
            alert(errorthrown);
    });
};

function AppendRecentMessagesToPage(DbRecentMessages) {
    var model = new SRModel();
    for (var i = 0; i < DbRecentMessages.length; i++) {
        var currentMessage = DbRecentMessages[i];
        model.BindMessageToLiElement(currentMessage.Username, currentMessage.MessageText, currentMessage.MessageTime);
    }
}