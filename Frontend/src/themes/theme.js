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
});