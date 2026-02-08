import isEmpty from 'lodash/isEmpty';
import { TableCell } from '@/components/ui/table';
import Time from '@/utils/time';

const TimeCell = ({ time, status, isBold = false }: { time: number; status?: string; isBold?: boolean }) => (
  <TableCell className="text-center md:p-2 p-0.5" style={{ fontFamily: isBold ? 'FontBold' : 'FontRegular' }}>
    {isEmpty(status) ? Time.convert(time) : status}
  </TableCell>
);

export default TimeCell;
