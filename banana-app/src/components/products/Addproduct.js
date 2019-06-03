import React, { Component } from 'react';
import './Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';


class AddProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            price:'',
            body:'',
            images:'',
        }
    }

    render() {
        return (
            <React.Fragment>
        <Header />
        <div id="wrapper" className="d-flex">
          <Sidebar/>
          <div className="mainBody">
          <div id="addproduct">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                        <form className="pad-top pad-bottom">
                        <h2 className="text-default">Add Product</h2>
                <div className="form-group">
                   
                    <input type="text" className="form-control" name="product_name" placeholder="Prodruct Name" />
                </div>
                <div className="form-group">
                  
                    <input type="text" className="form-control" name="product_price" placeholder="Product Price" />
                </div>
                <div class="form-group">
                   
                    <textarea className="form-control" rows="3" name="text_area">Here..</textarea>
                </div>
                <div className="form-group">
        
                    <input type="file" className="form-control-files" name="image_file" />
                </div>
                   <div className="text-center btn-sty">
                    <button type="submit" className="btn btn-warning ">Submit</button>
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
