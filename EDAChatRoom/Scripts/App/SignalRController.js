function SRController() {
    this.Model = new SRModel();
    this.View = new SRView();
}


SRController.prototype.SendMessage = function(chatroom) {
    this.Model.SendMessageToServer(chatroom);
    this.View.ClearEnterMessageBox();
}

//SRController.prototype.RenderNewConnection = function(hubMessage) {
//    var connectedUser = this.Model.CreateNewConnectedUser(hubMessage);
//    this.View.CreateMessageAnnouncingNewConnectedUser(connectedUser);
//}

//SRController.prototype.UpdateConnectedUsersList = function (connectedUsersList) {
//    for (var i = 0; i < connectedUsersList.length; i++) {
//        if (connectedUsersList[i] !== username) {
//            this.Model.AddToOnlineUsersList(connectedUsersList[i]);
//        }
//    }
//    this.View.ShowOnlineUsers(this.Model.OnlineUsers);
//}

SRController.prototype.RemoveDisconnectedUser = function(hubMessage) {
    this.Model.RemoveDisconnectedUser(hubMessage.Payload.Username);
    this.View.ShowOnlineUsers(this.Model.OnlineUsers);
}

SRController.prototype.UploadedImageToBase64 = function(chatroom, username, file)
{
    this.Model.ReadImageFile(chatroom, username, file);
}

SRController.prototype.RenderImageMessageToChat = function(imageMessage) {
    this.View.ShowImageInChatBox(imageMessage);
}