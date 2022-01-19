import { compact } from 'lodash';
import { ref, child, get } from 'firebase/database'
import db from '../../lib/firebase';
import Ranks from '../../utils/ranks';

const sortResults = data =>
  // eslint-disable-next-line implicit-arrow-linebreak
  compact(data)
    .sort((a, b) => a.total - b.total)
    .map((item, index) => ({ ...item, ranks: { scratch: index + 1 } }));

const rankResults = data => {
  const sortedResults = sortResults(data);
  return Ranks.byCat(sortedResults);
};

export default async (req, res) => {
  const resultRef = child(ref(db), 'results')
  const results = await get(resultRef)
  res.status(200).json(rankResults(results.val()));
};
