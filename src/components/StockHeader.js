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
        const {name, ticker, exchange} = this.state;
        return(
            <div class="stock-hdr-div">
                <span id="stock-header">{ticker} - {name}</span>
                <span id="stock-subheader">{exchange}</span>
            </div>
        );
    }
}

export default StockHeader;