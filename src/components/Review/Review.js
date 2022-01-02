import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDatabaseCart, removeFromDatabaseCart } from '../../images/utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);

    

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)

        fetch('http://localhost:5000/productByKeys',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        
        // console.log(productKeys)
        //  const cartProduct = productKeys.map(key => {
        //    const product = fakeData.find(pd => pd.key === key)
        //      product.quantity = savedCart[key]
        //      return product;
        // });
        // console.log(cartProduct)
        // setCart(cartProduct)
        
    },[])
    
    const removeProduct = (product) => {
        console.log('remove product', product)
        const newCart = cart.filter(pd => pd.key !== product)
        setCart(newCart)
        removeFromDatabaseCart(product)
    }
    
    return (
        <div className='d-flex m-3'>
            <div className="col-md-9">
                <h3>Cart Items: {cart.length}</h3>
                
            {
                cart.map(pd => <ReviewItems removeProduct={removeProduct} pd={pd}></ReviewItems>)
            }
            </div>
            <div className="col-md-3 m-2 p-5 py-5">
            <Cart cart={cart}>
            <Link to="/shipment"><Button className='w-100' variant='warning' size='lg'>Place order</Button></Link>
            </Cart>
            </div>
            
            
        </div>
    );
};

export default Review;