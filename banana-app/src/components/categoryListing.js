import React, { Component } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ee from './emitter';


class CategoryListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            productDeleted:false,
            alert: null,
            create: false,
            title: '',
            inactive: false,
            error_title:'',
            pageAdded: false
        }
        ee.on('pages-refresh',this.refresh)
    }

    handleSubmit = e => {

        e.preventDefault();
        if(this.state.title == ''){
            this.setState({error_title:"Title is required"})
        }
        else{
          
                let fd = new FormData()
                fd.append('title',this.state.title )
                fd.append('inactive', this.state.inactive);
                   
                axios.post('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/categories_api/create.php', fd )
                    .then((res) => {
                        this.setState({ 
                            create: false,
                             inactive:false
                        })
                        ee.emit('pages-refresh')
                        ee.emit('sidebar-refresh')
                        toast.warning('Category Added', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        
                    });
                }
            }
        
    handleFormChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]:  e.target.type === 'checkbox' ? e.target.checked : e.target.value }, () => console.log(this.state));

        if(this.state != ''){
            this.setState({error_title:''})
        }
    };

    
    /// Read data///
    componentDidMount() {
        this.refresh();
    }
    refresh=()=>{
        axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/categories_api/read.php')
        .then(res => {  
            this.setState({
                categories: res.data.data
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
        axios.post('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/categories_api/delete.php', {id: id })
       
        .then(res => {

            this.setState({
                categories: this.state.categories.filter(p => p.id.toString()  !== id.toString()),
                alert: null,
                create:false
            });

            ee.emit('sidebar-refresh')
            ee.emit('pages-refresh')
               
                  toast.warning('Category Deleted', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
        })
    };
            // for add page//
            handleClick = () => {
                this.setState({
                    create: !this.state.create,
                    
                })
            }
            
        
 


    render() {
        console.log(this.props);
        const { categories, create } = this.state;
        const productList = ( 
            categories && categories.length > 0 ? (
                categories.map(category => {
                    return (
                            <React.Fragment key={category.id}>
                                <tr>
                                    <td></td>
                                    <td>{category.title}</td>
                                    <td>{category.inactive == true ? 'Inactive' : 'Active'}</td>
                                    <td><Link to={`/updatecategory/${category.id}`} className="btn btn-warning ">Update</Link></td>
                                    <td><a className="btn btn-warning mr-2 " onClick= {(e) => this.handleChange(e, category.id)}>Delete</a></td>
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
        )

        
        const body = (
            !create ? (
                <div className="row">
                    <div className="col-md-12">
                        <table cellSpacing="0" border="1" style={{width: '100%'}} className="css-serial">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Status</th>
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
            ) : (
                <React.Fragment>
                <div id="wrapper" className="d-flex">
                    <div className="mainBody">
                        <div id="addproduct">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <form className="page-head pad-head" onSubmit={this.handleSubmit} >
                                            <div className="form-group title-page">
                                                <label htmlFor="">Add Title</label>
                                                <input type="text" className="form-control" name="title" placeholder="Title" onChange={this.handleFormChange} />
                                                <span className="errorMessage">{this.state.error_title}</span>
                                            </div>
                                            <div className="form-group">
                                               <span> <input type="checkbox" name="inactive" onChange={this.handleFormChange}/>Inactive</span>
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
            )
        )
        
                
            
        return (
            
            <div className="CategoryListing">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        {this.state.alert}
                        <h2 className="prod">{this.state.create ? ('Add Category') : ('Our Categories') }</h2>
                    </div>
                    <div className="col-md-6 justify-content-end  d-flex">
                        <a onClick={this.handleClick} className="btn btn-warning" >{this.state.create ? ('Back Category') : ('Add Category') }</a>
                    </div>
                </div>
                {body}
            </div>
        )
    }


}

export default CategoryListing