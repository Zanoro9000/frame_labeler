import './App.css';
import { Header } from './components/Header';
import { FrameCanvas } from './components/FrameCanvas';
import { BoxManager } from './components/BoxManager';
import { useAppDispatch } from './redux/store';
import { useEffect } from 'react';
import { fetchImageMeta } from './redux/actionCreators.ts/appActions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchImageMeta())
  }, [dispatch])

  return (
      <div className="App">
        <Header />
        <FrameCanvas />
        <BoxManager />
      </div>
  );
}

export default App;
