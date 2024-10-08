import { createTheme, CssBaseline, ThemeOptions, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { OptimusUiApp } from 'optimus-bo-ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './core/Layout';
import { routes } from './core/routes';
import { formElementsBorderRadius } from './core/values';
import MainScreen from './screens/MainScreen';
import SettingScreen from './screens/SettingScreen';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        sx: { borderRadius: formElementsBorderRadius },
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          '& .MuiOutlinedInput-root': {
            borderRadius: formElementsBorderRadius,
          },
        },
      },
    },
  },
} as ThemeOptions);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <BrowserRouter>
            <OptimusUiApp
              layoutConfiguration={{
                configure: false,
              }}
              reactQueryConfiguration={{
                configure: true,
              }}
            >
              <Layout>
                <Routes>
                  <Route path={routes.rifiuti} element={<MainScreen />} />
                  <Route path={routes.impostazioni} element={<SettingScreen />} />
                </Routes>
              </Layout>
            </OptimusUiApp>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
