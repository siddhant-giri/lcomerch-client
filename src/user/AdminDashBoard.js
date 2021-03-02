import React from 'react'
import Base from '../core/Base'
import {isAuthenticated} from "../auth/helper/index"
import { Link } from 'react-router-dom'



const AdminDashBoard = () => {

    const {user : {name,email,role}} = isAuthenticated()

    const adminLeftSide = () => {
        return (
                <div className="card" style={{borderRadius : "20px"}}>
                    <h4 className="card-header  text-white" style={{background : "#FF3E3E", borderRadius : "20px"}}>Admin Navigation</h4>
                    <ul className="list-group" style={{borderRadius : "20px"}}>
                        <li className="list-group-item">
                            <Link to="/admin/create/category" className="nav-link " style={{fontSize : "20px", color :"#FF3E3E", fontWeight : "400"}}>Create Categories</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/categories" className="nav-link " style={{fontSize : "20px", color :"#FF3E3E", fontWeight : "400"}}>Manage Categories</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/create/product" className="nav-link " style={{ fontSize : "20px", color :"#FF3E3E", fontWeight : "400"}}>Create Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/products" className="nav-link " style={{ fontSize : "20px", color :"#FF3E3E", fontWeight : "400"}}>Manage Products</Link>
                        </li>
                        
                    </ul>
                </div>
        )
    }

    const adminRightSide = () => {
        return (
                <div className="card mb-4" style={{background : "#7000ff", borderRadius : "20px"}}>
                    <h4 className="card-header">Admin Information</h4>
                    <ul className="list-group" style={{color:"#7000FF"}}>
                        <li className="list-group-item" >
                            <span style={{background : "#81E120"}} className="badge badge-success p-2">Name: </span>  <b>{name}</b>
                        </li>
                        <li className="list-group-item">
                            <span style={{background : "#81E120"}} className="badge badge-success p-2">Email: </span>  <b>{email}</b>
                        </li>
                        <li className="list-group-item">
                            <span className="badge badge-danger p-2" style={{background : "#FF3E3E"}}>Admin Area</span>
                        </li>
                    </ul>
                        
                </div>
        )
    }


    return (
        <Base title="Welcome to Admin area" description="Manage all of your Merch here" className="container bg-success p-4">

        <div className="row">
            <div className="col-3">
            {adminLeftSide()}
            </div>
            <div className="col-9">
            {adminRightSide()}
            </div>

        </div>
           
          
        </Base>
    )
}


export default AdminDashBoard;