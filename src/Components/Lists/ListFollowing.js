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
    var userId = this.props.userId;
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:5000/twitter/block?target_user_id=" + target_user_id +"&user_id=" + userId
      )
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          // TODO: Make special alert that unfollowed failed
          alert(response.data.message);
          return;
        }
        
        this.setState({followings: this.state.followings.filter((user) => user.id !== target_user_id)})
        console.log(
          "New list of followings from unfollow user",
          this.state.followings
        );
        alert(response.data.message);
      })
      .catch((error) => {});
  };

  unfollowUser = (target_user_id) => {
    this.props.unfollowUser(target_user_id);
    // var userId = this.props.userId;
    // axios.defaults.withCredentials = true;
    // axios
    //   .post(
    //     "http://localhost:5000/twitter/unfollow?target_user_id=" + target_user_id +"&user_id=" + userId
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.error) {
    //       // TODO: Make special alert that unfollowed failed
    //       alert(response.data.message);
    //       return;
    //     }
        
    //     this.setState({followings: this.state.followings.filter((user) => user.id !== target_user_id)})
    //     console.log(
    //       "New list of followings from unfollow user",
    //       this.state.followings
    //     );
    //     alert(response.data.message);
    //   })
    //   .catch((error) => {});
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
