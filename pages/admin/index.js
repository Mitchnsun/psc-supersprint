import React from 'react';
import { Helmet } from 'react-helmet';

import Title from '../../components/atoms/Title';
import AddResultForm from '../../components/AddResult';

const AdminPage = () => (
  <React.Fragment>
    <Helmet>
      <title>PSC Supersprint</title>
    </Helmet>
    <Title hLevel={1}>Administration Résultat</Title>
    <AddResultForm />
  </React.Fragment>
);

export default AdminPage
