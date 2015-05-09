using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace EDAChatRoom.Hubs {
    [HubName("chatroom")]
    public class EDAChatHub : Hub {
        public void Send(string name, string message)
        {
            string formattedCurrentTime = GetCurrentTime();
            Clients.All.broadcastMessage(name, message, formattedCurrentTime);
        }

        private string GetCurrentTime()
        {
            return DateTime.Now.ToString("t");
        }
    }
}