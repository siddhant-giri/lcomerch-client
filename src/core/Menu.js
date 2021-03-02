import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper';
import logo from "../images/lcomerchlogo.png"
import { motion } from "framer-motion"

const currentTab = (history, path) => {
    if(history.location.pathname === path){
            return {color : "#81E120"}      
    }
    else {
        return {color : "white"}
    }
}

const pngvariants = {
    hidden : {
      rotate : -180,
      opacity : 0,
      pathLength : 0
    },
    visible : {
      rotate : 0,
      opacity : 1,
    pathLength : 1,
      scale : 1.3,
      transition : {
        duration : 1,
        ease : "easeInOut"
      }
    }
  }


  const containerrightvariants = {
    hidden : {
      y:'-100vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      y : 0,
      transition : {
        type:'spring', 
        mass: 0.4,
        damping : 8,
        delay : 1
      }
    },
  }

const Menu = ({history}) => {
    return(
        <div>
       
        <motion.img  
        variants={pngvariants}
        initial="hidden"
        animate="visible"
        drag
        dragConstraints={{left : 0, top : 0, right : 0, bottom : 0}}
        dragElastic={0.7}
     className="mt-4 ml-3 mb-3" height="120" width="120" src={logo} />
            <motion.ul
            variants = {containerrightvariants}
            initial="hidden"
    animate="visible"
             className="nav mt-3 mr-3" style={{float : "right", fontSize : "20px", backgroundColor : "#121117"}}>
            
            
                <motion.li className="nav-item"
                whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}>
                     <Link style={currentTab(history, "/")} className="nav-link" to="/">Home </Link>
                </motion.li>
                <motion.li className="nav-item"
                whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}>
                     <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
                </motion.li>

                {isAuthenticated() && isAuthenticated().user.role ===0 && (
                    <motion.li className="nav-item"
                    whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                    >
                     <Link style={currentTab(history, "/user/dashboard")}  className="nav-link" to="/user/dashboard">DashBoard</Link>
                </motion.li>
                )}
                

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <motion.li className="nav-item"
                    whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                    >
                     <Link style={currentTab(history, "/admin/dashboard")}  className="nav-link" to="/admin/dashboard">Admin-DashBoard</Link>
                </motion.li>
                )}
                


               {!isAuthenticated() && (
                          <Fragment>
                          <motion.ul
                          whileHover={{ scale: 1.1 }}
                           className="nav" style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "50px", color : "white"}}>
                                   <motion.li className="nav-item" whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}>
                                        <Link 
                                        style={currentTab(history, "/signup")}  className="nav-link" to="/signup">SignUp  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></Link>
                                   </motion.li>
                                   
                                   <motion.li className="nav-item" whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}>
                                         <Link
                                         
                                          style={currentTab(history, "/signin")} className="nav-link" to="/signin">SignIn
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
                                          </Link>
                                   </motion.li>
                                   </motion.ul>
                          </Fragment>
               )} 
                


                {isAuthenticated() && (
                    <li className="nav-item">
                    <motion.span
                    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
     className="nav-link" style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", borderRadius : "25px", color : "white", cursor : "pointer"}} onClick={()=>{
                         signout(() => {
                              history.push("/")
                         })
                    }} >SignOut &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
  <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
</svg>
                    
                    </motion.span>
                </li>
                )}
                

            </motion.ul>
        </div>
    )
}



export default withRouter(Menu);