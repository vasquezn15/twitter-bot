import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";
import { Menu, Segment, Button } from "semantic-ui-react";
import "./style.css";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
        
  }
    
  itemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogoutClick = () => {
    this.props.logout()
  }
  
  render() {

    let button;
    if (this.props.userId) {
      button = (
        <Button
          primary
          color="twitter"
          onClick={this.handleLogoutClick}
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
              onClick={this.itemClick}
            />

            <Menu.Item
              as={NavLink}
              exact
              to="/About"
              name="about"
              onClick={this.itemClick}
            />
            <Menu.Item
              content={button}
            />
          </Menu>
        </Segment>
      </div>
    );
  }
}
