'use client';

import { useMemo, useState } from 'react';

import Title from '@/components/atoms/Title';
import Board from '@/components/Board';
import { DATE, YEAR } from '@/utils/constants';
import GlobalContext from '@/utils/context/global.context';
import { ResultTypeWithId } from '@/utils/types';

export default function ResultsPageClient({
  results = [],
  totals = {},
}: {
  results: ResultTypeWithId[];
  totals: Record<string, number>;
}) {
  const [context, setContext] = useState({ year: YEAR });
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);

  return (
    <GlobalContext.Provider value={contextMemo}>
      <Title hLevel="h1">{`Résultats ${YEAR}`}</Title>
      {results.length === 0 ? (
        <p className="mt-4">{`Rendez-vous le ${DATE}`}</p>
      ) : (
        <Board results={results} totals={totals} />
      )}
    </GlobalContext.Provider>
  );
}
