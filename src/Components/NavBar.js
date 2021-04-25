import React, { Component } from "react";
import {
  NavLink,
} from "react-router-dom";
import { Menu, Segment, Button } from "semantic-ui-react";
import "./style.css";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
        
    }
    

  itemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = () => {
    this.props.userId = null;
    this.props.username = null;
  };
  render() {

    let button;
    if (this.props.userId) {
      button = (
        <Button
          primary
          color="twitter"
          onClick={this.logout}
          icon="twitter"
          content="Logout"
        />
      );
    } else {
      button = (
        // <Button
        //   primary
        //   color="twitter"
        //   href="http://localhost:5000/twitter/authoriz"
        //   icon="twitter"
        //   content="Login with Twitter"
        // />
        <Menu.Item
          name='Please Login'
          href=''
        />
      );
    }

    return (
      <div class="navbar">
        <Segment inverted>
          <Menu inverted secondary class = "menu">
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
