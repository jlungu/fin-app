import React, { Component } from "react";

export class StockHeader extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: '',
            exchange: '',
            ticker: ''
        }
    }

    componentDidMount(){
        //API Call to grab name, exchange stock is on, and ticker symbol!
        fetch('https://finnhub.io/api/v1/stock/profile2?symbol=' + this.props.symbol +'&token=brain17rh5rbgnjpuck0')
        .then(res => res.json())
        .then(data => {this.setState({
            name: data.name,
            ticker: data.ticker,
            exchange: data.exchange
        })      
        })
    }

    render(){
        var {name, ticker, exchange} = this.state;
        if (this.props.symbol == "^DJI"){
            //DOW JONES isnt directly supported by finnhub. Manually inputting info
            ticker = "^DJI"
            name = "Dow Jones Industrial Average"
            exchange = "DJI - DJI REAL TIME PRICE."
        }
        if (this.props.symbol == "^GSPC"){
            //DOW JONES isnt directly supported by finnhub. Manually inputting info
            ticker = "^GSPC"
            name = "S&P 500 - Standard and Poor's 500"
            exchange = "SNP - SNP REAL TIME PRICE."
        }
        if (this.props.symbol == "^IXIC"){
            //DOW JONES isnt directly supported by finnhub. Manually inputting info
            ticker = "^IXIC"
            name = "NASDAQ Composite"
            exchange = "NASDAQ GIDS - NASDAQ GIDS REAL TIME PRICE. "
        }
        if (this.props.symbol == "^RUT"){
            //DOW JONES isnt directly supported by finnhub. Manually inputting info
            ticker = "^RUT"
            name = "Russell 2000"
            exchange = "CHICAGO OPTIONS - CHICAGO OPTIONS DELAYED PRICE."
        }
        return(
            <div class="stock-hdr-div">
                <span id="stock-header">{ticker} - {name}</span>
                <span id="stock-subheader">{exchange}</span>
            </div>
        );
    }
}

export default StockHeader;