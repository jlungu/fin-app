import React, { Component } from "react";

export class CompanyComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            recentFilings: [],//Holds companies recent SEC filings
            roa: -1,
            roe: -1,
            roi: -1,
            pm: -1,
            om: -1,
            relSP: -1,
            yrHi: -1,
            yrLo: -1,
            rev: -1,
            revGrowth: -1,
            cashFlo: -1,
            dToE: -1
        }
    }

    componentDidMount(){
        //FIRST API call for sec filings.
        fetch('https://finnhub.io/api/v1/stock/filings?symbol=' + this.props.symbol + '&token=brain17rh5rbgnjpuck0')
        .then(res => res.json())
        .then(data => {
            let filings = []
            for ( let i = 0; i < data.length; i++){
                if (filings.length == 3){
                    if (data[i].form != "10-K")//We want to make sure we have at least one 10-K. Make sure last one is at least.
                        continue;
                }
                if (data[i].form == "10-K" || data[i].form == "10-Q")
                    filings.push(data[i])
                if (filings.length == 4)
                    break;
            }
            this.setState({recentFilings: filings})//Setting state.
        })

        //SECOND API call for financials.
        fetch('https://finnhub.io/api/v1/stock/metric?symbol=' + this.props.symbol + '&metric=all&token=brain17rh5rbgnjpuck0')
        .then(res => res.json())
        .then(data => {
            this.setState({
                roa: data.metric.roaa5Y? data.metric.roaa5Y.toFixed(2)+"%": 'N/A',
                roe: data.metric.roaeTTM,
                roi: data.metric.roiTTM,
                pm: data.metric.netProfitMarginTTM,
                om: data.metric.operatingMarginTTM,
                relSP: data.metric['priceRelativeToS&P500Ytd'],
                yrHi: data.metric['52WeekHigh'],
                yrLo: data.metric['52WeekLow'],
                rev: data.metric.revenueTTM,
                revGrowth: data.metric.revenueGrowthTTMYoy,
                cashFlo: data.metric.freeCashFlowTTM,
                dToE: data.metric['totalDebt/totalEquityAnnual']
            })
        })
    }


    render(){
        const {recentFilings, roa, roe, roi, 
            pm, om, relSP, yrHi, yrLo, rev, revGrowth, cashFlo, dToE} = this.state
        return(
            <div class="container company-container">
                <h3>Company Info</h3>
                <div class="row justify-content-md-center">
                    <div class="col-lg-3 w">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="lcell">Return on Assets</td>
                                    <td class="rcell">{roa? roa: 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Return On Equity</td>
                                    <td class="rcell">{roe? roe.toFixed(2)+'%': 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Return on Invest.</td>
                                    <td class="rcell">{roi? roi.toFixed(2)+"%": 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Profit Margin</td>
                                    <td class="rcell">{pm? pm.toFixed(2): 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Operating Margin</td>
                                    <td class="rcell">{om? om.toFixed(2): 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Relative to S&P</td>
                                    <td class="rcell">{relSP? relSP.toFixed(2): 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {recentFilings.length == 0? 
                        <div class="col-lg-3 w sec_column">
                            <div id="no_sec"><i>No SEC Filings Found.</i></div>
                        </div>
                    
                    : 
                       <div class="col-lg-3 w sec_column">
                       <a href={recentFilings[0]? recentFilings[0].reportUrl: null} id="sec_links">
                           <div class="card sec_card">
                               <div class="card-body sec_card_body">
                                   <div class="sec_left">
                                       <span class="sec_card_body_txt">Form {recentFilings[0]? recentFilings[0].form.replace('-', ''): null}</span>
                                       <span class="sec_card_body_txt_sec">{recentFilings[0]? recentFilings[0].filedDate.substring(0, recentFilings[0].filedDate.indexOf(' ')): null}</span>
                                   </div>
                                   <div class="sec_right">
                                       <div id="sec_logo">{recentFilings[0]? recentFilings[0].form.replace('-', ''): null}</div>
                                   </div>
                               </div>
                           </div>
                       </a>
                       <a href={recentFilings[1]? recentFilings[1].reportUrl: null} id="sec_links">
                           <div class="card sec_card">
                               <div class="card-body sec_card_body">
                                   <div class="sec_left">
                                       <span class="sec_card_body_txt">Form {recentFilings[1]? recentFilings[1].form.replace('-', ''): null}</span>
                                       <span class="sec_card_body_txt_sec">{recentFilings[1]? recentFilings[1].filedDate.substring(0, recentFilings[1].filedDate.indexOf(' ')): null}</span>
                                   </div>
                                   <div class="sec_right">
                                       <div id="sec_logo">{recentFilings[1]? recentFilings[1].form.replace('-', ''): null}</div>
                                   </div>
                               </div>
                           </div>
                       </a>
                       <a href={recentFilings[2]? recentFilings[2].reportUrl: null} id="sec_links">
                           <div class="card sec_card">
                               <div class="card-body sec_card_body">
                                   <div class="sec_left">
                                       <span class="sec_card_body_txt">Form {recentFilings[2]? recentFilings[2].form.replace('-', ''): null}</span>
                                       <span class="sec_card_body_txt_sec">{recentFilings[2]? recentFilings[2].filedDate.substring(0, recentFilings[2].filedDate.indexOf(' ')): null}</span>
                                   </div>
                                   <div class="sec_right">
                                       <div id="sec_logo">{recentFilings[2]? recentFilings[2].form.replace('-', ''): null}</div>
                                   </div>
                               </div>
                           </div>
                       </a>    
                   </div> 
                    }
                    
                    <div class="col-lg-3 w">
                        <table>
                            <tbody>
                                 <tr>
                                    <td class="lcell">52 Wk High</td>
                                    <td class="rcell">{yrHi? yrHi.toFixed(2): 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">52 Wk Low</td>
                                    <td class="rcell">{yrLo? yrLo.toFixed(2): 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Revenue(TTM)</td>
                                    <td class="rcell">{rev? rev.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'M': 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Rev. Growth</td>
                                    <td class="rcell">{revGrowth? revGrowth.toFixed(2) + "%": 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Cash Flow(TTM)</td>
                                    <td class="rcell">{cashFlo? cashFlo.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'M': 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td class="lcell">Debt / Equity</td>
                                    <td class="rcell">{dToE? dToE.toFixed(2): 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default CompanyComponent;