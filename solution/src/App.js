import logo from './logo.svg';
import './App.css';
import TestComponent from './components/TestComponent'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Sample Application</h1>
      </header>
      <main>
        <TestComponent />
      </main>
    </div>
  );
}

export default App;
