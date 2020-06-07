import React, { Component } from "react";
import SearchBarComponent from "./SearchBarComponent";

export class HomeComponent extends Component {
    //This function will actually navigate to that page.
    search = (e) =>{
        const path = "/stock/" + document.getElementById('main-search').value
        this.props.history.push(path)
    }

  render() {
    return (
      <div class="home-div">
        <div class="input-group input-group-lg main-search">
          <input
          id="main-search"
            type="text"
            class="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onClick={this.search}>Submit</button>
            </div>
        </div>
      </div>
    );
  }
}
export default HomeComponent;
