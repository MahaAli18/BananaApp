import React, { Component } from 'react';
import './Addproduct.css';

class AddProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            price:'',
            body:'',
            images:''
        }
    }
    render() {
        return (
            <div id="addproduct">
                <div className="container">
                    <div className="row img-row justify-content-center">
                        <div className="col-md-5">
                        <form className="pad-top">
                        <h2 className="text-center text-warning">Add Product</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="product_name" placeholder="Prodruct Name" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" className="form-control" name="product_price" placeholder="Product Price" />
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="3" name="text_area">Here..</textarea>
                </div>
                <div className="form-group">
                    <label>Choose Product</label>
                    <input type="file" className="form-control-file" name="image_file" />
                </div>
                   <div className="text-center">
                    <button type="submit" className="btn btn-warning">Submit</button>
                    </div>
            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            );
        }

    }
    export default AddProduct;
