import React, { Component } from "react";
import StockHeader from "./StockHeader";
import ChartComponent from "./ChartComponent";
import InfoComponent from "./InfoComponent";
import CompanyComponent from "./CompanyComponent";
/**
 * Component holds all components contained in the 'stock overview' page, located at /stock/SYMBOL
 */
export class OverviewPageComponent extends Component {
    render(){ 
        var symbol = this.props.match.params.symbol.toUpperCase()
        return(
            <div>              
                <StockHeader symbol={symbol} />
                <InfoComponent symbol={symbol} />
                <ChartComponent symbol={symbol} /> 
                {symbol.includes("^")? null:<CompanyComponent symbol={symbol} />}
            </div>
        );
    }
}
export default OverviewPageComponent;