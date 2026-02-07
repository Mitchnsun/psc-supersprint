import { ref, child, get } from 'firebase/database';
import db from '@/lib/firebase';

import { rankResults } from '@/utils/results';
import { ResultType } from '@/utils/types';
import ResultatsPageClient from './page.client';

type PageProps = {
  params: {
    year: string;
  };
};

export async function generateStaticParams() {
  const YEARS = ['2022', '2023', '2024', '2025'];
  return YEARS.map((year) => ({ year }));
}

export async function generateMetadata({ params }: PageProps) {
  const { year } = params;
  return {
    title: `PSC Supersprint | ${year}`,
  };
}

async function getData(year: string) {
  const resultRef = child(ref(db), year);
  const results = await get(resultRef);

  return {
    year,
    ...rankResults(
      Object.entries(results.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
    ),
  };
}

export default async function ResultatsPage({ params }: PageProps) {
  const { year } = params;
  const data = await getData(year);

  return <ResultatsPageClient {...data} />;
}
