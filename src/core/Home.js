import React, { useEffect, useState } from 'react'
import { API } from '../backend';
import "../styles.css"
import Base from "./Base"
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import vector1 from "../images/vector1.png";
import Menu from './Menu';
import {Link} from 'react-router-dom'
import {motion, useCycle} from "framer-motion"




export default function Home() {

   

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");
    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProduct()
    }, [])


    
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
      

      

      const textvaraints = {
  
        initial : {
            opacity : 0.3
        },
    
        visible : {  
              opacity : 1,
              transition : {
                duration : 0.8,
                yoyo : Infinity,
                
                
              }
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

    return (
        // <Base title="Home Page" description="Welcome to LCO-Merch" style={{background : "#121117"}}>
<div className="container-fluid">

<Menu />
<div className="row">
    <motion.div 
    variants = {containerleftvariants}
    initial="hidden"
    animate="visible"
    
    className="col-6 container p-5">
        <h1 className="mt-5" style={{color : "#FF3E3E", fontSize : "50px"}}>Hey There,</h1>
        <p style={{color:"#7000FF", fontSize : "30px"}}>Welcome to LCO Merch, <br /> grab your awesome attire soon.</p>
        <motion.button 
        variants={buttonvaraints}
            whileHover="hover"
        style={{height : "60px" , width : "200px", borderRadius : "50px",borderColor : "white", background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)" , color : "white",  fontWeight : "bold"}}>Start Shopping  
        &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
</svg>
        </motion.button>
       
    
    </motion.div>
    <motion.div
    variants = {containerrightvariants}
    initial="hidden"
    animate="visible"
     className="col-6">
        <motion.img
        animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
         height="550" width="550" style={{marginTop : "-60px"}} src={vector1}/>
    </motion.div>

</div>

<div className="container-fluid"> 
 <div className="row text-center mt-5">
                
                <motion.h1
                 className="mb-5" 
                 variants={textvaraints}
                 initial="initial"
                    animate="visible"
                 style={{fontSize : "80px",borderRadius : "20px", background : "linear-gradient(90deg, rgba(255,62,62,1) 35%, rgba(112,0,255,1) 100%)", color : "white"}}> 
                 Grab Your Merch!!!  &nbsp;
                 <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="mb-3 bi bi-shop" viewBox="0 0 16 16">
  <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
</svg>
                 </motion.h1>
                <div className="row">
                    {products.map((product,index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card 
                               
                                product={product}/>
                            </div>
                        )
                    })}
                </div>
                   
            </div>
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
        // </Base>
    )
}
