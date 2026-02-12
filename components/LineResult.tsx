import { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ResultTypeWithId } from '@/utils/types';
import TimeCell from './atoms/TimeCell';
import ArrowIcon from './atoms/ArrowIcon';
import DetailsResult from './DetailsResult';

const CustomTableCell = ({ children, className, ...props }: React.ComponentProps<typeof TableCell>) => (
  <TableCell {...props} className={cn('md:p-2 p-0.5 text-center', className)}>
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
        <TableCell className="text-center hidden lg:table-cell">{`${result.cat}${result.sex}`}</TableCell>
        <TimeCell time={result.total} status={result.status} isBold />
        <TimeCell className="hidden lg:table-cell" time={result.swim} />
        <TimeCell className="hidden lg:table-cell" time={result.bike} />
        <TimeCell className="hidden lg:table-cell" time={result.run} />
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
