using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EDAChatRoom.Hubs;
using EDAChatRoom.Models;

namespace EDAChatRoom.Controllers
{
    public class ImageMessagesController : ApiController
    {
        private EDAChatHub chatRoom = new EDAChatHub();

        public void Post(string userName, string imagebase64)
        {
            ImageMessage im = new ImageMessage(userName, imagebase64);
            chatRoom.BroadcastImageMessage(im);
        }
    }
}
