import React, { useState, useEffect } from 'react';
import { TableRow, TableCell } from '@mui/material';
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
      <TableRow hover onClick={() => setMoreDetails(!moreDetails)}>
        <TableCell align="center">
          <ArrowIcon down={moreDetails} />
        </TableCell>
        <TableCell align="center">{rank}</TableCell>
        <TableCell align="center">{`${result.firstname} ${result.lastname}`}</TableCell>
        <TableCell align="center">{`#${result.bib}`}</TableCell>
        {width > BREAKPOINT && <TableCell align="center">{`${result.cat}${result.sex}`}</TableCell>}
        <TimeCell time={result.total} isBold />
        {width > BREAKPOINT && (
          <React.Fragment>
            <TimeCell time={result.swim} />
            <TimeCell time={result.bike} />
            <TimeCell time={result.run} />
          </React.Fragment>
        )}
      </TableRow>
      {moreDetails && (
        <TableRow>
          <TableCell colSpan="9">
            <DetailsResult result={result} totals={totals} />
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default LineResult;
