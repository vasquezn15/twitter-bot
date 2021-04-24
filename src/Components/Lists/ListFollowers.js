import React, { Component } from "react";
import {
  List,
  Image,
  Button,
  Segment,
  Pagination,
  Transition,
  Loader,
} from "semantic-ui-react";
import twitter_avatar from "../Images/twitter_avatar.png";

export default class ListFollowers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNull: false,
      startList: 0,
      endList: 10,
    };
  }

  nextPage = (e, data) => {
    var datum = data.activePage * 10;
    this.setState({ endList: datum, startList: datum - 10 });
  };

  render() {
    return (
      <List animated className="followersList">
        {this.props.followers
          .slice(this.state.startList, this.state.endList)
          .map((follower) => (
            <List.Item>
              <Image avatar src={follower.profile_image_url}  floated = 'left'/>
              <List.Content
                floated='left'
                key={follower.id}
                content={follower.name}

                
              />
              <List.Content floated="right">
                <Button size="tiny" floated="right">
                  Block
                </Button>
              </List.Content>

              <List.Content animated>
                Threat Level: &ensp;
                <Loader active size= 'tiny' inline = 'center'/>
              </List.Content>
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
          onPageChange={this.nextPage}
        />
      </List>
    );
  }
}
