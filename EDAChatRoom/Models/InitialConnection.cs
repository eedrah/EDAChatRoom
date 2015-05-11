using System.Collections.Generic;
using System.Linq;
using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public class InitialConnection : ISendable {
        public List<string> Usernames { get; set; }

        public InitialConnection(IEnumerable<string> usernames) {
            Usernames = usernames.ToList();
        }
    }
}