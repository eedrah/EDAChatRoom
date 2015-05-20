var username;
navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

$(runChat);

function runChat() {
    var srController = new SRController();
    var rmController = new RMController();

    var chatroom = $.connection.chatroom;

    chatroom.state.username = prompt("Enter a groovy alias");
    username = chatroom.state.username;
    Notification.requestPermission();

    chatroom.client.serverSend = function (hubMessage) {
        var payload = hubMessage.Payload;
        if (hubMessage.HubMessageType === "Message") {
            rmController.RenderMessage(payload.Username, payload.MessageText, hubMessage.MessageTime);
        }

        else if (hubMessage.HubMessageType === "InitialConnection") {
            for (var i = 0; i < hubMessage.Payload.RecentMessages.length; i++) {
                var currentMessage = hubMessage.Payload.RecentMessages[i];
                rmController.RenderMessage(currentMessage.Username, currentMessage.MessageText, currentMessage.MessageTime);
            }
            rmController.UpdateConnectedUsersList(payload.Usernames);
        }

        else if (hubMessage.HubMessageType === "Connection") {
            rmController.RenderNewConnection(hubMessage);
        }

        else if (hubMessage.HubMessageType === "Disconnection") {
            rmController.RemoveDisconnectedUser(hubMessage);
        }

        else if (hubMessage.HubMessageType === "ImageMessage") {
            rmController.RenderImageMessageToChat(payload);
        }

        else {
            console.log(hubMessage);
        }
    }      

    $("#sendMessageButton").click(function() {
        srController.SendMessage(chatroom);
    });

    $.connection.hub.start().done(function () {
        chatroom.server.clientSetUsername();
    });

    $("#image-upload").change(function(files) {
        var file = this.files[0];
        srController.UploadedImageToBase64(chatroom, username, file);
    });

    $("#start-video").click(function() {
        navigator.webkitGetUserMedia({
            video: true,
            audio: true
        }, function (localMediaStream) {
            var videostreamsrc = window.URL.createObjectURL(localMediaStream);
            console.log(videostreamsrc);
        }, function(errorCallback) {
            alert(errorCallback);
        });
    });
};

function ScrollToBottomOfReceivedMessages() {
    $("#messagesReceivedContainer").prop({ scrollTop: $("#messagesReceivedContainer").prop("scrollHeight") });
}