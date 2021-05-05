  
import React, { Component } from "react";
import {
  NavLink, useHistory
} from "react-router-dom";
import { Menu, Segment, Button } from "semantic-ui-react";
import "./style.css";

function NavBar(props) {
  let history = useHistory();
    
  const handleLogoutClick = () => {
    history.push('/');
    props.logout();
  }
  

    let button;
    if (props.userId) {
      button = (
        <Button
          primary
          color="twitter"
          onClick={handleLogoutClick}
          icon="twitter"
          content="Logout"
        />
      );
    } else {
      button = (
        <Menu.Item
          name='Please Login'
        />
      );
    }

    return (
      <div class="navbar">
        <Segment inverted>
          <Menu inverted secondary>
            <Menu.Item header>Twitter Bot Detection Web Tool</Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/"
              name="home"
            />

            <Menu.Item
              as={NavLink}
              exact
              to="/About"
              name="about"
            />
            <Menu.Item
              content={button}
            />
          </Menu>
        </Segment>
      </div>
    );
}

export default NavBar;