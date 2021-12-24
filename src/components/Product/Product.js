import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart, faStar, faStarAndCrescent, faStarHalf, faStarHalfAlt, faStarOfDavid, faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img,name,price,seller,stock,key} = props.product;
    return (
        <div className='d-flex m-2 details'>
            <div className="">
                <img src={img} alt="" />
            </div>
            <div className="p-3 description">
              <h4><Link to={'/product/'+key}>{name}</Link></h4>
              <p>by: {seller}</p>
              <div className="d-flex">
                  <div className="col-md-8">
                        <p>${price}</p>
                        <p>only {stock} left in stock - order soon</p>
                  </div>
                  <div className="col-md-4">
                  <FontAwesomeIcon className='text-warning' icon={faStar} /><FontAwesomeIcon className='text-warning' icon={faStar} /><FontAwesomeIcon className='text-warning' icon={faStar} /><FontAwesomeIcon className='text-warning' icon={faStarHalfAlt} /><FontAwesomeIcon className='text-warning' icon={faStarHalfAlt} />
                      <h5 className='feature'>Features</h5>
                  </div>
              </div>
              {props.showAddToCart && <Button onClick={() => props.handleAddProduct(props.product)} variant="warning" size="lg"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</Button>}
            </div>
        </div>
    );
};

export default Product;