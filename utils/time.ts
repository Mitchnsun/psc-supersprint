import DISTANCES from './distances';

const prependZero = (value: number, skip: boolean): string => {
  if (skip) {
    return value.toString();
  }

  return value < 10 ? `0${value}` : value.toString();
};

const convert = (time: number) => {
  if (typeof time !== 'number' || time === 0) return '-';
  const hours = Math.floor(time / 3600);
  const minutes = prependZero(Math.floor((time - hours * 3600) / 60), hours === 0);
  const seconds = prependZero(Math.round(time % 60), false);
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
    if (Number.isNaN(time) || time === 0) return '-';
    const formatted = time / DISTANCES.swim.length;
    return convert(Math.trunc(formatted * 100));
  },
  bike: (time: number) => {
    if (Number.isNaN(time) || time === 0) return '-';
    const formatted = (3600 / time) * DISTANCES.bike.length;
    return formatted.toFixed(2);
  },
  run: (time: number) => {
    if (Number.isNaN(time) || time === 0) return '-';
    const formatted = time / DISTANCES.run.length;
    return convert(formatted);
  },
};
