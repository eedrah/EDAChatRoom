using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace EDAChatRoom.Models {
    public class Message : ISendable {
        public string Username { get; set; }
        public string MessageText { get; set; }

        public Message(string username, string messageText) {
            Username = username;
            MessageText = messageText;
        }
    }
}