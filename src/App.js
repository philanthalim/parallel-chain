import React from 'react';
import TrafficLight from './components/TrafficLight';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <TrafficLight />
    </ThemeProvider>
  );
};

export default App;