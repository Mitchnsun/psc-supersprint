import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { ref, child, get } from 'firebase/database';

import db from '@/lib/firebase';
import { ResultType } from '@/utils/types';

const Share = dynamic(() => import('@/components/Share'), { ssr: false });
const AthletePage = (props: ResultType) => <Share {...props} />;

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: ResultType }> {
  const { id = [] } = context.query;
  const resultRef = child(ref(db), `${id[0]}/${id[1]}`);
  const results = await get(resultRef);

  return {
    props: results.val() || {},
  };
}

export default AthletePage;
