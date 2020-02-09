
import React,{useState,useContext} from 'react';
import {addFirstProduct} from './addFirstProduct';
import {AppContext} from '../context/AppContext';


const AddToCartButton = (props) => {

    const product = props.product;
  

 
    const [cart,setCart] = useContext(AppContext);
    
    const handleAddToCartClick = () => {
        if (process.browser) {
            let existingCart = localStorage.getItem('cedarcreekforestry-cart');
            // if cart has item(s) already, then update the exisiting cart
            if (existingCart) {

            } else{
                // if no item in the cart, then create an empty array and add item.
                
                const newCart = addFirstProduct(product);
                setCart( newCart)

            }
        }
    }

    return(
        <div className = "text-center add-to-cart-btn" onClick={ handleAddToCartClick }> ADD TO CART</div>
    )
}

export default AddToCartButton