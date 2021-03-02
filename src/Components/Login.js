import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import {
  Form,
  Button,
  Segment,
  Icon,
  Grid,
  Divider,
  Checkbox,
  Label
} from "semantic-ui-react";
import twitterImage from "./Images/twitter_signin.png";
import "./style.css";
const axios = require("axios");

const LoginForm = () => {
    const [userId, setUserId] = useState();
    
    const [username, setUsername] = useState();

    const isLoggedIn = useState(false)

  const [followers, setFollowers] = useState([]);

  const [usersFollowing, setFollowing] = useState([]);

  const getQueryParam = (paramName) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramName);
  };

  const getFollowers = (e) => {
    const username = getQueryParam("username");
      const userId = getQueryParam("user_id");
      setUserId(userId);
      setUsername(username);
    console.log(username, userId);
    axios
      .get("http://localhost:5000/twitter/followers?user_id=" + userId)
      .then((response) => {
        setFollowers(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    };
    
    const getUsersFollowing = (e) => {
        const username = getQueryParam("username");
          const userId = getQueryParam("user_id");
          setUserId(userId);
          setUsername(username);
        console.log(username, userId);
        axios
          .get("http://localhost:5000/twitter/following?user_id=" + userId)
            .then((response) => {
              if (response == null) {
                  throw new Error('No one is following you')
              }
            setFollowers(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

  return (
    <div class="loginForm">
      <Segment placeholder basic padded>
        <Grid columns={2} stackable textAlign="center">
          <Grid.Row>
            <Segment>WELCOME {username}</Segment>
          </Grid.Row>
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
            <Button
                primary
                color="twitter"
                size="huge"
                onClick={getFollowers}
              >
                              Get Followers
              </Button>
            </Grid.Column>
            <Divider vertical>Or</Divider>
            <Grid.Column>
              <Button
                primary
                color="twitter"
                size="huge"
                onClick={getUsersFollowing}
              >
                Get Following
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>{follower.name}</li>
        ))}
      </ul>
          <ul>
          {usersFollowing.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
          </ul>  
    
    </div>
  );
};

export default LoginForm;
