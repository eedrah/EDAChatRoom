var username;

$(runChat);

function runChat() {
    username = prompt('Enter a groovy alias');
    Notification.requestPermission();
    var chatroom = $.connection.chatroom;

    chatroom.client.broadcastMessage = function (username, message, currentTime) {
        var $li = $('<li>').text(createLiText(username, message, currentTime));
        $('#messagesReceived').append($li);
        $('#messageAlertSound').get(0).play();
        //need to add condition to check if user is currently on the window or not
        notifyMe(username, message);
  
    }

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
        chatroom.server.send(username, $messageBox.val());
    };
    $messageBox.val('');
}

function notifyMe(username, message) {

    var popup = new Notification('You have a message from ' + username, {
       icon: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAJiAAAAJGQ5MGM3MzIwLTA5NzUtNDE4Yy04ZTkzLTY3YjgyY2Y1ODcxZA.jpg',
       body: message
    });
    setTimeout(function() {
        popup.close();
    }, 5000);

}