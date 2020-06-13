import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { light: '#6298a6', main: "#6a878f", dark: '#48727d' },
    secondary: { light: '', main: "#e03f7a", dark: '#9e3108' },
  },
  spacing: 4,
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: '1.4rem',
      },
    },
    MuiTextField: {
      root: {
        fontSize: '1.4rem',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '1.4rem',
      },
    },
    MuiButton: {
      root: {
        fontSize: '1.4rem',
      },
    },
    MuiFormControl: {
      root: {
        margin: '1.6rem .4rem'
      }
    }
  }
});

export default theme;