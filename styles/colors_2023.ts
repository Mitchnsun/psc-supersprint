const base = {
  BLUE: 'rgb(81, 188, 201)',
  BRONZE: 'hsl(33, 100%, 34%)',
  GRAY: '#e3e2e3',
  GRAY_DARK: '#5F5E5D',
  GREEN: 'hsl(144, 52%, 34%)',
  PURPLE: '#3f3c55',
  PURPLE_DARK: 'rgb(51, 35, 130)',
  RED: 'hsl(0, 78%, 49%)',
  SALMON: '#f8b78c',
  WHITE: 'hsl(0, 0%, 100%)',
};

export default {
  ...base,
  PRIMARY: base.PURPLE,
  SECONDARY: base.SALMON,
  LOGO: base.PURPLE,
  SUCCESS: base.GREEN,
  WARNING: base.BRONZE,
  ERROR: base.RED,
};
