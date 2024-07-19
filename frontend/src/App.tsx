import { OptimusUiApp } from 'optimus-bo-ui';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainScreen from './MainScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <OptimusUiApp
          layoutConfiguration={{
            configure: true,
            layoutConfig: {
              layoutType: 'default',
              navbarConfig: {
                navbarStyling: 'solid',
              },
            },
          }}
        >
          <MainScreen />
        </OptimusUiApp>
      </BrowserRouter>
    </div>
  );
}

export default App;
