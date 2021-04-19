import React, { Component } from "react";
import { List, Image, Button } from "semantic-ui-react";
import twitter_avatar from "../Images/twitter_avatar.png";

export default class ListFollowing extends Component {
  constructor(props) {
    super(props);
    console.log("LISTFOLLOWING PROPS",props)
  }

  render() {
    return (
      <List animated className="followingList">
        {this.props.followings.slice(this.props.startList, this.props.endList).map((user) => (
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
              Threat Level : Undefined
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}
