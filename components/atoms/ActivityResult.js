import React from 'react';
import COLORS from '../../styles/colors';

const ActivityResult = ({ icon, label, time, speed, unit }) => (
  <div className="activity" aria-label={label}>
    <div style={{ verticalAlign: 'middle' }}>
      <div className="icon">{icon}</div>
      <p className="time">{time}</p>
    </div>
    <p className="speed">
      {speed}
      <span>{unit}</span>
    </p>
    <style jsx>
      {`
        .activity {
          text-align: center;
        }
        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          height: 30px;
        }
        .time {
          display: inline-block;
          vertical-align: middle;
          margin: 0;
          padding: 0 0.5rem;
          color: ${COLORS.PURPLE};
          font-family: OpenSansBold;
          font-size: 1.3rem;
          font-weight: bold;
        }
        .speed {
          font-size: 0.9rem;
          margin: 0.25rem;
        }
        .speed span {
          font-size: 0.8rem;
          padding-left: 2px;
          color: ${COLORS.GRAY_DARK};
        }
      `}
    </style>
  </div>
);

export default ActivityResult;
