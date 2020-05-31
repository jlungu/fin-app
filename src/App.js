import React from 'react';
import './App.css';
import ChartComponent from './components/ChartComponent'
import InfoComponent from './components/InfoComponent'

function App() {
  return (
    <div className="App">
      <div>
        <ChartComponent symbol={'AAPL'}/>
        <InfoComponent />
      </div>
    </div>
  );
}

export default App;
