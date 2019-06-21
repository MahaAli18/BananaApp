import React, { Component } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Redirect,Link } from 'react-router-dom';
import { history } from '../App';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class PageListing extends Component {
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
        axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/read.php')
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
                title="Do you want to delete this Page?"
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
        axios.post('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/delete.php', {id: id })
       
        .then(res => {

            this.setState({
                products: this.state.products.filter(p => p.id.toString()  !== id.toString())
            }, () => {
                this.setState({
                    alert: null
                  });
                  toast.warning('Page Deleted', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            history.push('/pages')
            });

        })
    };


    

    render() {
        console.log(this.props);
        const { products } = this.state;
        if(this.state.productDeleted){
            return <Redirect to='/pages'/>
        }
        const productList = products && products.length > 0 ? (
            products.map(product => {
                return (
                        <React.Fragment key={product.id}>
                            <tr>
                                <td></td>
                                <td>{product.title}</td>
                                <td>{product.page_name}</td>
                                <td><Link to={`/updatepage/${product.id}`} className="btn btn-warning ">Update</Link></td>
                                <td><a  className="btn btn-warning mr-2 " onClick= {(e) => this.handleChange(e, product.id)}>Delete</a></td>
                            </tr>
                        </React.Fragment>
                    );
            })
        ) : (
                <React.Fragment>
                    <tr>
                        <td colSpan="5" style={{textAlign:"center"}}>NO Pages YET</td>
                    </tr>   
                </React.Fragment>              
            )

        return (
            
            <div className="PageListing">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        {this.state.alert}
                        <h2 className="prod">Our Pages</h2>
                    </div>
                    <div className="col-md-6 justify-content-end  d-flex">
                        <a href="/addpage" className="btn btn-warning" >Add Page</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table cellSpacing="0" border="1" style={{width: '100%'}} className="css-serial">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Page Name</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList}
                            </tbody>
                        </table>
                    </div>                    
                </div>
            </div>
        )
    }


}

export default PageListing