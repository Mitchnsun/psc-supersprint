import DISTANCES from './distances';

const convert = (time: number) => {
  if (typeof time !== 'number' || time === 0) return '-';
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60 < 10 ? `0${Math.round(time % 60)}` : Math.round(time % 60);
  return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
};

const maskInput = (value: string) => {
  let count = 0;
  const reversedValue = value.replace(/\D/g, '').split('').reverse().join('');
  const formattedReversedValue = reversedValue.replace(/\d{2}(?=\d)/g, (match) => {
    if (count < 2) {
      count += 1;
      return `${match}:`;
    }
    return match;
  });
  return formattedReversedValue.split('').reverse().join('');
};

const validTime = (value: string): boolean => {
  if (value === '') return true;

  const time = value.split(':').reverse();
  return time.every((t, index) => {
    const number = parseInt(t, 10);
    if (Number.isNaN(number)) {
      return false;
    }
    if (index === 2) {
      return true;
    }
    return number < 60;
  });
};

export default {
  convert: (time: number) => convert(time),
  maskInput: (value: string) => maskInput(value),
  valid: (value: string) => validTime(value),
  swim: (time: number) => {
    if (Number.isNaN(time)) return '-';
    const formatted = time / DISTANCES.swim.length;
    return convert(formatted * 100);
  },
  bike: (time: number) => {
    if (Number.isNaN(time)) return '-';
    const formatted = (3600 / time) * DISTANCES.bike.length;
    return formatted.toFixed(2);
  },
  run: (time: number) => {
    if (Number.isNaN(time)) return '-';
    const formatted = time / DISTANCES.run.length;
    return convert(formatted);
  },
};
