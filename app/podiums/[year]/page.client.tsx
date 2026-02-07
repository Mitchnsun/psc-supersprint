'use client';

import { useMemo, useState } from 'react';
import PodiumView from '@/views/Podiums.view';
import { ResultTypeWithId } from '@/utils/types';
import GlobalContext from '@/utils/context/global.context';

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
