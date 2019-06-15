import React, { Component } from 'react';  
import './Home.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import CardListing from '../cardlisting';
import { ToastContainer } from 'react-toastify';


class Home extends Component {

 constructor(props){
   super(props);
   
 }
   
  
  render() {
    
    return (
    
      <React.Fragment>
        <Header />
        <ToastContainer/>
        <div id="wrapper" className="d-flex">
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
 
