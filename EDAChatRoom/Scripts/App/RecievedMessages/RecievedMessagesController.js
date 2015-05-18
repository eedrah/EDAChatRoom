function RMController() {
    this.rmModel = new RMModel();
    this.rmView = new RMView();
}

RMController.prototype.RenderMessage = function (username, messageContent, currentTime) {
    this.rmModel.BindMessageToLiElement(username, messageContent, currentTime);
    if (document["hidden"]) {
        this.rmModel.CreateMessagePopUpNotification(username, messageContent);
    }
}

RMController.prototype.RenderNewConnection = function (hubMessage) {
    var connectedUser = this.rmModel.CreateNewConnectedUser(hubMessage);
    if (document["hidden"]) {
        this.rmModel.CreateConnectionPopUpNotification(connectedUser.UserName);
    }
    this.rmView.CreateMessageAnnouncingNewConnectedUser(connectedUser);
}

RMController.prototype.UpdateConnectedUsersList = function (connectedUsersList) {
    for (var i = 0; i < connectedUsersList.length; i++) {
        if (connectedUsersList[i] !== username) {
            this.rmModel.AddToOnlineUsersList(connectedUsersList[i]);
        }
    }
    this.rmView.ShowOnlineUsers(this.rmModel.OnlineUsers);
}

RMController.prototype.RemoveDisconnectedUser = function (hubMessage) {
    this.rmModel.RemoveDisconnectedUser(hubMessage.Payload.Username);
    this.rmView.ShowOnlineUsers(this.rmModel.OnlineUsers);
}

RMController.prototype.RenderImageMessageToChat = function(imageMessage) {
    this.rmView.ShowImageInChatBox(imageMessage);
}