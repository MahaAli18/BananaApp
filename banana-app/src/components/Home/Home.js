import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';  
import './Home.css';


class Home extends Component {
  constructor(props){
      super(props);
      this.state={
        redirect:false
      }
      this.logout=this.logout.bind(this); 
  }
  componentWillMount(){
    if(sessionStorage.getItem("userData")){
      console.log("call user feed");
    }
    else{
      this.setState({redirect:true});
    }
  }


  logout(){
    sessionStorage.setItem("userData", '');
    sessionStorage.clear();
    this.setState({redirect:true});
  }
  
  render() {
   
    if(this.state.redirect){
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div className="row" id="Body">
        <div className="medium-12 columns">
    
          <button type="button" className="button" onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  }
}
export default Home;