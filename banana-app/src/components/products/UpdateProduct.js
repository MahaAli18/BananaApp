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

        var data = {
            title: this.state.title,
            body: this.state.body,
            price: this.state.price,
            images: this.state.images,
            id: this.state.id
        }


        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/post/update.php`, data)
            .then((res) => {
                this.setState({ productAdded: true });
            });

    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    };
    handleUpload = e => {
        let file = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onload = (e) => {
            this.setState({ images: e.target.result })
        }
    }

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
                                            </div>
                                            <div className="form-group">

                                                <input type="text" className="form-control" name="price" value={this.state.price} placeholder="Product Price" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">

                                                <textarea className="form-control" rows="3" name="body" placeholder="Here" value={this.state.body} onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">

                                                <input type="file" name="images" className="form-control-files"  onChange={this.handleUpload} />
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
