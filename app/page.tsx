import { ref, child, get } from 'firebase/database';
import db from '@/lib/firebase';

import { rankResults } from '@/utils/results';
import { ResultType } from '@/utils/types';
import { YEAR } from '@/utils/constants';
import ResultsPageClient from './page.client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: `PSC Supersprint | ${YEAR}`,
};

async function getData() {
  const resultRef = child(ref(db), YEAR.toString());
  const results = await get(resultRef);

  return rankResults(
    Object.entries(results.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
  );
}

export default async function ResultsPage() {
  const data = await getData();

  return <ResultsPageClient {...data} />;
}
