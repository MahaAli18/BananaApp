import React from 'react';
import Cards from './cards';


const CardListing = () => {
    return (
        <div className="CardListing">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h2>Our Products</h2>
                </div>
                <div className="col-md-6 justify-content-end  d-flex">
                    <a href="/addproducts" className="btn btn-warning"  >Add Product</a>
                </div>
            </div>
            <div className="row">
                <Cards />
                <Cards />
                <Cards />
            </div>
            <div className="row">
                <Cards />
                <Cards />
                <Cards />
            </div>
        </div>
    )
}

export default CardListing