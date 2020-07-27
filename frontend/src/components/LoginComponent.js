import React, { Component } from "react";

export class LoginComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: ''
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

    login = () => {
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(user)
    }

    render(){
        return(
            <div class="row" id="login-component">
               <div class="card" id="login-card">
                    <div class="card-body" id="login-card-body">
                       <h4>Login</h4> 
                       <hr id="break"/>
                       <form >
                        <div class="form-group">
                            <label id="email_label"for="email_input">Email address</label>
                            <input type="email" onChange={this.onUsernameChange} class="form-control" id="email_input" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div class="form-group">
                            <label id="password_label" for="password_input">Password</label>
                            <input type="password" onChange={this.onPasswordChange} class="form-control" id="password_input" placeholder="Password" />
                        </div> 
                        </form>
                        <button onClick={this.login} class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginComponent;