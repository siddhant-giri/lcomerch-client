import React, { useEffect, useState } from 'react'
import { API } from '../backend';
import "../styles.css"
import Base from "./Base"
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { loadCart } from "./helper/cartHelper"
import StripeCheckout from './StripeCheckout';
import Paymentb from "./Paymentb";
import Contact from "../images/contact.png"



const ContactUs = () => {

  
    return (
        <Base title="Contact Us" description="Do contact Us here">
            
            <div className="container-fluid">
                <div className="row text-center">
                    
                    <div className="col-4">
                    <img src={Contact} width="850" height="800" style={{marginTop : "-200px"}}/>
                    </div>
                     <div className="col-8" style={{textAlign : "right"}}>
                    
        <p style={{color:"white", fontSize : "25px"}}>
        For any query or product related issues,<br />
        Do contact us on the below details<br />
        Email : sidgiri2000@gmail.com <br/>
        Phone No. : 123456789

        </p>
        
                     



                    </div>

                </div>
                </div>
                
                
            
        </Base>
    )
}


export default ContactUs;