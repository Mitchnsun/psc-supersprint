import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import Time from '@/utils/time';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 1,
  },
}));

const TimeCell = ({ time, isBold = false }: { time: number; isBold?: boolean }) => (
  <CustomTableCell align="center" sx={{ fontFamily: isBold ? 'FontBold' : 'FontRegular' }}>
    {Time.convert(time)}
  </CustomTableCell>
);

export default TimeCell;
