import React, { Component } from "react";

export class ChartComponent extends Component {
  render() {
    return (
      <div>
        <hr className="break"></hr>
        <h3 className="h3">Quick Look</h3>
        <div class="row">
          <div class="col-sm left-col">
            <table class="">
              <tbody>
                <tr>
                  <td class="lcell">Market Cap</td>
                  <td class="rcell">Haha</td>
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
          <div class="col-sm">
            <table class="">
              <tbody>
                <tr>
                  <td class="lcell">Forward Dividend</td>
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
