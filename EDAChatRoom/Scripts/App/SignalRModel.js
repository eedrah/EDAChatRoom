function SRModel() {
    this.View = new SRView();
}

SRModel.prototype.BindMessageToLiElement = function(username, messageContent, currentTime) {
    var $li = $('<li>').text(currentTime + " From " + username + ": " + messageContent);
    this.View.RenderMessageToPage($li);
}

SRModel.prototype.SendMessageToServer = function(chatroom) {
    var $messageBox = $('#messageBox');
    if ($messageBox.val() != '') {
        chatroom.server.clientSendMessage($messageBox.val());
    };
}

SRModel.prototype.CreateMessagePopUpNotification = function(username, message) {
    $('#messageAlertSound').get(0).play();
    var popup = new Notification('You have a message from ' + username, {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
        body: message
    });
    this.ClosePopUpNotification(popup);
}

SRModel.prototype.CreateConnectionPopUpNotification = function (username) {
    $('#messageAlertSound').get(0).play();
    var popup = new Notification(username + ' is now online', {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
    });
    this.ClosePopUpNotification(popup);
}

SRModel.prototype.ClosePopUpNotification = function(popup)
{
    setTimeout(function () {
        popup.close();
    }, 4000);
}

SRModel.prototype.CreateNewConnectedUser = function(hubMessage)
{
    return new ConnectedUser(hubMessage);
}

