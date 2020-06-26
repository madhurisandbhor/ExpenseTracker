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
    // primary: { light: '#A5668B', main: "#69306D", dark: '#0E103D' },
    primary: { light: '#d3bcc0', main: "#e26d5c", dark: '#69306D' },
    secondary: { light: '#613ba1', main: "#e26d5c", dark: '#4003a8' },
  },
  spacing: 4,
  overrides: {
    MuiInputLabel: fontSize14,
    MuiTextField: fontSize14,
    MuiInputBase: fontSize14,
    MuiButton: fontSize14,
    MuiFormControl: {
      root: {
        margin: '1.6rem .4rem'
      }
    },
    MuiTableCell: fontSize14,
    MuiTypography: {
      h6: {
        fontSize: '1.8rem',
        color: '#69306D',
      },
      caption: {
        fontSize: '1.2rem',
      }
    },
    MuiTableCell: {
      head: {
        color: '#e26d5c',
      },
      root: fontSize14.root,
    },
    MuiToolbar: fontSize14,
    MuiMenuItem: fontSize12,
    TableStubCell:{
      cell:{
        display:'none',
      }
    },
  }
});

export default theme;