import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../products/Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class UpdateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            inactive: false,
            productAdded: false,
            error_title:'',
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        const { id } = this.props.match.params;
    }
    componentDidMount() {

        axios.get(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/categories_api/read_single.php?id=${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data['title'],
                    inactive: res.data['inactive'],
                    id: res.data['id']
                })
                
            })
    }

    handleSubmit = e => {

        e.preventDefault();
        if(this.state.title == ''){
            this.setState({error_title:"Title is required"})
        }
       

   else{
    
        let fd = new FormData()
            fd.append('id', this.state.id)
            fd.append('title',this.state.title )
            fd.append('inactive', this.state.inactive)
           
        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/categories_api/update.php`, fd )
            .then((res) => {
                this.setState({
                    productAdded:true,
                    inactive:false
                });
                toast.warning('Category Update', {
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

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]:  e.target.type === 'checkbox' ? e.target.checked : e.target.value }, () => console.log(this.state));
        if(this.state != ''){
            this.setState({error_title:''})
        }
    };
   
  
    
    render() {

        if (this.state.productAdded) {
            return <Redirect to='/categories' />
        }
        return(
            <React.Fragment>
                <Header />
                   <div id="wrapper" className="d-flex">
                       <Sidebar />
                       <div className="mainBody">
                           <div id="addproduct">
                               <div className="container">
                                   <div className="row">
                                       <div className="col-md-8">
                                           <form className="page-head pad-head" onSubmit={this.handleSubmit} >
                                               <h4 className="text-default mb-4">Add Page</h4>
                                               <div className="form-group title-page">
                                                   <label htmlFor="">Add Title</label>
                                                   <input type="text" className="form-control" name="title" placeholder="Title" onChange={this.handleChange}  value={this.state.title}/>
                                                   <span className="errorMessage">{this.state.error_title}</span>
                                               </div>
                                                
                                                <div className="form-group">
                                                    <input type="checkbox" name="inactive" onChange={this.handleChange}/>
                                                    In active
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
export default UpdateCategory;
