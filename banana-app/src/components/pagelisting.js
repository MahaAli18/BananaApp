import React, { Component } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ee from './emitter';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';


class PageListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productDeleted:false,
            alert: null,
            create: false,
            title: '',
            editorState: EditorState.createEmpty(),
            error_title:'',
            error_description:'',
            pageAdded: false,
            pageName : 'Our Pages'
        }
        ee.on('pages-refresh',this.refresh)
    }

    handleSubmit = e => {

        e.preventDefault();
        if(this.state.title == ''){
            this.setState({error_title:"Title is required"})
        } else if (this.state.editorState == '')
        { 
            this.setState({error_description:"Description is required"})
        }
        else{
            var convertedData = convertToRaw(
                this.state.editorState.getCurrentContent()
            );
                let fd = new FormData()
                    fd.append('title',this.state.title )
                    fd.append('description', draftToHtml(convertedData));
                   
                axios.post('http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/create.php', fd )
                    .then((res) => {
                        this.setState({ create: false })
                        ee.emit('pages-refresh')
                        ee.emit('sidebar-refresh')
                        toast.warning('Page Added', {
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
        this.setState({ [name]: value }, () => console.log(this.state));

        if(this.state != ''){
            this.setState({error_title:''})
        }
    };

    onEditorStateChange = Function = (editorState) => {
        this.setState({
            editorState,
        });
        if(this.state.editorState != ''){
            this.setState({error_description:''})
        }
        };
    /// Read data///
    componentDidMount() {
        this.refresh();
    }
    refresh=()=>{
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
                products: this.state.products.filter(p => p.id.toString()  !== id.toString()),
                alert: null,
                create:false
            });

            ee.emit('sidebar-refresh')
            ee.emit('pages-refresh')
               
                  toast.warning('Page Deleted', {
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
        const { products, create } = this.state;
        const productList = ( 
            products && products.length > 0 ? (
                products.map(product => {
                    return (
                            <React.Fragment key={product.id}>
                                <tr>
                                    <td></td>
                                    <td>{product.title}</td>
                                    <td>{product.page_name}</td>
                                    <td><Link to={`/updatepage/${product.id}`} className="btn btn-warning ">Update</Link></td>
                                    <td><a className="btn btn-warning mr-2 " onClick= {(e) => this.handleChange(e, product.id)}>Delete</a></td>
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
                                                <label htmlFor="">Add Title</label>
                                                <Editor 
                                                editorState={this.state.editorState} 
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="editor-content"
                                                onEditorStateChange={this.onEditorStateChange} />
                                                <span className="errorMessage">{this.state.error_description}</span>
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
            
            <div className="PageListing">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        {this.state.alert}
                        <h2 className="prod">{this.state.create ? ('Add Pages') : ('Our pages') }</h2>
                    </div>
                    <div className="col-md-6 justify-content-end  d-flex">
                        <a onClick={this.handleClick} className="btn btn-warning" >{this.state.create ? ('Back Pages') : ('Add pages') }</a>
                    </div>
                </div>
                {body}
            </div>
        )
    }


}

export default PageListing