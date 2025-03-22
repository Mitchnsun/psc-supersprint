import { createContext } from 'react';
import noop from 'lodash/noop';

export const INITIAL_USER = { uid: null, isLoggedIn: false };

const initialUser = {
  user: INITIAL_USER,
  setUser: noop,
};

const UserContext = createContext(initialUser);

export default UserContext;
