import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ref, onValue } from 'firebase/database';

import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import db from '@/lib/firebase';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';
import { YEAR } from '@/utils/constants';
import GlobalContext from '@/utils/context/global.context';

export default function Results() {
  const [context, setContext] = useState({ year: YEAR });
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);
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
    <GlobalContext.Provider value={contextMemo}>
      <Helmet>
        <title>{`PSC Supersprint | ${YEAR}`}</title>
      </Helmet>
      <Title hLevel="h1">{`Résultats ${YEAR}`}</Title>
      <Board results={data.results} totals={data.totals} />
    </GlobalContext.Provider>
  );
}
