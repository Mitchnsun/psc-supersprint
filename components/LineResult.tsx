import { useState } from 'react';
import { TableRow, TableCell } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ResultTypeWithId } from '@/utils/types';
import TimeCell from './atoms/TimeCell';
import ArrowIcon from './atoms/ArrowIcon';
import DetailsResult from './DetailsResult';

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
    <>
      <TableRow hover onClick={() => setMoreDetails(!moreDetails)}>
        <CustomTableCell align="center">
          <ArrowIcon down={moreDetails} />
        </CustomTableCell>
        <CustomTableCell align="center">{rank}</CustomTableCell>
        <CustomTableCell align="center">{`${result.firstname} ${result.lastname}`}</CustomTableCell>
        <CustomTableCell align="center">{`#${result.bib}`}</CustomTableCell>
        {isLargeScreen && <TableCell align="center">{`${result.cat}${result.sex}`}</TableCell>}
        <TimeCell time={result.total} status={result.status} isBold />
        {isLargeScreen && (
          <>
            <TimeCell time={result.swim} />
            <TimeCell time={result.bike} />
            <TimeCell time={result.run} />
          </>
        )}
      </TableRow>
      {moreDetails && (
        <TableRow>
          <TableCell colSpan={9}>
            <DetailsResult result={result} totals={totals} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default LineResult;
