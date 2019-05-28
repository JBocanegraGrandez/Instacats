import React from 'react';
import { Link } from 'react-router-dom';
import './notifications_modal.css';
import FolloworUnfollowButton from '../follow/follow_or_unfollow_button_container';

class NotificationModal extends React.Component {

    modalShow() {
        if (!this.props.modalShow) {
            return { display: 'none' }
        } else {
            return
        }
    }

    createNotificationBody(notification) {
        if (notification.type === "FOLLOW") {
            return " started following you."
        }
    }

    createNotificationTarget(notification) {
        if (notification.type === "FOLLOW") {
            return <FolloworUnfollowButton
                        currentUser ={this.props.currentUser}
                        user={this.props.users[notification.author]}
                    /> 
        }
        // <Link to={'username'} className="Notification-li-event-pic-wrapper">
        //     <div className="Notification-li-event-pic-holder">
        //         <div className="Notification-li-event-pic-div">
        //             <img className="Notification-event-pic" src="https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MzAvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzExMTA1NzIxNTkuanBn" alt="cat"></img>
        //         </div>
        //     </div>
        // </Link>
    }

    stopProp(e) {
        e.stopPropagation()
    }

    render () {
        let notificationsArr
        let users
        if (!this.props.currentUser || !this.props.users[this.props.currentUser._id]) {
            return ""
        } else {
            notificationsArr = this.props.currentUser.notifications
            users = this.props.users
            
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
                                                            <Link to={`${users[notification.author].username}`} className="Notification-li-Link">
                                                            <img className="Notification-li-pic" src={users[notification.author].profileURL || "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"} alt="cat"></img>
                                                            </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Notification-li-text">
                                                <Link to={`${users[notification.author].username}`} className="Notification-li-text-Link">{users[notification.author].username}</Link>
                                                {this.createNotificationBody(notification)}
                                                <time className="Notification-li-text-time">4d</time>
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