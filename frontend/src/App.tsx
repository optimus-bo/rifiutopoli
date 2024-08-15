import { OptimusUiApp } from 'optimus-bo-ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './core/components/Layout';
import RifiutiContextProvider from './core/RifiutiContext';
import { routes } from './core/routes';
import MainScreen from './screens/MainScreen';
import SettingScreen from './screens/SettingScreen';
import TrashScreen from './screens/TrashScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <OptimusUiApp
          layoutConfiguration={{
            configure: false,
          }}
          reactQueryConfiguration={{
            configure: true,
          }}
        >
          <RifiutiContextProvider>
            <Layout>
              <Routes>
                <Route path={routes.rifiuti} element={<MainScreen />} />
                <Route path={routes.documenti} element={<SettingScreen />} />
                <Route path={routes.cestino} element={<TrashScreen />} />
              </Routes>
            </Layout>
          </RifiutiContextProvider>
        </OptimusUiApp>
      </BrowserRouter>
    </div>
  );
}

export default App;
