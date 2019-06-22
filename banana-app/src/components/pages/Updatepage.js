import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../products/Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


class UpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            editorState: EditorState.createEmpty(),
            productAdded: false,
            error_title:'',
            error_description:'',
            description:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        const { id } = this.props.match.params;
    }
    componentDidMount() {

        axios.get(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/read_single.php?id=${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data['title'],
                    description: res.data['description'],
                    id: res.data['id']
                })
                const html = this.state.description;
                const contentBlock = htmlToDraft(html);
                   if (contentBlock) {
                       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                       const editorState = EditorState.createWithContent(contentState);
                       this.setState({
                           editorState: editorState
                       });
                   }
            })
    }

    handleSubmit = e => {

        e.preventDefault();
        if(this.state.title == ''){
            this.setState({error_title:"Title is required"})
        } else if (this.state.editorState == '')
        { this.setState({error_description:"Description is required"})}
       

   else{
    var convertedData = convertToRaw(
        this.state.editorState.getCurrentContent()
    );
        let fd = new FormData()
            fd.append('id', this.state.id)
            fd.append('title',this.state.title )
            fd.append('description', draftToHtml(convertedData));
           
        axios.post(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/update.php`, fd )
            .then((res) => {
                this.setState({productAdded:true});
                toast.warning('Page Update', {
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
    
    render() {

        if (this.state.productAdded) {
            return <Redirect to='/pages' />
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
            );
    }

}
export default UpdatePage;
