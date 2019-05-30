import React, { Component } from 'react';  
import './Home.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import CardListing from '../cardlisting';


class Home extends Component {
  constructor(props){
      super(props);
      
     
  }
  
  
  render() {
    return (
      <React.Fragment>
        <Header />
        <div id="wrapper" class="d-flex">
          <Sidebar/>
          <div className="mainBody">
            <CardListing/>
          </div>
        </div>
      </React.Fragment>   

    );
  }
}
export default Home;
 
