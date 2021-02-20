import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink
} from "react-router-dom";
import {Menu, Segment} from 'semantic-ui-react';
import { Dropdown } from "bootstrap";
import twitterImage from './Images/twitter_signin.png';
import './style.css'



export default class Navigation extends Component{
    state = {}
    itemClick = (e, {name}) => this.setState({activeItem: name})
    
    render() {
        const {activeItem} = this.state

        return(
            <div class = "navbar">
                <Segment inverted>
                    <Menu inverted pointing secondary widths ="2">
                        <Menu.Item 
                            as = {NavLink} exact to = "/"
                            name = 'home'
                            active = {activeItem === 'home'}
                            onClick = {this.itemClick}
                        />
                        
                        <Menu.Item
                            as = {NavLink} exact to = "/About"
                            name = 'about'
                            active = {activeItem === 'about'}
                            onClick = {this.itemClick} 
                        />

                    </Menu>
                </Segment>    
            </div>

        )
    }
}

