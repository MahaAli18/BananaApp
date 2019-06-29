import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Welcome from '././components/Welcome/Welcome';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import Signup from '././components/Signup/Signup';
import AddProduct from '././components/products/Addproduct';
import UpdateProduct from '././components/products/UpdateProduct';
import NotFound from '././components/NotFound/NotFound';
import { history } from './App';
import Pages from '././components/pages/pages';
import AddPage from '././components/pages/AddPages';
import UpdatePage from '././components/pages/Updatepage';
import Layout from './components/layout';
import Page from '././components/pages/page';
import Categories from './components/Categories/Categories';
import UpdateCategory from './components/Categories/UpdateCategory';
import MainWeb from './website/home';

const Routes = () => (
    <Router history={history}>
        <Switch>
            {/* <Route exact path="/" component={Welcome} /> */}
            <Route path="/" component={MainWeb}/>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/Signup" component={Signup} />
            <Route path="/addproducts" component={AddProduct}/>
            <Route path="/addpage" component={AddPage}/>
            <Route path="/layout" component={Layout}/>
            <Route path="/pages" component={Pages}/>
            <Route path="/updatecategory/:id" component={UpdateCategory}/>
            <Route path="/categories" component={Categories}/>
            <Route path="/page/:page_name" component={Page}/>
            <Route path="/updatepage/:id" component={UpdatePage}/>
            <Route path="/updateproducts/:id" component={UpdateProduct}/>
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);
export default Routes;