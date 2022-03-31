import { take, put, call, apply, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { GameClient } from '../common/gameClient';
import { actions } from './gameReducers';
import { logger } from '../utils';

const createSocketChannel = (socket: any) =>
  eventChannel((emit) => {
    const handleOnMessage = (event: any) => emit(event.data);

    const errorHandler = (errorEvent: any) => emit(new Error(errorEvent?.reason || 'UKNOWN'));

    socket.addEventListener('message', handleOnMessage);
    socket.addEventListener('error', errorHandler);

    return () => {
      socket.removeEventListener('message', handleOnMessage);
    };
  });

function* getMap(socket: any) {
  yield apply(socket, socket.send, ['map']);
}

export function* handleCreateGame(action: any) {
  yield put(actions.updateMessage(''));
  yield apply(GameClient.socket, GameClient.socket.send, [action.payload]);
}

export function* watchOnGame(): any {
  const socket: WebSocket = yield call(GameClient.createConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const data = yield take(socketChannel);

      if (data.includes('map:')) {
        yield put(actions.setMap(data));
      }

      if (data.includes('new:')) {
        yield fork(getMap, socket);
      }

      if (data.includes('open:')) {
        yield put(actions.updateMessage(data.split('open: ')[1]));
        yield fork(getMap, socket);
      }
    } catch (error) {
      logger.error('socket error:', error);
      socketChannel.close();
    }
  }
}
