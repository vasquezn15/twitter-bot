import React, { Component } from "react";
import { List, Image, Button, Segment, Pagination } from "semantic-ui-react";
import axios from "axios";

export default class ListFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNull: false,
      startList: 0,
      endList: 10,
      //followings: this.props.followings
    };
  }

  nextPage = (e, data) => {
    var datum = data.activePage * 10;
    this.setState({ endList: datum, startList: datum - 10 });
  };

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
        console.log(response);
        if (response.data.error) {
          // TODO: Make special alert that unfollowed failed
          alert(response.data.message);
          return;
        }
        
        this.state.followings.filter(
          (user) => user.id !== followerId
        );
        console.log(
          "New list of followings from unfollow user",
          this.props.followings
        );
        alert(response.data.message);
      })
      .catch((error) => {});
  };

  renderList() {

  }

  render() {
    return (
      <List animated className="followingList">
        {this.props.followings
          .slice(this.state.startList, this.state.endList)
          .map((user) => (
            <List.Item>
              <Image avatar src={user.profile_image_url} />
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
                <Segment
                  vertical="center"
                  loading={this.state.isNull ? false : true}
                >
                  Undefined
                </Segment>
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
          totalPages={Math.round(this.props.followings.length / 10) + 1}
          onPageChange={this.nextPage}
        />
      </List>
    );
  }
}
