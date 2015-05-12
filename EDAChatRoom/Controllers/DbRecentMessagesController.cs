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
            DbRecentMessage recentMessage = new DbRecentMessage(message);
            dbcontext.RecentMessages.Add(recentMessage);
        }
    }
}
