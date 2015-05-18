function SRView() {
    
}

SRView.prototype.RenderMessageToPage = function($liElement) {
    $("#messagesReceived").append($liElement);
    ScrollToBottomOfReceivedMessages();
}

SRView.prototype.ClearEnterMessageBox = function()
{
    $("#messageBox").val("");
}

SRView.prototype.ShowImageInChatBox = function(imageMessage) {
    var image = new Image();
    var preview = $("#messagesReceived");
    var $li = $("<li>").text("image recieved from " + imageMessage.Username);

    image.src = imageMessage.ImageBase64;
    $li.append(image);
    preview.append($li);
}