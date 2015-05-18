using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models
{
    public class ImageMessage : ISendable
    {
        public string Username { get; set; }
        public string ImageBase64 { get; set; }

        public ImageMessage(string username, string imagebase64) 
        {
            Username = username;
            ImageBase64 = imagebase64;
        }
    }
}