using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDAChatRoom.Models {
    public interface ISendable {
        InfoType InfoType { get; set; }
    }

    public enum InfoType
    {
        Message,
        Disconnection,
        Connection,
        InitialConnection
    }
}
