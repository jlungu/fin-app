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
      searchFocused: false,
      dowj: -1,
      dowjOpen: -1,
      standardPoor: -1,
      standardPoorOpen: -1,
      nasdaq: -1,
      nasdaqOpen: -1
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
        if (data[i].description.length > 0)
          stonks.push(data[i].symbol + " - " + data[i].description)//Just want ticker and name...
      }
      this.setState({
        stocks: stonks,
        filteringStocks: stonks
      })
    })

    //THREE API CALLS for three quotes on the three main indicies; ^DJI, ^GSPC, ^IXIC
    fetch('https://finnhub.io/api/v1/quote?symbol=^DJI&token=brain17rh5rbgnjpuck0')
    .then(res =>res.json())
    .then(data => {
      this.setState({
        dowjPrevClose: data.pc,
        dowj: data.c
      })
    })
    //S&P
    fetch('https://finnhub.io/api/v1/quote?symbol=^GSPC&token=brain17rh5rbgnjpuck0')
    .then(res =>res.json())
    .then(data => {
      this.setState({
        standardPoorPrevClose: data.pc,
        standardPoor: data.c
      })
    })
    //NASDAQ
    fetch('https://finnhub.io/api/v1/quote?symbol=^IXIC&token=brain17rh5rbgnjpuck0')
    .then(res =>res.json())
    .then(data => {
      this.setState({
        nasdaqPrevClose: data.pc,
        nasdaq: data.c
      })
    })


    //WEBSOCKET - Subscribe to updates on DOWJ PRICING. Need to see real-time updates, WHEN ITS A TRADING DAY.
    const socketDJI = new WebSocket(
      "wss://ws.finnhub.io?token=brain17rh5rbgnjpuck0"
    );
    // Connection opened -> Subscribe to DJI
    socketDJI.addEventListener("open", function (event) {
      socketDJI.send(JSON.stringify({ type: "subscribe", symbol: '^DJI' }));
    });

    // Listen for messages
    socketDJI.addEventListener("message", (event) => {
      var x = JSON.parse(event.data);
      if (x.type != "trade") return;
      this.setState({
        standardPoor: x.data[0].p,
      });
    });
    //WEBSOCKET - Subscribe to updates on S&P PRICING. Need to see real-time updates, WHEN ITS A TRADING DAY.
    const socketSP = new WebSocket(
      "wss://ws.finnhub.io?token=brain17rh5rbgnjpuck0"
    );
    // Connection opened -> Subscribe to SANDP
    socketSP.addEventListener("open", function (event) {
      socketSP.send(JSON.stringify({ type: "subscribe", symbol: '^GSPC' }));
    });

    // Listen for messages
    socketSP.addEventListener("message", (event) => {
      var x = JSON.parse(event.data);
      if (x.type != "trade") return;
      this.setState({
        nasdaq: x.data[0].p,
      });
    });

    //WEBSOCKET - Subscribe to updates on NASDAQ PRICING. Need to see real-time updates, WHEN ITS A TRADING DAY.
    const socketNDAQ = new WebSocket(
      "wss://ws.finnhub.io?token=brain17rh5rbgnjpuck0"
    );
    // Connection opened -> Subscribe to NASDAQ
    socketNDAQ.addEventListener("open", function (event) {
      socketNDAQ.send(JSON.stringify({ type: "subscribe", symbol: '^IXIC' }));
    });

    // Listen for messages
    socketNDAQ.addEventListener("message", (event) => {
      var x = JSON.parse(event.data);
      if (x.type != "trade") return;
      this.setState({
        dowj: x.data[0].p,
      });
    });

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
    const green = {
      color: 'green'
    }
    const red = {
      color: 'red'
    }
    const gray = {
      color: 'darkgray'
    }
    const pos = "+"
    const neg = ""//Negative sign is included with number, so no addition here
    const {dowj, standardPoor, nasdaq, standardPoorPrevClose, nasdaqPrevClose, dowjPrevClose} = this.state;
    //Changes...
    var dowjChange = dowj - dowjPrevClose
    var standardPoorChange = standardPoor - standardPoorPrevClose
    var nasdaqChange = nasdaq - nasdaqPrevClose

    //Selectives for border colors in bootstrap
    const up = "card border border-success front_card"
    const down = "card border border-danger front_card"
    const same = "card border border-light front_card"


    return (
      <div class="home-div">
        <div class="row justify-content-md-center">
            <div class="col-sm-4">
              <div id="sandp" class={standardPoorChange < 0? down: standardPoorChange > 0? up: same}>
                  <div style={standardPoorChange < 0? red: standardPoorChange > 0? green: gray} class="card-body index_card_body">
                    <span class="index_name">S&P 500 |</span>
                    <span class="index_price">{standardPoor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
                    <span class="index_change">| {standardPoorChange > 0? pos: neg}{standardPoorChange.toFixed(2)}</span>
                  </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div id="dowj" class={dowjChange < 0? down: dowjChange > 0? up: same}>
                  <div style={dowjChange < 0? red: dowjChange > 0? green: gray} class="card-body index_card_body">
                    <span class="index_name">DOW J |</span>
                    <span class="index_price">{dowj.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
                    <span class="index_change">| {dowjChange > 0? pos: neg}{dowjChange.toFixed(2)}</span>
                  </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div id="nasdaq" class={nasdaqChange < 0? down: nasdaqChange > 0? up: same}>
                  <div style={nasdaqChange < 0? red: nasdaqChange > 0? green: gray} class="card-body index_card_body">
                    <span class="index_name">NASDAQ |</span>
                    <span class="index_price">{nasdaq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
                    <span class="index_change">| {nasdaqChange > 0? pos: neg}{nasdaqChange.toFixed(2)}</span>
                  </div>
              </div>
            </div>
          </div>
        
        <i class="fas fa-money-check-alt front_icons_left"></i>
        <h1 id="page_header">{title}</h1>
        <i class="fas fa-chart-area front_icons_right"></i>
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
