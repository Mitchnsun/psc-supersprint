import { GetServerSidePropsContext } from 'next';
import { ref, child, get } from 'firebase/database';

import db from '../../lib/firebase';
import { ResultType } from '../../utils/types';
import Share from '../../components/Share';

const AthletePage = (props: ResultType) => <Share {...props} />;

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: ResultType }> {
  const { id } = context.query;
  const resultRef = child(ref(db), `results/${id}`);
  const results = await get(resultRef);

  return {
    props: results.val() || {},
  };
}

export default AthletePage;
