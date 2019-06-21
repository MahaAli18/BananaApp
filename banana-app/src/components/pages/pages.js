import React, { Component } from 'react';  
import '../Home/Home.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import PageListing from '../pagelisting';
import Layout from '../layout'


class Pages extends Component {

 constructor(props){
   super(props);
   
 }
   
  
  render() {
    
    return (
    
      <React.Fragment>
        <Layout>
           <PageListing />
        </Layout>
      </React.Fragment>   

    );
  }
}
export default Pages;
 
