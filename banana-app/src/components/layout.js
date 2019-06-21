import React, {Component} from 'react';
import Header from './Header/Header';
import Sidebar from './sidebar';

class Layout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
              <React.Fragment>
                 <Header />
                    <div id="wrapper" className="d-flex">
                      <Sidebar/>
                      <div className="mainBody">
                          {this.props.children}
                      </div>
                    </div>
             </React.Fragment>   

        );
    }
}

export default Layout;