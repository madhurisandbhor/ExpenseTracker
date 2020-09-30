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
    primary: { light: '#d3bcc0', main: '#f34925', dark: '#69306D' },
    secondary: { light: '#613ba1', main: '#4CC9F0', dark: '#4003a8' },
  },
  tracker: {
    white: '#fff',
    grey: '#dbdbdb',
    black: '#000',
    category: {
      yellow: '#ebb734',
      red: '#e33030',
      blue: '#3330e3',
      green: '#1fab26',
    },
  },
  overrides: {
    MuiInputLabel: fontSize14,
    MuiTextField: fontSize14,
    MuiInputBase: {
      root: {
        fontSize: '1.4rem',
        fontFamily: 'Lora, sans-serif',
      },
    },
    MuiChip: fontSize12,
    MuiButton: {
      root: {
        fontSize: '1.2rem',
        color: '#69306D',
      },
    },
    MuiTypography: {
      h6: {
        fontSize: '1.8rem',
        color: '#69306D',
      },
      caption: {
        fontSize: '1.4rem',
      },
      body1: {
        fontSize: '1.4rem',
      },
      body2: {
        fontSize: '1.1rem',
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
        color: '#69306D',
      },
    },
    MuiSnackbarContent: fontSize12,
    MuiTooltip: {
      tooltip: {
        fontSize: '1rem',
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: '1.8rem',
      },
    },
  },
});

export default theme;
