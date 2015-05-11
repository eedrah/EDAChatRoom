function SRController() {
    this.Model = new SRModel();
    this.View = new SRView();
}

SRController.prototype.RenderMessage = function (username, messageContent, currentTime) {
    this.Model.BindMessageToLiElement(username, messageContent, currentTime);
    if (document["hidden"]) {
        createPopUpNotification(username, message);
    }
}

SRController.prototype.SendMessage = function(chatroom) {
    this.Model.SendMessageToServer(chatroom);
    this.View.ClearEnterMessageBox();
}


function createPopUpNotification(username, message) {
    $('#messageAlertSound').get(0).play();
    var popup = new Notification('You have a message from ' + username, {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
        body: message
    });
    setTimeout(function () {
        popup.close();
    }, 4000);
}