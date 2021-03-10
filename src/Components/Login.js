import React, { useState, Component } from "react";
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

export default class LoginForm extends Component {
  state = { followers: [], usersFollowing: [] };

  constructor(props) {
    super(props);
    this.setState({ followers: [], usersFollowing: [] });
    console.log(props);
  }

  unfollowUser = (followerId) => {

    const userId = this.props.userId;
    console.log('UserID: ' + userId);
    console.log('Follower Id: ' + followerId);
    axios.get('http://localhost:5000/twitter/unfollow?follower_id=' + followerId + '&user_id=' + userId)
    .then((response) => { 
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  getFollowers = (e) => {
    axios
      .get(
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId
      )
      .then((response) => {
        console.table(response.data.data)
        this.setState({ followers: response.data.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getUsersFollowing = (e) => {
    axios
      .get(
        "http://localhost:5000/twitter/following?user_id=" + this.props.userId
      )
      .then((response) => {
        if (response == null) {
          throw new Error("No one is following you");
        }
        this.setState({ usersFollowing: response.data.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <Segment placeholder basic padded>
        <Grid columns={2} stackable textAlign="center">
          <Grid.Row>
            <Segment>WELCOME {this.props.username}</Segment>
          </Grid.Row>
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Button
                primary
                color="twitter"
                size="huge"
                onClick={this.getFollowers}
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
                onClick={this.getUsersFollowing}
              >
                Get Following
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <List animated>
                {this.state.followers.map((follower) => (
                  <List.Item>
                    <Image avatar src={twitter_avatar} />
                    <List.Content
                        key={follower.id}
                      content={follower.name}
                      />
                    <List.Content floated='right'>
                      <Button size='tiny' onClick={() => this.unfollowUser(follower.id)}>Unfollow</Button>
                      <Button size='tiny' floated='right'>Block</Button>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>

            <Divider></Divider>
            <Grid.Column>
              <List>
                {this.state.usersFollowing.map((user) => (
                  <List.Item>
                    <Image avatar src={twitter_avatar} />
                    <List.Content
                      key={user.id}
                      content={user.name}
                    />
                    <List.Content floated='right'>
                      <Button size='tiny' onClick={() => this.unfollowUser(user.id)}>Unfollow</Button>
                      <Button size='tiny' floated='right'>Block</Button>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}