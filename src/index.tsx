import { render } from 'react-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { setupSentry, setupVitals, setupI18n } from './utils';
import App from './app/app';
import { store } from './store/store';

import './styles/index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

if (window.__RUNTIME_CONFIG__.REACT_APP_ENABLE_TRACKER === 'true') {
  setupSentry();
}

if (window.__RUNTIME_CONFIG__.REACT_APP_ENABLE_VITALS === 'true') {
  setupVitals();
}

const i18n = setupI18n();

render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </StrictMode>,
  document.querySelector('#root'),
);

serviceWorkerRegistration.register();
