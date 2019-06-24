import React, { Component } from 'react';
import '../products/Addproduct.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import { EditorState } from 'draft-js';
import Layout from '../layout';
import '../sidebar.css'


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
                <div className="container " >
                    <h1>{this.state.title}</h1>
                    <p  dangerouslySetInnerHTML={{ __html: this.state.description }}/>
                </div>
             </Layout>
             </React.Fragment> 
            );
    }

}
export default Page;
