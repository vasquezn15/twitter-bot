import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Button, Menu, Grid, Header, Form, Image, Input, Label } from 'semantic-ui-react';
import { Dropdown } from "bootstrap";
import twitterImage from './Images/twitter_signin.png';
import Navbar from './NavBar';
import FormLogin from './LoginHome';
import LoginHome from "./LoginHome";

const axios = require('axios');





function Home() {


  return (

    
    <Route>
      <Navbar />
      <LoginHome exact path='/loginhome'/>
    </Route>
  )
      
}
export default Home;

