using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models {
    public class HubMessage {
        public DateTime MessageTime { get; set; }
        public ISendable Payload { get; set; }
        public string HubMessageType { get; private set; }

        public HubMessage(ISendable payload) {
            Payload = payload;
            MessageTime = DateTime.Now;
            HubMessageType = payload.GetType().Name;
        }
    }
}