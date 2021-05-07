import React, { Component } from "react";
import {
  List,
  Image,
  Button,
  Segment,
  Pagination,
  Loader,
} from "semantic-ui-react";
import { sendToPython } from "../AICall";
import "../style.css";

export default class ListFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      startList: 0,
      endList: 10,
      followings: [],
    };
  }

  componentDidMount() {
    this.setState({ followings: this.props.followings });
    console.log(`listfollowing cdmount state`, this.state);
  }

  nextPage = (e, data) => {
    var datum = data.activePage * 10;
    this.setState({ endList: datum, startList: datum - 10 });
  };

  blockUser = (target_user_id) => {
    this.props.blockUser(target_user_id);
  };

  unfollowUser = (target_user_id) => {
    this.props.unfollowUser(target_user_id);
  };

  toWords(num) {
    return num === 0 ? "Is Bot" : "Not";
  }

  render() {
    const ITEMS = this.props.followings
      .slice(this.state.startList, this.state.endList)
      .map((user) => (
        <List.Item>
          <Image
            className="userFollowingListItem"
            avatar
            src={user.profile_image_url}
            floated="left"
          />
          <List.Content floated="left" key={user.id} content={user.username} />
          <List.Content floated="right">
            <Button
              size="tiny"
              onClick={() => this.unfollowUser(user.id)}
              floated="right"
            >
              Unfollow
            </Button>
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
            floated="bottom"
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
        <List animated className="followingList" className="ui-list" relaxed>
          {ITEMS}
        </List>
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={Math.round(this.props.followings.length / 10) + 1}
          onPageChange={this.nextPage}
        />
      </div>
    );
  }
}
