using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models
{
    public class RecentMessagesDBMethods
    {
        public context DbContext = new context();

        public void Post(HubMessage message)
        {
            DbSet<DbRecentMessage> recentMessagesTable = DbContext.RecentMessages;
            DbRecentMessage recentMessage = new DbRecentMessage(message);
            recentMessagesTable.Add(recentMessage);
            DbContext.SaveChanges();
        }

        public void DeleteExcessMessagesFromDataBase()
        {
            DbSet<DbRecentMessage> recentMessagesTable = DbContext.RecentMessages;
            while (recentMessagesTable.Count() > 30)
            {
                try
                {
                    DbRecentMessage oldestMessage = recentMessagesTable.OrderBy(r => r.MessageTime).First();
                    DbContext.RecentMessages.Remove(oldestMessage);
                    DbContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    //if optimisticconcurrencyexception
                    //var ctx = ((IObjectContextAdapter)recentMessagesTable).ObjectContext;
                    //ctx.Refresh(RefreshMode.ClientWins, recentMessagesTable);
                }
            }
        }
    }
}