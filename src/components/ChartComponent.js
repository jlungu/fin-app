import React, { Component } from "react";
import Plotly from 'plotly.js-dist'
import Spinner from 'react-bootstrap/Spinner'

export class ChartComponent extends Component {
  constructor(props) {
    super(props);
    /*So, we got to grab array of opens, highs , lows frmo API. Have separate ones, first up is for 
            the 1 Day chart. Only need 9-5*/

    this.state = {
      date: new Date(), //Reference, need TODAYs, or YESTARDAYS... etc.
      dayOpen: [],
      day: {},
      dayHigh: [],
      dayLow: [],
      dayClose: [],
      dayTime: [],
      data: {}
    };
  }

  componentDidMount() {
    /*Time for some API calls!*/
    //First, we got the 1 day one....relative to TODAYS date
    var day = this.state.date.getHours();
    const date = this.state.date;
    if (this.state.date.getHours() < 16) {
      //Do yesterdays. Done have real-time date yet teehee
      day -= 1;
    }
    const start =
      new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        9,
        30,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000;
    const end =
      new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        16,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000;
    //Now, well do an API call for ONE DAY.
    fetch(
      "https://finnhub.io/api/v1/stock/candle?symbol=" +
        this.props.symbol +
        "&resolution=5&from=" +
        start +
        "&to=" +
        end +
        "&token=br7h0r7rh5ran4akjjk0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          dayOpen: data.o,
          dayHigh: data.h,
          dayLow: data.l,
          dayClose: data.c,
          dayTime: data.t,
          date: data
        })
      );
      console.log(this.state.data)
      
  }

  getLinearPlot = () => {
      //Simple displays linear plot, according to the parameter passed (Day, week, etc...)

      var day = {
        type: "scatter",
        mode: "lines",
        name: this.props.symbol + ' High',
        x: this.state.dayTime.map(date => new Date(date * 1000)),
        y: this.state.dateHigh,
        line: {color: '#17BECF'}
      };

        var data = day;

        // var layout = {
        //   title: this.props.symbol + " Time Series",
        //   xaxis: {
        //     range: ["2016-07-01", "2016-12-31"],
        //     type: "date",
        //   },
        //   yaxis: {
        //     autorange: true,
        //     range: [86.8700008333, 138.870004167],
        //     type: "linear",
        //   },
        // };

        //Simple layout for now
        var layout = {
            title: this.props.symbol + ' Time Series',
          };
        
        Plotly.newPlot("timePlot", data, layout);
    }

  render() {
    return (
      <div>
        <div id="timePlot"></div>
        {!document.getElementById("timePlot")? <Spinner animation="border" /> : this.getLinearPlot()}
       
      </div>
    );
  }
}

export default ChartComponent;
