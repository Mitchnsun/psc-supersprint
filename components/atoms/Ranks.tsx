import { RanksType } from '@/utils/types';

import RankIcon from './RankIcon';

const Ranks = ({
  ranks,
  cat,
  gender,
  totals = {},
}: {
  ranks: RanksType;
  cat: string;
  gender: string;
  totals: Record<string, number>;
}) => (
  <div className="col-span-6 md:col-span-4 flex justify-center items-center">
    <div className="w-8 h-8">
      <RankIcon />
    </div>
    <div className="text-left">
      <p className="text-sm my-0 mx-3">
        {`Scratch: ${ranks.scratch || '-'}`}
        <span className="text-xs text-gray-dark">{`/${totals.overall}`}</span>
      </p>
      <p className="text-sm my-0 mx-3">
        {`Cat. ${cat}${gender}: ${ranks.cat || '-'}`}
        <span className="text-xs text-gray-dark">{`/${totals[cat + gender]}`}</span>
      </p>
      <p className="text-sm my-0 mx-3">
        {`${gender}: ${ranks.gender || '-'}`}
        <span className="text-xs text-gray-dark">{`/${totals[gender]}`}</span>
      </p>
    </div>
  </div>
);

export default Ranks;
