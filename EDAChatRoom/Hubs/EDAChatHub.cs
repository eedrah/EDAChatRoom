﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EDAChatRoom.Controllers;
using EDAChatRoom.Models;
using EDAChatRoom.Models.ISendableInheritance;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace EDAChatRoom.Hubs {
    [HubName("chatroom")]
    public class EDAChatHub : Hub<IClient> {

        private static Dictionary<string, string> _connectedUsers = new Dictionary<string, string>();
        private RecentMessagesDBMethods recentMessagesDb = new RecentMessagesDBMethods();

        public void ClientSendMessage(string messageText) {
            Message message = new Message(Clients.CallerState.username, messageText);
            HubMessage hubMessage = new HubMessage(message);
            recentMessagesDb.Post(hubMessage);
            recentMessagesDb.DeleteExcessMessagesFromDataBase();
            Clients.All.ServerSend(hubMessage);
        }

        public void ClientSetUsername() {
            _connectedUsers.Add(Context.ConnectionId, Clients.CallerState.username);
            BroadcastAllUsersToUser();
            BroadcastNewUserEntered();
        }

        public override Task OnDisconnected(bool stopCalled) {
            Disconnection disconnection = new Disconnection(_connectedUsers[Context.ConnectionId]);
            HubMessage hubMessage = new HubMessage(disconnection);
            Clients.All.ServerSend(hubMessage);
            _connectedUsers.Remove(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        private void BroadcastAllUsersToUser() {
            InitialConnection initialConnection = new InitialConnection(_connectedUsers.Values);
            HubMessage whoIsInRoomHubMessage = new HubMessage(initialConnection);
            Clients.Caller.ServerSend(whoIsInRoomHubMessage);
        }

        private void BroadcastNewUserEntered() {
            Connection connection = new Connection(Clients.CallerState.username);
            HubMessage newConnectionHubMessage = new HubMessage(connection);
            Clients.All.ServerSend(newConnectionHubMessage);
        }

        public void SendBase64(string username, string base64)
        {
            ImageMessage imageMessage = new ImageMessage(username, base64);
            HubMessage imageHubMessage = new HubMessage(imageMessage);
            Clients.All.ServerSend(imageHubMessage);
        }

        public void SendVideoBlob(string username, string blob)
        {
            VideoStream vs = new VideoStream(username, blob);
            HubMessage videoStreamHubMessage = new HubMessage(vs);
            Clients.Others.ServerSend(videoStreamHubMessage);
        }
    }
}