import { takeLatest } from 'redux-saga/effects';

import { watchOnGame, handleCreateGame } from '../../game/gameActions';
import { actions } from '../../game/gameReducers';

export function* watcherSaga() {
  yield takeLatest(actions.initialiazeGame.type, watchOnGame);
  yield takeLatest(actions.createGame.type, handleCreateGame);
}
