import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import FollowOrUnfollowButton from '../follow/follow_or_unfollow_button_container'

class FollowList extends React.Component {
    
    modalShow() {
        if (!this.props.modalShow) {
            return { display: 'none' }
        } else {
            return
        }
    }

    stopProp(e) {
        e.stopPropagation()
    }

    getTitle(){
      if (this.props.type === "followersModal") {
        return "Followers"
      } 
      else if (this.props.type === "followingModal") {
        return "Following"
      }
    }
  
    render() {
      let userArr
        if (!this.props.users) {
          return ""
        } else {
          userArr = this.props.users

        }
        return (
          <div
            className="FollowList-z"
            style={this.modalShow()}
            onClick={() =>
              this.props.modifyModal(this.props.type, false)
            }
          >
            <div className="FollowList-holder" onClick={this.stopProp}>
              <div className="FollowList-title-holder">
                <div className="FollowList-title-corner" />
                <h1 className="FollowList-title-main">
                  <div>{this.getTitle()}</div>
                </h1>
                <div className="FollowList-title-corner">
                  <button
                    onClick={() =>
                      this.props.modifyModal(this.props.type, false)
                    }
                    className="FollowList-title-exit"
                  >
                    <span className="FollowList-title-x" />
                  </button>
                </div>
              </div>

              <div className="FollowList-ul-wrapper">
                <ul className="FollowList-ul-holder">
                { userArr.map( following => {
                  return (
                    <li className="FollowList-ul-li" key={following._id}>
                      <div className="FollowList-ul-li-div">
                        <div className="FollowList-ul-li-div-details-holder">
                          <div className="FollowList-ul-li-div-details-pic">
                            <canvas className="FollowList-canvas" />
                            <Link
                              to={"username"}
                              className="FollowList-canvas-Link"
                            >
                              <img
                                className="FollowList-canvas-image"
                                src={
                                  following.profileURL ||
                                  "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                                }
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="FollowList-ul-li-div-details-user">
                            <div className="FollowList-detail-username">
                              <Link
                                to={`${following.username}`}
                              >
                                {following.username}
                              </Link>
                            </div>
                            <div className="FollowList-detail-names">
                              {following.name}
                            </div>
                          </div>
                        </div>
                        <div className="FollowList-ul-li-button-holder">
                          <FollowOrUnfollowButton  
                          user={following}
                          profilePage={'false'}
                          currentUser={this.props.currentUser}
                          followUser={this.props.followUser}
                          unfollowUser={this.props.unfollowUser}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })
                }
                </ul>
              </div>
            </div>
          </div>
        );
    }
}

export default FollowList