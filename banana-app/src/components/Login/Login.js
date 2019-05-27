import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../services/PostData';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  login() {
    if (this.state.username && this.state.password) {
      PostData('login', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }
        else{
          console.log("login error");
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
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
          <input type="submit" className="button success" value="Login" name="login_user" onClick={this.login} />
          <a href="/signup">Registration</a>
        </div>
      </div>
    );
  }
}

export default Login;


// yeh check kro ek sec 
// dekho issue is this, k tmhe API ka link proper nahi pata, jese server kaha chal raha hia konci port per hai ? 
// problem is this, k jab tak port number and route complete maloom nahi hoga, you can not request. client side tmhari sab perfect hai 
// sirf base url me issue hai 
//yar maine stack overflow pe dekha tha ipv4 bhi dala likin nhi chala acha ek min let me do the reseach  // mjhe server ka code dikhao pora ? php? han compelte 