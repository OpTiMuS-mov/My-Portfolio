import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#E31937' },
    secondary: { main: '#0066CC' },
    background: {
      default: '#0A0E14',
      paper: '#121820',
    },
    text: {
      primary: '#F0F4F8',
      secondary: '#8899AA',
      disabled: '#556677',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#121820',
          border: '1px solid #1E2A3A',
          borderRadius: 4,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#0D1520',
        },
      },
    },
  },
});

export default theme;
