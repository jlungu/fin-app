import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,ConnectedRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import "./App.css";
import ChartComponent from "./components/ChartComponent";
import InfoComponent from "./components/InfoComponent";
import CompanyComponent from "./components/CompanyComponent";
import Navbar from "./components/Navbar";
import StockHeader from "./components/StockHeader";
import HomeComponent from "./components/HomeComponent";
import OverviewPageComponent from "./components/OverviewPageComponent";  
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <div>
            <Navbar history={this.props.history}/>
            <Switch>
              <Route exact path="/" render={() => <Redirect to={{pathname: "/home"}} />} />
              <Route path="/login" component={LoginComponent}></Route>
              <Route path="/register" component={RegisterComponent}></Route>
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
