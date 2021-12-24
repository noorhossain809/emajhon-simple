import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import './Shop.css'
import { addToDatabaseCart, getDatabaseCart } from '../../images/utilities/databaseManager';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Shop = (props) => {
    
    const [products, setProducts] = useState(fakeData)
    const [cart, setCart] = useState([])
    // console.log(products)
    

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key]
            return product;
        })
        setCart(cartProduct)
    },[])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        // const counts = sameProduct.length;
        let count = 1;
        let newCart;
        if(sameProduct){
               count = sameProduct.quantity + 1;
               sameProduct.quantity = count;
               const others = cart.filter(pd => pd.key !== toBeAddedKey)
               newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
            
        }
        // console.log('product clicked', product)
        setCart(newCart)
        addToDatabaseCart(product.key, count)

    }

    return (
        <div className='d-flex p-3 '>
            
            <div className="col-md-9 detail">
            {
                products.map(pd => <Product showAddToCart={true} product={pd} handleAddProduct={handleAddProduct}></Product>)
            }
            </div>
            <div className="col-md-3 p-3">
                <Cart cart={cart}>
                <Link to="/review"><Button className='w-100' variant='warning' size='lg'>Review your order</Button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;