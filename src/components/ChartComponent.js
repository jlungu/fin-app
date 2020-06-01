import React, { Component } from "react";
import Plotly from "plotly.js-dist";
import Spinner from "react-bootstrap/Spinner";

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
      data: {},
      fiveOpen: [], //Five day chart data...
      fiveHigh: [],
      fiveLow: [],
      fiveClose: [],
      fiveTime: [],
      monOpen: [], //One month chart data...
      monHigh: [],
      monLow: [],
      monClose: [],
      monTime: [],
      ytdOpen: [], //Year to date chart data...
      ytdHigh: [],
      ytdLow: [],
      ytdClose: [],
      ytdTime: [],
      ytdOpen: [], //Year chart data...
      yrHigh: [],
      yrLow: [],
      yrClose: [],
      yrTime: [],
      linearPlot: true,
    };
  }

  componentDidMount() {
    /*Time for some API calls!*/
    //First, we got the 1 day one....relative to TODAYS date
    var day = this.state.date.getDate();
    const date = this.state.date;
    var start =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        9,
        30,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
    var end =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
      
      console.log(start, end)
    //Now, well do an API call for ONE DAY.
    fetch(
      "https://finnhub.io/api/v1/stock/candle?symbol=" +
        this.props.symbol +
        "&resolution=5&from=" +
        start +
        "&to=" +
        end +
        "&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          dayOpen: data.o,
          dayHigh: data.h,
          dayLow: data.l,
          dayClose: data.c,
          dayTime: data.t,
          date: data,
        })
      );
      //Now, we need data for 5 DAYS. Past 5 days, eventually well exclude weekends...
      start =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day-5,
        9,
        30,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
      end =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        16,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
    fetch(
      "https://finnhub.io/api/v1/stock/candle?symbol=" +
        this.props.symbol +
        "&resolution=30&from=" +
        start +
        "&to=" +
        end +
        "&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          fiveOpen: data.o,
          fiveHigh: data.h,
          fiveLow: data.l,
          fiveClose: data.c,
          fiveTime: data.t,
        })
      );

      //Now, we need data for ONE MONTH. Past month, eventually well exclude weekends...
      start =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth()-1,
        day,
        9,
        30,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
      end =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        16,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
    fetch(
      "https://finnhub.io/api/v1/stock/candle?symbol=" +
        this.props.symbol +
        "&resolution=60&from=" +
        start +
        "&to=" +
        end +
        "&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          monOpen: data.o,
          monHigh: data.h,
          monLow: data.l,
          monClose: data.c,
          monTime: data.t,
        })
      );
      //Now, we need data for YEAR TO DATE. Past yr, eventually well exclude weekends...
      start =
      Math.trunc(new Date(
        date.getFullYear(),
       0,
        1,
        9,
        30,
        0,
        0
      ).getTime() / 1000);
      end =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        16,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);

    fetch(
      "https://finnhub.io/api/v1/stock/candle?symbol=" +
        this.props.symbol +
        "&resolution=D&from=" +
        start +
        "&to=" +
        end +
        "&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          ytdOpen: data.o,
          ytdHigh: data.h,
          ytdLow: data.l,
          ytdClose: data.c,
          ytdTime: data.t,
        })
      );

      //Now, we need data for 1 YEAR. Past yr, eventually well exclude weekends...
      start =
      Math.trunc(new Date(
        date.getFullYear()-1,
        date.getMonth(),
        day,
        16,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
      end =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        16,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);

      fetch(
        "https://finnhub.io/api/v1/stock/candle?symbol=" +
          this.props.symbol +
          "&resolution=D&from=" +
          start +
          "&to=" +
          end +
          "&token=brain17rh5rbgnjpuck0"
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            yrOpen: data.o,
            yrHigh: data.h,
            yrLow: data.l,
            yrClose: data.c,
            yrTime: data.t,
          })
        );
        
  }

  getLinearPlot = () => {
    //Simple displays linear plot, according to the parameter passed (Day, week, etc...)

    const { dayTime, dayHigh, fiveTime, fiveHigh, monTime, monHigh, ytdTime, ytdHigh, yrHigh, yrTime } = this.state;
    var data = [
      {
        type: "scatter",
        mode: "lines",
        name: "AAPL High",
        x: dayTime  ? dayTime.map((t) => new Date(t * 1000)): [],
        y: dayHigh ? dayHigh: [],
        line: { color: "#7B68EE" },
      },
      {
        type: "scatter",
        mode: "lines",
        name: "AAPL High",
        x: fiveTime ? fiveTime.map((t) => new Date(t * 1000)): [],
        y: fiveHigh? fiveHigh: [],
        line: { color: "#7B68EE" },
      },
      {
        type: "scatter",
        mode: "lines",
        name: "AAPL High",
        x: monTime ? monTime.map((t) => new Date(t * 1000)): [],
        y: monHigh? monHigh: [],
        line: { color: "#7B68EE" },
      },
      {
        type: "scatter",
        mode: "lines",
        name: "AAPL High",
        x: ytdTime ? ytdTime.map((t) => new Date(t * 1000)): [],
        y: ytdHigh? ytdHigh: [],
        line: { color: "#7B68EE" },
      },
      {
        type: "scatter",
        mode: "lines",
        name: "AAPL High",
        x: yrTime ? yrTime.map((t) => new Date(t * 1000)): [],
        y: yrHigh? yrHigh: [],
        line: { color: "#7B68EE" },
      },
    ];

    var updatemenus=[
      {
          buttons: [
              {
                  args: [{'visible': [true, false, false, false, false]}],
                  label: '1D',
                  method: 'update'
              },
              {
                  args: [{'visible': [false, true, false, false, false]}
                         ],
                  label: '5D',
                  method: 'update'
              },
              {
                args: [{'visible': [false, false, true, false, false]}
                       ],
                label: '1M',
                method: 'update'
            },
            {
              args: [{'visible': [false, false, false, true, false]}
                     ],
              label: 'YTD',
              method: 'update'
          },
          {
            args: [{'visible': [false, false, false, false, true]}
                   ],
            label: '1Y',
            method: 'update'
        },
          ],
          direction: 'left',
          showactive: true,
          type: 'buttons',
          x: 0.0,
          xanchor: 'left',
          y: 1.1,
          yanchor: 'top'
      },
  
  ]

    var layout = {
      title: "Apple - AAPL",
      updatemenus: updatemenus,
      width: 900,
      height: 500,
    };

    Plotly.newPlot("timePlot", this.state.linearPlot? data: null, layout);
  };

  render() {
    return (
      <div className="graph">
        <div id="timePlot">
          
        </div>
        {!document.getElementById("timePlot") ? (
          <Spinner />
        ) : (
          this.getLinearPlot()
        )}
        
      </div>
    );
  }
}

export default ChartComponent;
