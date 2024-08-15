import { OptimusUiApp } from 'optimus-bo-ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { routes } from './routes';
import DocumentScreen from './screens/DocumentScreen';
import MainScreen from './screens/MainScreen';
import SettingScreen from './screens/SettingScreen';

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
          <Layout>
            <Routes>
              <Route path={routes.rifiuti} element={<MainScreen />} />
              <Route path={routes.documenti} element={<SettingScreen />} />
              <Route path={routes.impostazioni} element={<DocumentScreen />} />
            </Routes>
          </Layout>
        </OptimusUiApp>
      </BrowserRouter>
    </div>
  );
}

export default App;
