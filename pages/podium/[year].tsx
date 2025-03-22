import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import isEmpty from 'lodash/isEmpty';
import { ref, child, get } from 'firebase/database';
import db from '@/lib/firebase';

import PodiumView from '@/views/Podium.view';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';
import GlobalContext from '@/utils/context/global.context';

const ResultsPage = (props: { year: string; results: ResultTypeWithId[] }) => {
  const { year } = props;
  const [context, setContext] = useState({ year });
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);

  return (
    <GlobalContext.Provider value={contextMemo}>
      <Helmet>
        <title>Podiums PSC Supersprint | {year}</title>
      </Helmet>
      <PodiumView {...props} />
    </GlobalContext.Provider>
  );
};

export default ResultsPage;

export async function getStaticPaths() {
  const YEARS = ['2022', '2023', '2024', '2025'];
  return {
    paths: YEARS.map((year) => ({ params: { year } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { year: string };
}): Promise<{ props: { year: string; results: ResultTypeWithId[]; totals: Record<string, number> } }> {
  const { year } = params;
  const resultRef = child(ref(db), year);
  const results = await get(resultRef);

  return {
    props: {
      year,
      ...rankResults(
        Object.entries(results.val() || [])
          .map(([key, value]: [string, ResultType]) => ({ ...value, id: key }))
          .filter(({ status }) => isEmpty(status)),
      ),
    },
  };
}
