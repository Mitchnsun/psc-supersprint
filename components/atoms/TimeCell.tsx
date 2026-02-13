import { TableCell } from '@/components/ui/table';
import { isEmpty } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Time from '@/utils/time';

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
  <TableCell className={cn('p-0.5 text-center md:p-2', { 'font-bold': isBold }, className)}>
    {isEmpty(status) ? Time.convert(time) : status}
  </TableCell>
);

export default TimeCell;
