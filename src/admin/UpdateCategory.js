import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

import {updateCategory, getCategory} from "./helper/adminapicall"

export default function UpdateCategory({match}) {


    
    // const [name, setName] = useState("")
    // const [error, setError] = useState(false)
    // const [success, setSuccess] = useState(false)
    // const [getRedirect, setgetRedirect] = useState(false)


    const [values, setValues] = useState({
        name : "",
        error : "",
        success : false,
        getRedirect : false
    })

    const {name,error, success,getRedirect} = values;

    const {user, token} = isAuthenticated()

    

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
           
            if(data.error){
                setValues({...values, error : data.error})
            }
            else{
                setValues({
                    ...values,
                    name : data.name
                })
                
            }
        })
}



    useEffect(() => {
        preload(match.params.categoryId);
    }, [])

    const history = useHistory();

    
    
    
    const onSubmit = event => {
        event.preventDefault();
        // setError("")
        // setSuccess(false)
        setValues({...values, error : ""});
       console.log(name);
        //backend request fired
        updateCategory(match.params.categoryId, user._id, token, name)
        .then(data => {
                
console.log(data);
            console.log(data.name);
            if(data.error){
                setValues({...values, error : data.error})
            }
            else{
               setValues({
                   ...values,
                   name : "",
                   getRedirect : true,
                   success : true
               })
            }
        })
}


const handleChange = name => event => {
    setValues({...values, error : false, [name] : event.target.value})
}



const successMsg = () => {
if(success){
    return <h4 className="text-success">Category updated successfully</h4>
}
}

const load = () => {
if(getRedirect){
    setTimeout(() => {
        history.push("/admin/categories")
    }, 2000);
}
}

const errorMsg = () => {
if(error){
    return <h4 className="text-danger">Failed to update category</h4>
}
}

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Update the category</p>
                <input type="text"
                className="form-control my-3"
                onChange={handleChange("name")}
                value={name}
                autofocus
                required
                placeholder="" />
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
)

 const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )


    return (
        <Base title="Update Category" description="Update a category for gadget" 
        className="container bg-info p-4">

        <div className="row bg-white rounded">
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
