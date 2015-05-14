using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models
{
    public class InitialConnectionContainingRecentMessages : ISendable
    {
        public List<DbRecentMessage> RecentMessages { get; set; }

        public InitialConnectionContainingRecentMessages()
        {
            context dbContext = new context();
            RecentMessages = dbContext.RecentMessages.ToList();
        }
         
    }
}