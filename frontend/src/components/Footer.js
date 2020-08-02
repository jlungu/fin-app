import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter} from 'react-router-dom';

export class Footer extends Component{
    constructor(){
        super()
        this.state = {
            formattedStocks: [],
            stockColors: []
        }
    }

    componentDidMount(){
        let stocks = []
        let buffer = ""
        //Formating layout to display watchlist with.
        this.props.watchlists.watchlists[0].stocks.forEach(stock => {
            fetch('https://finnhub.io/api/v1/quote?symbol=' + stock + '&token=brain17rh5rbgnjpuck0')
                .then(res => res.json())
                .then(data => {
                    let change = (data.c - data.pc).toFixed(2)
                    buffer = stock + " | $" + data.c.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + (change > 0? "+" + change: change)
                    change > 0? stocks.push(buffer + ";watchlist_item_green"): stocks.push(buffer + ";watchlist_item_red")
                    this.setState({formattedStocks: stocks})
                })
        })  
    }

     /**
   * Takes input, navigates to that specific stocks page. Hides the selection menu
   */
  goToStock = (stonk) =>{
    stonk = stonk.substring(0, stonk.indexOf(" "))
    document.getElementById("nav-search").value = stonk
    document.getElementById("submit_button").click()
  }

    render(){
        console.log(this.state.formattedStocks)
        return(
            <div id="watchlist_bar">
                {this.state.formattedStocks.length == 0? <div id="no_watchlist">Favorited Stocks Will Appear Here</div>: null}
                {this.state.formattedStocks.map(stock => <div id={stock.substring(stock.indexOf(";")+1, stock.length)} onClick={this.goToStock.bind(this, stock)}>{stock.substring(0, stock.indexOf(";"))}</div>)}
            </div>  
        )
    }
}

Footer.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    watchlists: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth, 
    user: state.user,
    errors: state.errors,
    watchlists: state.watchlists
  });
  
  export default connect(mapStateToProps)(withRouter(Footer));