using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models
{
    public class DbRecentMessage
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string MessageText { get; set; }
        public DateTime MessageTime { get; set; }

        public DbRecentMessage(Message message)
        {
            Username = message.Username;
            MessageText = message.MessageText;
            MessageTime = DateTime.Now;
        }
    }
}