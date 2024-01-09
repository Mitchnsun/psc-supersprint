import { CssBaseline, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import customTheme from '../styles/theme';

export const withMuiTheme = (Story) => (
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export const decorators = [withMuiTheme];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
