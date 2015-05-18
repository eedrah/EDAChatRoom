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