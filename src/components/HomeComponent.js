import React, { Component } from "react";
import SearchBarComponent from "./SearchBarComponent";

export class HomeComponent extends Component {
  //This function will actually navigate to that page.
  search = (e) => {
    e.preventDefault();
    const path = "/stock/" + document.getElementById("main-search").value;
    this.props.history.push(path);
  };

  componendDidMount() {
    //On 'enter' key clicked, and if the text box is in focus, enter should SUBMIT...
  }

  render() {
    return (
      <div class="home-div">
        <div class="input-group input-group-lg main-search">
          <form onSubmit={this.search}>
            <input
              id="main-search"
              type="text"
              class="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default HomeComponent;
