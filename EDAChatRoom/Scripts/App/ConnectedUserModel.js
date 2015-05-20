function ConnectedUser(hubMessage) {
    this.UserName = hubMessage.Payload.Username;
    this.TimeConnected = hubMessage.MessageTime;
}