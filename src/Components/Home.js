import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Menu, Grid, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


function Home() {

  return (



    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Row position="right" style={{ maxHeight: 50 }}>
        <Menu compact>
        <Menu.Item><Link to='/'>Home</Link></Menu.Item>
        <Menu.Item><Link to=''>About</Link></Menu.Item>
        <Menu.Item><Link to=''>Login</Link></Menu.Item>
      </Menu>
      </Grid.Row>

      <Grid.Row>
        <input.Form>
        </input.Form>
      </Grid.Row>
    </Grid>

  )
}
export default Home;