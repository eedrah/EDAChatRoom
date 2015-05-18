function SRController() {
    this.Model = new SRModel();
    this.View = new SRView();
}


SRController.prototype.SendMessage = function(chatroom) {
    this.Model.SendMessageToServer(chatroom);
    this.View.ClearEnterMessageBox();
}

SRController.prototype.UploadedImageToBase64 = function(chatroom, username, file)
{
    this.Model.ReadImageFile(chatroom, username, file);
}