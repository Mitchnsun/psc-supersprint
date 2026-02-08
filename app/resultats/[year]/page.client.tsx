'use client';

import { useMemo, useState } from 'react';
import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import { ResultTypeWithId } from '@/utils/types';
import GlobalContext from '@/utils/context/global.context';

export default function ResultatsPageClient({
  year,
  results = [],
  totals = {},
}: {
  year: string;
  results: ResultTypeWithId[];
  totals: Record<string, number>;
}) {
  const [context, setContext] = useState({ year });
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);

  return (
    <GlobalContext.Provider value={contextMemo}>
      <Title hLevel="h1">Résultats {year}</Title>
      <Board results={results} totals={totals} />
    </GlobalContext.Provider>
  );
}
