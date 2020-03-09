import { compact } from 'lodash';
import loadDB from '../../lib/load-db';
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
  const db = await loadDB();
  const results = await db
    .ref('results')
    .once('value')
    .then(snap => snap.val());
  res.status(200).json(rankResults(results));
};
