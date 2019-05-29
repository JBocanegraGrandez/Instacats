import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import glyph from '../../glyph.png';
import kitty from '../../kitty-small.png';
import heart from '../../heart-small.png';
import compass from '../../compass-small.png';
import NotificationModal from "../notifications/notifications_modal";
import CreatePostModal from "../upload/file_upload"

import "./nav.css"; 


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsModal: false,
      createPostModal: false
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.modifyModal = this.modifyModal.bind(this)
    this.getLinks = this.getLinks.bind(this);
  }

  componentDidMount(){
    this.setState({notificationsModal: false})
  }

  // componentDidUpdate(prevProps, prevState){
  //   if (prevProps.match.params.username !== this.props.match.params.username) {
      
  //     this.setState({ notificationsModal: false })
  //   }
  // }

  modifyModal(modal, boolean) {
    this.setState({ [modal]: boolean });
  }


  toogleModal(modal) {
    this.setState({[modal]: !this.state[modal]})
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="Nav-bar-icon-holder">
          <div onClick={() => this.toogleModal("createPostModal")}>
              <div className="sprite-post" />
              <CreatePostModal
                show={this.state.createPostModal}
                modifyModal={this.modifyModal}
                title="Create new Post"
                type="NEW_POST"
              />
          </div>
          <div className="link-icon">
            <Link to={"/posts"}>
              <img
                src={compass}
                height="24px"
                width="24px"
                alt="discover"
              />
            </Link>
          </div>
          <div className="link-icon">
            <div onClick={() => this.toogleModal("notificationsModal")}>
              <div className="sprite-heart" />
            </div>
            <NotificationModal
              modalShow={this.state.notificationsModal}
              modifyModal={this.modifyModal}
              currentUser={this.props.currentUser}
              users={this.props.users}
              posts={this.props.posts}
            />
          </div>
          <div>
            <Link
              className="link-icon"
              to={`/${this.props.currentUser.username}`}
            >
              <img src={kitty} height="24px" width="24px" alt="profile" />
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <span>
          <Link to={"/login"} className="Submit">
            <button className="Submit-button">Log In</button>
          </Link>

          <Link to={"/signup"} className="Submit">
            Sign Up
          </Link>
        </span>
      );
    }
  }

  render() {
    return (
      <nav className="Nav-bar-wrapper">
        <div className="Nav-bar-holder">
          <div className="Nav-bar-item-1">
            <div>
              <Link to={"/posts"}>
                <img src={glyph} height="24px" width="24px" alt="posts" />
              </Link>
            </div>
            <div className="Nav-bar-divider" />
            <div className="Nav-bar-logo">
              <Link to={"/posts"}>
                <img src={logo} height="29px" width="103px" alt="posts" />
              </Link>
            </div>
            <div />
          </div>
          <div className="Nav-bar-item-2">
            <input className="Nav-bar-search" type="text" />
          </div>
          <div className="Nav-bar-item-3">{this.getLinks()}</div>
        </div>
      </nav>
    );
  }
}

export default NavBar