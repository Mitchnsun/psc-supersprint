import COLORS from '@/styles/colors';
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
    <div className="w-[30px] h-[30px]">
      <RankIcon />
    </div>
    <div className="text-left">
      <p className="text-sm my-0 mx-3">
        {`Scratch: ${ranks.scratch || '-'}`}
        <span className="text-xs" style={{ color: COLORS.GRAY_DARK }}>{`/${totals.overall}`}</span>
      </p>
      <p className="text-sm my-0 mx-3">
        {`Cat. ${cat}${gender}: ${ranks.cat || '-'}`}
        <span className="text-xs" style={{ color: COLORS.GRAY_DARK }}>{`/${totals[cat + gender]}`}</span>
      </p>
      <p className="text-sm my-0 mx-3">
        {`${gender}: ${ranks.gender || '-'}`}
        <span className="text-xs" style={{ color: COLORS.GRAY_DARK }}>{`/${totals[gender]}`}</span>
      </p>
    </div>
  </div>
);

export default Ranks;
