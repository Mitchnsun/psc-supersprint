import { child, get, ref } from 'firebase/database';

import Share from '@/components/Share';
import db from '@/lib/firebase';
import { ResultType } from '@/utils/types';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{
    year: string;
    id: string;
  }>;
};

async function getAthleteData(year: string, id: string): Promise<ResultType> {
  const resultRef = child(ref(db), `${year}/${id}`);
  const results = await get(resultRef);

  return results.val() || {};
}

export default async function AthletePage({ params }: PageProps) {
  const { year, id } = await params;
  const data = await getAthleteData(year, id);

  return <Share {...data} />;
}
