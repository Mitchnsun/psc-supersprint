import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import COLORS from './colors_2022';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
  },
  typography: {
    fontFamily: ['FontRegular', 'FontBold', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'FontRegular';
          src: url('/static/opensans-regular-webfont.woff');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'FontBold';
          src: url('/static/opensans-bold-webfont.woff');
          font-weight: bold;
          font-style: normal;
        }
        body {
          font-family: FontRegular, sans-serif;
          background-color: ${COLORS.PRIMARY};
        }
        @media (max-width: 450px) {
          body {
            font-size: 0.9rem;
          }
        }
      `,
    },
  },
});

export default theme;