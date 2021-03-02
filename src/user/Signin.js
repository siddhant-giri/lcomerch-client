import React,{useState} from 'react'
import Base from "../core/Base"
import {Link, Redirect} from 'react-router-dom'
import {signin, authenticate, isAuthenticated} from "../auth/helper/index"
import {motion} from "framer-motion"

export const Signin = () => {

    const [values, setValues] = useState({
        email : "",
        password : "",
        error : "",
        loading : false,
        didRedirect : false
    })

    const {email,password,didRedirect,error,loading} = values

    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error : false, loading : true})
        signin({email,password})
        .then(data => {
            if(data.error){
                setValues({...values, error : data.error, loading: false})
            }
            else{
                authenticate(data, () => {
                    setValues({...values, didRedirect : true})
                })
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


    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }
            else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        
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


    const signInForm = () => {
        return (
            <div className="row mb-5">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" style={{borderRadius : "50px", color : "#7000FF", borderColor :"#FF3E3E", borderWidth : "5px", height: "50px"}} value={email} onChange={handleChange("email")} placeholder="Enter your email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" style={{borderRadius : "50px", color : "#7000FF", borderColor :"#FF3E3E", borderWidth : "5px", height : "50px"}} placeholder="Enter your password" className="form-control" value={password} onChange={handleChange("password")} />
                        </div>
                        <motion.button
                        variants={buttonvaraints}
            whileHover="hover" 
             onClick={onSubmit} className="btn  btn-block form-control mt-3" style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "50px", color : "white", height : "50px", borderColor :"white", borderWidth : "2px", fontSize : "20px", fontWeight : "bold"}}>Submit</motion.button>
                    </form>
                </div>
            </div>
        )
    }




    return (
        <Base title="Signin" description="A page for user to sign in">
        {loadingMessage()}
        {errorMessage()}
            {signInForm()}
            {performRedirect()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}
