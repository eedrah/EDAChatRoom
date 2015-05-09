using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EDAChatRoom.Models {
    public class DemoPassing {
        public string Name { get; set; }
        public int Age { get; set; }
        public Car Car { get; set; }
    }

    public class Car
    {
        public string Color { get; set; }
        public int Wheels { get; set; }
    }
}