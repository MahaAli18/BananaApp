import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            error_title:'',
            error_body:'',
            error_price:'',
            error_image:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }


    handleSubmit = e => {

        e.preventDefault();
        if(this.state.title == ''){
            this.setState({error_title:"Title is required"})
        }
   else{
        let fd = new FormData()
            fd.append('title',this.state.title )
    
        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/create.php`, fd )
            .then((res) => {
                this.setState({productAdded:true});
                toast.warning('Product Added', {
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
        this.setState({ [name]: value }, () => console.log(this.state));

        if(this.state != ''){
            this.setState({error_title:'', error_price:'',error_body:''})
        }
    
    };
  

    


    render() {
        if(this.state.productAdded){
          return <Redirect to='/home'/>
        }
        return (
            <React.Fragment>
                <Header />
                
                <div id="wrapper" className="d-flex">
                    <Sidebar />
                    <div className="mainBody">
                        <div id="addproduct">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <form className="pad-top pad-bottom" onSubmit={this.handleSubmit} encType="multipart/form-data" ref={el => (this.myFormRef = el)} >
                                            <h2 className="text-default">Add Category</h2>
                                           
                                            <div className="form-group">

                                                <input type="text" className="form-control" name="title" placeholder="Title"  onChange={this.handleChange}/>
                                                <span className="errorMessage">{this.state.error_title}</span>
                                            </div>

                                            <div className="form-group">
                                                <input type="checkbox" name="category" value="active"/>
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
export default Categories;
