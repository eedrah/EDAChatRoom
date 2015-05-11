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
