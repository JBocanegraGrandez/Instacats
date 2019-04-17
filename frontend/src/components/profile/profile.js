import React from 'react';
import PostBox from '../posts/post_box';
import Pic from '../../profile.jpg'
import './profile.css'
import PostDisplayItem from '../posts/post_display_item';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchUser(this.props.match.params.username)
          .then( ( )=> {
            this.props.fetchUserPosts(this.props.user._id)
          })
    }

    componentWillReceiveProps(newState) {
        this.setState({ posts: newState.posts });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.match.params.username !== this.props.match.params.username) {
        this.props.fetchUser(this.props.match.params.username)
          .then(() => {
            this.props.fetchUserPosts(this.props.user._id)
          })
      }
    }

    isEmpty(){
        if (this.props.posts.length === 0) {
            return (
                <div>No Posts</div>
            )
        } else {
            return (
                <div className="Post-display-row">
                    {this.props.posts.map(post => (
                        <PostDisplayItem key={post._id} url={post.img} date={post.date} />
                    ))}
                </div>
            )
        }
    }

    logout(){
      this.props.logoutUser(this.props.user);
    }
    
    getButton(){
      if (this.props.user.username === this.props.currentUser.username) {
        return (
          <span className="getbutton-holder">
          <a className="Edit-profile">
            <button className="Edit-profile-button">
              Edit Profile
            </button>
          </a>
          <a className="settings">
            <button className="settings-button" onClick={this.logout.bind(this)}>
              <span className="settings-span"></span>
            </button>
          </a>
          </span>
        )
      } else {
        return (
        <a className="Edit-profile">
          <button className="Edit-profile-button">
            Follow
          </button>
        </a>
        )
      }
    }

    render(){
      console.log(this.props)
            return (
              <div className="Profile-wrapper">
                <div className="Profile-holder">
                  <header className="Profile-holder-header">
                    <div className="Profile-holder-header-picture-wrapper">
                      <div className="Profile-holder-header-picture-holder">
                        <div className="Profile-holder-header-picture">
                          <img className="Profile-pic" src={Pic} />
                        </div>
                      </div>
                    </div>
                    <section className="Profile-holder-header-details">
                      <div className="Profile-holder-header-details-main">
                        <h1>{this.props.user.username}</h1>
                        {this.getButton()}
                        <div />
                      </div>
                      <ul className="Profile-holder-header-details-info">
                        <li className="Profile-stats-info">
                          <span>
                            <span className="stats-numbers">{this.props.posts.length}</span> posts
                          </span>
                        </li>
                        <li className="Profile-stats-info">
                          <span>
                            <span className="stats-numbers">{this.props.user.followers}</span> followers
                          </span>
                        </li>
                        <li className="Profile-stats-info">
                          <span>
                            <span className="stats-numbers">{this.props.user.following}</span> following
                          </span>
                        </li>
                      </ul>
                      <div className="Profile-holder-header-details-details">
                        <h1 className="Full-name">{this.props.user.name} {this.props.user.lastname}</h1>
                        <br/>
                        <span>{this.props.user.description}</span>
                      </div>
                    </section>
                  </header>
                  <div className="Profile-holder-stories" />
                  <div className="Profile-holder-menu">
                    <a className="Profile-holder-menu-item showing">
                        <span className="Profile-holder-menu-item-span">
                            <div className="SpritePhotoGridActive"></div>
                            <span className="Profile-holder-menu-item-text">Posts</span>
                        </span>
                    </a>
                    <a className="Profile-holder-menu-item">
                        <span className="Profile-holder-menu-item-span">
                            <div className="SpriteTagged"></div>
                            <span className="Profile-holder-menu-item-text">Tagged</span>
                        </span>
                    </a>
                  </div>
                  <div className="Profile-holder-posts" />
                  <div>{this.isEmpty()}</div>
                </div>
              </div>
            );
        ;
        }
    
}

export default Profile;