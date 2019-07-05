import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Select from 'react-select';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            price: '',
            images: '',
            category_id:'',
            error_title:'',
            error_body:'',
            error_price:'',
            error_image:'',
            productAdded: false,
            categories:[],
            category:'',
            featured: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }


    handleSubmit = e => {

        e.preventDefault();
        if(this.state.title == ''){
            this.setState({error_title:"Title is required"})
        } else if (this.state.price == '')
        { this.setState({error_price:"Price is required"})}
        else if (this.state.body == '')
        { this.setState({error_body:"Description is required"})
    
       }
    
        else if (this.state.images == '')
        { this.setState({error_image:"Image is required"})
    
       }
   else{
        let fd = new FormData()
            fd.append('title',this.state.title )
            fd.append('body',this.state.body )
            fd.append('price',this.state.price )
            fd.append('images',this.state.images )
            fd.append('category_id',this.state.category.value)
            fd.append('featured', this.state.featured);
        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/create.php`, fd )
            .then((res) => {
                this.setState({
                    productAdded:true,
                    fetured:false
                                
                });
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
        this.setState({ [name]:  e.target.type === 'checkbox' ? e.target.checked : e.target.value }, () => console.log(this.state));

        if(this.state != ''){
            this.setState({error_title:'', error_price:'',error_body:''})
        }
    
    };
    handleUpload = e => { 
        
        let file = e.target.files[0];
        this.setState({images:file});

        if(file.value != ''){
                this.setState({error_image:''})
            }
    };

    handleSelect=(category)=>{
        this.setState({
            category
        })
    }
    

    /// Read data///
    componentDidMount() {
        axios.get('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/categories_api/read.php')
            .then(res => {  
                this.setState({
                    categories: res.data.data
                                   
                })
                console.log(res.data.data)
                
            })
    }
    
    
    

    render() {
        const { categories } = this.state;
        const options = categories;
        console.log(options);
       
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
                                            <h2 className="text-default">Add Product</h2>
                                           
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="title" placeholder="Prodruct Name"  onChange={this.handleChange}/>
                                                <span className="errorMessage">{this.state.error_title}</span>
                                            </div>
                                           <div className="form-group">
                                               <Select 
                                                    className="select" 
                                                    name="category_id" 
                                                    options={options} 
                                                    onChange={this.handleSelect} 
                                                    value={this.state.category} 
                                                    theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 30,
                                                    colors: {
                                                    ...theme.colors,
                                                    primary25: '#faaf39',
                                                    primary: '#faaf39',
                                                    },
                                               })}
                                                    
                                                    placeholder="Select Category"
                                                />
                                           </div>
                                            <div className="form-group">

                                                <input type="text" className="form-control" name="price" placeholder="Product Price" onChange={this.handleChange} />
                                                <span className="errorMessage">{this.state.error_price}</span>
                                            </div>
                                            <div className="form-group">

                                                <textarea className="form-control" rows="3" name="body" placeholder="Here" onChange={this.handleChange}/>
                                                <span className="errorMessage">{this.state.error_body}</span>
                                            </div>
                                            <div className="form-group">

                                                <input type="file" name="images" className="form-control-files"  onChange={this.handleUpload}/>
                                                <span className="errorMessage">{this.state.error_image}</span>
                                            </div>
                                            <div className="form-group">
                                               <span> <input type="checkbox" name="featured" onChange={this.handleChange}/>Not Featured</span>
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
export default AddProduct;
