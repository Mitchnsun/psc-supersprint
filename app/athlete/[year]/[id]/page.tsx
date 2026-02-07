import dynamic from 'next/dynamic';
import { ref, child, get } from 'firebase/database';

import db from '@/lib/firebase';
import { ResultType } from '@/utils/types';

const Share = dynamic(() => import('@/components/Share'), { ssr: false });

type PageProps = {
  params: {
    year: string;
    id: string;
  };
};

async function getAthleteData(year: string, id: string): Promise<ResultType> {
  const resultRef = child(ref(db), `${year}/${id}`);
  const results = await get(resultRef);

  return results.val() || {};
}

export default async function AthletePage({ params }: PageProps) {
  const { year, id } = params;
  const data = await getAthleteData(year, id);

  return <Share {...data} />;
}
