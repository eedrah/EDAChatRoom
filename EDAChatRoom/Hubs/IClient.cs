using EDAChatRoom.Models;

namespace EDAChatRoom.Hubs {
    public interface IClient {
        void ServerSend(HubMessage hubMessage);
    }
}