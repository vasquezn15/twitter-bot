import React, { Component } from "react";
import {
  Image,
  Button,
  Segment,
  Grid,
  Divider,
  Pagination,
} from "semantic-ui-react";
import axios from "axios";
import NavBar from "./NavBar";
import ListFollowing from "./Lists/ListFollowing";
import ListFollowers from "./Lists/ListFollowers";
import e from "cors";

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

    console.log("Constructor Props: ", props);
  }

  componentDidMount() {
    this.getFollowers();
    this.getUsersFollowing();
  }

  componentDidUpdate() {
    console.log("COMPONENT DID UPDATE", this.state);
  }

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

  getCurrentUser() {
    return this.props.userId
  }

  clickListToggle = (e) => {
    console.log("click list toggle and state", this.state.listToggle)
  };

  unfollowUser = (followerId) => {
    const userId = this.props.userId;
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:5000/twitter/unfollow?follower_id=" +
          followerId +
          "&user_id=" +
          userId
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  nextPage = (e, data) => {
    var datum = data.activePage * 10;
    this.setState({ endList: datum, startList: datum - 10 });
  };

  previousPage = (e) => {
    this.currentActivePage -= 10;
    this.previousActivePage -= 10;
  };

  getFollowers = (e) => {
    axios
      .get(
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId
      )
      .then((response) => {
        console.log(`followers`, response);
        this.setState({ followers: response.data });
        // this.setState({ followers: response.data.data, nextToken: response.data.meta.next_token, previousToken: response.data.meta.previous_token });
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
        console.log("response users Following", response.data.data);

        this.setState({ followings: response.data.data }, () => {
          console.log("setFollowingState");
          console.log(this.state);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <Segment placeholder basic padded>
        <NavBar
          userId={this.props.userId}
          username={this.props.username}
          logout={this.handleLogoutClick}
        />
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
                //onClick={this.getFollowers}
              >
                Validate Followers
              </Button>
            </Grid.Column>
            <Divider vertical>Or</Divider>
            <Grid.Column>
              <Button
                primary
                color="twitter"
                size="huge"
                toggle={this.state.listToggle}
                onClick={this.clickListToggle()}
              >
                Validate Following
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <ListFollowers
                followers={this.state.followers}
                startList={this.state.startList}
                endList={this.state.endList}
              />

              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={Math.round(this.state.followers.length / 10) + 1}
                onPageChange={this.nextPage}
              />
            </Grid.Column>

            <Divider></Divider>

            <Grid.Column>
              <ListFollowing
                followings={this.state.followings}
                startList={this.state.startList}
                endList={this.state.endList}
              />

              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={Math.round(this.state.followings.length / 10) + 1}
                onPageChange={this.nextPage}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
