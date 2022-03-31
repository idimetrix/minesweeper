class GameClient {
  private static _socket: WebSocket;

  public static get socket() {
    return this._socket;
  }

  public static set socket(socketConnection: WebSocket) {
    this._socket = socketConnection;
  }

  public static createConnection(
    url: string = window?.__RUNTIME_CONFIG__?.REACT_APP_SOCKET_ENDPOINT,
  ) {
    if (GameClient.socket) {
      return GameClient.socket;
    }

    GameClient.socket = new WebSocket(url);

    return GameClient.socket;
  }
}

export { GameClient };
