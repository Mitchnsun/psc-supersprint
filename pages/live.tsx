import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { child, ref, onValue } from 'firebase/database';

import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import db from '@/lib/firebase';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';
import { YEAR } from '@/utils/constants';
import GlobalContext from '@/utils/context/global.context';

export default function Results() {
  const [context, setContext] = useState({ year: YEAR });
  const [scrollStep, setScrollStep] = useState(1);
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);
  const [data, setData] = useState<{ results: ResultTypeWithId[]; totals: Record<string, number> }>({
    results: [],
    totals: {},
  });

  useEffect(() => {
    const resultRef = child(ref(db), YEAR.toString());
    onValue(resultRef, (snapshot) =>
      setData(
        rankResults(
          Object.entries(snapshot.val() || []).map(([key, value]: [string, ResultType]) => ({ ...value, id: key })),
        ),
      ),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
        setScrollStep(-3);
      }
      if (window.scrollY === 0) {
        setScrollStep(1);
      }
      window.scrollTo({ top: window.scrollY + scrollStep, behavior: 'smooth' });
    }, 100);

    return () => clearInterval(interval);
  });

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
