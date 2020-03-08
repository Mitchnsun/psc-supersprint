import React from 'react';
import Time from '../../utils/time';

const TimeCell = ({ time }) => <td style={{ textAlign: 'center' }}>{Time.convert(time)}</td>;

export default TimeCell;
