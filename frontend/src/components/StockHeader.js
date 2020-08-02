import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateWatchlist } from "../actions/watchlistActions";

export class StockHeader extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: '',
            exchange: '',
            ticker: '',
            onWatchlist: false,
            added: false,
            deleted: false
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
        //Checking if this stock is on our watchlist...only if user is logged in.
        if (this.props.auth.isAuthenticated){

        }
    }
    /**
     * Triggered when user clicks on favorite button. When user does, it adds or deletes the stock from their favorites watchlist.
     */
    toggleFavorite = () =>{
        let favorites = this.props.watchlists.watchlists[0]
        if (favorites.stocks.includes(this.state.ticker)){
            //Delete from watchlist.
            let wl = favorites
            wl.stocks = wl.stocks.filter(w => w != this.state.ticker)
            this.props.updateWatchlist(wl._id, wl, this.props.watchlists)
            this.setState({deleted: true})//ANIMATION! Shows alert, saying you removed it from watchlist. Then dissapears!
            setTimeout(() => {this.setState({deleted: false})}, 3000)
        }
        else {
            //Add to watchlist
            let wl = favorites
            wl.stocks.push(this.state.ticker)
            this.props.updateWatchlist(wl._id, wl, this.props.watchlists)
            this.setState({added: true})
            setTimeout(() => {this.setState({added: false})}, 3000)
        }
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
        let favorites = this.props.watchlists.watchlists[0]
        return(
            <div class="stock-hdr-div">
                <div id="stock_header_name">
                <span id="stock-header">{ticker} - {name}</span>
                {favorites != undefined? favorites.stocks.includes(this.state.ticker)?
                    <i id="favorite_button_filled" onClick={this.toggleFavorite} class="fas fa-star"></i>
                    : <i id="favorite_button" onClick={this.toggleFavorite} class="far fa-star"></i>
                :null}
                {/* {this.props.watchlists.watchlists.length > 0? this.props.watchlists.watchlists[0].includes(this.state.name)? <i id="favorite_button_filled" onClick={this.toggleFavorite} class="fas fa-star"></i>
                : <i id="favorite_button" onClick={this.toggleFavorite} class="far fa-star"></i>: null} */}
                </div>
                <span id="stock-subheader">{exchange}</span>
                <div id="watchlist_alert" class="alert alert-success  fade show" role="alert" hidden={!this.state.added}>
                    <strong>{this.state.ticker}</strong> added to favorites
                </div>
                <div id="watchlist_alert" class="alert alert-danger  fade show" role="alert" hidden={!this.state.deleted}>
                    <strong>{this.state.ticker}</strong> removed from favorites
                </div>
            </div>
        );
    }
}

StockHeader.propTypes = {
    updateWatchlist: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    watchlists: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth, 
    user: state.user,
    watchlists: state.watchlists, 
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { updateWatchlist })(StockHeader);