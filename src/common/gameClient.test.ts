import { GameClient } from './gameClient';

describe('GameClient', () => {
  test('createConnection should connect to socket with invalid url', () => {
    const url = 'invalid_url';

    expect(() => GameClient.createConnection(url)).toThrow(
      new Error(`The URL '${url}' is invalid.`),
    );
  });

  test('createConnection should connect to socket with valid url', () => {
    const socket: WebSocket = GameClient.createConnection('wss://hometask.eg1236.com/game1/');

    expect(socket).toBe(GameClient.socket);
  });
});
