import { createSlice } from '@reduxjs/toolkit';

import { logger } from '../utils';

interface GameState {
  map: string[];
  message: string;
}

const initialState: GameState = {
  map: [],
  message: '',
};

export const { actions, reducer } = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initialiazeGame(state: GameState) {
      logger.log('REDUCER > initialiazeGame', { state });
    },
    createGame(state: GameState, action: any) {
      logger.log('REDUCER > createGame', { state, action });
    },
    getMap(state: GameState) {
      logger.log('REDUCER > getMap', { state });
    },
    setMap(state: GameState, action) {
      logger.log('REDUCER > setMap', { state, action });

      state.map = action.payload
        .split('map:')[1]
        .split('\n')
        .filter((item: string[]) => item.length > 0);
    },
    updateMessage(state: GameState, action) {
      logger.log('REDUCER > updateMessage', { state, action });

      state.message = action.payload;
    },
  },
});
