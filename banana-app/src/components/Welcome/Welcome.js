import React, { Component } from 'react';
import '../../styles/custom.css';


import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      
        <div className="row justify-content-center align-items-center wel-row">
            <div className="col-md-5 text-center">
              <h3>Project Description</h3>
              <a href="/login" className="button warning">Login</a>
              <a href="/signup" className="button warning">Signup</a>
            </div>
          </div>
    );
  }
}

export default Welcome;
