import React, { useState, Component } from "react";
import {
  Form,
  Image,
  Button,
  Segment,
  Icon,
  Grid,
  Divider,
  Checkbox,
  Label,
  List,
  Menu,
  Container,
} from "semantic-ui-react";
import "./style.css";
import Navbar from "./NavBar";
import twitter_avatar from "./Images/twitter_avatar.png";
import { Nav } from "react-bootstrap";
import LoginHome from "./LoginHome";
const axios = require("axios");

export default class ButtonLogin extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }
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
      return <LoginHome />;
      //  button = (
      //    <Button
      //      primary
      //      color="twitter"
      //      href="http://localhost:5000/twitter/logout"
      //      onClick={this.handleLogoutClick}
      //      icon="twitter"
      //      content="Logout"
      //    />
      //  );
    } else {
      button = (
        <Button
          primary
          color="twitter"
          href="http://localhost:5000/twitter/authorize"
          onClick={this.handleLoginClick}
          icon="twitter"
          content="Login with Twitter"
        />
      );

      return (
        <div>
          <div class="LoginForm">
            <h1> Welcome to the Twitter Bot Detection Tool</h1>
            <div class="LoginFormParagraphs">
              <p>
                This tool uses Artificial Intelligence to detect detect which
                accounts that follow you and the accounts that you follow are
                fake (bots). To learn more, click on the About tab at the top.
              </p>
              <p>
                To get started, log into twitter by clicking the button below!
              </p>
            </div>
          </div>

          <div class="TwitterLoginButton">
            <Menu secondary>
              <Menu.Item content={button} />
            </Menu>
          </div>
        </div>
      );
    }
  }
}
