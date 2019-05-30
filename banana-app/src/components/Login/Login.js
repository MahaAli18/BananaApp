import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../services/PostData';
import './Login.css';
import '../../styles/custom.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submit:true,
      redirectToReferrer: false,
      errorLogin: ''
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  login() {
    if (this.state.username && this.state.password) {
      PostData('login', this.state).then((result) => {
        let responseJson = result;
        let errMsg = responseJson.message;
        if (responseJson.status) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }
        else{
          this.setState({ errorLogin: errMsg });
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  render() {

    if (this.state.redirect)  {
      return (<Redirect to={'/home'} />)
    }
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'} />)
    }

    return (
      <div className="row justify-content-center login-row align-items-center">
        <div className="col-md-5">
          <h2 className="text-center">Login Page</h2>
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
          <input type="submit" className="button warning" value="Login" name="login_user" onClick={this.login} />
          <a className="button warning" href="/signup">Registration</a>
          <div className="errorLogin">{this.state.errorLogin}</div>
        </div>
      </div>
    );
  }
}

export default Login;