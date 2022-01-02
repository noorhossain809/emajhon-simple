import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    console.log(props)
    const cart = props.cart;
    const total = cart.reduce((total, pd)=> total + pd.price * pd.quantity || 1, 0);

    let shipping = 0;
    if(total > 35){
        shipping =0
    }
    else if(total > 15){
        shipping = 4.99
    }
    else if(total > 0){
            shipping = 12.99
    }

    const tax = (total/10).toFixed(2);
    const grandTotal = (total+shipping+Number(tax)).toFixed(2);
    const numberConvert = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            
            <div className="text-center">
            <h2 style={{fontWeight:700}}>Order Summary</h2>
                <h3>Items ordered:{props.cart.length}</h3>
            </div>
            <h5 >Items: {numberConvert(total)}</h5>
            <h5>Shipping & Handling: {shipping}</h5>
            <h5>Total before tax: {numberConvert(total+shipping)}</h5>
            <h5>Estimated Tax: {tax}</h5>
            <h3 className='order'>Order Total: {grandTotal}</h3>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;