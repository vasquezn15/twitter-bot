import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import Navbar from './NavBar';
import './style.css'

function About(){
    return(
        
        <body class = "body">
            
                <Navbar />
                
                <div class = "aboutContainer">
                    
                    <h1>About Us</h1>
                    <div class = "aboutOne">
                        <h2>What is the Twitter Bot Detector?</h2>
                        <p>
                            The Twitter Bot Detector Web tool allows a Twitter user to assess their account's followage and friends to
                            determine which accounts are bot and which accounts are run by a real person. This application uses Artificial 
                            Intelligence to determine which accounts are bots and which are not and also presents them with a threat level as
                            well as the ability to unfollow or unblock them.
                        </p>
                        <p>
                            This web tool is intended for those who are concerned about their privacy, security, or peace of mind regarding the
                            presence of bots on Twitter.
                        </p>
                    </div>
                    <div class = "aboutTwo">
                        <h2>Artificial Intelligence?</h2>
                        <p>This program uses artificial intelligence and machine learning to identify bots on Twitter. Meaning, the program was taught 
                            what properties of a Twitter account might mean that account is fake. Some properties taken into conseration were tweet content, 
                            tweet frequency, profile picture, and account bio. The AI was fed information of accounts that were already confirmed to be bots
                            as well as information of accounts that are confirmed to be real (such as verified accounts). Based on its learning, the AI can 
                            identify bots on your account with 90% accuracy.
                        </p>
                    </div>
                    {/* Add Info about Threat Levels below*/}
                    <div class = "aboutThree">
                        <h2>Threat Levels</h2>
                    </div>
                    
                </div>    
            
        </body>
        
    )
}

export default About;