import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteProduct, getProducts } from './helper/adminapicall'
import {motion} from "framer-motion"


const ManageProducts = () => {

const [products, setProducts] = useState([])

const {user,token} = isAuthenticated();

const preload = () => {
    getProducts().then(data => {
        if(data.error){
            console.log(data.error);
        }
        else{
            setProducts(data)
        }
    })
}

useEffect(() => {
    preload();
},[])

const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
        if(data.error){
            console.log(data.error);
        }
        else{
            preload();
        }
    })
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

    return (
        <Base title="All Products" description="Manage products here">
      
      <Link  to="/admin/dashboard">
            <motion.button style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "50px", color : "white", height : "35px", borderColor :"white", borderWidth : "2px"}} className="btn btn-sm btn-success mb-3" variants={buttonvaraints}
            whileHover="hover">Admin Home</motion.button></Link>
      <div className="row">
      <div className="col-12">
          <h2 className="text-center text-white my-3" style={{background : "#ff3e3e", fontWeight : "400"}}>Total {products.length} products</h2>

            {products.map((product, index)=> (
              
                
          <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left" style={{fontWeight : "200", fontSize : "25px"}}>{product.name}</h3>
            </div>
            <div className="col-4">
              <Link
               
                to={`/admin/product/update/${product._id}`}
                
              >
                <motion.button 
                 className="btn btn-success"
                style={{background : "#7000ff", borderRadius : "50px", color : "white"}}
                whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >Update</motion.button>
              </Link>
            </div>
            <div className="col-4">
              <motion.button
              whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
               style={{background : "#ff3e3e", borderRadius : "50px", color : "white"}} onClick={() => {
                  deleteThisProduct(product._id)
              }} className="btn btn-danger">
                Delete
              </motion.button>
            </div>
            </div>
            
            )
            )}

</div>
         
        </div>
      
    </Base>
    )
}


export default ManageProducts