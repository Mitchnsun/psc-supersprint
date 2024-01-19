import { useState, useMemo } from 'react';
import AddResultForm from '@/components/AddResult';
import LoginForm from '@/components/LoginForm';
import UserContext, { INITIAL_USER } from '@/utils/context/user.context';

const AdminView = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const userMemo = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={userMemo}>{user.isLoggedIn ? <AddResultForm /> : <LoginForm />}</UserContext.Provider>
  );
};

export default AdminView;
