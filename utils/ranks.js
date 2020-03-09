export default {
  byCat: data => {
    let femaleRankInc = 0;
    let maleRankInc = 0;
    let rankJM = 0;
    let rankJF = 0;
    let rankSM = 0;
    let rankSF = 0;
    let rankVM = 0;
    let rankVF = 0;

    const rankedResults = data.map(item => {
      if (item.sex === 'M') {
        maleRankInc += 1;
        // By Cat for M
        if (item.cat === 'J') {
          rankJM += 1;
          return { ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankJM } };
        }
        if (item.cat === 'S') {
          rankSM += 1;
          return { ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankSM } };
        }
        if (item.cat === 'V') {
          rankVM += 1;
          return { ...item, ranks: { ...item.ranks, gender: maleRankInc, cat: rankVM } };
        }
      }

      if (item.sex === 'F') {
        femaleRankInc += 1;
        if (item.cat === 'J') {
          rankJF += 1;
          return { ...item, ranks: { ...item.ranks, cat: rankJF, gender: femaleRankInc } };
        }
        if (item.cat === 'S') {
          rankSF += 1;
          return { ...item, ranks: { ...item.ranks, cat: rankSF, gender: femaleRankInc } };
        }
        if (item.cat === 'V') {
          rankVF += 1;
          return { ...item, ranks: { ...item.ranks, cat: rankVF, gender: femaleRankInc } };
        }
      }

      return item;
    });

    return {
      results: rankedResults,
      totals: {
        overall: rankedResults.length,
        M: maleRankInc,
        F: femaleRankInc,
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
