'use client';

import { useMemo, useState } from 'react';

import GlobalContext from '@/utils/context/global.context';
import { ResultTypeWithId } from '@/utils/types';
import PodiumView from '@/views/Podiums.view';

export default function PodiumsPageClient(props: {
  year: string;
  results: ResultTypeWithId[];
  totals: Record<string, number>;
}) {
  const { year } = props;
  const [context, setContext] = useState({ year });
  const contextMemo = useMemo(() => ({ context, setContext }), [context]);

  return (
    <GlobalContext.Provider value={contextMemo}>
      <PodiumView {...props} />
    </GlobalContext.Provider>
  );
}
