import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import axios from 'axios';


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            price: '',
            images: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        
        var data = {
            title: this.state.title,
            body: this.state.body,
            price: this.state.price,
            images:formData.append('avatar',this.state.images)
        }
       

        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/create.php`, data, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }})
            .then((res) => {
                console.log(res.data)
            });

    }

    handleChange = e => {
        const { name, value } = e.target;    
        this.setState({ [name]: value }, () => console.log(this.state));
    };
    handleUpload = e => { 
        this.setState({images:e.target.files[0]});
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div id="wrapper" className="d-flex">
                    <Sidebar />
                    <div className="mainBody">
                        <div id="addproduct">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <form className="pad-top pad-bottom" onSubmit={this.handleSubmit} enctype="multipart/form-data">
                                            <h2 className="text-default">Add Product</h2>
                                           
                                            <div className="form-group">

                                                <input type="text" className="form-control" name="title" placeholder="Prodruct Name"  onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">

                                                <input type="text" className="form-control" name="price" placeholder="Product Price" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">

                                                <textarea className="form-control" rows="3" name="body" placeholder="Here" onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">

                                                <input type="file" name="images" className="form-control-files"  onChange={this.handleUpload}/>
                                            </div>
                                            <div className="text-center btn-sty">
                                                <button type="submit" name="submit" className="btn btn-warning">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>


        );
    }

}
export default AddProduct;
