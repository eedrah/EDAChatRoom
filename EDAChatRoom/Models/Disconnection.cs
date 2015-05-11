using System;
using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public class Disconnection : ISendable {
        public string UserConnectionId { get; set; }

        public Disconnection(string connectionId) {
            UserConnectionId = connectionId;
        }
    }
}