import React, { Component } from "react";
import {
  Image,
  Button,
  Segment,
  Grid,
  Divider,
  List,
  Container,
  Pagination,
  Icon
} from "semantic-ui-react";
import twitter_avatar from "./Images/twitter_avatar.png";
// import Cookies from 'universal-cookie';
import axios from 'axios'
import NavBar from './NavBar'

export default class Home extends Component {
  state = { followers: [], usersFollowing: [], nextToken: "", previousToken: "", previousActivePage: 0, currentActivePage: 1 };

  constructor(props) {
    super(props);
    this.setState({ followers: [], usersFollowing: [] });
    console.log('Constructor Props: ', props);
    // console.log('Cookie: ', Cookies.get())
  }

  handleLogoutClick = () => {
    this.props.logout()
  }
  
  getCurrentUser = (e) => {

    axios.defaults.withCredentials = true;
    axios.get('http://localhost:5000/current-user')
    .then((response) => { 
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

    // axios.defaults.withCredentials = true;
    // axios.get('http://localhost:5000/currentUser')
    //   .then((response) => {
    //     console.log(response.userId);
    //   })
    //   .catch((error) => console.log('Error getting user'))
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

    const userId = this.props.userId;
    axios.defaults.withCredentials = true;
    this.getCurrentUser();
    axios.get('http://localhost:5000/twitter/unfollow?follower_id=' + followerId + '&user_id=' + userId)
    .then((response) => { 
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  nextPage = (e, data) => {
    this.setState({ previousActivePage: this.state.currentActivePage, currentActivePage: data.activePage });
    console.log(`this.state`, this.state);
    this.getFollowers();
  }

  getFollowers = (e) => {

    var paginationTokenQuery = ""
    var paginationToken = this.state.previousToken;
    if (this.state.currentActivePage > this.state.previousActivePage) {
      paginationToken = this.state.nextToken;
    }
    if (paginationToken) {
      paginationTokenQuery = "&pagination_token=" + paginationToken;
    }
    axios
      .get(
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId + paginationTokenQuery
      )
      .then((response) => {
        this.setState({ followers: response.data.data, nextToken: response.data.meta.next_token, previousToken: response.data.meta.previous_token });
        console.log(this.state);
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

  testhandle = (e) => {
    axios.get('http://localhost:5000/route1')
      .then((response) => console.log(response))
      .catch((err) => console.log('didnt work'))
  }
  render() {

    return (
      <Segment placeholder basic padded>
        <NavBar userId={this.props.userId} username={this.props.username} logout={this.handleLogoutClick}/>
        <Grid columns={2} stackable textAlign="center">
          <Grid.Row>
            <Segment>WELCOME {this.props.username}</Segment>
            <Button onClick={this.testhandle}>Test</Button>
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
                <Pagination
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={8}
                  onPageChange={this.nextPage}
                  />
              </List>
            </Grid.Column>

            <Divider></Divider>
            <Grid.Column>
              <Container>
              <List animated>
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
                  <Pagination
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={8}
                  onPageChange={this.nextPage}
                  />
                </List>
                </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
    
  }
}
