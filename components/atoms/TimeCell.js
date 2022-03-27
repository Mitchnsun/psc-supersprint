import React from 'react';
import { TableCell } from '@mui/material';
import Time from '../../utils/time';

const TimeCell = ({ time, isBold }) => (
  <TableCell align="center" style={{ fontFamily: isBold ? 'OpenSansBold' : 'OpenSans' }}>{Time.convert(time)}</TableCell>
);

export default TimeCell;
