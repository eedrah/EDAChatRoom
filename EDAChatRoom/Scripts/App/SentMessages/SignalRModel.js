function SRModel() {
    this.View = new SRView();
    this.OnlineUsers = [];
}

SRModel.prototype.SendMessageToServer = function(chatroom) {
    var $messageBox = $("#messageBox");
    if ($messageBox.val() != "") {
        chatroom.server.clientSendMessage($messageBox.val());
    };
}

SRModel.prototype.SendBase64ImageToServer = function (chatroom, username, base64) {
    chatroom.server.sendBase64(username, base64);
}

SRModel.prototype.SendBlobToServer = function(chatroom, username, blob) {
    
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
