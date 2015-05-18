var username;

$(runChat);

function runChat() {
    var controller = new SRController();
    var chatroom = $.connection.chatroom;

    chatroom.state.username = prompt('Enter a groovy alias');
    username = chatroom.state.username;
    Notification.requestPermission();

    chatroom.client.serverSend = function (hubMessage) {
        var payload = hubMessage.Payload;
        if (hubMessage.HubMessageType === "Message") {
            controller.RenderMessage(payload.Username, payload.MessageText, hubMessage.MessageTime);
        }

        else if (hubMessage.HubMessageType === "InitialConnection") {
            for (var i = 0; i < hubMessage.Payload.RecentMessages.length; i++) {
                var currentMessage = hubMessage.Payload.RecentMessages[i];
                controller.RenderMessage(currentMessage.Username, currentMessage.MessageText, currentMessage.MessageTime);
            }
            controller.UpdateConnectedUsersList(hubMessage.Payload.Usernames);
        }

        else if (hubMessage.HubMessageType === "Connection") {
            controller.RenderNewConnection(hubMessage);
        }

        else if (hubMessage.HubMessageType === "Disconnection") {
            controller.RemoveDisconnectedUser(hubMessage);
        }
        else if (hubMessage.HubMessageType === "ImageMessage") {
            alert(hubMessage.Payload);
            //write code to send and convert, carry image to base 64, send ajax, then receive base 64, append it
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

    $('#image-upload').change(function(files) {
        var file = this.files[0];
        controller.UploadedImageToBase64(chatroom, username, file);
    });
};


function ScrollToBottomOfReceivedMessages() {
    $("#messagesReceivedContainer").prop({ scrollTop: $("#messagesReceivedContainer").prop("scrollHeight") });
}