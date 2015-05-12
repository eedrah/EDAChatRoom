using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models
{
    public class DbRecentMessage
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string MessageText { get; set; }
        public DateTime MessageTime { get; set; }

        public DbRecentMessage()
        {
            
        }

        public DbRecentMessage(HubMessage hubMessage)
        {
            Message message = (Message)hubMessage.Payload;
            Username = message.Username;
            MessageText = message.MessageText;
            MessageTime = hubMessage.MessageTime;
        }
    }
}