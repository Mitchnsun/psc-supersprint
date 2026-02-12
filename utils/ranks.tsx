import { isEmpty } from '@/lib/utils';
import { ResultTypeWithId } from './types';

export default {
  byCat: (data: ResultTypeWithId[]) => {
    let femaleRankInc = 0;
    let maleRankInc = 0;
    let rankBM = 0;
    let rankBF = 0;
    let rankMM = 0;
    let rankMF = 0;
    let rankCM = 0;
    let rankCF = 0;
    let rankJM = 0;
    let rankJF = 0;
    let rankSM = 0;
    let rankSF = 0;
    let rankVM = 0;
    let rankVF = 0;

    const rankedResults = data.reduce((acc: ResultTypeWithId[], item: ResultTypeWithId) => {
      if (!isEmpty(item.status)) {
        return [...acc, item];
      }

      if (item.sex === 'M') {
        maleRankInc += 1;
        // By Cat for M
        if (item.cat === 'B') {
          rankBM += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankBM } });
        }
        if (item.cat === 'M') {
          rankMM += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankMM } });
        }
        if (item.cat === 'C') {
          rankCM += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankCM } });
        }
        if (item.cat === 'J') {
          rankJM += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankJM } });
        }
        if (item.cat === 'S') {
          rankSM += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankSM } });
        }
        if (item.cat === 'V') {
          rankVM += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankVM } });
        }
      }

      if (item.sex === 'F') {
        femaleRankInc += 1;
        if (item.cat === 'B') {
          rankBF += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: femaleRankInc, cat: rankBF } });
        }
        if (item.cat === 'M') {
          rankMF += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: femaleRankInc, cat: rankMF } });
        }
        if (item.cat === 'C') {
          rankCF += 1;
          acc.push({ ...item, ranks: { ...item.ranks, gender: femaleRankInc, cat: rankCF } });
        }
        if (item.cat === 'J') {
          rankJF += 1;
          acc.push({ ...item, ranks: { ...item.ranks, cat: rankJF, gender: femaleRankInc } });
        }
        if (item.cat === 'S') {
          rankSF += 1;
          acc.push({ ...item, ranks: { ...item.ranks, cat: rankSF, gender: femaleRankInc } });
        }
        if (item.cat === 'V') {
          rankVF += 1;
          acc.push({ ...item, ranks: { ...item.ranks, cat: rankVF, gender: femaleRankInc } });
        }
      }

      return acc;
    }, []);

    return {
      results: rankedResults,
      totals: {
        overall: rankedResults.length,
        M: maleRankInc,
        F: femaleRankInc,
        BM: rankBM,
        BF: rankBF,
        MM: rankMM,
        MF: rankMF,
        CM: rankCM,
        CF: rankCF,
        JM: rankJM,
        JF: rankJF,
        SM: rankSM,
        SF: rankSF,
        VM: rankVM,
        VF: rankVF,
      },
    };
  },
};
