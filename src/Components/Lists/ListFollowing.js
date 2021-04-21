import React, { Component } from "react";
import { List, Image, Button, Segment } from "semantic-ui-react";
import twitter_avatar from "../Images/twitter_avatar.png";
import axios from 'axios';

export default class ListFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNull:false
    }
  }

  unfollowUser = (followerId) => {
    const userId = this.props.userId;
    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://localhost:5000/twitter/unfollow?follower_id=" +
          followerId +
          "&user_id=" +
          userId
      )
      .then((response) => {
      })
      .catch((error) => {
        
      });
  };

  render() {
    return (
      <List animated className="followingList">
        {this.props.followings
          .slice(this.props.startList, this.props.endList)
          .map((user) => (
            <List.Item>
              <Image avatar src={twitter_avatar} />
              <List.Content key={user.id}>
                {user.name + " "}
                <Button
                  size="mini"
                  onClick={() => this.unfollowUser(user.id)}
                  floated="right"
                >
                  Unfollow
                </Button>

                <Button size="mini" floated="right">
                  Block
                </Button>
              </List.Content>
              <List.Content animated textAlign="center-bottom">
              Threat Level :
              <Segment vertical='center' loading={this.state.isNull ? false : true}>
                   Undefined
              </Segment>
              </List.Content>

            </List.Item>
          ))}
      </List>
    );
  }
}
