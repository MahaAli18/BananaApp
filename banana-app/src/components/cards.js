import React, { Component } from 'react';
import './sidebar.css'

class Card extends Component {
    constructor(props){
        super(props);
        
    }
    
    render() {
         return (
                <div className="col-md-4" key={this.props.id}>
                <div className="card">
                    <img src="/images/1.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{this.props.title}</h5>
                            <p className="card-text">{this.props.body}</p>
                            <p className="card-text">{this.props.price}</p>
                            <a href="#" className="btn btn-warning">Delete</a>
                         </div>
                      </div>
                      </div>
                );
            }
        }
export default Card;