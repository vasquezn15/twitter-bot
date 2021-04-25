import React, { Component } from "react";
import { List, Image, Button, Segment, Pagination, Loader } from "semantic-ui-react";
import axios from "axios";

export default class ListFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNull: false,
      startList: 0,
      endList: 10,
      followings: []
    };
  }

  componentDidMount() {
    this.setState({followings: this.props.followings})
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

  render() {
    return (
      <div >
      <List animated className="followingList" className='ui-list'>
        {this.props.followings
          .slice(this.state.startList, this.state.endList)
          .map((user) => (
            <List.Item>
              <Image avatar src={user.profile_image_url} floated='left'/>
              <List.Content floated="left" key={user.id} content={user.name} />
              <List.Content floated="right">
              <Button
                  size="mini"
                  onClick={() => this.unfollowUser(user.id)}
                  floated="right"
                >
                  Unfollow
                </Button>
                <Button size="tiny" floated="right" onClick={() => {this.blockUser(user.id)}}>
                  Block
                </Button>
              </List.Content>
<<<<<<< HEAD
              <List.Content
                content='Bot or Not: '
              />
=======
>>>>>>> f1611f1fb8d3153d81ae94b25d797174de06423a
              <List.Content animated textAlign="center-bottom">
                Threat Level
                <Loader active size = 'tiny' inline = 'center'/>
              </List.Content>
            </List.Item>
          ))}
          
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
