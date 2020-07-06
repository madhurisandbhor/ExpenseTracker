import { createMuiTheme } from '@material-ui/core/styles';
const fontSize14 = {
  root: {
    fontSize: '1.4rem',
  },
};

const fontSize12 = {
  root: {
    fontSize: '1.2rem',
  },
};

const theme = createMuiTheme({
  palette: {
    primary: { light: '#d3bcc0', main: '#e26d5c', dark: '#69306D' },
    secondary: { light: '#613ba1', main: '#e26d5c', dark: '#4003a8' },
  },
  spacing: 4,
  tracker: {
    white: '#fff',
  },
  overrides: {
    MuiInputLabel: fontSize14,
    MuiTextField: fontSize14,
    MuiInputBase: fontSize14,
    MuiButton: fontSize14,
    MuiTypography: {
      h6: {
        fontSize: '1.8rem',
        color: '#69306D',
      },
      caption: {
        fontSize: '1.2rem',
      },
    },
    MuiTableCell: {
      head: {
        color: '#e26d5c',
        padding: '.8rem',
        '&:first-child': {
          paddingLeft: '1.6rem',
        },
      },
      root: {
        fontSize: '1.4rem',
        padding: '0 .8rem',
        '&:first-child': {
          paddingLeft: '1.6rem',
        },
      },
    },
    MuiToolbar: fontSize14,
    MuiMenuItem: fontSize12,
    MuiIconButton: {
      colorInherit: {
        color: '#e26d5c',
      },
    },
    MuiSnackbarContent: fontSize12,
  },
});

export default theme;
