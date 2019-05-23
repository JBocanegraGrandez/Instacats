import React from 'react';
import { Link } from 'react-router-dom';

class FollowOrUnfollowButton extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            disabledButton: false
        }
    }

    follow() {
        this.setState({ disabledButton: true })
        let user = this.props.user
        this.props.followUser(user.username)
            .then(
                () => this.setState({ disabledButton: false })
            );
    }

    unfollow() {
        this.setState({ disabledButton: true })
        let user = this.props.user;
        this.props.unfollowUser(user.username)
            .then(
                () => this.setState({ disabledButton: false })
            )
    }

    followOrUnfollow() {
        let result = this.props.currentUser.following.filter(followingUser => (
            followingUser._id === this.props.user._id
        ));


        if (result.length > 0) {
            return (
                <span className="Edit-profile">
                    <button
                        id="fo"
                        onClick={this.unfollow.bind(this)}
                        disabled={this.state.disabledButton}
                        className="Edit-profile-button">
                        Following
                    </button>
                </span>
            );
        } else if (result.length === 0) {
            return (
                <span className="Edit-profile">
                    <button
                        id="fo"
                        onClick={this.follow.bind(this)}
                        disabled={this.state.disabledButton}
                        className="Edit-profile-button-follow">
                        Follow
                    </button>
                </span>
            );
        }
    }

    getButton() {
        if (this.props.user.username === this.props.currentUser.username && this.props.profilePage === 'true') {
          console.log(this.props.username)
            return (
                <span className="getbutton-holder">
                    <Link to={"/accounts/edit"} className="Edit-profile">
                        <button className="Edit-profile-button">Edit Profile</button>
                    </Link>
                    <span className="settings">
                        <button
                            className="settings-button"
                            onClick={this.props.logout.bind(this)}
                        >
                            <span className="settings-span" />
                        </button>
                    </span>
                </span>
            );
        } else if (this.props.user.username === this.props.currentUser.username && this.props.profilePage === 'false')
            {
                return (<div></div>)
        }
        
        else {
            
            return this.followOrUnfollow();
        }
    }

    render() {
        return (
            <div>
                {this.getButton()}
            </div>
        )
    }
}

export default FollowOrUnfollowButton;