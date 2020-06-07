import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import "./App.css";
import ChartComponent from "./components/ChartComponent";
import InfoComponent from "./components/InfoComponent";
import CompanyComponent from "./components/CompanyComponent";
import Navbar from "./components/Navbar";
import StockHeader from "./components/StockHeader";
import HomeComponent from "./components/HomeComponent";
import OverviewPageComponent from "./components/OverviewPageComponent";

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/" render={() => <Redirect to={{pathname: "/home"}} />} />
              <Route path="/home" component={HomeComponent}></Route>
              <Route path="/stock/:symbol" component={OverviewPageComponent}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App; 

ReactDOM.render(<App />, document.getElementById('root'));
