import React , { Component } from 'react';
import '../Home/Home.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import BasicTable from './table';


class Pages extends Component {
    render(){
        return(
            <React.Fragment>
                <Header />            
                <div id="wrapper" className="d-flex">
                    <Sidebar />
                    <div className="mainBody">
                        <div className="container-fluid">
                                <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h2 className="prod">Pages</h2>
                                </div>
                                <div className="col-md-6 justify-content-end d-flex">
                                    <a href="/addpage" className="btn btn-warning" >Add Page</a>
                                </div>
                            </div>
                        </div>
                        <BasicTable />
                    </div>
                </div>
            </React.Fragment>           
        );
    }
}

export default Pages;