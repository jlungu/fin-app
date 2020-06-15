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
  focusInput = () => {
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
    return (
      <div class="home-div">
        <div class="input-group input-group-lg main-search">
          <form id="main-form" class="form-inline" onSubmit={this.search}>
            <div class="row">
            <input
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
