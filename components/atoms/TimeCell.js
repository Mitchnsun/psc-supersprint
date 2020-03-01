import React from 'react';

const convertTime = time => {
  if (Number.isNaN(time)) return '-';
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
  return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
};
const TimeCell = ({ time }) => <td style={{ textAlign: 'center' }}>{convertTime(time)}</td>;

export default TimeCell;
