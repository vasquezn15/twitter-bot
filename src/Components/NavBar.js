import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink
} from "react-router-dom";
import {Menu, Segment, Button, Icon} from 'semantic-ui-react';
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
                    <Menu inverted secondary>
                    <Menu.Item header>Twitter Bot Detection Web Tool</Menu.Item>
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

                        <Menu.Item>
                            <Button primary color = "twitter" href='http://localhost:5000/twitter/authoriz'> 
                            <Icon name = 'twitter' />
                                    Login with Twitter
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button primary color = "twitter" href='http://localhost:5000/twitter/logout'> 
                            <Icon name = 'twitter' />
                                    Logout
                            </Button>
                        </Menu.Item>
                    </Menu>
                </Segment>    
            </div>

        )
    }
}

