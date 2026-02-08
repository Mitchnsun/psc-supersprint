'use client';

import { PropsWithChildren } from 'react';
import COLORS from '@/styles/colors';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <div className="mx-auto max-w-[1080px]">
    <Header />
    <div className="mx-4 mb-4 p-5 bg-white border" style={{ borderColor: COLORS.SECONDARY }}>
      {children}
    </div>
  </div>
);

export default Layout;
