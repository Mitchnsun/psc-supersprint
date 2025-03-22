const base = {
  BLUE: '#183772',
  BLUE_2025: '#082ccb',
  BRONZE: 'hsl(33, 100%, 34%)',
  CYAN: '#a9dcde',
  GRAY: '#e3e2e3',
  GRAY_DARK: '#5F5E5D',
  GREEN: 'hsl(144, 52%, 34%)',
  GREEN_DARK: '#045249',
  MINT: '#6BB996',
  PURPLE: '#3f3c55',
  PURPLE_DARK: 'rgb(51, 35, 130)',
  RED: 'hsl(0, 78%, 49%)',
  SALMON: '#C9807A',
  WHITE: 'hsl(0, 0%, 100%)',
};

export default {
  ...base,
  PRIMARY: base.CYAN,
  SECONDARY: base.BLUE_2025,
  LOGO: base.BLUE,
  SUCCESS: base.GREEN,
  WARNING: base.BRONZE,
  ERROR: base.RED,
};
