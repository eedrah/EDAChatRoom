using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EDAChatRoom.Models;

namespace EDAChatRoom.Controllers
{
    public class DbRecentMessagesController : ApiController
    {
        public context dbcontext = new context();

        public void Post(HubMessage message)
        {
            var recentMessagesTable = dbcontext.RecentMessages;
            DbRecentMessage recentMessage = new DbRecentMessage(message);
            recentMessagesTable.Add(recentMessage);
            dbcontext.SaveChanges();
            if (recentMessagesTable.Count() <= 30)
            {
                DbRecentMessage toBeDeleted = recentMessagesTable.OrderByDescending(r => r.MessageTime).First();
                //dbcontext.RecentMessages.Remove(toBeDeleted);
            }
        }
    }
}
