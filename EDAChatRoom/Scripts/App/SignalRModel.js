function SRModel() {
    this.View = new SRView();
}

SRModel.prototype.BindMessageToLiElement = function(username, messageContent, currentTime) {
    var $li = $('<li>').text(currentTime + " From " + username + ": " + messageContent);
    this.View.RenderMessageToPage($li);
}

SRModel.prototype.SendMessageToServer = function(chatroom) {
    var $messageBox = $('#messageBox');
    if ($messageBox.val() != '') {
        chatroom.server.clientSendMessage($messageBox.val());
    };
    $messageBox.val('');
}