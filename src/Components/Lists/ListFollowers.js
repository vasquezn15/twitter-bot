import React, { Component } from "react";
import { isElementOfType } from "react-dom/test-utils";
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
      followers: [],
    };
  }

  nextPage = (e, data) => {
    var datum = data.activePage * 10;
    this.setState({ endList: datum, startList: datum - 10 });
  };

  blockUser = (target_user_id) => {
    this.props.blockUser(target_user_id);
  };

  toWords(num) {
    return num === 0 ? "Is Bot" : "Not";
  }

  render() {
    const ITEMS = this.props.followers
      .slice(this.state.startList, this.state.endList)
      .map((user) => (
        <List.Item key={user.id}>
          <Image avatar src={user.profile_image_url} floated="left" />
          <List.Content floated="left" key={user.id} content={user.username} />

          <List.Content floated="right">
            <Button
              size="tiny"
              floated="right"
              onClick={() => {
                this.blockUser(user.id);
              }}
            >
              Block
            </Button>
          </List.Content>

          <List.Content
            animated
            className={user.isBot ? "" : "userFollowingListItem"}
          >
            Bot or Not: &ensp;{" "}
            {user.isBot >= 0 ? this.toWords(user.isBot) : " "}
            <Loader
              active={user.isBot >= 0 ? false : true}
              size="tiny"
              inline="center"
            />
          </List.Content>
        </List.Item>
      ));
    return (
      <div>
        <List animated className="ui-list">
          {ITEMS}
        </List>
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
      </div>
    );
  }
}
