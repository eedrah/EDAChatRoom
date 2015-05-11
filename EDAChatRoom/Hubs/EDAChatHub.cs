using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EDAChatRoom.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace EDAChatRoom.Hubs {
    [HubName("chatroom")]
    public class EDAChatHub : Hub {
        public void ClientSend(string username, string messageText)
        {
            Message message = new Message(username, messageText);
            SendToAll(message);
        }

        private void SendToAll(ISendable sendable) {
            Clients.All.ServerSend(sendable);
        }
    }
}