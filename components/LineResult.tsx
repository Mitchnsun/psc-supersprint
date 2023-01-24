import React, { useState } from 'react';
import { TableRow, TableCell } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TimeCell from './atoms/TimeCell';
import DetailsResult from './DetailsResult';
import ArrowIcon from './atoms/ArrowIcon';
import { ResultTypeWithId } from '../utils/types';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 1,
  },
}));

const LineResult = ({
  result,
  totals,
  rank,
}: {
  result: ResultTypeWithId;
  totals: Record<string, number>;
  rank: number;
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [moreDetails, setMoreDetails] = useState(false);

  return (
    <React.Fragment>
      <TableRow hover onClick={() => setMoreDetails(!moreDetails)}>
        <CustomTableCell align="center">
          <ArrowIcon down={moreDetails} />
        </CustomTableCell>
        <CustomTableCell align="center">{rank}</CustomTableCell>
        <CustomTableCell align="center">{`${result.firstname} ${result.lastname}`}</CustomTableCell>
        <CustomTableCell align="center">{`#${result.bib}`}</CustomTableCell>
        {isLargeScreen && <TableCell align="center">{`${result.cat}${result.sex}`}</TableCell>}
        <TimeCell time={result.total} isBold />
        {isLargeScreen && (
          <React.Fragment>
            <TimeCell time={result.swim} />
            <TimeCell time={result.bike} />
            <TimeCell time={result.run} />
          </React.Fragment>
        )}
      </TableRow>
      {moreDetails && (
        <TableRow>
          <TableCell colSpan={9}>
            <DetailsResult result={result} totals={totals} />
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default LineResult;
