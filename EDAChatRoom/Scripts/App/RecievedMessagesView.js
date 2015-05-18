function RMView() {
    
}

RMView.prototype.RenderMessageToPage = function ($liElement) {
    $('#messagesReceived').append($liElement);
    ScrollToBottomOfReceivedMessages();
}

RMView.prototype.CreateMessageAnnouncingNewConnectedUser = function (connectedUser) {
    var $li = $("<li>").text(connectedUser.TimeConnected + " , " + connectedUser.UserName + " is now Connected");
    $('#messagesReceived').append($li);
}

RMView.prototype.ShowOnlineUsers = function (listOfUsers) {
    this.ResetOnlineUsersList();
    for (var i = 0; i < listOfUsers.length; i++) {
        $li = $('<li>').text(listOfUsers[i]);
        $('#listOfConnectedUsers').append($li);
    }
}

RMView.prototype.ResetOnlineUsersList = function () {
    $('#listOfConnectedUsers').empty();
}