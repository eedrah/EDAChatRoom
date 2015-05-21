function RMView() {
    
}

RMView.prototype.RenderMessageToPage = function ($liElement) {
    $("#messagesReceived").append($liElement);
    ScrollToBottomOfReceivedMessages();
}

RMView.prototype.CreateMessageAnnouncingNewConnectedUser = function (connectedUser) {
    var $li = $("<li>").text(connectedUser.TimeConnected + " , " + connectedUser.UserName + " is now Connected");
    $("#messagesReceived").append($li);
}

RMView.prototype.ShowOnlineUsers = function (listOfUsers) {
    this.ResetOnlineUsersList();
    for (var i = 0; i < listOfUsers.length; i++) {
        var $li = $("<li>").text(listOfUsers[i]);
        $("#listOfConnectedUsers").append($li);
    }
}

RMView.prototype.ResetOnlineUsersList = function () {
    $("#listOfConnectedUsers").empty();
}

RMView.prototype.ShowImageInChatBox = function (imageMessage) {
    var image = new Image();
    var messages = $("#messagesReceived");
    var $li = $("<li>").text("image recieved from " + imageMessage.Username);

    image.src = imageMessage.ImageBase64;
    $li.append(image);
    messages.append($li);
}

RMView.prototype.DisplayVideoStreamOnPage = function(stream) {
    var video = $('#video')[0];
    video.src = stream;
    //var canvas = $('#canvas')[0];
    //var ctx = canvas.getContext('2d');

    //var image = new Image();
    //image.src = stream;
    //ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}
