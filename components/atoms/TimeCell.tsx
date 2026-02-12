import isEmpty from 'lodash/isEmpty';
import { TableCell } from '@/components/ui/table';
import Time from '@/utils/time';
import { cn } from '@/lib/utils';

const TimeCell = ({
  time,
  className,
  status,
  isBold = false,
}: {
  time: number;
  className?: string;
  status?: string;
  isBold?: boolean;
}) => (
  <TableCell className={cn('text-center md:p-2 p-0.5', { 'font-bold': isBold, 'font-regular': !isBold }, className)}>
    {isEmpty(status) ? Time.convert(time) : status}
  </TableCell>
);

export default TimeCell;
