using System.Collections.Generic;
using System.Linq;
using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public class InitialConnection : ISendable {
        public List<string> Usernames { get; set; }
        public List<DbRecentMessage> RecentMessages { get; set; }
        private context dbContext = new context();

        public InitialConnection(IEnumerable<string> usernames) {
            Usernames = usernames.ToList();
            RecentMessages = dbContext.RecentMessages.ToList();
        }
    }
}