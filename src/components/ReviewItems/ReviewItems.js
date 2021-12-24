import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { faCriticalRole, faGgCircle } from '@fortawesome/free-brands-svg-icons'
import './ReviewItem.css'
import { Button } from "react-bootstrap";

const ReviewItems = (props) => {
   console.log(props);
  //  const { name, price,img,seller, quantity } = props.pd;
  return (
    <div>
    <div className="d-flex details m-5 p-2">
      
        <div className="col-md-3">
                <img src={props.pd.img} alt="" />
        </div>
        <div className="col-md-6 description">
          <h4>{props.pd.name}</h4>
          <div className="d-flex mt-5">
              <div className="col-md-6 p-3 m-2">
                  <p>${props.pd.price}</p>
                  <p>sold by: {props.pd.seller}</p>
                  <p>Quantity: {props.pd.quantity}</p>
                  <Button onClick={() => props.removeProduct(props.pd.key)} variant="warning" size="lg" className="w-50">Remove</Button>
              </div>
              <div className="col-md-6">
                  <p>Shipping options</p>
                  <h5><FontAwesomeIcon className="icons" icon={faCircle} /><span className="business" > 8-10 business days</span></h5>
                  <p className="shipping">$0 - Free Shipping</p>
                  <h5><FontAwesomeIcon className="dot-icons" icon={faDotCircle} /><span className="business"> 5-7 business days</span></h5>
                  <p className="shipping">$3.99 - Free Shipping</p>
                  <h5><FontAwesomeIcon className="icons"  icon={faCircle} /><span className="business" > 2-4 business days</span></h5>
                  <p className="shipping">$7.99 - Free Shipping</p>
              </div>
          </div>
        
      </div>

      <div className="col-md-3">
      
      </div>
      
    </div>
    </div>
  );
};

export default ReviewItems;
