import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {motion} from "framer-motion"
import {createCategory} from "./helper/adminapicall"
 

const AddCategory = (props) => {


    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [getRedirect, setgetRedirect] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChange = event => {
        setError("")
        setName(event.target.value)
    }

    const history = useHistory();

    const onSubmit = event => {
            event.preventDefault();
            setError("")
            setSuccess(false)

            //backend request fired
            createCategory(user._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(true)
                }
                else{
                    setError("")
                    setSuccess(true)
                    setName("")
                    setgetRedirect(true)
                }
            })
    }

const successMsg = () => {
    if(success){
        return <h4 className="text-success">Category created successfully</h4>
    }
}

const load = () => {
    if(getRedirect){
        setTimeout(() => {
            history.push("/admin/dashboard")
        }, 2000);
    }
}

const errorMsg = () => {
    if(error){
        return <h4 className="text-danger">Failed to create category</h4>
    }
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



    const myCategoryForm = () => (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input type="text"
                    style={{borderRadius : "50px", color : "#FF3E3E", borderColor :"#7000FF", borderWidth : "5px", height: "50px"}}
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autofocus
                    required
                    placeholder="For Ex. Tshirts" />
                    <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onSubmit} className="btn" style={{background : "#81E120" , borderRadius : "5px", color : "white"}}>Create Category</motion.button>
                </div>
            </form>
    )

    const goBack = () => (
        <div className="mt-5" >
            <Link  to="/admin/dashboard">
            <motion.button style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "50px", color : "white", height : "35px", borderColor :"white", borderWidth : "2px"}} className="btn btn-sm btn-success mb-3" variants={buttonvaraints}
            whileHover="hover">Admin Home</motion.button></Link>
        </div>
    )

    return (
        <Base title="Create a Category" description="Add a new category for new gadget" 
        className="container bg-info p-4">

        <div className="row" style={{background : "#121117"}}>
            <div className="col-md-8 offset-md-2">
            {successMsg()}
            {errorMsg()}
            {myCategoryForm()}
            {goBack()}
            {load()}
            </div>
        </div>
           
        </Base>
    )
}

export default AddCategory;