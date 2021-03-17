import React, { Component } from "react";
import {
  Image,
  Button,
  Segment,
  Grid,
  Divider,
  List,
} from "semantic-ui-react";
import twitter_avatar from "./Images/twitter_avatar.png";
// import Cookies from 'universal-cookie';
import axios from 'axios'
import NavBar from './NavBar'

export default class Home extends Component {
  state = { followers: [], usersFollowing: [] };

  constructor(props) {
    super(props);
    this.setState({ followers: [], usersFollowing: [] });
    console.log(props);
    // console.log('Cookie: ', Cookies.get())
  }

  readCookie(name) {
    // var nameEQ = name + "=";
    // var ca = document.cookie.split(';');
    // for(var i=0;i < ca.length;i++) {
    //     var c = ca[i];
    //     while (c.charAt(0)==' ') c = c.substring(1,c.length);
    //     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    // }
    // return null;
  }
  unfollowUser = (followerId) => {



  //   console.log(this.readCookie('twitter_accesstoken'))
  //   const userId = this.props.userId;
  //   console.log('UserID: ' + userId);
  //   console.log('Follower Id: ' + followerId);
  //   axios.get('http://localhost:5000/twitter/unfollow?follower_id=' + followerId + '&user_id=' + userId,{
  //     headers: {
  //       Authorization: "cookie1=value; cookie2=value; cookie3=value;",
  //       withCredentials: true
  //     }
  // })
  //   .then((response) => { 
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  }

  getFollowers = (e) => {
    axios
      .get(
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId
      )
      .then((response) => {
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
        <NavBar userId={this.props.userId} username={this.props.username}/>
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
