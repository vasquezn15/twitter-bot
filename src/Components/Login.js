import React, { Component } from "react";
import { Button, Menu, Header, Segment } from "semantic-ui-react";
import "./style.css";
import Navbar from "./NavBar";
import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6Lduq8caAAAAABnRwGxGEP2yMj-9JHYDaj371iMU";
const DELAY = 1500;

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "[empty]",
      load: false,
      expired: false,
      disabled: true,
    };
    this._reCaptchaRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
  }

  handleChange = (value) => {
    this.setState({ value, disabled: false });
    // if value is null recaptcha expired
    if (value === null) this.setState({ expired: true });
  };

  asyncScriptOnLoad = () => {
    this.setState({ callback: true });
  };

  render() {
    return (
      <body class="body">
        <Navbar />
        <div class="loginFormContainer">
          <div class="loginForm">
            <h2> Welcome to the Twitter Bot Detection Tool</h2>
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

            {/* captcha challenge: placeholder */}
            <ReCAPTCHA
              style={{ display: "inline-block" }}
              theme="dark"
              ref={this._reCaptchaRef}
              sitekey={TEST_SITE_KEY}
              onChange={this.handleChange}
              asyncScriptOnLoad={this.asyncScriptOnLoad}
            />

            <div class="TwitterLoginButton">
              <Button
                primary
                color="twitter"
                href="http://localhost:5000/twitter/authoriz"
                icon="twitter"
                content="Login with Twitter"
                disabled={this.state.disabled}
              />
            </div>
          </div>
        </div>
      </body>
    );
  }
}
