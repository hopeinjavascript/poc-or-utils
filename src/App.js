import './App.css';
import Queue from './components/Queue/Queue';

function App() {
  return (
    <div className="app">
      <Queue maxSize={8} />
    </div>
  );
}

export default App;
