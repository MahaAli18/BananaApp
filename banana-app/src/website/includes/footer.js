import React, { Component } from 'react'

class WebFooter extends Component {
    render() {
        return (
         <div id="fh5co-footer">
		   <div className="container">
                <div className="row row-padded">
                    <div className="col-md-12 text-center">
                        <p className="to-animate">&copy; 2016 Foodee Free HTML5 Template. Designed by <a href="http://freehtml5.co/" target="_blank">FREEHTML5.co</a> Demo Images: <a href="http://pexels.com/" target="_blank">Pexels</a> Tasty Icons Free <a href="http://handdrawngoods.com/store/tasty-icons-free-food-icons/" target="_blank">handdrawngoods</a>
                        </p>
                        <p className="text-center to-animate"><a href="#" className="js-gotop">Go To Top</a></p>
                   </div>
			    </div>
			    <div className="row">
                    <div className="col-md-12 text-center">
                        <ul className="fh5co-social">
                            <li className="to-animate-2"><a href="#"><i className="icon-facebook"></i></a></li>
                            <li className="to-animate-2"><a href="#"><i className="icon-twitter"></i></a></li>
                            <li className="to-animate-2"><a href="#"><i className="icon-instagram"></i></a></li>
                        </ul>
                    </div>
			       </div>
		    </div>
	    </div>
        )
    }
}

export default WebFooter;
