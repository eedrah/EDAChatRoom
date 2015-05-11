var username;

$(runChat);

function runChat() {
    var controller = new SRController();
    username = prompt('Enter a groovy alias');
    Notification.requestPermission();
    var chatroom = $.connection.chatroom;

    chatroom.client.serverSend = function (username, message, currentTime) {
        controller.RenderMessage(username, message, currentTime);
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

    $.connection.hub.start();
};


