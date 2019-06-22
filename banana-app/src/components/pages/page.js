import React, { Component } from 'react';
import '../products/Addproduct.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Layout from '../layout';


class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            id:'',
            description:'',
            editorState: EditorState.createEmpty()
        };
      
      
        const { page_name } = this.props.match.params;
    }
    componentDidMount() {

        axios.get(`http://localhost:8080/ReactProject/App/banana-app/CRUD/api/pages_api/read_page.php?page_name=${this.props.match.params.page_name}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data['title'],
                    description: res.data['description'],
                    id: res.data['id']
                })
                   
            })
        }
    
    render() {

        
        return(
            <React.Fragment>
            <Layout>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
             </Layout>
             </React.Fragment> 
            );
    }

}
export default Page;
