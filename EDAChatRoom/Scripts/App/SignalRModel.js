function SRModel() {
    this.View = new SRView();
    this.OnlineUsers = [];
}

SRModel.prototype.SendMessageToServer = function(chatroom) {
    var $messageBox = $('#messageBox');
    if ($messageBox.val() != '') {
        chatroom.server.clientSendMessage($messageBox.val());
    };
}

SRModel.prototype.SendBase64ImageToServer = function (chatroom, username, base64) {
    chatroom.server.sendBase64(username, base64);
}

//----------------------------------------------------------------------------------------------------------------------------
//Online Users

//SRModel.prototype.CreateNewConnectedUser = function(hubMessage)
//{
//    var connectedUser = new ConnectedUser(hubMessage);
//    this.AddToOnlineUsersList(connectedUser.UserName);
//    this.View.ShowOnlineUsers(this.OnlineUsers);
//    return connectedUser;
//}

//SRModel.prototype.AddToOnlineUsersList = function (userName) {
//    this.OnlineUsers.push(userName);
//}

SRModel.prototype.RemoveDisconnectedUser = function () {
    for (var i = 0; i < this.OnlineUsers.length; i++) {
        if (username === this.OnlineUsers[i]) {
            var toDelete = this.OnlineUsers[i];
            this.OnlineUsers.pop(toDelete);
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------
//Image file reading to base 64

SRModel.prototype.ReadImageFile = function (chatroom, username, file) {
    var base64;
    var that = this;
    var user = username;
    this.FileReaderLoadEnd(file, function(e) {
        base64 = e.target.result;
        that.SendBase64ImageToServer(chatroom, user, base64);
    });
}

SRModel.prototype.FileReaderLoadEnd = function (file, callback) {
    var reader = new FileReader();
    reader.onloadend = callback;
    reader.readAsDataURL(file);
};

//------------------------------------------------------------------------------------------------------------------
//NOTIFICATIONS

SRModel.prototype.CreateConnectionPopUpNotification = function (username) {
    $('#messageAlertSound').get(0).play();
    var popup = new Notification(username + ' is now online', {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
    });
    this.ClosePopUpNotification(popup);
}

SRModel.prototype.ClosePopUpNotification = function (popup) {
    setTimeout(function () {
        popup.close();
    }, 4000);
}