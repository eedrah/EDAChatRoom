using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public class Connection : ISendable {
        public string UserConnectionId { get; set; }

        public Connection(string connectionId) {
            UserConnectionId = connectionId;
        }
    }
}