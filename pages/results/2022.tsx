import React from 'react';
import { Helmet } from 'react-helmet';
import { ref, child, get } from 'firebase/database';
import db from '@/lib/firebase';

import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';

const ResultsPage = ({
  results = [],
  totals = {},
}: {
  results: ResultTypeWithId[];
  totals: Record<string, number>;
}) => (
  <React.Fragment>
    <Helmet>
      <title>PSC Supersprint | 2022</title>
    </Helmet>
    <Title hLevel="h1">Résultats 2022</Title>
    <Board results={results} totals={totals} />
  </React.Fragment>
);

export default ResultsPage;

export async function getStaticProps() {
  const resultRef = child(ref(db), '2022');
  const results = await get(resultRef);

  return {
    props: rankResults(
      Object.entries(results.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
    ),
  };
}
