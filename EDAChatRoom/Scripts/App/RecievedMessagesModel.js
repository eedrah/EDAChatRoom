function RMModel() {
    this.rmView = new RMView();
    this.OnlineUsers = [];
}

RMModel.prototype.BindMessageToLiElement = function (username, messageContent, currentTime) {
    var $li = $('<li>').text(currentTime + " From " + username + ": " + messageContent);
    this.rmView.RenderMessageToPage($li);
}

RMModel.prototype.CreateMessagePopUpNotification = function (username, message) {
    $('#messageAlertSound').get(0).play();
    var popup = new Notification('You have a message from ' + username, {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
        body: message
    });
    this.ClosePopUpNotification(popup);
}

RMModel.prototype.ClosePopUpNotification = function (popup) {
    setTimeout(function () {
        popup.close();
    }, 4000);
}