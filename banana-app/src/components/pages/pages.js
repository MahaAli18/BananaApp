import React , { Component } from 'react';
import '../Home/Home.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';

class Pages extends Component {
    render(){
        return(
            <React.Fragment>
                <Header />            
                <div id="wrapper" className="d-flex">
                    <Sidebar />
                    <div className="mainBody">
                        <div className="col-md-6 justify-content-end  d-flex">
                            <a href="#" className="btn btn-warning" >Add Page</a>
                        </div>
                   </div>
                </div>
            </React.Fragment>           
        );
    }
}

export default Pages;