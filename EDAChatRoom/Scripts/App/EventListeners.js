$(function(){

    $("#messageBox").keypress(function (e) {
        if (e.which === 13) {
            $('#sendMessageButton').trigger('click');
            ScrollToBottomOfReceivedMessages();
        }
    });

});