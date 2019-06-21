import './sidebar.css'
import React, { Component } from 'react';
import axios from 'axios';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

     /// Read data///
     componentDidMount() {
        axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/read.php')
            .then(res => {  
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
            {
                products && products.length > 0 ? (
                products.map(product => {
                    return (
                            <React.Fragment key={product.id}>
                                <li>
                                    <a href="javascript:;">{product.title}</a>
                                </li>
                            </React.Fragment>
                        );
                })
            )  : ('')  
            }
                <li>
                    <a href="/pages">Pages</a>
                </li>
                </ul>
        </nav>
           
    
            
        );
    }


}

export default Sidebar;

