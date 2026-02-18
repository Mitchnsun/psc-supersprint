'use client';

import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider';

/**
 * Layout for themed pages that apply year-specific color palettes
 * Applied to: resultats/[year], podiums/[year], athlete/[year]/[id]
 *
 * Uses useParams() to get the year from the URL and applies
 * the corresponding theme to the entire page including Header
 */
export default function ThemedLayout({ children }: { children: ReactNode }): ReactNode {
  const params = useParams();
  const year = params.year ? parseInt(params.year as string, 10) : undefined;

  return (
    <ThemeProvider year={year}>
      <div className="mx-auto max-w-300 px-4 pb-4">
        <Header year={year} />
        <div className="border-secondary border bg-white p-5">{children}</div>
      </div>
    </ThemeProvider>
  );
}
