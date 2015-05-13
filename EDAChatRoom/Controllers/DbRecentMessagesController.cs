using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using EDAChatRoom.Models;

namespace EDAChatRoom.Controllers
{
    public class DbRecentMessagesController : Controller
    {
        public context dbcontext = new context();

        public void Post(HubMessage message)
        {
            DbSet<DbRecentMessage> recentMessagesTable = dbcontext.RecentMessages;
            DbRecentMessage recentMessage = new DbRecentMessage(message);
            recentMessagesTable.Add(recentMessage);
            dbcontext.SaveChanges();
        }

        public void DeleteExcessMessagesFromDataBase()
        {
            DbSet<DbRecentMessage> recentMessagesTable = dbcontext.RecentMessages;
            while (recentMessagesTable.Count() > 30)
            {
                try
                {
                    DbRecentMessage oldestMessage = recentMessagesTable.OrderBy(r => r.MessageTime).First();
                    dbcontext.RecentMessages.Remove(oldestMessage);
                    dbcontext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    //if optimisticconcurrencyexception
                    //var ctx = ((IObjectContextAdapter)recentMessagesTable).ObjectContext;
                    //ctx.Refresh(RefreshMode.ClientWins, recentMessagesTable);
                }
            }
        }

        public IQueryable<DbRecentMessage> Get()
        {
            return dbcontext.RecentMessages;
        } 
    }
}
