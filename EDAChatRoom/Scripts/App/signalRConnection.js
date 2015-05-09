var username;

$(runChat);

function runChat() {
    username = prompt('Enter a groovy alias');

    var chatroom = $.connection.chatroom;

    chatroom.client.broadcastMessage = function (username, message, currentTime) {
        var $li = $('<li>').text(createLiText(username, message, currentTime));
        $('#messagesReceived').append($li);
    }

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
        chatroom.server.send(username, $messageBox.val());
    };
    $messageBox.val('');
}