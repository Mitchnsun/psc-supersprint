import DISTANCES from './distances';

const convert = time => {
  if (Number.isNaN(time)) return '-';
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60 < 10 ? `0${Math.round(time % 60)}` : Math.round(time % 60);
  return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
};

export default {
  convert: time => convert(time),
  swim: time => {
    if (Number.isNaN(time)) return '-';
    const formatted = time / DISTANCES.swim.length;
    return convert(formatted * 100);
  },
  bike: time => {
    if (Number.isNaN(time)) return '-';
    // eslint-disable-next-line no-mixed-operators
    const formatted = (3600 / time) * DISTANCES.bike.length;
    return formatted.toFixed(2);
  },
  run: time => {
    if (Number.isNaN(time)) return '-';
    const formatted = time / DISTANCES.run.length;
    return convert(formatted);
  },
};
