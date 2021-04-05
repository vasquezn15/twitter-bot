import React, { Component } from "react";
import {
  Button,
  Menu,
  Header,
  Segment,
} from "semantic-ui-react";
import "./style.css";
import Navbar from "./NavBar";


export default class LoginForm extends Component {

  render() {
    
    return (
      <Segment textAlign='left' class='LoginForm'>
        <Navbar />
            <Header> Welcome to the Twitter Bot Detection Tool</Header>
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

          <div class="TwitterLoginButton">
            <Menu secondary>
              <Menu.Item content={<Button
          primary
          color="twitter"
          href="http://localhost:5000/twitter/authoriz"
          icon="twitter"
          content="Login with Twitter"
        />} />
            </Menu>
          </div>
      </Segment>
    );
  }
}