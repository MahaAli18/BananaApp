import React, { Component } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Redirect,Link } from 'react-router-dom';
import { history } from '../App';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



class CardListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productDeleted:false,
            alert: null
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
        // e.preventDefault();
        const getAlert = () => (
            <SweetAlert 
                showCancel
                confirmBtnText="Confirm"
                confirmBtnBsStyle="default"
                confirmBtnCssClass="default-btn btn-success"
                cancelBtnBsStyle="default"
                cancelBtnCssClass="btn-danger"
                title="Do you want to delete this Product?"
                onCancel={() => this.hideAlert()}
                onConfirm={() => this.deleteConfirm(id)}
            >
            
            </SweetAlert>
          );
      
          this.setState({
            alert: getAlert()
          });
        }
      
        hideAlert() {
          console.log('Hiding alert...');
          this.setState({
            alert: null
          });
        
        
   
    }

    deleteConfirm(id){
        axios.post('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/delete.php', {id: id })
       
        .then(res => {

            this.setState({
                products: this.state.products.filter(p => p.id.toString()  !== id.toString())
            }, () => {
                this.setState({
                    alert: null
                  });
                  toast.warning('Product Deleted', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            history.push('/home')
            });

        })
    };


    

    render() {
        console.log(this.props);
        const { products } = this.state;
        if(this.state.productDeleted){
            return <Redirect to='/home'/>
        }
        const productList = products && products.length > 0 ? (
            products.map(product => {
                return (
                    <div className="col-md-4" key={product.id}>
                    <div className="card">
                            <img src={'/images/' + product.images} className="card-img-top" alt="-" />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text"> </p>
                                <p className="card-text">{product.price}</p>
                                <p>{product.featured == true ? 'Featured' : 'Not Featured'}</p>
                                <a  className="btn btn-warning mr-2 " onClick= {(e) => this.handleChange(e, product.id)}>Delete</a>
                                <Link to={`/updateproducts/${product.id}`} className="btn btn-warning mt-1">Update</Link>
                             </div>
                          </div>
                          </div>
                    );


                // return <Cards key={product.id} id={product.id} title={product.title} body={product.body} price={product.price} />;
            })
        ) : (
                <div className="text-center col-md-12">
                    <h2>NO POSTS YET</h2>
                 </div>
            )

        return (
            
            <div className="CardListing">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        {this.state.alert}
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