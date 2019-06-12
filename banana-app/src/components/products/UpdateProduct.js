import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import axios from 'axios';


class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            price: '',
            images: '',
            id: '',
            error_title:'',
            error_body:'',
            error_price:'',
            error_image:'',
            productAdded: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        const { id } = this.props.match.params;
    }
    componentDidMount() {

        axios.get(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/read_single.php?id=${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data['title'],
                    body: res.data['body'],
                    price: res.data['price'],
                    images: res.data['images'],
                    id: res.data['id']
                })
            })
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
       else{
       let fd = new FormData()
            fd.append('title',this.state.title )
            fd.append('body',this.state.body )
            fd.append('price',this.state.price )
            fd.append('images',this.state.images )
            fd.append('id', this.state.id)

        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/update.php`, fd)
            .then((res) => {
                this.setState({ productAdded: true });
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
    handleUpload = e => { 
        
        let file = e.target.files[0];
        this.setState({images:file});

        // if(file.value != ''){
        //         this.setState({error_image:''})
        //     }
    };
    
    render() {

        if (this.state.productAdded) {
            return <Redirect to='/home' />
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
                                        <form className="pad-top pad-bottom" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                            <h2 className="text-default">Add Product</h2>

                                            <div className="form-group">
                                                <input type="text" className="form-control" name="title" placeholder="Prodruct Name"
                                                    value={this.state.title} onChange={this.handleChange} />
                                                    <span className="errorMessage">{this.state.error_title}</span>
                                            </div>
                                            <div className="form-group">

                                                <input type="text" className="form-control" name="price" value={this.state.price} placeholder="Product Price" onChange={this.handleChange} />
                                                <span className="errorMessage">{this.state.error_price}</span>
                                            </div>
                                            <div className="form-group">

                                                <textarea className="form-control" rows="3" name="body" placeholder="Here" value={this.state.body} onChange={this.handleChange} />
                                                <span className="errorMessage">{this.state.error_body}</span>
                                            </div>
                                            <div className="form-group">

                                                <input type="file" name="images" className="form-control-files"  onChange={this.handleUpload} />
                                                <span className="errorMessage">{this.state.error_image}</span>
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
export default UpdateProduct;
