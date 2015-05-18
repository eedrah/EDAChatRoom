using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public class Connection : ISendable {
        public string Username { get; set; }

        public Connection(string username) {
            Username = username;
        }
    }
}