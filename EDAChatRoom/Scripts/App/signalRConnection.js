﻿var username;

$(runChat);

function runChat() {
    var controller = new SRController();
    var chatroom = $.connection.chatroom;
    chatroom.state.username = prompt('Enter a groovy alias');
    Notification.requestPermission();
    GetRecentMessages();
    chatroom.client.serverSend = function (hubMessage) {
        var payload = hubMessage.Payload;
        if (hubMessage.HubMessageType === "Message") {
            controller.RenderMessage(payload.Username, payload.MessageText, hubMessage.MessageTime);
        } else {
            console.log(hubMessage);
        }
    }      

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


