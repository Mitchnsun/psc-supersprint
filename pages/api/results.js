import { compact } from 'lodash';
import loadDB from '../../lib/load-db'

export default async (req, res) => {
  const db = await loadDB();
  const results = await db.ref('results').once('value').then(snap => snap.val());;
  res.status(200).json({ results: compact(results) });
};