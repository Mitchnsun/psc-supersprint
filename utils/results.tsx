import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';
import Ranks from './ranks';
import { ResultTypeWithId } from './types';

export const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  gender: yup.string().required(),
  status: yup.string().optional().default(''),
  bib: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required(),
  birthYear: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required(),
  category: yup.string().required(),
  times: yup
    .object({
      swim: yup.string().required(),
      bike: yup.string().required(),
      total: yup.string().required(),
    })
    .required(),
});

const sortResults = (data: ResultTypeWithId[]) => {
  let scratchRankInc = 0;
  let swimRankInc = 0;
  let bikeRankInc = 0;

  return compact(data)
    .sort((a, b) => a.swim - b.swim)
    .map((item) => {
      if (isEmpty(item.status)) {
        swimRankInc += 1;
      }
      return { ...item, ranks: { swim: isEmpty(item.status) ? swimRankInc : '-' } };
    })
    .sort((a, b) => a.bike - b.bike)
    .map((item) => {
      if (isEmpty(item.status)) {
        bikeRankInc += 1;
      }
      return { ...item, ranks: { ...item.ranks, bike: isEmpty(item.status) ? bikeRankInc : '-' } };
    })
    .sort((a, b) => a.total - b.total)
    .map((item) => {
      if (isEmpty(item.status)) {
        scratchRankInc += 1;
      }
      return { ...item, ranks: { ...item.ranks, scratch: isEmpty(item.status) ? scratchRankInc : '-' } };
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
