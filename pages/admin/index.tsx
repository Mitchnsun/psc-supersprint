import dynamic from 'next/dynamic';
import { Helmet } from 'react-helmet';

import Title from '@/components/atoms/Title';

const AdminView = dynamic(() => import('@/views/Admin.view'), { ssr: false });
const AdminPage = () => (
  <>
    <Helmet>
      <title>PSC Supersprint</title>
    </Helmet>
    <Title hLevel="h1">Administration Résultat</Title>
    <AdminView />
  </>
);

export default AdminPage;
