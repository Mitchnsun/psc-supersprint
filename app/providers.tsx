'use client';

import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
