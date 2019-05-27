import React, { Component } from 'react';
import './styles/foundation.min.css';
import './styles/custom.css';
import Routes from './routes';
// import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import Welcome from './components/Welcome/Welcome';
import MobileHeader from './components/MobileHeader/MobileHeader';
// import NotFound from './components/NotFound/NotFound';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "React Project"
    }
  }


  render() {
    return (
      <div className="off-canvas-wrapper">
        <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
          <div className="off-canvas-content" data-off-canvas-content>
            <MobileHeader name={this.state.appName} />
            <Header name={this.state.appName} />
            <Routes />
            <hr />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
export default App;