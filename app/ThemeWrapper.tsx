'use client';

import {ReactNode} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#9b3fba'
      }
    },
  });

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>;
};