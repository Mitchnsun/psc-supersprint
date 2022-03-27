import React from 'react';
import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import Time from '../../utils/time';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 1,
  }
}));

const TimeCell = ({ time, isBold }) => (
  <CustomTableCell align="center" sx={{ fontFamily: isBold ? 'OpenSansBold' : 'OpenSans' }}>{Time.convert(time)}</CustomTableCell>
);

export default TimeCell;
