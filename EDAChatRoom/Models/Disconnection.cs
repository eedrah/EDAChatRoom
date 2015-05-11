using System;
using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public class Disconnection : ISendable {
        public string Username { get; set; }

        public Disconnection(string username) {
            Username = username;
        }
    }
}