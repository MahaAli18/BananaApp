import React, { Component } from 'react';  
import '../Home/Home.css';
import CategoryListing from '../categoryListing';
import Layout from '../layout'


class Categories extends Component {

 constructor(props){
   super(props);
   
 }
   
  
  render() {
    
    return (
    
      <React.Fragment>
        <Layout>
           <CategoryListing {...this.props} />
        </Layout>
      </React.Fragment>   

    );
  }
}
export default Categories;
 
