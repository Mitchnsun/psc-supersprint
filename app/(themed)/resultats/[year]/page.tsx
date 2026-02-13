import { child, get, ref } from 'firebase/database';
import { notFound } from 'next/navigation';

import db from '@/lib/firebase';
import { rankResults } from '@/utils/results';
import { ResultType } from '@/utils/types';

import ResultatsPageClient from './page.client';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{
    year: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { year } = await params;
  return {
    title: `PSC Supersprint | ${year}`,
  };
}

async function getData(year: string) {
  const resultRef = child(ref(db), year);

  try {
    const results = await get(resultRef);

    return {
      year,
      ...rankResults(
        Object.entries(results.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
      ),
    };
  } catch {
    notFound();
  }

  // TypeScript needs this even though notFound() throws
  return { year, results: [], totals: {} };
}

export default async function ResultatsPage({ params }: PageProps) {
  const { year } = await params;
  const data = await getData(year);

  return <ResultatsPageClient {...data} />;
}
