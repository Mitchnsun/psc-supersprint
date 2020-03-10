import React, { useState, useEffect } from 'react';
import COLORS from '../styles/colors';
import TimeCell from './atoms/TimeCell';
import DetailsResult from './DetailsResult';
import ArrowIcon from './atoms/ArrowIcon';
import BREAKPOINT from '../styles/breakpoints';

const LineResult = ({ result, totals, rank }) => {
  const [moreDetails, setMoreDetails] = useState(false);

  const [width, setWidth] = useState(process.browser ? window.innerWidth : BREAKPOINT + 1);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <tr className="mainLine" onClick={() => setMoreDetails(!moreDetails)}>
        <td>
          <ArrowIcon down={moreDetails} />
        </td>
        <td>{rank}</td>
        <td>{`${result.firstname} ${result.lastname}`}</td>
        <td>{`#${result.bib}`}</td>
        {width > BREAKPOINT && <td>{`${result.cat}${result.sex}`}</td>}
        <TimeCell time={result.total} isBold />
        {width > BREAKPOINT && (
          <React.Fragment>
            <TimeCell time={result.swim} />
            <TimeCell time={result.bike} />
            <TimeCell time={result.run} />
          </React.Fragment>
        )}
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
