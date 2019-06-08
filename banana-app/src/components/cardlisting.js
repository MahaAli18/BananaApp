import React, { Component } from 'react';
import axios from 'axios';
import Cards from './cards';


class CardListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/read.php')
            .then(res => {
                console.log(res.data.data);
                this.setState({
                    products: res.data.data
                })
            })
    }
    render() {
        const { products } = this.state;
        console.log(products.length);
        const productList = products.length > 0 ? (
            products.map(product => {
                return <Cards id={product.id} title={product.title} body={product.body} price={product.price} />;
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
                        <h2>Our Products</h2>
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