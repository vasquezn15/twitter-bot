import React, { useState, Component } from "react";
import { Segment, Accordion, Icon, Item } from "semantic-ui-react";
import Navbar from './NavBar';
import './style.css'

export default class About extends Component{
    state = {activeIndex: 0}

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const{activeIndex} = this.state
        const newIndex = activeIndex ===index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    render(){
        const {activeIndex } = this.state
        
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
                        <p>
                            This program uses artificial intelligence and machine learning to identify bots on Twitter. Meaning, the program was taught 
                            what properties of a Twitter account might mean that account is fake. Some properties taken into conseration were tweet content, 
                            tweet frequency, profile picture, and account bio. The AI was fed information of accounts that were already confirmed to be bots
                            as well as information of accounts that are confirmed to be real (such as verified accounts). Based on its learning, the AI can 
                            identify bots on your account with 90% accuracy.
                        </p>
                    </div>
                    {/* Add Info about Threat Levels below*/}
                    <div class = "aboutThree">
                        <h2>Team Members</h2>
                        <Accordion>
                            {/* Matthew*/}
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClick}
                            >
                                <Icon name='dropdown' />
                                Matthew Scheer
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <p>
                                    Matthew acted as the teams Project Manager. He coordinated team meetings as well as
                                    meetings with the clients, updated the team on deadlines, acted as the middle man between
                                    the team and our client, and presented our client with weekly progress reports.
                                </p>
                            </Accordion.Content>

                            {/* Nico Vasquez*/}
                            <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={this.handleClick}
                            >
                                <Icon name='dropdown' />
                                Nico Vasquez
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <p>
                                    Nico was a staple in ensuring that our React frontend was connected to the backend.
                                    He worked with the Twitter API to allow the application to list an account's followers
                                    and following, compile the required data from those accounts, and send it to our Python 
                                    machine learning modules to identify bots.
                                </p>
                            </Accordion.Content>
                            {/* Cody Walicek*/}
                            <Accordion.Title
                                active={activeIndex === 2}
                                index={2}
                                onClick={this.handleClick}
                            >
                                <Icon size='tiny' name='dropdown' />
                                Cody Walicek
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 2}>
                                <p>
                                    Cody designed everything you see on this website using React.JS and React-Semantic-UI
                                    bootstrap as a complement to traditional CSS. He was key in taking the data returned by
                                    the machine learning models and presenting it on the screen in a user-friendly manner.
                                </p>
                            </Accordion.Content>
                            {/*Justin van*/}
                            <Accordion.Title
                                active={activeIndex === 3}
                                index={3}
                                onClick={this.handleClick}
                            >
                                <Icon size='tiny' name='dropdown' />
                                Justin Van
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 3}>
                                <p>
                                    Justin was a key player in implementing the Python backend for this application. He implemented
                                    Linear Regression and Support Vector Machine (SVM) machine learning models. He also worked with
                                    Nico on handling Twitter API calls.

                                </p>
                            </Accordion.Content>
                            {/* Josh Tiangco*/}
                            <Accordion.Title
                                active={activeIndex === 4}
                                index={4}
                                onClick={this.handleClick}
                            >
                                <Icon size='tiny' name='dropdown' />
                                Josh Tiangco
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 4}>
                                <p>
                                    Josh was staple in ensuring the machine learning modules only sifted through
                                    a Twitter account's info that was needed to identify bots. He is the team's 
                                    Data Analyst and cleaner. He also helped in the integration of Node.js and
                                    Python
                                </p>
                            </Accordion.Content>
                            {/*Daniel Rimmel*/}
                            <Accordion.Title
                                active={activeIndex === 5}
                                index={5}
                                onClick={this.handleClick}
                            >
                                <Icon size='tiny' name='dropdown' />
                                Daniel Rimmel
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 5}>
                                <p>
                                    Daniel is also part of the Python backend team along with Justin, Josh, and James.
                                    He implemented the Decision Tree and Random Forest machine learning models as well as 
                                    handled accuracy testing for both of them.
                                </p>
                            </Accordion.Content>
                            {/*James Anderson*/}
                            <Accordion.Title
                                active={activeIndex === 6}
                                index={6}
                                onClick={this.handleClick}
                            >
                                <Icon size='tiny' name='dropdown' />
                                James Anderson
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 6}>
                                <p>
                                    James began the project implementing a machine learning model called Naive-Bayes.
                                    Upon finding that the results of this model would not be accurate 
                                    enough for this application, he switched to K-Nearest Neighbor model. He is also responsible for
                                    for accuracy testing of this model as well. 
                                </p>
                            </Accordion.Content>
                        </Accordion>
                    </div>
                </div>
            </body>
                
        )
    }
}


   


