import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import Title from '@/components/atoms/Title';
import AddResultForm from '@/components/AddResult';
import LoginForm from '@/components/LoginForm';
import UserContext, { INITIAL_USER } from '@/utils/context/user.context';

const AdminPage = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const userMemo = useMemo(() => ({ user, setUser }), [user]);

  return (
    <React.Fragment>
      <Helmet>
        <title>PSC Supersprint</title>
      </Helmet>
      <Title hLevel="h1">Administration Résultat</Title>
      <UserContext.Provider value={userMemo}>
        {user.isLoggedIn ? <AddResultForm /> : <LoginForm />}
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default AdminPage;
