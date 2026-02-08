'use client';

import { Analytics } from '@vercel/analytics/react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
