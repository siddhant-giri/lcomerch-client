import React, { useEffect, useState } from 'react'
import { API } from '../backend';
import "../styles.css"
import Base from "./Base"
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { loadCart } from "./helper/cartHelper"
import StripeCheckout from './StripeCheckout';
import Paymentb from "./Paymentb";




const Cart = () => {

const [products, setProducts] = useState([])
const [reload, setReload] = useState(false)

useEffect(() => {
    setProducts(loadCart())
}, [reload])

const loadAllProducts = () => {
    return (
        <div>
            <h2 style={{background : "#FF3E3E", borderRadius : "10px"}} className="mb-4">Shopping Cart
            &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="mb-2 bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
</svg>
            </h2>
            {products.map((product, index) => (
                <Card 
                key={index}
                product={product}
                addToCart = {false}
                removeFromCart = {true}
                setReload = {setReload}
                reload = {reload}
                />
            ))}
        </div>
    )
}

const loadCheckout = () => {
    return (
        <div>
            <h2>Section for Checkout</h2>
        </div>
    )
}
    
  
    return (
        <Base title="Cart Page" description="Ready to Checkout">
            
            <div className="container-fluid">
                <div className="row text-center">
                    
                    <div className="col-6">
                    {loadAllProducts()}
                    </div>
                     <div className="col-6">
                     
                     <StripeCheckout 
                      products= {products}
                      setReload={setReload}   
                     />



                    </div>

                </div>
                </div>
                
                
            
        </Base>
    )
}


export default Cart;