var username;

$(runChat);

function runChat() {
    var controller = new SRController();
    var chatroom = $.connection.chatroom;
    chatroom.state.username = prompt('Enter a groovy alias');
    Notification.requestPermission();

    chatroom.client.serverSend = function (hubMessage) {
        if (hubMessage.HubMessageType === "Message") {
            controller.RenderMessage(hubMessage.Payload.Username, hubMessage.Payload.MessageText, hubMessage.MessageTime);
        } else {
            console.log(hubMessage);
        }
    }

        ////need to add condition to check if user is currently on the window or not
        

    $("#messageBox").keypress(function(e) {
        if (e.which === 13) {
            $('#sendMessageButton').trigger('click');
        }
    });

    $('#sendMessageButton').click(function() {
        controller.SendMessage(chatroom);
    });

    $.connection.hub.start().done(function () {
        chatroom.server.clientSetUsername();
    });
};


