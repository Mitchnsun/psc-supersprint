'use client';

import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import Board from '@/components/Board';
import Title from '@/components/atoms/Title';
import { ResultTypeWithId } from '@/utils/types';
import { YEAR, DATE } from '@/utils/constants';
import GlobalContext from '@/utils/context/global.context';

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
        <Typography sx={{ marginTop: '1rem' }}>{`Rendez-vous le ${DATE}`}</Typography>
      ) : (
        <Board results={results} totals={totals} />
      )}
    </GlobalContext.Provider>
  );
}
