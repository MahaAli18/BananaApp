import React, { Component } from 'react';
import './styles/foundation.min.css';
import Routes from './routes';
// import Home from './components/Home/Home';
// import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import Welcome from './components/Welcome/Welcome';
// import MobileHeader from './components/MobileHeader/MobileHeader';
// import NotFound from './components/NotFound/NotFound';


class App extends Component {
  


  render() {
    return (
      <div > 
            {/* <MobileHeader name={this.state.appName} /> */}
            <Routes />
           
            <Footer />
      </div>
    );
  }
}
export default App;