import React from 'react';
import Time from '../../utils/time';

const TimeCell = ({ time, isBold }) => (
  <td style={{ fontFamily: isBold ? 'OpenSansBold' : 'OpenSans' }}>{Time.convert(time)}</td>
);

export default TimeCell;
