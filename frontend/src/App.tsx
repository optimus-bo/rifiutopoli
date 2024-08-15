import { OptimusUiApp } from 'optimus-bo-ui';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MainScreen from './screens/MainScreen';

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
            <MainScreen />
          </Layout>
        </OptimusUiApp>
      </BrowserRouter>
    </div>
  );
}

export default App;
