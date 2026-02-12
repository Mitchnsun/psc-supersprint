'use client';

import { PropsWithChildren } from 'react';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <div className="mx-auto max-w-300">
    <Header />
    <div className="mx-4 my-2 p-5 bg-white border border-secondary">{children}</div>
  </div>
);

export default Layout;
