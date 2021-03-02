import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getCategories } from './helper/adminapicall';
import {motion} from "framer-motion"


const ManageCategories = () => {

 
    

const [categories, setCategories] = useState([])

const {user,token} = isAuthenticated();

const preload = () => {
    getCategories().then(data => {
        if(data.error){
            console.log(data.error);
        }
        else{
            setCategories(data)
        }
    })
}

useEffect(() => {
    preload();
},[])

const deleteThisCategory = categoryId => {
  deleteCategory(categoryId, user._id, token).then(data => {
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
        <Base title="All Categories" description="Manage products here">
      
      <Link  to="/admin/dashboard">
            <motion.button style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "50px", color : "white", height : "35px", borderColor :"white", borderWidth : "2px"}} className="btn btn-sm btn-success mb-3" variants={buttonvaraints}
            whileHover="hover">Admin Home</motion.button></Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3" style={{background : "#ff3e3e", fontWeight : "400"}}>Total {categories.length} Categories</h2>
            {
                categories.map((category, index) => {
                    return(
                      <div className="row text-center mb-2 " key={index}>
            <div className="col-4">
              <h3 className="text-white text-left" style={{fontWeight : "200", fontSize : "25px"}}>{category.name}</h3>
            </div>
            <div className="col-4">
             
            </div>
            <div className="col-4">
              <motion.button 
              whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
              style={{background : "#ff3e3e", borderRadius : "50px", color : "white"}} onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">
                Delete
              </motion.button>
            </div>
            
          </div>

                    )
                })
            }
          
        </div>
      </div>
    </Base>
    )
}


export default ManageCategories;