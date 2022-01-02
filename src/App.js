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
import { useState,createContext } from 'react';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Shipment from './components/Shipment/Shipment';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [cart, setCart] = useState([])
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <Router>
      <Header cart={cart}></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/product/:key">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
          <Shop cart={cart} setCart={setCart}></Shop>
          </Route>
          
          </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
