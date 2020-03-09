import React, { useState } from 'react';
import COLORS from '../styles/colors';
import TimeCell from './atoms/TimeCell';
import DetailsResult from './DetailsResult';
import ArrowIcon from './atoms/ArrowIcon';

const LineResult = ({ result, totals }) => {
  const [moreDetails, setMoreDetails] = useState(false);
  return (
    <React.Fragment>
      <tr className="mainLine" onClick={() => setMoreDetails(!moreDetails)}>
        <td>
          <ArrowIcon down={moreDetails} />
        </td>
        <td>{result.ranks.scratch}</td>
        <td>{`${result.firstname} ${result.lastname}`}</td>
        <td>{`#${result.bib}`}</td>
        <td>{`${result.cat}${result.sex}`}</td>
        <TimeCell time={result.total} />
        <TimeCell time={result.swim} />
        <TimeCell time={result.bike} />
        <TimeCell time={result.run} />
      </tr>
      {moreDetails && (
        <tr>
          <td colSpan="9">
            <DetailsResult result={result} totals={totals} />
          </td>
        </tr>
      )}
      <style jsx>
        {`
          tr {
            height: 2.75rem;
            border-bottom: 1px solid ${COLORS.GRAY};
            outline: 0;
            vertical-align: middle;
          }
          td {
            text-align: center;
          }
          .mainLine:hover {
            cursor: pointer;
            background-color: ${COLORS.GRAY};
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default LineResult;
