import React,{useState} from 'react'
import Base from "../core/Base"
import {Link} from 'react-router-dom'
import {signup} from '../auth/helper/index'
import {motion} from "framer-motion"

export const Signup = () => {

    const [values, setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "",
        success : false
    })

    const {name, email, password, error, success} = values;


    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error : false})
        signup({name, email,password})
        .then(data => {
            if(data.error){
                setValues({...values, error : data.error, success : false})
            }
            else{
                setValues({...values, name : "", email : "", password : "", error : "", success : true})
            }
        })
        .catch(err => console.log(err))
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

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success" style={{display : success ? "" : "none"}}>
            New Account created successfully. Please <Link  to="/signin">login here</Link>
        </div>
        </div>
        </div>
        
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{display : error ? "" : "none"}}>
           {error}
        </div>
        </div>
        </div>
        )
    }


    const signUpForm = () => {
        return (
            <div className="row mb-5">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text"  style={{borderRadius : "50px", color : "#7000FF", borderColor :"#FF3E3E", borderWidth : "5px", height: "50px"}} className="form-control" placeholder="Enter your name" onChange={handleChange("name")} value={name}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email"  style={{borderRadius : "50px", color : "#7000FF", borderColor :"#FF3E3E", borderWidth : "5px", height: "50px"}} className="form-control" placeholder="Enter your email" onChange={handleChange("email")} value={email}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password"  style={{borderRadius : "50px", color : "#7000FF", borderColor :"#FF3E3E", borderWidth : "5px", height: "50px"}} className="form-control" placeholder="Enter your password" onChange={handleChange("password")} value={password}/>
                        </div>
                        <motion.button
                        variants={buttonvaraints}
            whileHover="hover" 
                         onClick={onSubmit} className="btn btn-success btn-block form-control" style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "50px", color : "white", height : "50px", borderColor :"white", borderWidth : "2px", fontSize : "20px", fontWeight : "bold"}}>Submit</motion.button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="SignUp" description="A page for user to sign up">
        {successMessage()}
        {errorMessage()}
            {signUpForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}
