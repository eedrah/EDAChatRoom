function SRView() {
    
}

SRView.prototype.RenderMessageToPage = function($liElement) {
    $('#messagesReceived').append($liElement);
}

SRView.prototype.ClearEnterMessageBox = function()
{
    $('#messageBox').val('');
}