import React, { Component } from "react";
import { withRouter} from 'react-router-dom';

export class Navbar extends Component {
  //This function will actually navigate to that page.
  search = (e) => {

    const path = "/stock/" + document.getElementById("nav-search").value;
    this.props.history.push(path);
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark my-nav" >
          <a class="navbar-brand" href="#">
          <i class="fas fa-landmark"></i>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/home">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="https://github.com/jlungu/fin-app">
                  Source Code <span class="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0" onSubmit={this.search.bind(this)}>
              <input
                class="form-control mr-sm-2"
                type="search"
                id="nav-search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);
