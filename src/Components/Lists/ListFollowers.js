import React, { Component } from "react";
import { List, Image, Button, Segment, Pagination } from "semantic-ui-react";
import twitter_avatar from "../Images/twitter_avatar.png";

export default class ListFollowers extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isNull:false
      }
  }

  render() {
    return (
      <List animated className="followersList">
        {this.props.followers
          .slice(this.props.startList, this.props.endList)
          .map((follower) => (
            <List.Item>
              <Image avatar src={follower.profile_image_url} />
              <List.Content
                key={follower.id}
                content={follower.name + " " + follower.username}
              />
              <List.Content floated="right">
                <Button size="tiny" floated="right">
                  Block
                </Button>
              </List.Content>

              <Segment loading={this.state.isNull ? false : true}>
                <List.Content animated textAlign="center-bottom">
                  Threat Level : Undefined
                </List.Content>
              </Segment>
            </List.Item>
          ))}
            <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={Math.round(this.props.followers.length / 10) + 1}
                // onPageChange={this.nextPage}
              />
        </List>
        
    );
  }
}
