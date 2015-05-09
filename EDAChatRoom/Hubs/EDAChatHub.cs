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
        public void Send(string name, string message)
        {
            string formattedCurrentTime = GetCurrentTime();
            DemoPassing demoPassing = new DemoPassing()
            {
                Age = 3,
                Car = new Car() {Color = "color", Wheels = 4},
                Name = "sdlfkjsdfName"
            };
            Clients.All.broadcastMessage(name, message, formattedCurrentTime, demoPassing);
        }

        private string GetCurrentTime()
        {
            return DateTime.Now.ToString("t");
        }
    }
}