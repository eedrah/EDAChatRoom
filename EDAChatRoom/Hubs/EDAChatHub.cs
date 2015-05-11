﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EDAChatRoom.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace EDAChatRoom.Hubs {
    [HubName("chatroom")]
    public class EDAChatHub : Hub<IClient> {
        public void ClientSend(string username, string messageText) {
            Message message = new Message(Clients.CallerState.username, messageText);
            HubMessage hubMessage = new HubMessage(message);
            SendToAll(hubMessage);
        }

        public override Task OnConnected()
        {
            Connection connection = new Connection(Context.ConnectionId);
            HubMessage newConnectionHubMessage = new HubMessage(connection);
            SendToAll(newConnectionHubMessage);

            InitialConnection initialConnection = new InitialConnection(Clients.Others);
            HubMessage whoIsInRoomHubMessage = new HubMessage(initialConnection);
            SendToCaller(whoIsInRoomHubMessage);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled) {
            Disconnection disconnection = new Disconnection(Context.ConnectionId);
            HubMessage hubMessage = new HubMessage(disconnection);
            SendToAll(hubMessage);
            return base.OnDisconnected(stopCalled);
        }

        private void SendToAll(HubMessage hubMessage) {
            Clients.All.ServerSend(hubMessage);
        }

        private void SendToCaller(HubMessage hubMessage) {
            Clients.Caller.ServerSend(hubMessage);
        }
    }
}