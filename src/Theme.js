import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const color = teal[900];

export const theme = createTheme({
  palette: {
    primary: {
      main: color,
      contrastText: 'white',
    },
  },
});
