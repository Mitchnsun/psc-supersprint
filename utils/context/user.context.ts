import { createContext, Dispatch, SetStateAction } from 'react';

export const INITIAL_USER = { uid: null as string | null, isLoggedIn: false };

type UserContextType = {
  user: typeof INITIAL_USER;
  setUser: Dispatch<SetStateAction<typeof INITIAL_USER>>;
};

const initialUser: UserContextType = {
  user: INITIAL_USER,
  setUser: () => {},
};

const UserContext = createContext(initialUser);

export default UserContext;
