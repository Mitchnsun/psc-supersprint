import { compact } from 'lodash';
import Ranks from './ranks';

const sortResults = data =>
// eslint-disable-next-line implicit-arrow-linebreak
compact(data)
  .sort((a, b) => a.total - b.total)
  .map((item, index) => ({ ...item, ranks: { scratch: index + 1 } }));

export const rankResults = data => {
  const sortedResults = sortResults(data);
  return Ranks.byCat(sortedResults);
};

export default {
  sortResults,
  rankResults
}
