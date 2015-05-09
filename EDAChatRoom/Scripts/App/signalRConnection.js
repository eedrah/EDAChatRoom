var username;

$(runChat);

function runChat() {
    username = prompt('Enter a groovy alias')

    var chatroom = $.connection.chatroom;

    chatroom.client.broadcastMessage = function (username, message) {
        var $li = $('<li>').text(createLiText(username, message));
        $('#messagesReceived').append($li);
    }

    $('#sendMessageButton').click(function() {
        sendMessage(chatroom);
    });

    $.connection.hub.start();
};

function createLiText(username, message) {
    return "From " + username + ": " + message;
}

function sendMessage(chatroom) {
    var $messageBox = $('#messageBox');
    if ($messageBox.val() != '') {
        chatroom.server.send(username, $messageBox.val());
    };
    $messageBox.val('');
}