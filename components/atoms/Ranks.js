import React from 'react';
import RankIcon from './RankIcon';
import COLORS from '../../styles/colors';

const Ranks = ({ ranks, cat, gender, totals = {} }) => (
  <div className="ranks">
    <div className="icon">
      <RankIcon />
    </div>
    <div>
      <p className="rank">
        {`Scratch: ${ranks.scratch}`}
        <span>{`/${totals.overall}`}</span>
      </p>
      <p className="rank">
        {`Cat. ${cat}${gender}: ${ranks.cat}`}
        <span>{`/${totals[cat + gender]}`}</span>
      </p>
      <p className="rank">
        {`${gender}: ${ranks.gender}`}
        <span>{`/${totals[gender]}`}</span>
      </p>
    </div>
    <style jsx>
      {`
        .ranks {
          display: flex;
          align-items: center;
          text-align: left;
        }
        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          height: 30px;
        }
        .rank {
          font-size: 0.9rem;
          margin: 0.25rem 0.75rem;
        }
        .rank span {
          font-size: 0.8rem;
          color: ${COLORS.GRAY_DARK};
        }
      `}
    </style>
  </div>
);

export default Ranks;
