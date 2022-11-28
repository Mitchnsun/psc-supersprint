const base = {
  BLUE: 'rgb(81, 188, 201)',
  BRONZE: 'hsl(33, 100%, 34%)',
  GRAY: '#e3e2e3',
  GRAY_DARK: '#5F5E5D',
  GREEN: 'hsl(144, 52%, 34%)',
  PURPLE: 'rgba(111, 61, 141, 1)',
  PURPLE_DARK: 'rgb(51, 35, 130)',
  RED: 'hsl(0, 78%, 49%)',
  WHITE: 'hsl(0, 0%, 100%)',
};

export default {
  ...base,
  PRIMARY: base.BLUE,
  SECONDARY: base.PURPLE,
  SUCCESS: base.GREEN,
  WARNING: base.BRONZE,
  ERROR: base.RED,
};
