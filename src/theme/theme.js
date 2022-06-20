import { createTheme } from "@mui/material";
export const themeOptions = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#536dfe',
      },
      secondary: {
        main: '#ff425a',
      },
      success: {
        main: '#58d67a',
      },
    },
    shape: {
      borderRadius: 10,
    },
    props: {
      MuiAppBar: {
        color: 'default',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
});
