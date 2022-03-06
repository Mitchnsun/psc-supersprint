import { compact } from 'lodash';
import * as yup from 'yup';
import Ranks from './ranks';

export const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  gender: yup.string().required(),
  bib: yup.number().required(),
  birthYear: yup.number().required(),
  category: yup.string().required(),
  times: yup.object({
    swim: yup.string().required(),
    bike: yup.string().required(),
    total: yup.string().required(),
  })

});

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
