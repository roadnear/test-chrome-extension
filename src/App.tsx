/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import blueGrey from '@mui/material/colors/blueGrey';
import blue from '@mui/material/colors/blue';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import router from './router';
import store, { persistor } from './state/store';

const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    background: {
      default: blueGrey[900],
      paper: blueGrey[900],
    }
  }
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline/>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}



export default App;
