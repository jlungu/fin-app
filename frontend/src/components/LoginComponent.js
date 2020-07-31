import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { getWatchlists } from "../actions/watchlistActions"

export class LoginComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            errors: null
        }
    }

    componentDidMount() {
        //Redirects user if theyre already logged in.
        if (this.props.auth.isAuthenticated) {
          this.props.getWatchlists(this.props.auth.user.email)
          this.props.history.push("/home");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            window.location.reload(false)
        }
        else if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.username,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    registerScreen = e => {
        e.preventDefault();

        this.props.history.push("/register")
    }

    render(){
        return(
            <div class="row" id="login-component">
               <div class="card" id="login-card">
                    <div class="card-body" id="login-card-body">
                       <h4>Login</h4> 
                       <hr id="break"/>
                       <div id="error_text">
                       {this.state.errors != null? <span id="login_failed"><i>Login Failed. Either email or password is incorrect.</i></span>: null}
                       </div>
                       <form noValidate onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label id="email_label"for="email_input">Email address</label>
                            <input type="email" onChange={this.onUsernameChange} class="form-control" id="email_input" aria-describedby="emailHelp" placeholder="Email Address"/>
                        </div>
                        <div class="form-group">
                            <label id="password_label" for="password_input">Password</label>
                            <input type="password" onChange={this.onPasswordChange} class="form-control" id="password_input" placeholder="Password" />
                        </div> 
                        <button type="submit" class="btn btn-primary">Log In</button>
                        <button class="btn btn-outline-primary" id="switch-login" onClick={this.registerScreen}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

LoginComponent.propTypes = {
    loginUser: PropTypes.func.isRequired,
    getWatchlists: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth, 
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser, getWatchlists })(LoginComponent);