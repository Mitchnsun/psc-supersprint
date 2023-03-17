import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ref, child, get } from 'firebase/database';
import db from '@/lib/firebase';

import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';
import GlobalContext from '@/utils/context/global.context';

const ResultsPage = ({
  year,
  results = [],
  totals = {},
}: {
  year: string;
  results: ResultTypeWithId[];
  totals: Record<string, number>;
}) => {
  const [context, setContext] = useState({ year });
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);

  return (
    <GlobalContext.Provider value={contextMemo}>
      <Helmet>
        <title>PSC Supersprint | {year}</title>
      </Helmet>
      <Title hLevel="h1">Résultats {year}</Title>
      <Board results={results} totals={totals} />
    </GlobalContext.Provider>
  );
};

export default ResultsPage;

export async function getStaticPaths() {
  return {
    paths: [{ params: { year: '2022' } }, { params: { year: '2023' } }],
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
        Object.entries(results.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
      ),
    },
  };
}
