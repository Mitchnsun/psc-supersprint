import { createContext, Dispatch, SetStateAction } from 'react';

import { YEAR } from '../constants';

export const INITIAL_CONTEXT = { year: YEAR };

type GlobalContextType = {
  context: typeof INITIAL_CONTEXT;
  setContext: Dispatch<SetStateAction<typeof INITIAL_CONTEXT>>;
};

const initialContext: GlobalContextType = {
  context: INITIAL_CONTEXT,
  setContext: () => {},
};

const GlobalContext = createContext(initialContext);

export default GlobalContext;
