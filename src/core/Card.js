import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { addItemCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';
import addCart from "../images/addcart.png"
import removeCart from "../images/removecart.png"
import {motion} from "framer-motion"



    const Card = ({product, addToCart = true, removeFromCart = false, setReload = f => f, reload = undefined}) => {


const [redirect, setRedirect] = useState(false)
const [count, setCount] = useState(product.count)

      const cardTitle = product ? product.name : "A photo from pexels"
      const cardDescription = product ? product.description : "Default Description"
      const cardPrice = product ? product.price : "DEFAULT"

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

const addtoCart = () => {
  addItemCart(product , () => setRedirect(true))
}

const getARedirect = (redirect) => {
  if(redirect){
    return <Redirect to="/cart"/>
  }
}

        const showAddToCart = (addToCart) => {
            return (
                addToCart && (
                <button
                
               
                    onClick={addtoCart}
                    className="btn btn-block mt-2 mb-2"
                  >
                    <motion.img  variants={buttonvaraints}
            whileHover="hover" src={addCart} style={{borderRadius : "50%"}}  height="70" width="70"/>
                  </button>
                )
            )
        }

        const showRemoveFromCart = (removeFromCart) => {
            return (
                removeFromCart && (
                    <button
                    
                    onClick={() => {removeItemFromCart(product._id);
                    setReload(!reload)
                    }}
                    className="btn btn-block mt-2 mb-2"
                  >
                    <motion.img src={removeCart} variants={buttonvaraints}
            whileHover="hover"  style={{borderRadius : "50%"}} height="70" width="70"/>
                  </button>
                )
            )    
        }

        return (
          <div className="card text-white mb-5" style={{background : "#7000FF", borderRadius : "20px", borderColor : "white", borderWidth : "5px"}} >
            <div className="card-header lead"><h3>{cardTitle}</h3></div>
            <div className="card-body">
            {getARedirect(redirect)}
              <ImageHelper product={product}/>
              <p className="lead bg-success font-weight-normal text-wrap mt-2" style={{fontStyle : "italic", borderRadius : "5px",background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", fontWeight : "100"}}>
                {cardDescription}
              </p>
           
              <p className="btn btn-success  btn-sm px-4" style={{background : "#7000FF", fontSize : "20px", borderRadius : "10px", borderColor : "white", borderWidth : "2px"}}><span style={{color : "lightgrey"}}><b>M.R.P :</b> <strike>$ {cardPrice+10}</strike></span><br /><b>Price :</b> $ {cardPrice} </p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addToCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
             
            </div>
          </div>
        );
      };

   

export default Card;