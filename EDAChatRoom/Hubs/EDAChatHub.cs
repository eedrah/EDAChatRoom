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
            HubMessage hubMessage = new HubMessage(message);
            SendToAll(hubMessage);
        }

        private void SendToAll(HubMessage hubMessage) {
            Clients.All.ServerSend(hubMessage);
        }
    }
}