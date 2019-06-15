
import './sidebar.css'
import React, { Component } from 'react';


class Sidebar extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h4>Products</h4>
                    </div>
                    
                    <ul className="unstyled-sidebar components align-items-center">
                    
                        <li>
                            <a href="javascript:;">About</a>
                        </li>

                        <li>
                            <a href="/pages">Pages</a>
                        </li>
                        <li>
                            <a href="javascript:;">Portfolio</a>
                        </li>
                        <li>
                            <a href="javascript:;">Contact</a>
                        </li>
                    </ul>
                </nav>

            </React.Fragment>
        );
    }


}

export default Sidebar;