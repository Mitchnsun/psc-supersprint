'use client';

import { PropsWithChildren } from 'react';

import Header from './Header';

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <div className="mx-auto max-w-300">
    <Header />
    <div className="border-secondary mx-4 my-2 border bg-white p-5">{children}</div>
  </div>
);

export default Layout;
