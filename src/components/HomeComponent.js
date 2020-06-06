import React, { Component } from "react";

export class HomeComponent extends Component {
  render() {
    return (
      <div class="home-div">
        <div class="input-group input-group-lg main-search">
          <input
            type="text"
            class="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Submit</button>
            </div>
        </div>
      </div>
    );
  }
}
export default HomeComponent;
