import React, { Component } from 'react';
import WebHeader from './includes/header';
import WebFooter from './includes/footer';

class MainWeb extends Component {
    render() {
        return (
           <React.Fragment>   
                <div id="fh5co-container">
                        <div id="fh5co-home" className="js-fullheight" data-section="home">
                            <div className="flexslider">
                            <div className="fh5co-overlay"></div>
                            <div className="fh5co-text">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                        <h1 className="to-animate">Ranoush Villa</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="slides">
                            <li style={{backgroundImage: 'url(images/slide_1.jpg)'}} data-stellar-background-ratio="0.5"></li>
                            <li style={{backgroundImage: 'url(images/slide_2.jpg)'}} data-stellar-background-ratio="0.5"></li>
                            <li style={{backgroundImage: 'url(images/slide_3.jpg)'}} data-stellar-background-ratio="0.5"></li>
                            </ul>
                        </div>
                        </div>
                        <WebHeader/>
                        <div id="fh5co-about" data-section="about">
                            <div className="fh5co-2col fh5co-bg to-animate-2" style={{backgroundImage: 'url(images/res_img_1.jpg)'}}></div>
                            <div className="fh5co-2col fh5co-text">
                                <h2 className="heading to-animate">About Us</h2>
                                <p className="to-animate"><span className="firstcharacter">F</span>ar far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.</p>
                                <p className="text-center to-animate"><a href="#" className="btn btn-primary btn-outline">Get in touch</a></p>
                            </div>
                        </div>
                        <div id="fh5co-sayings">
                            <div className="container">
                                <div className="row to-animate">
                                <div className="col-md-12">
                                    <div className="flexslider">
                                        <ul className="slides">
                                            
                                            <li>
                                                <blockquote>
                                                    <p>&ldquo;Cooking is an art, but all art requires knowing something about the techniques and materials&rdquo;</p>
                                                    <p className="quote-author">&mdash; Nathan Myhrvold</p>
                                                </blockquote>
                                            </li>
                                            <li>
                                                <blockquote>
                                                    <p>&ldquo;Give a man food, and he can eat for a day. Give a man a job, and he can only eat for 30 minutes on break.&rdquo;</p>
                                                    <p className="quote-author">&mdash; Lev L. Spiro</p>
                                                </blockquote>
                                            </li>
                                            <li>
                                                <blockquote>
                                                    <p>&ldquo;Find something you’re passionate about and keep tremendously interested in it.&rdquo;</p>
                                                    <p className="quote-author">&mdash; Julia Child</p>
                                                </blockquote>
                                            </li>
                                            <li>
                                                <blockquote>
                                                    <p>&ldquo;Never work before breakfast; if you have to work before breakfast, eat your breakfast first.&rdquo;</p>
                                                    <p className="quote-author">&mdash; Josh Billings</p>
                                                </blockquote>
                                            </li>    
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="fh5co-featured" data-section="features">
                        <div className="container">
                            <div className="row text-center fh5co-heading row-padded">
                                <div className="col-md-8 offset-md-2">
                                    <h2 className="heading to-animate">Featured Dishes</h2>
                                    <p className="sub-heading to-animate">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="fh5co-grid">
                                    <div className="fh5co-v-half to-animate-2">
                                        <div className="fh5co-v-col-2 fh5co-bg-img" style={{backgroundImage: 'url(images/res_img_1.jpg)'}}></div>
                                        <div className="fh5co-v-col-2 fh5co-text fh5co-special-1 arrow-left">
                                            <h2>Fresh Mushrooms</h2>
                                            <span className="pricing">$7.50</span>
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                        </div>
                                    </div>
                                    <div className="fh5co-v-half">
                                        <div className="fh5co-h-row-2 to-animate-2">
                                            <div className="fh5co-v-col-2 fh5co-bg-img" style={{backgroundImage: 'url(images/res_img_2.jpg)'}}></div>
                                            <div className="fh5co-v-col-2 fh5co-text arrow-left">
                                                <h2>Grilled Chiken Salad</h2>
                                                <span className="pricing">$12.00</span>
                                                <p>Far far away, behind the word mountains.</p>
                                            </div>
                                        </div>
                                        <div className="fh5co-h-row-2 fh5co-reversed to-animate-2">
                                            <div className="fh5co-v-col-2 fh5co-bg-img" style={{backgroundImage: 'url(images/res_img_8.jpg)'}}></div>
                                            <div className="fh5co-v-col-2 fh5co-text arrow-right">
                                                <h2>Cheese and Garlic Toast</h2>
                                                <span className="pricing">$4.50</span>
                                                <p>Far far away, behind the word mountains.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fh5co-v-half">
                                        <div className="fh5co-h-row-2 fh5co-reversed to-animate-2">
                                            <div className="fh5co-v-col-2 fh5co-bg-img" style={{backgroundImage: 'url(images/res_img_7.jpg)'}}></div>
                                            <div className="fh5co-v-col-2 fh5co-text arrow-right">
                                                <h2>Organic Egg</h2>
                                                <span className="pricing">$4.99</span>
                                                <p>Far far away, behind the word mountains.</p>
                                            </div>
                                        </div>
                                        <div className="fh5co-h-row-2 to-animate-2">
                                            <div className="fh5co-v-col-2 fh5co-bg-img" style={{backgroundImage: 'url(images/res_img_6.jpg)'}}></div>
                                            <div className="fh5co-v-col-2 fh5co-text arrow-left">
                                                <h2>Salad with Crispy Chicken</h2>
                                                <span className="pricing">$8.50</span>
                                                <p>Far far away, behind the word mountains.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fh5co-v-half to-animate-2">
                                        <div className="fh5co-v-col-2 fh5co-bg-img" style={{backgroundImage: 'url(images/res_img_3.jpg)'}}></div>
                                        <div className="fh5co-v-col-2 fh5co-text fh5co-special-1 arrow-left">
                                            <h2>Tomato Soup with Chicken</h2>
                                            <span className="pricing">$12.99</span>
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                     </div>
                     
                    <div id="fh5co-type" style={{backgroundImage: 'url(images/slide_3.jpg);'}} data-stellar-background-ratio="0.5">
                        <div className="fh5co-overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 to-animate">
                                    <div className="fh5co-type">
                                        <h3 className="with-icon icon-1">Fruits</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 to-animate">
                                    <div className="fh5co-type">
                                        <h3 className="with-icon icon-2">Sea food</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 to-animate">
                                    <div className="fh5co-type">
                                        <h3 className="with-icon icon-3">Vegetables</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                </div>
                                <div className="col-md-3 to-animate">
                                    <div className="fh5co-type">
                                        <h3 className="with-icon icon-4">Meat</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <WebFooter/>
       </React.Fragment>
        )
    }
}

export default MainWeb;
