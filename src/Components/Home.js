import React, { Component } from "react";
import {
  Image,
  Button,
  Segment,
  Grid,
  Divider,
  List as SemanticList,
  Container,
  Pagination,
  Icon
} from "semantic-ui-react";
import twitter_avatar from "./Images/twitter_avatar.png";
// import Cookies from 'universal-cookie';
import axios from 'axios'
import NavBar from './NavBar'

export default class Home extends Component {
  state = { followers: [], usersFollowing: [], nextToken: "", previousToken: "", startList: 0, endList: 10 };
  // state = { followers: [], usersFollowing: [], nextToken: "", previousToken: "", previousActivePage: 0, currentActivePage: 1 };
  
  constructor(props) {
    super(props);
    // this.setState({ followers: [], usersFollowing: [] });
    
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
    axios.get('http://localhost:5000/twitter/unfollow?follower_id=' + followerId + '&user_id=' + userId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    

  }

  usersFollowingList() {
    const { list } = this.state.followers;

    return list;
  }

  nextPage = (e, data) => {
    var datum = data.activePage * 10;
    this.setState({ endList: datum, startList: datum - 10 });    

    // this.setState({currentActivePage: data.activePage, previousActivePage: this.state.currentActivePage})
    // console.log(`this.state`, this.state);
    // this.getFollowers();
    
    // this.currentActivePage += 10;
    // this.previousActivePage += 10;
  }

  previousPage = (e) => {
    this.currentActivePage -= 10;
    this.previousActivePage -= 10;
  }

  isFollowing = () => {
    var followers = this.state.followers;
    var following = this.state.following;
      // return true if userid of followers is in following
    return following.includes(followers.name)
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
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId
      )
      .then((response) => {
        this.setState({ followers: response.data.data });
        // this.setState({ followers: response.data.data, nextToken: response.data.meta.next_token, previousToken: response.data.meta.previous_token });
      })
      .catch((error) => {
        console.error(error);
      });
    // axios
    //   .get(
    //     "http://localhost:5000/twitter/followers?user_id=" + this.props.userId + paginationTokenQuery
    //   )
    //   .then((response) => {
    //     this.setState({ followers: response.data.data });
    //     // this.setState({ followers: response.data.data, nextToken: response.data.meta.next_token, previousToken: response.data.meta.previous_token });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  getUsersFollowing = () => {
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

  renderList = (e) => {
    const list = this.state.usersFollowing;
    var displayList = [];
    const startIndex = 0;
    const endIndex = 10;

    for(var user in list) {
      displayList.push(list[user]);
    }
    if (list.length > 10) {
      displayList = list.slice(startIndex, endIndex);

      return (
        displayList.map((user) => {
      <SemanticList.Item>
            <Image avatar src={twitter_avatar} />
            <SemanticList.Content
          key={user.id}
          content={user.name}
            />
            <SemanticList.Content floated='right'>
            <Button size='tiny' onClick={() => this.unfollowUser(user.id)}>Unfollow</Button>
            <Button size='tiny' floated='right'>Block</Button>
            </SemanticList.Content>
            </SemanticList.Item>
        })
      
        // <div key={user.id} className="row">
        //   <div className="image">
        //     <img src={twitter_avatar} />
        //   </div>
        //   <div className="content">
        //     <div>{user.name}</div>
        //   </div>
        // </div>
      );
    }
    
  }

  render() {
    
    let button;
    // if (this.isFollowing) {
    //   button =
    //     (
    //     <Button
    //       size="tiny"
    //       onClick={() => this.unfollowUser(user.id)}
    //       content="Unfollow"
    //     />
    //   )
    // }
    // else {
    //   button = (
    //     <Button
    //       size="tiny"
    //       content="Follow"
    //     />
    //   )
    // }

    return (
      
      <Segment placeholder basic padded>
        
        <NavBar userId={this.props.userId} username={this.props.username} logout={this.handleLogoutClick}/>
        <Grid columns={2} stackable textAlign="center">
          <Grid.Row>
            <Segment>WELCOME {this.props.username}</Segment>
          </Grid.Row>
          <Button onClick={this.isFollowing}>Test</Button>
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
              <SemanticList animated>
                {this.state.followers.slice(this.state.startList, this.state.endList).map((follower) => (
                  <SemanticList.Item>
                    <Image avatar src={twitter_avatar} />
                    <SemanticList.Content
                        key={follower.id}
                      content={follower.name}
                      />
                    <SemanticList.Content floated='right'>
                      <Button size='tiny' floated='right'>Block</Button>
                    </SemanticList.Content>
                  </SemanticList.Item>
                ))}
                <Pagination
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={this.state.followers.length} 
                  onPageChange={this.nextPage}
                  
                  />
              </SemanticList>
            </Grid.Column>

            <Divider></Divider>
            <Grid.Column>

                
                
              <SemanticList animated>
                {this.state.usersFollowing.slice(this.state.startList, this.state.endList).map((user) => (
                  <SemanticList.Item>
                    <Image avatar src={twitter_avatar} />
                    <SemanticList.Content
                      key={user.id}
                      content={user.name}
                    />
                    <SemanticList.Content floated='right'>
                      <Button size='tiny' onClick={() => this.unfollowUser(user.id)}>Unfollow</Button>
                      <Button size='tiny' floated='right'>Block</Button>
                    </SemanticList.Content>
                  </SemanticList.Item>
                ))}
                  
                 
                </SemanticList>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
    
  }
}
