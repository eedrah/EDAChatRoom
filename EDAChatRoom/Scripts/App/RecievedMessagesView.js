function RMView() {
    
}

RMView.prototype.RenderMessageToPage = function ($liElement) {
    $('#messagesReceived').append($liElement);
    ScrollToBottomOfReceivedMessages();
}
