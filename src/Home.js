import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Menu, Grid, Header, Form, Image, GridColumn } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


function Home() {



  return (



    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign='middle'>
      
      <Grid.Row style={{ maxHeight: 50 }}>
        <Menu compact>
        <Menu.Item><Link to='/'>Home</Link></Menu.Item>
        <Menu.Item><Link to=''>About</Link></Menu.Item>
        <Menu.Item>Login</Menu.Item>
      </Menu>
      </Grid.Row>

      <Header as='h2' color='teal' textAlign='center' ver>
        <Image src='/logo.png' /> Twitter Detection Bot
      </Header>
      

      <Grid.Row>
        
        <Form.Input
          id='twitterID'
          iconPosition='left'
          placeholder='Twitter Handle'
          style={{maxHeight: 50}, {maxWidth: 200}}
        />

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