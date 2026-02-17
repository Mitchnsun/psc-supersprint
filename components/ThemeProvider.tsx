'use client';

import React from 'react';

import { getThemeByYear, hasThemeForYear, Theme } from '@/lib/themes/themesByYear';

interface ThemeProviderProps {
  year?: number;
  children: React.ReactNode;
}

/**
 * Generates CSS custom properties object from theme colors
 */
function generateCssVars(theme: Theme): React.CSSProperties {
  return {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-logo': theme.colors.logo,
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--color-destructive': theme.colors.error,
    '--color-gray-dark': theme.colors.grayDark,
  } as React.CSSProperties;
}

/**
 * ThemeProvider component that applies year-specific themes
 *
 * This component injects CSS custom properties to override the default theme
 * when a year-specific theme is available. It wraps content and applies
 * the theme variables to all children.
 *
 * @example
 * ```tsx
 * <ThemeProvider year={2024}>
 *   <div className="bg-primary text-secondary">
 *     Themed content
 *   </div>
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ year, children }: ThemeProviderProps): React.ReactElement {
  // Only apply theme if year is provided and has a specific theme
  const shouldApplyTheme = year !== undefined && hasThemeForYear(year);
  const theme = shouldApplyTheme ? getThemeByYear(year) : null;

  // Generate CSS variables if theme exists
  const cssVars = theme ? generateCssVars(theme) : {};

  return (
    <div style={cssVars} className="bg-primary min-h-screen" data-theme-year={shouldApplyTheme ? year : undefined}>
      {children}
    </div>
  );
}

export default ThemeProvider;
