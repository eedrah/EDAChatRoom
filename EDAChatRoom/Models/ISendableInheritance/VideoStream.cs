using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models.ISendableInheritance
{
    public class VideoStream : ISendable
    {
        public string Username { get; set; }
        public string VideoBlob { get; set; }

        public VideoStream(string username, string videoblob )
        {
            Username = username;
            VideoBlob = videoblob;
        }
    }
}