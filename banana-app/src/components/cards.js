import React, { Component } from 'react';
import axios from 'axios';
import './sidebar.css'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/read.php')
            .then(response => this.setState({product: response.data['data']}));
    }
    

    render() {
        console.log(this.state.product);
        return (
                <div className="col-md-4">
                <div className="card">
                    <img src="/images/1.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-warning">Delete</a>
                         </div>
                      </div>
                      </div>
                );
            }
        }
export default Card;