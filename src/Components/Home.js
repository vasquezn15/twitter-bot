import React, { Component } from "react";
import { Button, Segment, Grid, Divider, Pagination } from "semantic-ui-react";
import axios from "axios";
import NavBar from "./NavBar";
import ListFollowing from "./Lists/ListFollowing";
import ListFollowers from "./Lists/ListFollowers";
import "./style.css";
import { sendToPython } from "./AICall";

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
      numOfBots: 0,
    };
  }

  componentDidMount() {
    this.setState(
      (prevState) => ({
        followings: prevState.followings,
        followers: prevState.followers,
      }),
      () => console.log("state followings", this.state.followings)
    );

    // this.getUsersFollowing();
    // this.getFollowers();
    console.log("component did mount");
  }

  async loadBotorNot(userId) {
    var numOfBots = this.state.numOfBots;
    try {
      var isBotorNot = await sendToPython(userId);
      if ((await isBotorNot) == 0) {
        numOfBots++;
      }
      this.setState({ numOfBots });
      return isBotorNot;
    } catch (error) {
      console.error(error);
    }
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
          ),
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

  getFollowers = () => {
    axios
      .get(
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId
      )
      .then((response) => {
        this.setState({ followers: response.data }, async () => {
          var followers = [...this.state.followers]; // make a copy to not polute the state

          followers.forEach(async (follower, index) => {
            followers[index].isBot = await this.loadBotorNot(follower.id);
          });
          this.setState({ followers: followers });
        });
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
        this.setState({ followings: response.data.data }, async () => {
          var followings = [...this.state.followings]; // make a copy to not polute the state

          followings.forEach(async (user, index) => {
            followings[index].isBot = await this.loadBotorNot(user.id);
          });
          this.setState({ followings: followings });
        });
      })
      .catch((error) => {
        console.error("error at getting users following", error);
      });
  };

  render() {
    return (
      <div class="gridMaster">
        <NavBar
          userId={this.props.userId}
          username={this.props.username}
          logout={this.handleLogoutClick}
        />
        <Grid
          columns={2}
          className="gridContainer"
          stackable
          textAlign="center"
        >
          <Grid.Row className="homeGrid1">
            <Segment>WELCOME {this.props.username}</Segment>
          </Grid.Row>
          <Grid.Row className="homeGrid2" verticalAlign="middle">
            <Grid.Column>
              <Button
                primary
                color="twitter"
                size="huge"
                onClick={() => {
                  this.getFollowers();
                }}
              >
                Validate Followers
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Button
                primary
                color="twitter"
                size="huge"
                onClick={() => {
                  this.getUsersFollowing();
                }}
              >
                Validate Following
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="homeGrid3">
            <Grid.Column>
              <Segment>
                <ListFollowers
                  followers={this.state.followers}
                  startList={this.state.startList}
                  endList={this.state.endList}
                  blockUser={this.blockUser}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment>
                <ListFollowing
                  followings={this.state.followings}
                  startList={this.state.startList}
                  endList={this.state.endList}
                  unfollowUser={this.unfollowUser}
                  blockUser={this.blockUser}
                  loadBotorNot={this.loadBotorNot}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="homeGrid4">
            <Grid.Column>
              <Segment>Summary of Results</Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="homeGrid5">
            <Grid.Column>
              <p>This is where the results go</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
