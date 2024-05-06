import { OptimusUiApp } from 'optimus-bo-ui';
import './App.css';
import MainScreen from './MainScreen';

function App() {
  return (
    <div className="App">
      <OptimusUiApp>
        <MainScreen />
      </OptimusUiApp>
    </div>
  );
}

export default App;
