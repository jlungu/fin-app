import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,ConnectedRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

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
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { getWatchlists } from "./actions/watchlistActions"

//Checking if user is already logged in. If so, we re-log them in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getWatchlists(decoded.email))//Getting users watchlists to save in store.

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user, token expired
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render(){
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}
export default App; 

ReactDOM.render(<App />, document.getElementById('root'));
