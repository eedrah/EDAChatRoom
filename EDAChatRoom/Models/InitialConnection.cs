using System.Collections.Generic;
using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public class InitialConnection : ISendable {
        public List<string> Usernames { get; set; } 

        public InitialConnection(dynamic others) {
            //foreach (dynamic other in others)
            //{
            //    Usernames.Add(other.username);
            //}
        }
    }
}