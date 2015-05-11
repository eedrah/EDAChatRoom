﻿using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EDAChatRoom.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace EDAChatRoom.Hubs {
    [HubName("chatroom")]
    public class EDAChatHub : Hub<IClient> {
        private static Dictionary<string, string> _connectedUsers = new Dictionary<string, string>();

        public void ClientSendMessage(string messageText) {
            Message message = new Message(Clients.CallerState.username, messageText);
            HubMessage hubMessage = new HubMessage(message);
            Clients.All.ServerSend(hubMessage);
        }

        public void ClientSetUsername() {
            _connectedUsers.Add(Context.ConnectionId, Clients.CallerState.username);
            BroadcastNewUserEntered();
            BroadcastAllUsersToUser();
        }

        public override Task OnDisconnected(bool stopCalled) {
            Disconnection disconnection = new Disconnection(Context.ConnectionId);
            HubMessage hubMessage = new HubMessage(disconnection);
            Clients.All.ServerSend(hubMessage);

            _connectedUsers.Remove(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        private void BroadcastAllUsersToUser() {
            InitialConnection initialConnection = new InitialConnection(Clients.Others);
            HubMessage whoIsInRoomHubMessage = new HubMessage(initialConnection);
            Clients.Caller.ServerSend(whoIsInRoomHubMessage);
        }

        private void BroadcastNewUserEntered() {
            Connection connection = new Connection(Context.ConnectionId);
            HubMessage newConnectionHubMessage = new HubMessage(connection);
            Clients.All.ServerSend(newConnectionHubMessage);
        }
    }
}