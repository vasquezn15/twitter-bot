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
import "./style.css";
import { sendToPython } from './AICall';

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
    var i =  Math.random() * this.state.followers.length;
    var userId = this.state.followers[Math.round(i)]["id"];
    sendToPython(userId);
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

  getFollowers = (e) => {
    axios
      .get(
        "http://localhost:5000/twitter/followers?user_id=" + this.props.userId
      )
      .then((response) => {
        this.setState({ followers: response.data});
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
              <Divider vertical>Or</Divider>
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

            <Grid.Row className = "homeGrid3">
            <Grid.Column>
            <Segment vertical>
              <ListFollowers
                followers={this.state.followers}
                startList={this.state.startList}
                endList={this.state.endList}
                />
                </Segment>
              </Grid.Column>

              <Divider></Divider>
            <Grid.Column>
              <Segment vertical>
              <ListFollowing
                followings={this.state.followings}
                startList={this.state.startList}
                endList={this.state.endList}
                userId={this.props.userId}
                />
                </Segment>
              </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button size='medium' onClick={this.handlePythonButtonCLick }>
              Send To Python
            </Button>
          </Grid.Row>
        </Grid>
        
      </Segment>
    );
  }
}
