import { createContext } from 'react';
import { noop } from 'lodash';
import { YEAR } from '../constants';

export const INITIAL_CONTEXT = { year: YEAR };

const initialContext = {
  context: INITIAL_CONTEXT,
  setContext: noop,
};

const GlobalContext = createContext(initialContext);

export default GlobalContext;
