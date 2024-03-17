import isEmpty from 'lodash/isEmpty';
import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import Time from '@/utils/time';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 1,
  },
}));

const TimeCell = ({ time, status, isBold = false }: { time: number; status?: string; isBold?: boolean }) => (
  <CustomTableCell align="center" sx={{ fontFamily: isBold ? 'FontBold' : 'FontRegular' }}>
    {isEmpty(status) ? Time.convert(time) : status}
  </CustomTableCell>
);

export default TimeCell;
