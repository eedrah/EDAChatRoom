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

SRView.prototype.CreateMessageAnnouncingNewConnectedUser = function(connectedUser)
{
    var $li = $("<li>").text(connectedUser.TimeConnected + " , " + connectedUser.UserName + " is now Connected");
    $('#messagesReceived').append($li);
}
