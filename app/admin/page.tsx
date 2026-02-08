'use client';

import dynamic from 'next/dynamic';
import Title from '@/components/atoms/Title';

const AdminView = dynamic(() => import('@/views/Admin.view'), { ssr: false });

export default function AdminPage() {
  return (
    <>
      <Title hLevel="h1">Administration Résultat</Title>
      <AdminView />
    </>
  );
}
