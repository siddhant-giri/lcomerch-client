import React from 'react'
import Base from '../core/Base'
import {isAuthenticated} from "../auth/helper/index"
import userdashboard from "../images/userdashboard.jpg"
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'



const UserDashBoard = () => {

    const {user : {name,email,role}} = isAuthenticated();

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
        <Base title="UserDashBoard Page" description="Let's Start Shopping">
            <div  className="row">
            <div className="col-6">
                <img src={userdashboard} height="550" width="550" style={{borderRadius : "50%"}} />
            </div>
            <div className="col-6">
            <h1 className="mt-5" style={{color : "#FF3E3E", fontSize : "50px", textAlign : "right"}}>Hey There, {name}</h1>
        <p style={{color:"#fFF", fontSize : "30px", textAlign : "right"}}>Welcome to LCO Merch, <br /> There are Amazing merch waiting for you <br /> so go grab yourself some Amazing clothing
        
        </p>

        


        <Link
        className="ml-5"
        to="/"><motion.button 
        variants={buttonvaraints}
            whileHover="hover"
            style={{ height : "60px" , width : "550px", borderRadius : "50px",borderColor : "white", background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)" , color : "white",  fontWeight : "bold"}}>Buy Merch
            &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
</svg>
            </motion.button>
        </Link>
        
            </div>


            </div>
        </Base>
    )
}

export default UserDashBoard;
