function SRView() {
    
}

SRView.prototype.RenderMessageToPage = function($liElement) {
    $('#messagesReceived').append($liElement);
    ScrollToBottomOfReceivedMessages();
}

SRView.prototype.ClearEnterMessageBox = function()
{
    $('#messageBox').val('');
}