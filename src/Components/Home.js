  
import React, { useState } from "react";
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
import LoginForm from './Login';

const axios = require('axios');




function Home() {

  const [credentials, setCredentials] = useState({
    username: ""
  });

  const handleUsername = (event, data) =>{
    setCredentials({type: data.value})
  }


  const handleLogin = (e) => {
    axios.get("http://localhost:5001/auth/twitter");
  }

  const handleSubmit = (e) => {
  }

  return (
    
    <React.Fragment>
      <Navbar />
      <LoginForm />
    </React.Fragment>

  )
      
}
export default Home;




