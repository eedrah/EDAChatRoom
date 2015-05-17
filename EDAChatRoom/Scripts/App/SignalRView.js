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

SRView.prototype.ShowOnlineUsers = function(listOfUsers) {
    this.ClearResetOnlineUsersList();
    for (var i = 0; i < listOfUsers.length; i++) {
        $li = $('<li>').text(listOfUsers[i]);
        $('#listOfConnectedUsers').append($li);
    }
}

SRView.prototype.ClearResetOnlineUsersList = function() {
    $('#listOfConnectedUsers').empty();
}