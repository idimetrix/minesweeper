// eslint-disable-next-line import/no-unresolved
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import App from './app';
import { watcherSaga } from '../store/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders correctly and to match snapshot', () => {
    const initialState = {
      game: {
        map: [],
        message: '',
      },
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Start button appears in first render 1', () => {
    const initialState = {
      game: {
        map: [],
        message: '',
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(wrapper.text().includes('Minesweeper')).toBe(true);
    expect(wrapper.text().includes('Press START and start playing Minesweeper!')).toBe(true);
    expect(wrapper.text().includes('Start')).toBe(true);
  });

  it('Start button appears in first render 2', () => {
    const initialState = {
      game: {
        map: [
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
          '□□□□□□□□□□',
        ],
        message: '',
      },
    };
    const store = mockStore(initialState);

    sagaMiddleware.run(watcherSaga);

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(wrapper.getByText('Play again')).toBeTruthy();
  });
});
