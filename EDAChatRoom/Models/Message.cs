using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace EDAChatRoom.Models {
    public class Message : AbstractSendable {

        [JsonIgnore]
        public override InfoType InfoTypeEnum {
            get { return Models.InfoType.Message; }
        }

        public string Username { get; set; }
        public string MessageText { get; set; }
        public DateTime MessageTime { get; set; }

        public Message(string username, string messageText)
        {
            Username = username;
            MessageText = messageText;
            MessageTime = DateTime.Now;
        }
    }
}