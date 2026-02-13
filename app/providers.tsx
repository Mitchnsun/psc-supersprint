'use client';

import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
