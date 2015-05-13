function SRView() {
    
}

SRView.prototype.RenderMessageToPage = function($liElement) {
    $('#messagesReceived').append($liElement);
    ScrollToBottom(messagesReceivedContainer);
}

SRView.prototype.ClearEnterMessageBox = function()
{
    $('#messageBox').val('');
}