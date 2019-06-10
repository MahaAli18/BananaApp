import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './sidebar.css'

class Card extends Component {
    constructor(props){
        super(props);
        this.state={
          
        } 
        
    }

    handleChange = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/delete.php', {id: this.props.id })
        .then(res => {
        
        })
   
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
                            <a href="#" className="btn btn-warning mr-3" onClick= {this.handleChange}>Delete</a>
                            <a href="#" className="btn btn-warning">Update</a>
                         </div>
                      </div>
                      </div>
                );
            }
        }
export default Card;