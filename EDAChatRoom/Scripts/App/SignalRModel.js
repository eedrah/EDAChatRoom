function SRModel() {
    this.View = new SRView();
}

SRModel.prototype.BindMessageToLiElement = function(username, messageContent, currentTime) {
    var $li = $('<li>').text(currentTime + " From " + username + ": " + messageContent);
    this.View.RenderMessageToPage($li);
}