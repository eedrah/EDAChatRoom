function SRController() {
    this.Model = new SRModel();
    this.View = new SRView();
}

SRController.prototype.RenderMessage = function (username, messageContent, currentTime) {
    this.Model.BindMessageToLiElement(username, messageContent, currentTime);
    if (document["hidden"]) {
        this.Model.CreateMessagePopUpNotification(username, messageContent);
    }
}

SRController.prototype.SendMessage = function(chatroom) {
    this.Model.SendMessageToServer(chatroom);
    this.View.ClearEnterMessageBox();
}

SRController.prototype.RenderNewConnection = function(hubMessage) {
    var connectedUser = this.Model.CreateNewConnectedUser(hubMessage);
    this.View.CreateMessageAnnouncingNewConnectedUser(connectedUser);
    if (connectedUser.UserName !== username && document["hidden"]) {
        this.View.AppendUsersToConnectedUsersList(connectedUser.UserName);
        this.Model.CreateConnectionPopUpNotification(connectedUser.UserName);
    }
    else if (connectedUser.UserName !== username) {
        this.View.AppendUsersToConnectedUsersList(connectedUser.UserName);
    }
}

SRController.prototype.UpdateConnectedUsersList = function(connectedUsersList) {
    for (var i = 0; i < connectedUsersList.length; i++) {
        var currentUser = connectedUsersList[i];
        this.View.AppendUsersToConnectedUsersList(currentUser);
    }
}

SRController.prototype.RemoveDisconnectedUser = function(hubMessage) {
    this.Model.FindDisconnectedUserInList(hubMessage.Payload.Username);
}
