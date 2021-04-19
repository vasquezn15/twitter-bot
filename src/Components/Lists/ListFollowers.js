import React, { Component } from "react";
import { List, Image, Button, Container } from "semantic-ui-react";
import twitter_avatar from "../Images/twitter_avatar.png";

export default class ListFollowing extends Component {
  constructor(props) {
    super(props);
    console.log("LISTFOLLOWers PROPS",props)
    }

  render() {
      return (            
        
        <List animated className='followersList'>
        {this.props.followers
          .slice(this.props.startList, this.props.endList)
          .map((follower) => (
            <List.Item>
              <Image avatar src={twitter_avatar} />
              <List.Content
                key={follower.id}
                content={follower.name + " " + follower.username}
              />
              <List.Content floated="right">
                <Button size="tiny" floated="right">
                  Block
                </Button>
              </List.Content>
            </List.Item>
          ))}
            </List>
    );
  }
}
