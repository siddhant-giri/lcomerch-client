import React from 'react';
import Menu from './Menu';
import {Link} from "react-router-dom"
import {motion} from "framer-motion"



const Base = ({title="My Title", description = "My description", className="bg-dark text-white p-4", children}) => {

    const containerleftvariants = {
        hidden : {
          x:'-100vw',
          opacity : 0
        },
        visible : {
          opacity : 1,
          x : 0,
          transition : {
            type:'spring', 
            delay : 0.5
          }
        },
      }
  
      const containerrightvariants = {
        hidden : {
          x:'100vw',
          opacity : 0
        },
        visible : {
          opacity : 1,
          x : 0,
          transition : {
            type:'spring', 
            delay : 0.5
          }
        },
      }
      


    return (
        <div style={{background : "#121117"}} className="container-fluid">
        <Menu />
            <div className="container-fluid" style={{background : "#121117"}}>
                <motion.div
                variants = {containerleftvariants}
    initial="hidden"
    animate="visible"
                 className="jumbotron text-white text-center" style={{backgroundColor : "#7000FF", borderRadius : "500px"}}>
                    <h2 style={{fontWeight : "bold"}} className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </motion.div>
                <motion.div
                variants = {containerrightvariants}
    initial="hidden"
    animate="visible"
                 className="" style={{color :" white"}}>{children}</motion.div>
            </div>
            <footer className="footer mt-auto py-3" style={{background : "#121117"}}>
                <div className="container-fluid text-white text-center py-3" style={{background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)"}}>
                    <h4>If you got any question, feel free to reach out</h4>
                     
                     
                    <Link to="/Contact">
                    <motion.button 
                    className="btn  btn-lg" 
                    style={{background : "#81E120", borderRadius : "50px", borderColor : "white", color : "white"}}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    Contact Us
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
</svg>
</motion.button></Link>
                     
                </div>
                <div className="container mt-2">
                    <span style={{fontSize : "18px", color : "white", fontStyle : "italic"}}>
                        ~ An amazing place to buy <span style={{color : "#FF3E3E"}}>Tshirts</span> 
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base;