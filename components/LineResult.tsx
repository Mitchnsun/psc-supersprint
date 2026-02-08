import { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { ResultTypeWithId } from '@/utils/types';
import TimeCell from './atoms/TimeCell';
import ArrowIcon from './atoms/ArrowIcon';
import DetailsResult from './DetailsResult';

const CustomTableCell = ({ children, ...props }: React.ComponentProps<typeof TableCell>) => (
  <TableCell {...props} className="md:p-2 p-0.5">
    {children}
  </TableCell>
);

const LineResult = ({
  result,
  totals,
  rank,
}: {
  result: ResultTypeWithId;
  totals: Record<string, number>;
  rank: number;
}) => {
  const isLargeScreen = useMediaQuery('(min-width: 900px)');
  const [moreDetails, setMoreDetails] = useState(false);

  return (
    <>
      <TableRow onClick={() => setMoreDetails(!moreDetails)} className="cursor-pointer">
        <CustomTableCell className="text-center">
          <ArrowIcon down={moreDetails} />
        </CustomTableCell>
        <CustomTableCell className="text-center">{rank}</CustomTableCell>
        <CustomTableCell className="text-center">{`${result.firstname} ${result.lastname}`}</CustomTableCell>
        <CustomTableCell className="text-center">{`#${result.bib}`}</CustomTableCell>
        {isLargeScreen && <TableCell className="text-center">{`${result.cat}${result.sex}`}</TableCell>}
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
