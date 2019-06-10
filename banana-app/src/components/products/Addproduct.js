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
            images: '',
            productAdded: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        
        var data = {
            title: this.state.title,
            body: this.state.body,
            price: this.state.price,
            images:this.state.images
        }
       

        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/create.php`, data )
            .then((res) => {
                this.setState({productAdded:true});
            });

    }

    handleChange = e => {
        const { name, value } = e.target;    
        this.setState({ [name]: value }, () => console.log(this.state));
    };
    handleUpload = e => { 
        let file = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onload = (e) => {
           this.setState({ images: e.target.result })
       }
    }

    render() {
        if(this.state.productAdded){
            return <Redirect to='/home'/>
        }
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
