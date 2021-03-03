import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import {
  Button,
  Menu,
  Grid,
  Header,
  Form,
  Image,
  Input,
  Label,
} from "semantic-ui-react";
import { Dropdown } from "bootstrap";
import twitterImage from "./Images/twitter_signin.png";
import Navbar from "./NavBar";
import LoginForm from "./Login";

function Home() {
  const axios = require("axios");
  const getQueryParam = (paramName) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramName);
  };

  const [userId, setUserId] = useState(getQueryParam("user_id"));
  const [username, setUsername] = useState(getQueryParam("username"));

  const logout = () => {
    setUserId(null);
    setUsername(null);
  };

  return (
    <Route>
      <Navbar userId={userId} username={username} logout={logout}/>
      <LoginForm userId={userId} username={username}/>
    </Route>
  );
}
export default Home;
