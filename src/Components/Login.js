import React, { useState } from "react";
import {
  Form,
  Image,
  Button,
  Segment,
  Icon,
  Grid,
  Divider,
  Checkbox,
  Label,
  List,
} from "semantic-ui-react";
import "./style.css";
import twitter_avatar from "./Images/twitter_avatar.png";
const axios = require("axios");

const LoginForm = () => {
  const [userId, setUserId] = useState();

  const [username, setUsername] = useState();

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
          throw new Error("No one is following you");
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
          <Grid.Row>
            <Grid.Column>
              <List>
              {followers.map((follower) => (
                <List.Item>
                  <Image avatar src={twitter_avatar}/>
                  <List.Content>
                      <List.Description key={follower.id} content={follower.name}/>                        
                  </List.Content>
                </List.Item>
                                    ))}
              </List>
            </Grid.Column>
            <Divider></Divider>
            <Grid.Column>
              <List>
              {usersFollowing.map((user) => (
                <List.Item>
                  <Image avatar src={twitter_avatar}/>
                  <List.Content key={user.id} content={user.name}>
                  </List.Content>
                </List.Item>
                                    ))}

              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default LoginForm;
