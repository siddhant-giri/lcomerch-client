import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { emptyCart, loadCart } from './helper/cartHelper'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import {createOrder} from "./helper/orderHelper"
import {motion} from "framer-motion"



const StripeCheckout = ({products, setReload = f => f, reload = undefined}) => {

    const [data, setData] = useState({
        loading : false,
        success : false,
        error : "",
        address : ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
        let amount  = 0;
        products.map(p => {
            amount = amount + p.price
        })

        return amount;
    }

    const buttonvaraints = {
  
        hover : {
          scale : 1.1,
              textShadow:"0px 0px 8px rgb(255,255,255)",
              boxShadow:"0px 0px 8px rgb(255,255,255)",
              transition : {
                duration : 0.3,
                yoyo : Infinity
                
              }
        }
        
      }
   

const makePayment = token => {
    const body = {
        token,
        products
    }
    const headers = {
        "Content-Type" : "application/json"
         }
         return fetch(`${API}/stripePayment`, {
             method : "POST",
             headers,
             body : JSON.stringify(body)
         })
         .then(response => {
            console.log(response);
            const {status} = response;
            console.log("STATUS", status);
        //     emptyCart();
        // setReload(!reload);
         })
         .catch(error => console.log(error))

         
}

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51IAUiJIyZuCYkP3XU9sV6qcmSaC2aRK7DM3lqDAkmJwfrjcPUk6Cpdi5KyyTuZy9FpUWZ6cE0pYpexA8aEiHgEQr00XImqMUfJ"
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress
            >
            <motion.button
            variants={buttonvaraints}
            whileHover="hover" 
             className="btn" style={{color : "white",borderRadius : "50px",fontWeight : "bold",borderColor : "white",height : "50px", width :"180px", background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)"}}>Pay with Stripe</motion.button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <motion.button
                variants={buttonvaraints}
            whileHover="hover" 
             className="btn" style={{color : "white",borderRadius : "50px",fontWeight : "bold",borderColor : "white",height : "50px", width :"180px", background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)"}}>Sign In</motion.button>
            </Link>
        )
    }

    const loadAllProducts = () => {
        return (
            <div>
                
                {products.map((product, index) => (
                    <p className="mt-1" ><span className="p-2" style={{background : "#81E120", borderRadius : "5px"}}><b>Product Name :</b> {product.name}</span>    <span className="p-2" style={{background : "#7000ff",borderRadius : "5px"}}><b>Product Price :</b> {product.price} $</span></p>
                ))}
            </div>
        )
    }



    return (
        <div>
        <h2 style={{background : "#7000FF", borderRadius : "10px"}}>Price &nbsp; 
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
</svg>
        </h2>
        <div style={{borderColor : "white", borderRadius : "16px", borderWidth : "10px"}} className="mt-4">
            {loadAllProducts()}
            
            <span style={{borderColor : "white", borderWidth : "20px", fontSize : "25px"}} className="text-white"><b>Your Total bill is :</b> {getFinalAmount()} $</span> <br />
            {showStripeButton()}

        </div>
        </div>
    )
}

export default StripeCheckout