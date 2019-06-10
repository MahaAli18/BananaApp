import React, { Component } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Redirect,Link } from 'react-router-dom';



class CardListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productDeleted:false
        }
    }
    /// Read data///
    componentDidMount() {
        axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/read.php')
            .then(res => {
                
                this.setState({
                    products: res.data.data
                })
            })
    }
     ///for delete///
    handleChange(e, id) {
        e.preventDefault();
        axios.post('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/delete.php', {id: id })
        .then(res => {
            
        })
   
    }

    ///update data//
    

    render() {
        const { products } = this.state;
        if(this.state.productDeleted){
            return <Redirect to='/home'/>
        }
        const productList = products.length > 0 ? (
            products.map(product => {
                console.log(product.images);
                return (
                    <div className="col-md-4" key={product.id}>
                    <div className="card">
                            <img src={product.images} className="card-img-top" alt="-" />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.body}</p>
                                <p className="card-text">{product.price}</p>
                                <a href="#" className="btn btn-warning mr-2" onClick= {(e) => this.handleChange(e, product.id)}>Delete</a>
                                <Link to={`/updateproducts/${product.id}`} className="btn btn-warning">Update</Link>
                             </div>
                          </div>
                          </div>
                    );


                // return <Cards key={product.id} id={product.id} title={product.title} body={product.body} price={product.price} />;
            })
        ) : (
                <div className="center">
                    NO POSTS YET
                 </div>
            )

        return (
            <div className="CardListing">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h2 className="prod">Our Products</h2>
                    </div>
                    <div className="col-md-6 justify-content-end  d-flex">
                        <a href="/addproducts" className="btn btn-warning" >Add Product</a>
                    </div>
                </div>
                <div className="row">
                    {productList}
                </div>
            </div>
        )
    }


}

export default CardListing