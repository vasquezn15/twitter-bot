import React, { useState } from "react";
import Navbar from './NavBar';
import './style.css'

function About(){
    return(
        <React.Fragment>
            <Navbar />
            <div className= "about">
                <p>This is the About page</p>
            </div>    
        </React.Fragment>
    )
}

export default About;