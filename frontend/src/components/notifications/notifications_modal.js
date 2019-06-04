import React from 'react';
import { Link } from 'react-router-dom';
import './notifications_modal.css';
import FolloworUnfollowButton from '../follow/follow_or_unfollow_button_container';
import { parse, distanceInWordsToNow } from "date-fns";


class NotificationModal extends React.Component {

    modalShow() {
        if (!this.props.modalShow) {
            return { display: 'none' }
        } else {
            return
        }
    }

    createNotificationBody(notification, posts) {
        if (notification.type === "FOLLOW") {
            return " started following you."
        } else if (notification.type === "LIKE_PHOTO") {
            return " liked your photo."
        } else if (notification.type === "NEW_COMMENT"){
            
            let foundComment = posts[notification.postId].comments.filter(
                comment => comment._id === notification.commentId
            )
            return " commented on your photo: " +`${foundComment[0].body}`
        }
    }

    createNotificationTarget(notification) {
        if (notification.type === "FOLLOW") {
            return <FolloworUnfollowButton
                        currentUser ={this.props.currentUser}
                        user={this.props.users[notification.author]}
                    /> 
        } else if (notification.type === "LIKE_PHOTO" || notification.type === "NEW_COMMENT") {
            const post = this.props.posts[notification.postId]
            const imgSrc = post ? post.img : ""
            
            return (
                <Link to={'username'} className="Notification-li-event-pic-wrapper">
                    <div className="Notification-li-event-pic-holder">
                        <div className="Notification-li-event-pic-div">
                            <img className="Notification-event-pic" src={imgSrc} alt="cat"></img>
                        </div>
                    </div>
                </Link>
            )
        } else if (notification.type === "LIKE_COMMENT") {

        }
    }

    stopProp(e) {
        e.stopPropagation()
    }

    render () {
        let notificationsArr
        let users
        let posts
        if (!this.props.currentUser || !this.props.users[this.props.currentUser._id] || Object.keys(this.props.posts).length === 0) {
            
            return ""
        } else {
            
            notificationsArr = this.props.currentUser.notifications.slice().reverse()
            users = this.props.users
            posts = this.props.posts
            
        }
        return (
            <div className="Notification-modal-master" style={this.modalShow()} onClick={() => this.props.modifyModal('notificationsModal', false)}>
                <div className="Notification-modal-master2">
                    <div className="Notification-modal-dialog"></div>
                    <div className="Notification-modal-diamond"></div>
                    <div className="Notification-modal-diamond-cover"></div>
                    <div className="Notification-wrapper" onClick={this.stopProp}>
                        <div className="Notification-holder">
                            <div className="Notification-holder-2">
                                <ul className="Notification-holder-div">
                                {notificationsArr.map( notification => {
                                    return(
                                        <li className="Notification-div-li" key={notification._id}>
                                            <div className="Notification-li-profile-pic-wrapper">
                                                <div className="Notification-li-profile-pic-holder">
                                                    <div className="Notification-li-profile-pic">
                                                        <canvas className="Notification-li-canvas"></canvas>
                                                            <Link to={`/${users[notification.author].username}`} className="Notification-li-Link">
                                                            <img className="Notification-li-pic" src={users[notification.author].profileURL || "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"} alt="cat"></img>
                                                            </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Notification-li-text">
                                                <Link to={`/${users[notification.author].username}`} className="Notification-li-text-Link">{users[notification.author].username}</Link>
                                                {this.createNotificationBody(notification, posts)}
                                                <time className="Notification-li-text-time">{distanceInWordsToNow(parse(notification.date), {addSuffix: true})}</time>
                                            </div>
                                            <div className="Notification-li-event">
                                                {this.createNotificationTarget(notification)}
                                            </div>
                                        </li>

                                    )
                                })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
}
export default NotificationModal