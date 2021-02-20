import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Form, Button, Segment, Icon, Grid, Divider, Checkbox } from 'semantic-ui-react';
import twitterImage from './Images/twitter_signin.png';
import './style.css'
const axios = require('axios');

const LoginForm = () => {

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

    return(
        <div class = "loginForm">
            <Segment placeholder  basic padded>
                <Grid columns = {2} stackable textAlign ="center">
                    <Divider vertical>Or</Divider>
                    <Grid.Row verticalAlign = "middle">
                        <Grid.Column>
                            
                                <Form>
                                    <Form.Field>
                                        <label placeholder= "@example">Enter your Twitter Handle</label>
                                        <input placeholder= "@example"  />
                                    </Form.Field>
                                    <Form.Field>
                                        <Checkbox radio label = "Check your followers"/>
                                        <Checkbox radio label = "Check who you follow"/>
                                    </Form.Field>
                                    <Button primary size = "big">Check your Account</Button>
                                </Form>
                            
                        </Grid.Column>
                        <Grid.Column>
                                <Button primary color = "twitter" size ="huge" onClick = {handleLogin}> 
                                <Icon name = 'twitter' />
                                Login with Twitter</Button>
                        </Grid.Column>    
                    </Grid.Row>
                </Grid>    
            </Segment>
            
        </div>
    )
}

export default LoginForm
