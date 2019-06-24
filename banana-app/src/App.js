import React, { Component } from 'react';
import './styles/foundation.min.css';
import Routes from './routes';
import Footer from './components/Footer/Footer';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();


class App extends Component {
  


  render() {
    return (
      <div> 
            <Routes />
            <Footer />
      </div>
    );
  }
}
export default App;