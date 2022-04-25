import './App.css';
import { Header } from './components/Header';
import { FrameCanvas } from './components/FrameCanvas';
import { BoxManager } from './components/BoxManager';

function App() {
  return (
    <div className="App">
      <Header />
      <FrameCanvas />
      <BoxManager />
    </div>
  );
}

export default App;
