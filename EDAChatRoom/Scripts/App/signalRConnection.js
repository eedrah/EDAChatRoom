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
        //var $li = $('<li>').text(createLiText(username, message, currentTime));
        //$('#messagesReceived').append($li);
        ////need to add condition to check if user is currently on the window or not
        //if (document["hidden"]) {
        //    createPopUpNotification(username, message);
        //}

    $("#messageBox").keypress(function(e) {
        if (e.which === 13) {
            $('#sendMessageButton').trigger('click');
        }
    });

    $('#sendMessageButton').click(function() {
        sendMessage(chatroom);
    });

    $.connection.hub.start();
};

function createLiText(username, message, currentTime) {
    return currentTime + " From " + username + ": " + message;
}

function sendMessage(chatroom) {
    var $messageBox = $('#messageBox');
    if ($messageBox.val() != '') {
        chatroom.server.clientSendMessage($messageBox.val());
    };
    $messageBox.val('');
}

function createPopUpNotification(username, message) {
    $('#messageAlertSound').get(0).play();
    var popup = new Notification('You have a message from ' + username, {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
       body: message
    });
    setTimeout(function() {
        popup.close();
    }, 5000);
}