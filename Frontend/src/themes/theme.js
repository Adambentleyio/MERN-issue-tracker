import { createTheme } from '@mui/material/styles';


export const appTheme = createTheme( {
  palette: {
    mode: 'dark',
    primary: {
      main: '#170939',
      light: 'rgb(69, 58, 96)'
    },
    secondary: {
      main: '#e62828',
    },
    neutral: {
        main: '#ccc'
    }
  },
});