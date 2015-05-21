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
        var messagetype = hubMessage.HubMessageType;
        if (messagetype === "Message") {
            rmController.RenderMessage(payload.Username, payload.MessageText, hubMessage.MessageTime);
        }

        else if (messagetype === "InitialConnection") {
            for (var i = 0; i < hubMessage.Payload.RecentMessages.length; i++) {
                var currentMessage = hubMessage.Payload.RecentMessages[i];
                rmController.RenderMessage(currentMessage.Username, currentMessage.MessageText, currentMessage.MessageTime);
            }
            rmController.UpdateConnectedUsersList(payload.Usernames);
        }

        else if (messagetype === "Connection") {
            rmController.RenderNewConnection(hubMessage);
        }

        else if (messagetype === "Disconnection") {
            rmController.RemoveDisconnectedUser(hubMessage);
        }

        else if (messagetype === "ImageMessage") {
            rmController.RenderImageMessageToChat(payload);
        }

        else if (messagetype) {
            var stream = payload.VideoBlob;
            rmController.RenderVideoStream(stream);
        }

        else {
            console.log(hubMessage);
        }
    }

    $("#sendMessageButton").click(function () {
        srController.SendMessage(chatroom);
    });

    $.connection.hub.start().done(function () {
        chatroom.server.clientSetUsername();
    });

    $("#image-upload").change(function (files) {
        var file = this.files[0];
        srController.UploadedImageToBase64(chatroom, username, file);
    });

    $("#start-video").click(function () {
        navigator.webkitGetUserMedia({
            video: true,
            audio: true
        }, function (localMediaStream) {
            var videostreamsrc = window.URL.createObjectURL(localMediaStream);
            //srController.SendVideoStreamBlob(chatroom, username, videostreamsrc);
            var $vid = $('#video')[0];
            $vid.src = videostreamsrc;
            drawcanvas();
        }, function (errorCallback) {
            alert("Rejectedddddd! " + errorCallback.name);
        });
    });
};

function ScrollToBottomOfReceivedMessages() {
    $("#messagesReceivedContainer").prop({ scrollTop: $("#messagesReceivedContainer").prop("scrollHeight") });
}

function drawcanvas() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var video = $('#video')[0];

    setInterval(function () {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }, 100);
}