import React, { Component } from 'react';
// import { Editor, EditorState} from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../products/Addproduct.css';
import Header from '../Header/Header';
import Sidebar from '../sidebar';

class AddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            editorState: EditorState.createEmpty()
        };
       
        
    }
    onEditorStateChange: Function = (editorState) => {
        this.setState({
          editorState,
        });
      };
  render(){
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
                                        <form className="page-head pad-head" >
                                            <h4 className="text-default mb-4">Add Page</h4>
                                            <div className="form-group title-page">
                                                <label htmlFor="">Add Title</label>
                                                <input type="text" className="form-control" name="title" placeholder="Title" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Add Title</label>
                                                <Editor 
                                                editorState={this.state.editorState} 
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="editor-content"
                                                onEditorStateChange={this.onEditorStateChange} />
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

export default AddPage;