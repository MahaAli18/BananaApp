import React, { Component } from 'react';
import '../../styles/custom.css';
import { Redirect } from 'react-router-dom';
import './Header.css';
import { ToastContainer } from 'react-toastify';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    if (sessionStorage.getItem("userData")) {
      console.log("call user feed");
    }
    else {
      this.setState({ redirect: true });
    }
  }


  logout() {
    sessionStorage.setItem("userData", '');
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={'/login'}/>)
    }

    return (
        <div className="header">
        <ToastContainer/>
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-md-4">
               <div className="logo navbar-brand">React Project</div>
                </div>
                <div className="col-md-8 d-flex justify-content-end">
                  <nav id="links">
                    <ul>
                      <li><a href="">Home</a></li>
                      <li><a href="javascript:;" onClick={this.logout}>Logout</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
        </div>
        );
      }
    }
    
    export default Header;
