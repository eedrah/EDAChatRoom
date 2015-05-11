function SRController() {
    this.Model = new SRModel();
}

SRController.prototype.RenderMessage = function (username, messageContent, currentTime) {
    this.Model.BindMessageToLiElement(username, messageContent, currentTime);
}

SRController.prototype.SendMessage = function(chatroom) {
    this.Model.SendMessageToServer(chatroom);
}