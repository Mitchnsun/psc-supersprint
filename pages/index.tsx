import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ref, child, get } from 'firebase/database';
import db from '@/lib/firebase';

import { Typography } from '@mui/material';
import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';
import { YEAR, DATE } from '@/utils/constants';
import GlobalContext from '@/utils/context/global.context';

const ResultsPage = ({
  results = [],
  totals = {},
}: {
  results: ResultTypeWithId[];
  totals: Record<string, number>;
}) => {
  const [context, setContext] = useState({ year: YEAR });
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);

  return (
    <GlobalContext.Provider value={contextMemo}>
      <Helmet>
        <title>{`PSC Supersprint | ${YEAR}`}</title>
      </Helmet>
      <Title hLevel="h1">{`Résultats ${YEAR}`}</Title>
      {results.length === 0 ? (
        <Typography sx={{ marginTop: '1rem' }}>{`Rendez-vous le ${DATE}`}</Typography>
      ) : (
        <Board results={results} totals={totals} />
      )}
    </GlobalContext.Provider>
  );
};

export default ResultsPage;

export async function getStaticProps() {
  const resultRef = child(ref(db), YEAR.toString());
  const results = await get(resultRef);

  return {
    props: rankResults(
      Object.entries(results.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
    ),
  };
}
