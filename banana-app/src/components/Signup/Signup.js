import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import './Signup.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password_1: '',
      password_2: '',
      redirectToReferrer: false,
      formErrors: {
        username: "",
        email: "",
        password_1: "",
        password_2: ""
      }

    };

    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);

  }


  signup(e) {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
      --SUBMITTING--
      UserName: ${this.state.username}
      Email: ${this.state.email}
      Password: ${this.state.password_1}
      Confirm Password: ${this.state.password_2}
    `);
    }
    else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    if (this.state.username && this.state.email && this.state.password_1 && this.state.password_2) {
      PostData('signup', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.status) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }

      });
    }
  }

  onChange = e => {
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {

      case "username":
        formErrors.username =
          value.length < 3 ? "minimum 6 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password_1":
        formErrors.password_1 =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;

      case "password_2":
        formErrors.password_2 =
          value === this.state.password_1 ? "" : "passwords not matched";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }
    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column">
          <h2>Signup Page</h2>
          <div>
            <label>Username</label>
            <input className={formErrors.username.length > 0 ? "error" : null} type="text" name="username" placeholder="Username" onChange={this.onChange} />
            {formErrors.username.length > 0 && (
              <span className="errorMessage">{formErrors.username}</span>)}
          </div>
          <div>
            <label>Email</label>
            <input className={formErrors.email.length > 0 ? "error" : null} type="email" name="email" placeholder="Email" onChange={this.onChange} />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>)}
          </div>
          <div>
            <label>Password</label>
            <input  className={formErrors.password_1.length > 0 ? "error" : null} type="password" name="password_1" placeholder="Password" onChange={this.onChange} />
            {formErrors.password_1.length > 0 && (
              <span className="errorMessage">{formErrors.password_1}</span>)}
          </div>
          <div>
            <label>Confirm Password</label>
            <input className={formErrors.password_2.length > 0 ? "error" : null} type="password" name="password_2" placeholder="Password" onChange={this.onChange} />
            {formErrors.password_2.length > 0 && (
              <span className="errorMessage">{formErrors.password_2}</span>)}
          </div>
          <input type="submit" className="button success" value="Signup" name="reg_user" onClick={this.signup} />
          <a href="/login">LoginIn</a>
        </div>
      </div>
    );
  }
}

export default Signup;