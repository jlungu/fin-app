import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChartComponent from './components/ChartComponent'

function App() {
  return (
    <div className="App">
      <div>
        <ChartComponent symbol={'AAPL'}/>
      </div>
    </div>
  );
}

export default App;
