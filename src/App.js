import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetails/ProductDetail';
import { useState } from 'react';
import Login from './components/Login/Login';

function App() {
  const [cart, setCart] = useState([])
  return (
    <div>
      <Header cart={cart}></Header>
      <Router>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path="/product/:key">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
          <Shop cart={cart} setCart={setCart}></Shop>
          </Route>
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;
