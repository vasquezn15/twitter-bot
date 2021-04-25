import React, { Component } from "react";
import { Button, Segment, Grid, Divider, Pagination } from "semantic-ui-react";
import axios from "axios";
import NavBar from "./NavBar";
import ListFollowing from "./Lists/ListFollowing";
import ListFollowers from "./Lists/ListFollowers";
import "./style.css";
import { sendToPython } from './AICall';
import { getQueriesForElement } from "@testing-library/dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      followings: [],
      nextToken: "",
      previousToken: "",
      startList: 0,
      endList: 10,
      listToggle: true,
    };
  }

  componentDidMount() {
    this.getFollowers();
    this.getUsersFollowing();
  }

  handlePythonButtonCLick = (e) => {
    var i = Math.random() * this.state.followers.length;
    var userId = this.state.followers[Math.round(i)]["id"];
    sendToPython(userId);
  };
  handleLogoutClick = () => {
    this.props.logout();
    this.setState({
      followers: [],
      following: [],
      valFollowers: [],
      valFollowing: [],
      nextToken: "",
      previousToken: "",
      startList: 0,
      endList: 10,
    });
  };

  blockUser = (target_user_id) => {
    var userId = this.props.userId;
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:5000/twitter/block?target_user_id=" +
          target_user_id +
          "&user_id=" +
          userId
      )
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          // TODO: Make special alert that unfollowed failed
          alert(response.data.message);
          return;
        }

        this.setState({
          followings: this.state.followings.filter(
            (user) => user.id !== target_user_id
          ),
          followers: this.state.followers.filter(
            (user) => user.id !== target_user_id
          )
        });
        alert(response.data.message);
      })
      .catch((error) => {});
  };

  unfollowUser = (target_user_id) => {
    var userId = this.props.userId;
    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://localhost:5000/twitter/unfollow?target_user_id=" +
          target_user_id +
          "&user_id=" +
          userId
      )
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          // TODO: Make special alert that unfollowed failed
          alert(response.data.message);
          return;
        }

        this.setState({
          followings: this.state.followings.filter(
            (user) => user.id !== target_user_id
          ),
        });
        alert(response.data.message);
      })
      .catch((error) => {});
  };

  getFollowers = (e) => {
    axios
      .get(
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId
      )
      .then((response) => {
        this.setState({ followers: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
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
        this.setState({ followings: response.data.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div class = "gridMaster">
        <NavBar
          userId={this.props.userId}
          username={this.props.username}
          logout={this.handleLogoutClick}
        />        
        <Grid columns={2} className = "gridContainer" stackable textAlign="center" >
            <Grid.Row className = "homeGrid1">
              <Segment>WELCOME {this.props.username}</Segment>
            </Grid.Row>
            <Grid.Row className = "homeGrid2" verticalAlign="middle">
              <Grid.Column>
                <Button
                  primary
                  color="twitter"
                  size="huge"
                >
                  Validate Followers
                </Button>
              </Grid.Column>
              
              <Grid.Column>
                <Button
                  primary
                  color="twitter"
                  size="huge"
                >
                  Validate Following
                </Button>
              </Grid.Column>
            </Grid.Row>

          <Grid.Row className="homeGrid3">
            <Grid.Column>
            <Segment >
              <ListFollowers
                followers={this.state.followers}
                  startList={this.state.startList}
                  endList={this.state.endList}
                  blockUser={this.blockUser}
                />
              </Segment>
            </Grid.Column>

              
            <Grid.Column>
              <Segment >
              <ListFollowing
                followings={this.state.followings}
                startList={this.state.startList}
                endList={this.state.endList}
                  unfollowUser={this.unfollowUser}
                  blockUser={this.blockUser}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className = "SendToPython">
            <Grid.Column>
              <Button size='medium' onClick={this.handlePythonButtonCLick }>
                Send To Python
              </Button>
            </Grid.Column>  
          </Grid.Row>
        </Grid>
        
      </div>
    );
  }
}
