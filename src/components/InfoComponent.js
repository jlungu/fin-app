import React, { Component } from "react";

export class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: -1,
      prevClose: -1,
      red: false, //Red means a decline from previous close, false red means its green i.e. an inc
      marketCap: -1,
      shareOut: -1,
      time: -1,
      subscribed: false,
      peRatio: 'N/A'
    };
  }
  componentDidMount() {
    //Need to make API call to get current stock price.....
    fetch(
      "https://finnhub.io/api/v1/quote?symbol=" +
        this.props.symbol +
        "&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          price: data.c,
          prevClose: data.pc,
          time: data.t,
        })
      );

    //NEED: Market capitalization, shares outstanding.
    fetch(
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        this.props.symbol +
        "&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          marketCap: data.marketCapitalization,
          shareOut: data.shareOutstanding,
        })
      );

    //Candestick data for TODAY only. Just need it to grab volume for previous day (if before 4pm EST)
    var d = new Date();
    const sDate =
      d.getHours() < 20
        ? new Date(d.getFullYear(), d.getMonth() + 1, d.getDay(), 20)
        : new Date(d.getFullYear(), d.getMonth() + 1, d.getDay(), 20);
    console.log(sDate.toDateString());


    //API call for PE RATIO.
    fetch('https://finnhub.io/api/v1/stock/metric?symbol=' + this.props.symbol + '&metric=valuation&token=brain17rh5rbgnjpuck0')
    .then(res => res.json())
    .then(data => this.setState({
      peRatio: data.metric.peExclExtraTTM?(data.metric.peExclExtraTTM).toFixed(2): 'N/A'
    }))

    console.log(this.state.peRatio)

    //WEBSOCKET - Subscribe to updates on PRICING. Need to see real-time updates, WHEN ITS A TRADING DAY.
    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=brain17rh5rbgnjpuck0"
    );
    const sym = this.props.symbol;
    // Connection opened -> Subscribe
    socket.addEventListener("open", function (event) {
      socket.send(JSON.stringify({ type: "subscribe", symbol: sym }));
    });
    
    // Listen for messages
    socket.addEventListener("message", (event) => {
      var x = JSON.parse(event.data);
      if (x.type != "trade")
        return
        this.setState({
          price: x.data[0].p,
        });
    });
  }

  getChange = () => {
    //Simply returning string; tells change in price from previous close...
    const diff = (this.state.price - this.state.prevClose).toFixed(2);
    if (diff < 0) {
      //In this case, we have negative value. Price should be RED...
      this.setState({
        red: true,
      });
    } else {
      //No dice; num should be GREEN BABY
      this.setState({
        red: true,
      });
    }
    return diff;
  };

  setMarketCap = () => {
    const mc = this.state.marketCap;
    if (mc > 999999999999) {
      //Trillions
    } else {
      //Thousands. Just put full number
      this.setState({
        marketCap: "$" + mc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), //Formatting to thousands...
      });
    }
  };

  render() {
    const { price, prevClose, marketCap, shareOut, peRatio } = this.state;
    const change = (price - prevClose).toFixed(2);
    var mc =
      marketCap > 999999
        ? "$" + (marketCap / 1000000).toFixed(3) + "T" //TRILLIONS
        : marketCap > 999
        ? "$" + (marketCap / 1000).toFixed(3) + "B" //BILLIONS
        : "$" + marketCap.toFixed(3) + "M"; //MILLIONS"

    var red = {
      //Red and green colors; depends on if stock is down or up.
      color: "red",
    };
    var green = {
      color: "green",
    };

    var style = change < 0 ? red : green;
    var prefix = change < 0 ? "" : "+";

    return (
      <div class="container">
        <hr className="break"></hr>
        <h3 className="h3">Quick Look</h3>
        <div class="row justify-content-md-center">
          <div class="col-lg-3 w">
            <table>
              <tbody>
                <tr>
                  <td class="lcell">Market Cap</td>
                  <td class="rcell">{mc}</td>
                </tr>
                <tr>
                  <td class="lcell">Volume</td>
                </tr>
                <tr>
                  <td class="lcell">PE Ratio</td>
                  <td class="rcell">{peRatio}</td>
                </tr>
                <tr>
                  <td class="lcell">EPS</td>
                </tr>
                <tr>
                  <td class="lcell">Book Value</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-lg-3 w">
            <div id="priceDiv">
              <span style={style} id="currentPrice">
                ${price.toFixed(2)}
              </span>
              <span id="priceChange">
                {prefix}
                {change}
              </span>
            </div>
          </div>
          <div class="col-lg-3 w">
            <table>
              <tbody>
                <tr>
                  <td class="lcell">Forward Dividend</td>
                  <td class="rcell">$1.25T</td>
                </tr>
                <tr>
                  <td class="lcell">Earnings Date</td>
                </tr>
                <tr>
                  <td class="lcell">Beta</td>
                </tr>
                <tr>
                  <td class="lcell">ROA, ROE</td>
                </tr>
                <tr>
                  <td class="lcell"> PM, OM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default ChartComponent;
