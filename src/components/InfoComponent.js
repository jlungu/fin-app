import React, { Component } from "react";

export class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: -1,
      prevClose: -1,
      red: false, //Red means a decline from previous close, false red means its green i.e. an inc
    };
  }
  componentDidMount() {
    //Need to make API call to get current stock price.....
    fetch(
      "https://finnhub.io/api/v1/quote?symbol=" +
        this.props.symbol +
        "&token=br7h0r7rh5ran4akjjk0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          price: data.c,
          prevClose: data.pc,
        })
      );
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

  render() {
    const { price, prevClose } = this.state;
    const change = (price-prevClose).toFixed(2);
    var red = {//Red and green colors; depends on if stock is down or up.
        'color': 'red'
    }
    var green = {
        'color': 'green'
    }

    var style = (change < 0?red:green)

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
                  <td class="rcell">$1.25222T</td>
                </tr>
                <tr>
                  <td class="lcell">Volume</td>
                </tr>
                <tr>
                  <td class="lcell">PE Ratio</td>
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
              <span style={style} id="currentPrice">${price}</span>
              <span id="priceChange">{change}</span>
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
