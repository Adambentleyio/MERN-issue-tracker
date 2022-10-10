import { createTheme } from '@mui/material/styles';


export const appTheme = createTheme( {
    palette: {
        mode: 'dark',
        primary: {
          light: '#2da88c',
          main: '#2a818c',
          dark: '#0d292d',
        },
        secondary: {
          main: '#6f5260',
        },
        error: {
          main: '#ff6e63',
        },
      },
      typography: {
        fontFamily: [
          'consolas',
          'roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        body1: {
          fontFamily: 'consolas',
          fontWeight: 'light',
        },
        button: {
          fontWeight: 'bold',
        }
      },
});