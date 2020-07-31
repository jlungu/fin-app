import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

export class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: [],
      filteringStocks: [],
      searchFocused: false,
      loggedIn: false
    }
  }

  componentDidMount(){
    //This event listener dictates whether we are to show or hide the "autocomplete" menu.
    if (this.props.auth.isAuthenticated) {      
      this.setState({loggedIn: true})
    }
    document.addEventListener("click", (evt) => {
      if (evt.target != document.getElementById("nav-search") 
      && evt.target != document.getElementById("stock-option-nav")
      && evt.target != document.getElementById("stock-select-div-nav"))
        this.setState({
          searchFocused: false
        })
    });

    fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=brain17rh5rbgnjpuck0')
    .then((res) => res.json())
    .then((data) => {
      var stonks = []
      for (let i = 0; i < data.length; i++){
        if (data[i].description.length > 0)
          stonks.push(data[i].symbol + " - " + data[i].description)//Just want ticker and name...
      }
      this.setState({
        stocks: stonks,
        filteringStocks: stonks
      })
    });
  }

  //Triggered when defocusing input bar, hide all stocks.
  defocusInput = () => {
    this.setState({
      searchFocused: false
    })
  }
  //This function will actually navigate to that page.
  search = (e) => {
    this.setState({
      searchFocused: false
    })
    const path = "/stock/" + document.getElementById("nav-search").value;
    console.log(path)
    this.props.history.push(path);
  };

  /**
   * Every time search bar is modified, we must reflect change to show all
   *  possible matches to the text
   */
  clarifySearch = (e) => {
    var oldStonks = this.state.stocks
    this.setState({
      //Filtering so the stocks displayed match input.
      filteringStocks: oldStonks.filter((s) => s.includes(e.target.value.toUpperCase()))
    })
  }

  /**
   * Takes input, navigates to that specific stocks page. Hides the selection menu
   */
  searchLink = (stonk) =>{
    this.setState({
      searchFocused: false
    })
      document.getElementById("nav-search").value = stonk.substring(0, stonk.indexOf(' '))
      document.getElementById("submit_button").click()
  }

  //Triggered when the input bar is focused, time to show all thew stonks.
  focusInput = (e) => {
    e.preventDefault();
    this.setState({
      searchFocused: true
    })
  }
  //Redirects user to login page.
  redirectLogin = () => {
    this.props.history.push('/login')
  }

  //Function simply logs user out.
  logoutUser = () => {
    this.props.logoutUser();
    window.location.reload(false)
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark my-nav" >
          <a class="navbar-brand">
          <i class="fas fa-landmark"></i>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="col-sm-3">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/home">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                {this.props.auth.isAuthenticated?
                <li class="nav-item">
                  <div class="dropdown_watchlist">
                    Watchlist
                  </div>
                </li> 
                : null
                }
              </ul>
            </div>
            <div class="col-sm-6 nav-mid">
              <form onSubmit={this.search.bind(this)}>
                <input
                  autoComplete="off"
                  class="form-control"
                  type="search"
                  id="nav-search"
                  placeholder="Enter a Stock..."
                  aria-label="Search"
                  onFocus={this.focusInput}
                  onChange={this.clarifySearch}
                />
                <button
                  class="btn btn-outline-success nav-btn"
                  id="submit_button"
                  type="submit"
                >
                  <span class="material-icons">search</span>
                </button>
              </form>
              {this.state.searchFocused? 
                <div id="stock-select-div-nav">
                    <ul id="stock-list-nav">
                      {this.state.filteringStocks == [] ? <Spinner />: 
                        this.state.filteringStocks.map((item, index)  => (
                          <li class="stock-option-nav" onClick={this.searchLink.bind(this, item)} key={index}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>:
              null}
            </div>
            <div class="col-sm-1">
            
            </div>
            <div class="col-lg-2">
              {this.state.loggedIn? 
              <div class="logout_dropdown">
              <div id="logged_in_div">
                <img id="user_icon" src={ require('../images/user_img.png') }></img>
                <span id="log_links">{this.props.auth.user.name}</span>
              </div>
              <div class="logged_in_content">
              <span>{this.props.auth.user.email}</span>
                <hr id="hr_loggedout"/>
                <p id="logout_btn" onClick={this.logoutUser}>Logout</p>
              </div>
            </div>
              : <div id="log_in_div" onClick={this.redirectLogin}>Login</div>}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, 
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));