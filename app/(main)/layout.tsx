import { ReactNode } from 'react';

import Layout from '@/components/Layout';

/**
 * Layout for main pages using the default theme
 * Applied to: home, admin, live, etc.
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
