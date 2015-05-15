function SRController() {
    this.Model = new SRModel();
    this.View = new SRView();
}

SRController.prototype.RenderMessage = function (username, messageContent, currentTime) {
    this.Model.BindMessageToLiElement(username, messageContent, currentTime);
    if (document["hidden"]) {
        this.Model.CreatePopUpNotification(username, messageContent);
    }
}

SRController.prototype.SendMessage = function(chatroom) {
    this.Model.SendMessageToServer(chatroom);
    this.View.ClearEnterMessageBox();
}

SRController.prototype.RenderNewConnection = function(hubMessage) {
    var connectedUser = this.Model.CreateNewConnectedUser(hubMessage);
    this.View.CreateMessageAnnouncingNewConnectedUser(connectedUser);
}

SRController.prototype.UpdateConnectedUsersList = function(connectedUsersList) {
    for (var i = 0; i < connectedUsersList.length; i++) {
        var currentUser = connectedUsersList[i];
        console.log(currentUser);
        this.View.AppendUsersToConnectedUsersList(currentUser);
    }
}
