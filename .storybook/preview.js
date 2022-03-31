import { I18nextProvider } from 'react-i18next';
import { addDecorator } from '@storybook/react';

import '../src/styles/index.css';

import { i18n } from './i18next.js';

addDecorator((storyFn) => <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    es: 'Spanish',
    mx: 'Mexican',
  },
};
