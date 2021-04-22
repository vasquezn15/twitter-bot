import React, { Component } from "react";
import {
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
import { Redirect } from "react-router";

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

  clickListToggle = (e) => {
    
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
        this.setState({ followers: response.data });
        console.log("GET FOLLOWERS STATE", this.state)
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
