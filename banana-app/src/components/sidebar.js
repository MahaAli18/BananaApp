import './sidebar.css'
import React, { Component } from 'react';
import axios from 'axios';
import ee from './emitter';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        ee.on('sidebar-refresh', this.refresh);
    }

    /// Read data///
    componentDidMount() {
         this.refresh()
    }

    refresh =  () => {
     axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/read.php')
        .then(res => {
            console.log("res", res.data.data);  
            console.log("state", this.state);
            this.setState({
                products: res.data.data
            })
            
        })
    }

    render() {
        const { products } = this.state;
        
        return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h4>Products</h4>
            </div>
              <ul className="unstyled-sidebar components align-items-center">
              <li>
                    <a href="/pages">Pages</a>
                </li>
            {
                products && products.length > 0 ? (
                products.map(product => {
                    return (
                            <React.Fragment key={product.id}>
                                <li>
                                    <a href={`/page/${product.page_name}`}>{product.title}</a>
                                </li>
                            </React.Fragment>
                        );
                })
            )  : ('')  
            }
               
                </ul>
        </nav>
           
    
            
        );
    }


}

export default Sidebar;

