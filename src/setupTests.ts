// eslint-disable-next-line import/no-unresolved
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line import/no-unresolved
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({
  adapter: new Adapter(),
});
