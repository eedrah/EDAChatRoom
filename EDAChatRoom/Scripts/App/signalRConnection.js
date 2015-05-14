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
        else if (hubMessage.HubMessageType === "InitialConnection") {
            for (var i = 0; i < hubMessage.Payload.RecentMessages.length; i++) {
                var currentMessage = hubMessage.Payload.RecentMessages[i];
                controller.RenderMessage(currentMessage.Username, currentMessage.MessageText, currentMessage.MessageTime)
            }
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
    });
};


function ScrollToBottomOfReceivedMessages() {
    //need to add condition maybe only if out of page?
    $("#messagesReceivedContainer").prop({ scrollTop: $("#messagesReceivedContainer").prop("scrollHeight") });
}