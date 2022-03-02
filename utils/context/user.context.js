import { createContext } from 'react'

export const INITIAL_USER = { uid: null, isLoggedIn: false }

const initialUser = {
  user: INITIAL_USER,
  setUser: () => {},
}

const UserContext = createContext(initialUser)

export default UserContext