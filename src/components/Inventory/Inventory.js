import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


const Inventory = () => {
    const product = {}

    const handleClick = () => {
        fetch('http://localhost:5000/addProducts', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(product)
        })
        
    }
        
   
    return (
        <div>
            <Button variant="primary" onClick={handleClick}>Add Product</Button>
        </div>
    );
};

export default Inventory;