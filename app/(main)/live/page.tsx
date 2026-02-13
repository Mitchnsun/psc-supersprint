'use client';

import { child, onValue, ref } from 'firebase/database';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import Title from '@/components/atoms/Title';
import Board from '@/components/Board';
import db from '@/lib/firebase';
import QRCode from '@/public/static/qr-code.png';
import { YEAR } from '@/utils/constants';
import GlobalContext from '@/utils/context/global.context';
import { rankResults } from '@/utils/results';
import { ResultType, ResultTypeWithId } from '@/utils/types';

export default function LivePage() {
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
        setScrollStep(-2);
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
      <Title hLevel="h1">{`Résultats ${YEAR}`}</Title>
      <Board results={data.results} totals={data.totals} hideSearchBar />
      <Image
        className="border-secondary fixed bottom-1 left-1 border bg-white p-1"
        src={QRCode}
        width={150}
        height={150}
        alt="QR Code"
      />
    </GlobalContext.Provider>
  );
}
