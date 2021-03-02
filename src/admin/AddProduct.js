import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getCategories } from './helper/adminapicall';
import {motion} from "framer-motion"

const AddProduct = (props) => {

  const {user , token} = isAuthenticated();

    const [values, setValues] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        photo :"",
        categories : [],
        category : "",
        loading : false,
        error : "",
        createdProduct : "",
        getRedirect : false,
        formData : ""
    })

    const {name, description, price, stock, photo, 
        categories, category, loading, error, createdProduct, 
        getRedirect, formData } = values;

    const preload = () => {
            getCategories().then(data => {
                console.log(data);
                if(data.error){
                    setValues({...values, error : data.error})
                }
                else{
                    setValues({...values, categories : data, formData : new FormData()})
                    console.log(categories);
                }
            })
    }

    useEffect(() => {
        preload();
    }, [])

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


    const history = useHistory();

    const onSubmit = (event) => {
      event.preventDefault();
      setValues({...values, error : "", loading : true})
      createProduct(user._id, token, formData).then(data => {
        if(data.error){
          setValues({...values, error : data.error})
        }
        else{
          setValues({
            ...values,
            name : "",
            description:"",
            price : "",
            photo : "",
            stock : "",
            loading : false,
            createdProduct : data.name,
            getRedirect : true
          })
        }
      })
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value 
        formData.set(name, value);
        setValues({...values, [name] : value})
    }

  
// const load = setTimeout(() => {
//   if(getRedirect){     
//     return <Redirect to="/admin/dashboard"/>
// }
// }, 2000);

    const performRedirect = () => {
      if(getRedirect){
          setTimeout(() => {
            history.push("/admin/dashboard")
          }, 2000);
      }
    }

    const successMsg = () => (
      <div className="alert alert-success mt-3" style={{display : createdProduct ? "" : "none"}}>
        <h4>{createdProduct} successfully created </h4>
      </div>
    )

    

    const errorMsg = () => {
      if(error){
          return <h4 className="text-danger">Failed to create product</h4>
      }
  }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group" >
            <label className="btn btn-block"  style={{borderRadius : "50px", color : "white", background : "#7000ff", height: "50px"}}>
              <input
             
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
            style={{borderRadius : "50px", color : "#FF3E3E", borderColor :"#7000FF", borderWidth : "5px", height: "50px"}}
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
            style={{borderRadius : "50px", color : "#FF3E3E", borderColor :"#7000FF", borderWidth : "5px", height: "50px"}}
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
            style={{borderRadius : "50px", color : "#FF3E3E", borderColor :"#7000FF", borderWidth : "5px", height: "50px"}}
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
            style={{borderRadius : "50px", color : "#FF3E3E", borderColor :"#7000FF", borderWidth : "5px", height: "50px"}}
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && 
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))}
              
            </select>
          </div>
          <div className="form-group">
            <input
            style={{borderRadius : "50px", color : "#FF3E3E", borderColor :"#7000FF", borderWidth : "5px", height: "50px"}}
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <motion.button whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{background : "#81E120" , borderRadius : "5px", color : "white"}} type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </motion.button>
        </form>
      );

    return (
        <Base title="Add Product" description="welcome to product creation section" className="container bg-info p-4">
            
            <Link  to="/admin/dashboard">
            <motion.button style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "50px", color : "white", height : "35px", borderColor :"white", borderWidth : "2px"}} className="btn btn-sm btn-success mb-3" variants={buttonvaraints}
            whileHover="hover">Admin Home</motion.button></Link>
            <div className="row text-white rounded" style={{background : "#121117"}}>
                <div className="col-md-8 offset-md-2">
                {successMsg()}
                {errorMsg()}
                   {createProductForm()}
                  {performRedirect()}
                </div>
            </div> 
        </Base>
    )
}


export default AddProduct;