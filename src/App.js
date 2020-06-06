import React from 'react';
import './App.css';
import ChartComponent from './components/ChartComponent'
import InfoComponent from './components/InfoComponent'
import CompanyComponent from './components/CompanyComponent';
import Navbar from './components/Navbar';
import StockHeader from './components/StockHeader';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <StockHeader symbol={'SBUX'} />
        <ChartComponent symbol={'SBUX'}/>
        <InfoComponent symbol={'SBUX'}/>
        <CompanyComponent symbol={'SBUX'}/>
      </div>
    </div>
  );
}

export default App;
