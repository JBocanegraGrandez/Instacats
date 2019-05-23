import React from 'react';
// import PostBox from '../posts/post_box';
// import Pic from '../../profile.jpg'
import './profile.css'
import PostDisplayItem from '../posts/post_display_item';
import { Link } from 'react-router-dom'
import FollowList from './follow_list'
import { Route } from 'react-router-dom';

import FollowOrUnfollowButton from '../follow/follow_or_unfollow_button_container';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followersModal: false,
      followingModal: false,
    };

    this.modifyModal = this.modifyModal.bind(this);
    this.showModal = this.showModal.bind(this)
  }

  modifyModal(modal, boolean) {
    this.setState({ [modal]: boolean })
  }

  showModal(modal) {
    this.setState({ [modal]: true });
  }


  componentWillMount() {
    this.setState({followingModal: false})
    this.props.setUserLoading();
    this.props.fetchUser(this.props.match.params.username).then(() => {
      this.props.fetchUserPosts(this.props.user._id);
    });
  }

  componentWillReceiveProps(newState) {
    this.setState({ posts: newState.posts });
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      this.props.fetchUser(this.props.match.params.username).then(() => {
        this.props.fetchUserPosts(this.props.user._id)
      });
    }
  }

  isEmpty() {
    if (this.props.posts.length === 0) {
      return <div>No Posts</div>;
    } else {
      return (
        <div className="Post-display-row">
          {this.props.posts.map(post => (
            <PostDisplayItem key={post._id} url={post.img} date={post.date} />
          ))}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Profile-wrapper">
        <div className="Profile-holder">
          <header className="Profile-holder-header">
            <div className="Profile-holder-header-picture-wrapper">
              <div className="Profile-holder-header-picture-holder">
                <div className="Profile-holder-header-picture">
                  <img
                    className="Profile-pic"
                    src={
                      this.props.user.profileURL ||
                      "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <section className="Profile-holder-header-details">
              <div className="Profile-holder-header-details-main">
                <h1>{this.props.user.username}</h1>
                <FollowOrUnfollowButton
                  profilePage={'true'}
                  user={this.props.user}
                  currentUser={this.props.currentUser}
                />
                <div />
              </div>
              <ul className="Profile-holder-header-details-info">
                <li className="Profile-stats-info">
                  <span>
                    <span className="stats-numbers">
                      {this.props.posts.length}
                    </span>{" "}
                    posts
                  </span>
                </li>
                <li className="Profile-stats-info">
                  <span>
                    <span className="stats-numbers">
                      {this.props.user.followers.length}
                    </span>{" "}
                    followers
                  </span>
                </li>
                <li
                  className="Profile-stats-info"
                  onClick={() => this.showModal("followingModal")}
                >
                  <span>
                    <span className="stats-numbers">
                      {this.props.user.following.length}
                    </span>{" "}
                    following
                  </span>
                </li>
              </ul>
              <div className="Profile-holder-header-details-details">
                <h1 className="Full-name">
                  {this.props.user.name} {this.props.user.lastname}
                </h1>
                <br />
                <span>{this.props.user.description}</span>
              </div>
            </section>
          </header>
          <div className="Profile-holder-stories" />
          <div className="Profile-holder-menu">
            <span className="Profile-holder-menu-item showing">
              <span className="Profile-holder-menu-item-span">
                <div className="SpritePhotoGridActive" />
                <span className="Profile-holder-menu-item-text">Posts</span>
              </span>
            </span>
            <span className="Profile-holder-menu-item">
              <span className="Profile-holder-menu-item-span">
                <div className="SpriteTagged" />
                <span className="Profile-holder-menu-item-text">
                  Tagged
                </span>
              </span>
            </span>
          </div>
          <div className="Profile-holder-posts" />
          <div>{this.isEmpty()}</div>
        </div>
        <FollowList
          followersShow={this.state.followersModal}
          followingShow={this.state.followingModal}
          modifyModal={this.modifyModal}
          currentUser={this.props.currentUser}
          user={this.props.user}
        />
      </div>
    );
  }
}

export default Profile;