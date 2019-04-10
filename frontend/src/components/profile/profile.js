import React from 'react';
import PostBox from '../posts/post_box';
import Pic from '../../profile.jpg'
import './profile.css'

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
                <div>
                    <h2>All of this User's Posts</h2>
                    {this.props.posts.map(post => (
                        <PostBox key={post._id} url={post.img} date={post.date} />
                    ))}
                </div>
            )
        }
    }
    

    render(){
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
                        <h1>{this.props.currentUser.username}</h1>
                        <a className="Edit-profile">
                          <button className="Edit-profile-button">
                            Edit Profile
                          </button>
                        </a>
                        <div />
                      </div>
                      <ul className="Profile-holder-header-details-info">
                        <li className="Profile-stats-info">
                          <span>
                            <span className="stats-numbers">Number</span> posts
                          </span>
                        </li>
                        <li className="Profile-stats-info">
                          <span>
                            <span className="stats-numbers">Number</span> followers
                          </span>
                        </li>
                        <li className="Profile-stats-info">
                          <span>
                            <span className="stats-numbers">Number</span> following
                          </span>
                        </li>
                      </ul>
                      <div className="Profile-holder-header-details-details">
                        <h1 className="Full-name">Name, Lastname</h1>
                        <br/>
                        <span>Description</span>
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