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

    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign='middle'>
      
        <Menu class='navbar'>
        <Menu.Item><Link to='/'>Home</Link></Menu.Item>
        <Menu.Item><Link to=''>About</Link></Menu.Item>
        <Menu.Item>
            <Button onClick={handleLogin}>
              <Image
              src={twitterImage}
              size='small'
              />
            </Button>
          </Menu.Item>
        </Menu>

      <Header as='h2' color='teal' textAlign='center' ver class="navbar-header">
        <Image src='/logo.png' /> Twitter Detection Bot
      </Header>
      
      
      <Grid.Row>
      <Form>
        <Form.Field>
                <Form.Input
                  name="login"
                  type="username"
                  id="username"
                  placeholder="Twitter Handle"
                  label="username"
                  value={credentials.username}
                  onChange={handleUsername}  
                />
          </Form.Field>

        <Button href=''>Login</Button>
        
        </Form>
        <Form.Field>
        <Button.Group style={{maxHeight: 50}}>
          <Button>
            <Button.Content visible>Check Following</Button.Content>
          </Button>
          <Button>Check Followers</Button>
        </Button.Group>
        </Form.Field>
      </Grid.Row>
      
    </Grid>

  )
      
}
export default Home;