import { compact, isEmpty } from 'lodash';
import * as yup from 'yup';
import Ranks from './ranks';
import { ResultTypeWithId } from './types';

export const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  gender: yup.string().required(),
  status: yup.string(),
  bib: yup.number().required(),
  birthYear: yup.number().required(),
  category: yup.string().required(),
  times: yup.object({
    swim: yup.string().required(),
    bike: yup.string().required(),
    total: yup.string().required(),
  }),
});

const sortResults = (data: ResultTypeWithId[]) => {
  let scratchRankInc = 0;
  return compact(data)
    .sort((a, b) => a.total - b.total)
    .map((item) => {
      if (isEmpty(item.status)) {
        scratchRankInc += 1;
      }
      return { ...item, ranks: { scratch: isEmpty(item.status) ? scratchRankInc : '-' } };
    });
};

export const rankResults = (data: ResultTypeWithId[]) => {
  const sortedResults = sortResults(data);
  return Ranks.byCat(sortedResults as ResultTypeWithId[]);
};

export default {
  sortResults,
  rankResults,
};
