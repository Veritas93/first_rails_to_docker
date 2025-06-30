import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React from 'react';

const MUITheme = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: blue,
      type: 'light',
    },
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default MUITheme;
