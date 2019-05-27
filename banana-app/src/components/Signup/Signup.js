import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../services/PostData';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      redirectToReferrer: false
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  signup() {
    if (this.state.username && this.state.password) {
      PostData('signup', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }
        else {
          console.log("signup error");
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
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column">
          <h2>Login Page</h2>
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
          <label>Email</label>
          <input type="email" name="username" placeholder="Email" onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
          <label>Confirm Password</label>
          <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
          <input type="submit" className="button success" value="Signup" onClick={this.signup} />
          <a href="/login">LoginIn</a>
        </div>
      </div>
    );
  }
}

export default Signup;
