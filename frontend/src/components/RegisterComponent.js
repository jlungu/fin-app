import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { addWatchlist } from "../actions/watchlistActions"

export class RegisterComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            
          this.setState({
            errors: nextProps.errors
          });
        }
        else {
            
        }
    }

    //Updating state according to inputs...
    updateName = e => {
        this.setState({name: e.target.value})
    }

    updateEmail = e => {
        this.setState({email: e.target.value})
    }

    updatePassword = e => {
        this.setState({password: e.target.value})
    }

    updatePassword2 = e => {
        this.setState({password2: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordAgain: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history);
        if (this.state.errors == null){
            const watchlist = {
                email: newUser.email,
                listname: "Favorites",
                stocks: []
            }
            this.props.addWatchlist(watchlist, true)
            this.props.history.push("/login")
        }
    }

    loginScreen = e => {
        e.preventDefault();
        this.props.history.push("/login")
    }

    render(){
        return(
            <div class="row" id="register-component">
               <div class="card" id="register-card">
                    <div class="card-body" id="register-card-body">
                       <h4>Register</h4> 
                       <hr id="break"/>
                       <div id="error_text">
                            {this.state.errors != null? <span id="register_failed"><i>Email already in use. Please log in with your email.</i></span>: null}
                       </div>
                       <form noValidate onSubmit={this.onSubmit}>
                       <div class="form-group">
                            <label id="name_label"for="name_input">Name</label>
                            <input type="text" onChange={this.updateName} class="form-control" id="name_input" aria-describedby="nameHelp" placeholder="Name"/>
                        </div>
                        <div class="form-group">
                            <label id="email_label"for="email_input">Email address</label>
                            <input type="email" onChange={this.updateEmail} class="form-control" id="email_input" aria-describedby="emailHelp" placeholder="Email Address"/>
                        </div>
                        <div class="form-group">
                            <label id="password_label" for="password_input">Password</label>
                            <input type="password" onChange={this.updatePassword} class="form-control" id="password_input" placeholder="Password" />
                        </div> 
                        <div class="form-group">
                            <label id="password_label" for="password_input">Confirm Password</label>
                            {this.state.password2 == this.state.password? null: this.state.password2 == ""? null: <span id="password_match"><i>Passwords must match!</i></span>}
                            <input type="password" onChange={this.updatePassword2} class="form-control" id="password_input" placeholder="Password" />
                        </div> 
                        <button type="submit" class="btn btn-primary">Create Account</button>
                        <button class="btn btn-outline-primary" id="switch-login" onClick={this.loginScreen}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
RegisterComponent.propTypes = {
  registerUser: PropTypes.func.isRequired,
  addWatchlist: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, addWatchlist }
)(withRouter(RegisterComponent));