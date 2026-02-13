/**
 * Theme configuration by year for PSC Supersprint
 *
 * Each year has its own color palette that can be applied dynamically
 * to pages like /resultats/[year] and /podiums/[year]
 */

export interface ThemeColors {
  primary: string;
  secondary: string;
  logo: string;
  success: string;
  warning: string;
  error: string;
  blue: string;
  purple: string;
  purpleDark: string;
  bronze: string;
  gray: string;
  grayDark: string;
  green: string;
  red: string;
  white: string;
  // Optional colors for specific years
  salmon?: string;
  greenDark?: string;
  mint?: string;
  cyan?: string;
  blue2025?: string;
}

export interface Theme {
  colors: ThemeColors;
}

export const themesByYear: Record<number, Theme> = {
  2022: {
    colors: {
      primary: 'rgb(81, 188, 201)',
      secondary: 'rgba(111, 61, 141, 1)',
      logo: 'rgb(81, 188, 201)',
      success: 'hsl(144, 52%, 34%)',
      warning: 'hsl(33, 100%, 34%)',
      error: 'hsl(0, 78%, 49%)',
      blue: 'rgb(81, 188, 201)',
      purple: 'rgba(111, 61, 141, 1)',
      purpleDark: 'rgb(51, 35, 130)',
      bronze: 'hsl(33, 100%, 34%)',
      gray: '#e3e2e3',
      grayDark: '#5F5E5D',
      green: 'hsl(144, 52%, 34%)',
      red: 'hsl(0, 78%, 49%)',
      white: 'hsl(0, 0%, 100%)',
    },
  },
  2023: {
    colors: {
      primary: '#3f3c55',
      secondary: '#f8b78c',
      logo: '#3f3c55',
      success: 'hsl(144, 52%, 34%)',
      warning: 'hsl(33, 100%, 34%)',
      error: 'hsl(0, 78%, 49%)',
      blue: 'rgb(81, 188, 201)',
      purple: '#3f3c55',
      purpleDark: 'rgb(51, 35, 130)',
      bronze: 'hsl(33, 100%, 34%)',
      gray: '#e3e2e3',
      grayDark: '#5F5E5D',
      green: 'hsl(144, 52%, 34%)',
      red: 'hsl(0, 78%, 49%)',
      white: 'hsl(0, 0%, 100%)',
      salmon: '#f8b78c',
    },
  },
  2024: {
    colors: {
      primary: '#045249',
      secondary: '#6BB996',
      logo: '#183772',
      success: 'hsl(144, 52%, 34%)',
      warning: 'hsl(33, 100%, 34%)',
      error: 'hsl(0, 78%, 49%)',
      blue: '#183772',
      purple: '#3f3c55',
      purpleDark: 'rgb(51, 35, 130)',
      bronze: 'hsl(33, 100%, 34%)',
      gray: '#e3e2e3',
      grayDark: '#5F5E5D',
      green: 'hsl(144, 52%, 34%)',
      red: 'hsl(0, 78%, 49%)',
      white: 'hsl(0, 0%, 100%)',
      greenDark: '#045249',
      mint: '#6BB996',
      salmon: '#C9807A',
    },
  },
  2025: {
    colors: {
      primary: '#a9dcde',
      secondary: '#082ccb',
      logo: '#183772',
      success: 'hsl(144, 52%, 34%)',
      warning: 'hsl(33, 100%, 34%)',
      error: 'hsl(0, 78%, 49%)',
      blue: '#183772',
      blue2025: '#082ccb',
      purple: '#3f3c55',
      purpleDark: 'rgb(51, 35, 130)',
      bronze: 'hsl(33, 100%, 34%)',
      gray: '#e3e2e3',
      grayDark: '#5F5E5D',
      green: 'hsl(144, 52%, 34%)',
      red: 'hsl(0, 78%, 49%)',
      white: 'hsl(0, 0%, 100%)',
      greenDark: '#045249',
      mint: '#6BB996',
      cyan: '#a9dcde',
      salmon: '#C9807A',
    },
  },
};

/**
 * Default theme used when no year-specific theme is found
 * This matches the main site theme defined in globals.css
 */
export const defaultTheme: Theme = {
  colors: {
    primary: '#d62a2b',
    secondary: '#57bfff',
    logo: '#d62a2b',
    success: 'hsl(144, 52%, 34%)',
    warning: 'hsl(33, 100%, 34%)',
    error: '#fb3c41',
    blue: 'rgb(81, 188, 201)',
    purple: 'rgba(111, 61, 141, 1)',
    purpleDark: 'rgb(51, 35, 130)',
    bronze: 'hsl(33, 100%, 34%)',
    gray: '#e3e2e3',
    grayDark: '#c5bbb4',
    green: 'hsl(144, 52%, 34%)',
    red: 'hsl(0, 78%, 49%)',
    white: 'hsl(0, 0%, 100%)',
  },
};

/**
 * Get theme for a specific year, with fallback to default
 */
export function getThemeByYear(year: number): Theme {
  return themesByYear[year] ?? defaultTheme;
}

/**
 * Check if a year has a specific theme defined
 */
export function hasThemeForYear(year: number): boolean {
  return year in themesByYear;
}

/**
 * Get all available years with themes
 */
export function getAvailableThemeYears(): number[] {
  return Object.keys(themesByYear)
    .map(Number)
    .sort((a, b) => b - a);
}
