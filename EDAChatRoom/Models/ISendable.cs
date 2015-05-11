using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDAChatRoom.Models {
    public interface ISendable {
        InfoType InfoTypeEnum { get; }
        string InfoType { get; }
    }
}
