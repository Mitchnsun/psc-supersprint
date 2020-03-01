import { compact } from 'lodash';
import loadDB from '../../lib/load-db';

const sortResults = data => compact(data).sort((a, b) => a.total - b.total);

export default async (req, res) => {
  const db = await loadDB();
  const results = await db
    .ref('results')
    .once('value')
    .then(snap => snap.val());
  res.status(200).json({ results: sortResults(results) });
};
