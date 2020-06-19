import React, { Component } from "react";
import SearchBarComponent from "./SearchBarComponent";
import {Link} from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner";

export class HomeComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      stocks: [],
      filteringStocks: [],
      searchFocused: false
    }
  }
  //This function will actually navigate to that page.
  search = (e) => {
    e.preventDefault();
    const path = "/stock/" + document.getElementById("main-searchbar").value;
    this.props.history.push(path);
  };

  componentDidMount() {
    //On 'enter' key clicked, and if the text box is in focus, enter should SUBMIT...
    fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=brain17rh5rbgnjpuck0')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      var stonks = []
      for (let i = 0; i < data.length; i++){
        stonks.push(data[i].symbol + " - " + data[i].description)//Just want ticker and name...
      }
      this.setState({
        stocks: stonks,
        filteringStocks: stonks
      })
    })
  }

  //Triggered when the input bar is focused, time to show all thew stonks.
  focusInput = (e) => {
    e.preventDefault();
    this.setState({
      searchFocused: true
    })
  }

  //Triggered when defocusing input bar, hide all stocks.
  // defocusInput = () => {
  //   this.setState({
  //     searchFocused: false
  //   })
  // }

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

  render() {
    const title = "<Finance App />"
    const style = {
      color: 'green'
    }
    return (
      <div class="home-div">
        <div class="row justify-content-md-center">
            <div class="col-sm-4">
              <div id="sandp" class="card border border-success front_card">
                  <div style={style} class="card-body index_card_body">
                    <span class="index_name">S&P 500 |</span>
                    <span  class="index_price">3,097.74 </span>
                    <span class="index_change">| -17.60</span>
                  </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div id="dowj" class="card front_card">
                  <div class="card-body index_card_body">
                    <span class="index_name">DOW J |</span>
                    <span class="index_price">25,871.46 </span>
                    <span class="index_change">| -208.64</span>
                  </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div id="nasdaq" class="card front_card">
                  <div class="card-body index_card_body">
                    <span class="index_name">NASDAQ |</span>
                    <span class="index_price">9.946.12 </span>
                    <span class="index_change">| +3.07</span>
                  </div>
              </div>
            </div>
          </div>
        
        <h1 id="page_header">{title}</h1>
        <h5 id="sub-header">A simple stock look-up tool</h5>
        <div class="input-group input-group-lg main-search">
          <form id="main-form" class="form-inline" onSubmit={this.search}>
            <div class="row">
            <input
              autoComplete="off"
              id="main-searchbar"
              type="text"
              class="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="Enter a Stock..."
              onFocus={this.focusInput}
              onBlur={this.defocusInput}
              onChange={this.clarifySearch}
            />
              <button id="home-submit-btn" class="btn btn-outline-secondary" type="submit">
              <span class="material-icons">search</span>
              </button>
            </div>
          </form>
          {this.state.searchFocused? 
          <div id="stock-select-div">
              <ul id="stock-list">
                {this.state.filteringStocks == [] ? <Spinner />: 
                  this.state.filteringStocks.map((item, index)  => (
                    <Link to={"/stock/"+item.substring(0, item.indexOf(' '))}>
                     <li class="stock-option" key={index}>{item}</li>
                     </Link>
                   
                  ))
                }
              </ul>
            </div>:
            null}        
        </div>
      </div>
    );
  }
}
export default HomeComponent;
