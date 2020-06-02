import React from 'react';
import './App.css';
import ChartComponent from './components/ChartComponent'
import InfoComponent from './components/InfoComponent'
import CompanyComponent from './components/CompanyComponent';

function App() {
  return (
    <div className="App">
      <div>
        <ChartComponent symbol={'AAPL'}/>
        <InfoComponent symbol={'AAPL'}/>
        <CompanyComponent symbol={'AAPL'}/>
      </div>
    </div>
  );
}

export default App;
