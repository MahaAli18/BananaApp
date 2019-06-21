import React , { Component } from 'react';
import '../Home/Home.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Redirect,Link } from 'react-router-dom';
import { history } from '../../App';


class Pages extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            pageDeleted:false,
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
            console.log("hello");
    }

    ///for delete///
    handleChange(e, id) {
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
 
    render(){
        const { products } = this.state;
        if(this.state.pageDeleted){
            return <Redirect to='/pages'/>
        }
        
        const productList = products && products.length > 0 ? (
            products.map(product => {
                return (   <tr>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.page_name}</td>
                                <td><a className="btn btn-danger" onClick= {(e) => this.handleChange(e, product.id)}>Delete</a></td>
                            </tr>
              );

            })
        ) : (
                <div className="text-center col-md-12">
                    <h2>NO PAGES YET</h2>
                 </div>
            )

        return(
            <React.Fragment>
                <Header />            
                <div id="wrapper" className="d-flex">
                    <Sidebar />
                    <div className="mainBody">
                        <div className="container-fluid">
                                <div className="row align-items-center">
                                <div className="col-md-6">
                                {this.state.alert}
                                    <h2 className="prod">Pages</h2>
                                </div>
                                <div className="col-md-6 justify-content-end d-flex">
                                    <a href="/addpage" className="btn btn-warning" >Add Page</a>
                                </div>
                            </div>
                            <div className="row">
                            <MDBTable responsive>
                                <MDBTableHead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Page Name</th>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {productList}
                                </MDBTableBody>
                           </MDBTable>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>           
        );
    }
}

export default Pages;