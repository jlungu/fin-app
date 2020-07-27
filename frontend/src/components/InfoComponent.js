import React, { Component } from "react";

export class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: -1,
      prevClose: -1,
      red: false, //Red means a decline from previous close, false red means its green i.e. an inc
      marketCap: -1,
      time: -1,
      subscribed: false,
      peRatio: "N/A",
      volume: 0,
      eps: -1,
      bookVal: -1,
      beta: -1,
      exDivDate: "N/A",
      divAmt: "N/A",
      open: -1,
      symbol: this.props.symbol.toUpperCase()
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
      .then((data) =>{
        this.setState({
          price: data.c,
          afterHours: data.c,
          prevClose: data.pc,
          time: data.t,
          open: data.o,
          close: data.c,
        })
      }   
      );

    //NEED: Market capitalization, shares outstanding.
    fetch(
      "https://finnhub.io/api/v1/stock/metric?symbol=" +
        this.props.symbol +
        "&metric=price&token=brain17rh5rbgnjpuck0"
      )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          marketCap: data.metric.marketCapitalization,
          beta: data.metric.beta? data.metric.beta.toFixed(2): 'N/A',
        })
      );

    //QUOTE. Grabbing latest volume from IEXCLOUD API
    fetch('https://sandbox.iexapis.com/stable/stock/'+this.props.symbol+'/quote?token=Tsk_50d3a3ecf17047948593b4a3d34a80c6')
    .then(res => res.json())
    .then(data => this.setState({
      volume: data.latestVolume == null? data.previousVolume: data.latestVolume
    }))
    

    //API call for PE RATIO.
    fetch(
      "https://finnhub.io/api/v1/stock/metric?symbol=" +
        this.props.symbol +
        "&metric=valuation&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          peRatio: data.metric.peExclExtraTTM
            ? data.metric.peExclExtraTTM.toFixed(2)
            : "N/A",
        })
      );

    //API call for EPS/BOOK VALUE.
    fetch(
      "https://finnhub.io/api/v1/stock/metric?symbol=" +
        this.props.symbol +
        "&metric=perShare&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          eps: data.metric.epsInclExtraItemsTTM
            ? data.metric.epsInclExtraItemsTTM.toFixed(2)
            : "N/A",
          bookVal: data.metric.bookValuePerShareQuarterly
            ? data.metric.bookValuePerShareQuarterly.toFixed(2)
            : "N/A",
        })
      );

    //API call for DIVIDENDS (Using IEX cloud, Finnhub made them premium accces only and i is broke :/)
    fetch(
      "https://sandbox.iexapis.com/stable/time-series/advanced_dividends/" +
        this.props.symbol +
        "?last=4&token=Tsk_50d3a3ecf17047948593b4a3d34a80c6"
    )
      .then((res) => res.json())
      .then((data) =>{
        console.log(data)
        this.setState({
          exDivDate: data.length != 0? data[0].exDate: 'N/A',
          divAmt: data.length != 0? data[0].amount: 'N/A',
        })
      }
      );

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
    var volume = 0;
    socket.addEventListener("message", (event) => {
      volume = this.state.volume;
      var x = JSON.parse(event.data);
      if (x.type != "trade") return;
      this.withinMarketHours(new Date())?
      this.setState({
        price: x.data[0].p,
        volume: (volume + x.data[0].v),
      }): 
      console.log("update")
      this.setState({
        afterHours: x.data[0].p,
        volume: (volume + x.data[0].v),
      })
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
      //No dice; num should be GREEN BABY STOCKS ONLY GO UP
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

  //Simply determines if we are in market hours, and should indicate as so
  withinMarketHours = (day) => {
    if (day.getHours() == 9 && day.getMinutes() >= 30)
      return true;
    else if (day.getHours() > 9 && day.getHours() < 16)
      return true;
    else
      return false;
  }

  render() {
    const {
      price,
      prevClose,
      marketCap,
      beta,
      peRatio,
      volume,
      eps,
      bookVal,
      exDivDate,
      divAmt,
      open,
      close,
      afterHours
    } = this.state;
    const change = (price - prevClose).toFixed(2);
    var percentChange = ((change / prevClose) * 100).toFixed(2)
    const afterHoursChng = (afterHours - price).toFixed(2)
    var mc = marketCap? (marketCap > 999999
        ? "$" + (marketCap / 1000000).toFixed(3) + "T" //TRILLIONS
        : marketCap > 999
        ? "$" + (marketCap / 1000).toFixed(3) + "B" //BILLIONS
        : "$" + marketCap.toFixed(3) + "M" //MILLIONS"
    ): 'N/A'
    //Changing tab to fit the proper stock!
    document.title = this.props.symbol + " - $" + 
    price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    + "(" + (change < 0? change: "+" + change) + ")"
    var red = {
      //Red and green colors; depends on if stock is down or up.
      color: "red",
    };
    var green = {
      color: "green",
    };
    var grey = {
      color: "grey",
    };

    var style = change < 0 ? red : change == 0? grey: green;
    var aftrStyle = afterHoursChng< 0? red: afterHoursChng == 0? grey: green
    var prefix = change < 0 ? "" : change == 0? " ":"+";
    var aftrPrefix = afterHoursChng < 0? "": afterHoursChng == 0? " ": "+"
    var today = new Date();
    

    return (
      <div class="container info-container">
        <h3 className="h3">Quick Look</h3>
        <div class="row justify-content-md-center">
          <div class="col-lg-3 w">
            <table>
              <tbody>
                <tr>
                <td class="lcell">Open</td>
                  <td class="rcell">{open.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                <td class="lcell">Previous Close</td>
                  <td class="rcell">{prevClose.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                  <td class="lcell">Market Cap</td>
                  <td class="rcell">{mc}</td>
                </tr>
                <tr>
                  <td class="lcell">Volume</td>
                  <td class="rcell">
                    {volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr>
                  <td class="lcell">Book Value</td>
                  <td class="rcell">{bookVal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-lg-3 w">
            <div id="priceDiv">
              <span style={style} id="currentPrice">
                ${price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span id="priceChange">
                {prefix}
                {change}
                ({prefix}{percentChange}%)
              </span>
              {today.getDay() == 6 || today.getDay() == 0? <span id="market-label">Market is: <p id="closed">CLOSED</p></span>: this.withinMarketHours(today)? <span id="market-label">Market is: <p id="open">OPEN</p></span>
              : today.getHours() >= 16 && today.getHours() < 20?
              <div>
                <span id="afterHoursHead">After Hours</span>
                <span style={aftrStyle} id="afterHrsPrice">
                  ${afterHours? afterHours.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 'N/A'}
                </span>
                <span id="afterHrsChng">
                  {aftrPrefix}
                  {afterHoursChng}
                </span>
              </div>
              :
                <span id="market-label">Market is: <p id="closed">CLOSED</p></span>
              }
              
            </div>
          </div>
          <div class="col-lg-3 w">
            <table>
              <tbody>
                <tr>
                  <td class="lcell">EPS</td>
                  <td class="rcell">{eps}</td>
                </tr>
                <tr>
                  <td class="lcell">PE Ratio</td>
                  <td class="rcell">{peRatio}</td>
                </tr>
                <tr>
                  <td class="lcell">Beta</td>
                  <td class="rcell">{beta}</td>
                </tr>
                <tr>
                  <td class="lcell">Latest Dividend</td>
                  <td class="rcell">{divAmt}</td>
                </tr>
                <tr>
                  <td class="lcell">Ex Dividend Date</td>
                  <td class="rcell">{exDivDate}</td>
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
