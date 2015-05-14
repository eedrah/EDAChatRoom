//pass recent messages with initial connection object.
//post method now method of recentmessagemodel
//render user who goes on line in recent messages.
//render database only when user initially logs in.

var username;

$(runChat);

function runChat() {
    var controller = new SRController();
    var chatroom = $.connection.chatroom;

    chatroom.state.username = prompt('Enter a groovy alias');

    Notification.requestPermission();

    chatroom.client.serverSend = function (hubMessage) {
        var payload = hubMessage.Payload;
        if (hubMessage.HubMessageType === "Message") {
            controller.RenderMessage(payload.Username, payload.MessageText, hubMessage.MessageTime);
        }
        if (hubMessage.HubMessageType === "InitialConnectionContainingRecentMessages") {
            alert(hubMessage.Payload);
        }
        else {
            console.log(hubMessage);
        }
    }      

    $("#messageBox").keypress(function(e) {
        if (e.which === 13) {
            $('#sendMessageButton').trigger('click');
            ScrollToBottomOfReceivedMessages();
        }
    });

    $('#sendMessageButton').click(function() {
        controller.SendMessage(chatroom);
    });

    $.connection.hub.start().done(function () {
        chatroom.server.clientSetUsername();
        chatroom.server.sendRecentMessagesOnFirstLogIn();
    });
};


function ScrollToBottomOfReceivedMessages() {
    //need to add condition maybe only if out of page?
    $("#messagesReceivedContainer").prop({ scrollTop: $("#messagesReceivedContainer").prop("scrollHeight") });
}