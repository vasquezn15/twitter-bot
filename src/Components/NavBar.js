import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";
import { Menu, Segment, Button, Icon } from "semantic-ui-react";
import { Dropdown } from "bootstrap";
import twitterImage from "./Images/twitter_signin.png";
import "./style.css";

export default class Navigation extends Component {
//   constructor(props) {
//     super(props);
//     this.handleLoginClick = this.handleLoginClick.bind(this);
//     this.handleLogoutClick = this.handleLogoutClick.bind(this);
//     this.state = { isLoggedIn: false };
//   }
        state = {};


  itemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    const { activeItem } = this.state;
    const isLoggedIn = this.state.isLoggedIn;

    let button;
    if (isLoggedIn) {
      button = (
        <Button
          primary
          color="twitter"
          href="http://localhost:5000/twitter/logout"
          onClick={this.handleLogoutClick}
          icon="twitter"
          content="Logout"
        />
      );
    } else {
      button = (
        <Button
          primary
          color="twitter"
          href="http://localhost:5000/twitter/authoriz"
          onClick={this.handleLoginClick}
          icon="twitter"
          content="Login with Twitter"
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
              active={activeItem === "home"}
              onClick={this.itemClick}
            />

            <Menu.Item
              as={NavLink}
              exact
              to="/About"
              name="about"
              active={activeItem === "about"}
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
