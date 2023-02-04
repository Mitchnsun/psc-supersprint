import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ref, onValue } from 'firebase/database';

import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import db from '@/lib/firebase';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';

export default function Results() {
  const [data, setData] = useState<{ results: ResultTypeWithId[]; totals: Record<string, number> }>({
    results: [],
    totals: {},
  });

  useEffect(() => {
    const resultRef = ref(db, 'results');
    onValue(resultRef, (snapshot) =>
      setData(
        rankResults(
          Object.entries(snapshot.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
        ),
      ),
    );
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>PSC Supersprint | 2022</title>
      </Helmet>
      <Title hLevel="h1">Résultats 2022</Title>
      <Board results={data.results} totals={data.totals} />
    </React.Fragment>
  );
}
