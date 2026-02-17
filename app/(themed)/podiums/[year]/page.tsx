import { child, get, ref } from 'firebase/database';

import db from '@/lib/firebase';
import { isEmpty } from '@/lib/utils';
import { rankResults } from '@/utils/results';
import { ResultType } from '@/utils/types';

import PodiumsPageClient from './page.client';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{
    year: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { year } = await params;
  return {
    title: `Podiums PSC Supersprint | ${year}`,
  };
}

async function getData(year: string) {
  const resultRef = child(ref(db), year);
  const results = await get(resultRef);

  return {
    year,
    ...rankResults(
      Object.entries(results.val() || [])
        .map(([key, value]: [string, ResultType]) => ({ ...value, id: key }))
        .filter(({ status }) => isEmpty(status)),
    ),
  };
}

export default async function PodiumsPage({ params }: PageProps) {
  const { year } = await params;
  const data = await getData(year);

  return <PodiumsPageClient {...data} />;
}
