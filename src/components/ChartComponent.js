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
      plot: true,
      linearPlot: true
    };
  }

  componentDidMount() {
    /*Time for some API calls!*/
    //First, we got the 1 day one....relative to TODAYS date
    //If its a WWEEKEND, we need to get the last market days info...
    var day = this.state.date.getDate();
    const date = this.state.date;
    console.log(date.getDay())
    if (date.getDay() == 6){//Its SATURDAY. Get FRIDAYS...
         day -=1;
    }
    else if (date.getDay() == 0){//Its SUNDAY. Get FRIDAYS...
      day -=2;
    }
    
    var start =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        9,
        30,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
    var end =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
        16,
        0,
        date.getSeconds(),
        date.getMilliseconds()
      ).getTime() / 1000);
      
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

      //Now, we need data for 5 DAYS. Past 5 days, EXCLUDING WEEKENDS.
      var startDay = day-5;
      start =
      Math.trunc(new Date(
        date.getFullYear(),
        date.getMonth(),
        day-7,
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
      .then((data) => {
        var date = null;
        var open = []
        var high = []
        var low = []
        var close = []
        var time = []
          //Here, we just filter the API call results to the normal market hours, 9:30AM - 4PM
        for (let i = 0; i < data.o.length; i++){
          date = new Date(data.t[i] * 1000)
          if (date.getHours() >= 9 && date.getHours() <= 16){
            if (date.getHours() == 9){
              if (date.getMinutes() >= 30){
                open.push(data.o[i])
                high.push(data.h[i])
                low.push(data.l[i])
                close.push(data.c[i])
                time.push(data.t[i])
              }
            }
            else if (date.getHours() == 16){
              if (date.getMinutes() < 30){
                open.push(data.o[i])
                high.push(data.h[i])
                low.push(data.l[i])
                close.push(data.c[i])
                time.push(data.t[i])
              }
            }
            else{
              open.push(data.o[i])
              high.push(data.h[i])
              low.push(data.l[i])
              close.push(data.c[i])
              time.push(data.t[i])
            }
            
          }
        }
          this.setState({
            fiveOpen: open,
            fiveHigh: high,
            fiveLow: low,
            fiveClose: close,
            fiveTime: time,
          })
        }
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
      .then((data) =>{
        var date = null;
        var open = []
        var high = []
        var low = []
        var close = []
        var time = []
        //Here, we just filter the API call results to the normal market hours, 9:30AM - 4PM
        for (let i = 0; i < data.o.length; i++){
          date = new Date(data.t[i] * 1000)
          if (date.getHours() >= 9 && date.getHours() <= 16){
              open.push(data.o[i])
              high.push(data.h[i])
              low.push(data.l[i])
              close.push(data.c[i])
              time.push(data.t[i])
            
          }
        }
        this.setState({
          monOpen: open,
          monHigh: high,
          monLow: low,
          monClose: close,
          monTime: time,
        })
      }
        
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

    //Linear data
    const { dayTime, dayHigh, fiveTime, fiveHigh, monTime, monHigh, ytdTime, ytdHigh, yrHigh, yrTime } = this.state;
    //CandlestickData
    const {dayClose, dayLow, dayOpen, fiveClose, fiveLow, fiveOpen, monClose, monLow, monOpen, ytdClose,
       ytdLow, ytdOpen, yrClose, yrLow, yrOpen} = this.state;
    var dayColor = dayHigh? (dayHigh[0] <= dayHigh[dayHigh.length -1] ? 'green': 'red'): 'black'
    var fiveColor = fiveHigh? (fiveHigh[0] <= fiveHigh[fiveHigh.length -1] ? 'green': 'red'): 'black'
    var monColor = monHigh? (monHigh[0] <= monHigh[monHigh.length -1] ? 'green': 'red'): 'black'
    var ytdColor = ytdHigh? (ytdHigh[0] <= ytdHigh[ytdHigh.length -1] ? 'green': 'red'): 'black'
    var yrColor = yrHigh ? (yrHigh[0] <= yrHigh[yrHigh.length -1] ? 'green': 'red'): 'black'

    var linearData = [
      {
        type: "scatter",
        mode: "lines",
        name:  this.props.symbol + "High",
        x: dayTime  ? dayTime.map((t) => new Date(t * 1000).toLocaleTimeString()): [],
        y: dayHigh ? dayHigh: [],
        line: { color: dayColor},
        visible: true,
      },
      {
        type: "scatter",
        mode: "lines",
        name: this.props.symbol +" High",
        x: fiveTime ? fiveTime.map((t) => this.formatDateTime(new Date(t * 1000))): [],
        y: fiveHigh? fiveHigh: [],
        connectgaps: true,
        line: { color: fiveColor },
        visible: false,
      },
      {
        type: "scatter",
        mode: "lines",
        name: this.props.symbol +" High",
        x: monTime ? monTime.map((t) => this.formatDateTime(new Date(t * 1000))): [],
        y: monHigh? monHigh: [],
        line: { color: monColor },
        visible: false,
        connectgaps: true
      },
      {
        type: "scatter",
        mode: "lines",
        name: this.props.symbol +" High",
        x: ytdTime ? ytdTime.map((t) => this.formatDate(new Date(t * 1000))): [],
        y: ytdHigh? ytdHigh: [],
        line: { color: ytdColor },
        visible: false,
        connectgaps: true
      },
      {
        type: "scatter",
        mode: "lines",
        name: this.props.symbol +" High",
        x: yrTime ? yrTime.map((t) => this.formatDate(new Date(t * 1000))): [],
        y: yrHigh? yrHigh: [],
        line: { color: yrColor },
        visible: false,
      },
    ];

    var candlestickData = [
      {
        x: dayTime  ? dayTime.map((t) => new Date(t * 1000).toLocaleTimeString()): [],
        close: dayClose ? dayClose: [],
        high: dayHigh ? dayHigh: [],
        low: dayLow ? dayLow: [],
        open: dayOpen ? dayOpen: [],
        visible: true,
        name: "",
      
        // cutomise colors
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick', 
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: fiveTime  ? fiveTime.map((t) => this.formatDateTime(new Date(t * 1000))): [],
        close: fiveClose ? fiveClose: [],
        high: fiveHigh ? fiveHigh: [],
        low: fiveLow ? fiveLow: [],
        open: fiveOpen ? fiveOpen: [],
        visible: false,
        name: "",
      
        // cutomise colors
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick', 
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: monTime  ? monTime.map((t) => this.formatDateTime(new Date(t * 1000))): [],
        close: monClose ? monClose: [],
        high: monHigh ? monHigh: [],
        low: monLow ? monLow: [],
        open: monOpen ? monOpen: [],
        visible: false,
        name: "",
      
        // cutomise colors
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick', 
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: ytdTime  ? ytdTime.map((t) => this.formatDate(new Date(t * 1000))): [],
        close: ytdClose ? ytdClose: [],
        high: ytdHigh ? ytdHigh: [],
        low: ytdLow ? ytdLow: [],
        open: ytdOpen ? ytdOpen: [],
        visible: false,
        name: "",
      
        // cutomise colors
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick', 
        xaxis: 'x',
        yaxis: 'y'
      },
      {
        x: yrTime  ? yrTime.map((t) => this.formatDate(new Date(t * 1000))): [],
        close: yrClose ? yrClose: [],
        high: yrHigh ? yrHigh: [],
        low: yrLow ? yrLow: [],
        open: yrOpen ? yrOpen: [],
        visible: false,
        name: "",
      
        // cutomise colors
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick', 
        xaxis: 'x',
        yaxis: 'y'
      },
    ]


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
      updatemenus: updatemenus,
      xaxis: {
        rangeslider: {
         visible: true
       },
       showticklabels: false,
       type: 'category',
       showgrid: false
      },
      width: 900,
      height: 500,
    };

    Plotly.newPlot("timePlot", this.state.plot? this.state.linearPlot? linearData: candlestickData: null, layout);
  };

  formatDateTime(date){//Formats date for plot.
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substring(2, 4) + " " + date.toLocaleTimeString()
  }

  formatDate(date){
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()] +" "+ date.getDate() + ", " + date.getFullYear()
  }

  swapPlotType = (type) => {
    if (type == "line")
      this.setState({
        linearPlot: true
      })
    else if (type == "candle"){
      this.setState({
        linearPlot: false
      })
    }
  }

  render() {
    return (
      <div className="graph">
        <div id="chart-buttons">
          <button type="button" id="swap-data-but" onClick={this.swapPlotType.bind(this, "line")}class="btn btn-light btn-sm"><span class="material-icons">show_chart</span></button>
          <button type="button" id="swap-data-but" onClick={this.swapPlotType.bind(this, "candle")}class="btn btn-light btn-sm"><span class="material-icons">bar_chart</span></button>
        </div>
        
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
