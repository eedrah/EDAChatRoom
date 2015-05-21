﻿function RMModel() {
    this.rmView = new RMView();
    this.OnlineUsers = [];
}

RMModel.prototype.BindMessageToLiElement = function (sender, messageContent, currentTime) {
    var $li = $("<li>").text(currentTime + " From " + sender + ": " + messageContent);
    if (sender === username) {
        $li.prop("id", "self");
    } else {
        $li.prop("id", sender);
    }
    this.rmView.RenderMessageToPage($li);
}

RMModel.prototype.CreateNewConnectedUser = function (hubMessage) {
    var connectedUser = new ConnectedUser(hubMessage);
    this.AddToOnlineUsersList(connectedUser.UserName);
    this.rmView.ShowOnlineUsers(this.OnlineUsers);
    return connectedUser;
}

RMModel.prototype.AddToOnlineUsersList = function (userName) {
    this.OnlineUsers.push(userName);
}

RMModel.prototype.RemoveDisconnectedUser = function () {
    for (var i = 0; i < this.OnlineUsers.length; i++) {
        if (username === this.OnlineUsers[i]) {
            var toDelete = this.OnlineUsers[i];
            this.OnlineUsers.pop(toDelete);
        }
    }
}

// Notifications

RMModel.prototype.CreateMessagePopUpNotification = function (username, message) {
    $("#messageAlertSound").get(0).play();
    var popup = new Notification("You have a message from " + username, {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
        body: message
    });
    this.ClosePopUpNotification(popup);
}

RMModel.prototype.CreateConnectionPopUpNotification = function (username) {
    $("#messageAlertSound").get(0).play();
    var popup = new Notification(username + " is now online", {
        icon: 'https://pbs.twimg.com/profile_images/378800000701114379/c2d4e7d706aec1b1207c40874c0d420d_400x400.png',
    });
    this.ClosePopUpNotification(popup);
}

RMModel.prototype.ClosePopUpNotification = function (popup) {
    setTimeout(function () {
        popup.close();
    }, 4000);
}