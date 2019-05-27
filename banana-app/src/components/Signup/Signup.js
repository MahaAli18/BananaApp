import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import './Signup.css';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password_1: '',
      password_2: '',
      redirectToReferrer: false
    };

    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);

  }


  signup() {
    if (this.state.username && this.state.password && this.state.email && this.state.name) {
      PostData('signup', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }

      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }
    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column">
          <h2>Login Page</h2>
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="password_1" placeholder="Password" onChange={this.onChange} />
          <label>Confirm Password</label>
          <input type="password" name="password_2" placeholder="Password" onChange={this.onChange} />
          <input type="submit" className="button success" value="Signup" name="reg_user" onClick={this.signup} />
          <a href="/login">LoginIn</a>
        </div>
      </div>
    );
  }
}

export default Signup;