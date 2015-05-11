namespace EDAChatRoom.Models {
    public abstract class AbstractSendable : ISendable {
        public abstract InfoType InfoTypeEnum { get; }

        public string InfoType {
            get { return InfoTypeEnum.ToString(); }
        }
    }
}