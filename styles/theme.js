import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  typography: {
    fontFamily: [
      'OpenSans',
      'OpenSansBold',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'OpenSans';
          src: url('/static/opensans-regular-webfont.woff');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'OpenSansBold';
          src: url('/static/opensans-bold-webfont.woff');
          font-weight: bold;
          font-style: normal;
        }
      `,
    },
  },
});

export default theme
