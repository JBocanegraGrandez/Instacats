import React from 'react';
import { Link } from 'react-router-dom'
import "./profile.css"

class EditPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldpass: '',
            password: '',
            password2: ''
        }
    }

    componentWillMount() {

    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render() {
        return (
            <div className="Profile-wrapper">
                <div className="Profile-holder-edit">
                    <ul className="Profile-edit-menu">
                        <li>
                            <Link to={"/accounts/edit"} className="Profile-edit-li edit-li-inactive">Edit Profile</Link>
                        </li>
                        <li>
                            <Link to={"/accounts/password"} className="Profile-edit-li edit-li-active">Change Password</Link>
                        </li>
                    </ul>
                    <article className="Profile-edit-wrapper">
                        <div className="Profile-edit-header-holder">
                            <div className="Profile-edit-header-pic-wrapper">
                                <div className="Profile-edit-header-pic-holder">
                                    <button className="Profile-edit-change-pic">
                                        <img className="Profile-edit-img" src="https://scontent-sjc3-1.cdninstagram.com/vp/8979d347db3984c185c7b9fcac6d1414/5D48C6E9/t51.2885-19/11138064_655901884543180_1057880351_a.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com" alt=""></img>/>
                                    </button>
                                </div>
                            </div>
                            <div className="Profile-edit-header-details">
                                <h1 className="Profile-password-title"> username </h1>                            </div>
                        </div>
                        <form className="Edit-Password-Form">
                            <div className="Edit-Profile-Input-holder">
                                <aside className="Edit-Profile-aside">
                                    <label htmlFor="input-oldpass">Old Password</label>
                                </aside>
                                <div className="Edit-Profile-div">
                                    <input id="input-oldpass" 
                                      className="Edit-Password-input" 
                                      type="password" 
                                      value={this.state.oldpass}
                                      onChange={this.update('oldpass')} />
                                </div>
                            </div>
                            <div className="Edit-Profile-Input-holder">
                                <aside className="Edit-Profile-aside">
                                    <label htmlFor="input-newpass">New Password</label>
                                </aside>
                                <div className="Edit-Profile-div">
                                    <input id="input-newpass" 
                                      className="Edit-Password-input" 
                                      type="password" 
                                      value={this.state.password}
                                      onChange={this.update('password')} />
                                </div>
                            </div>
                            <div className="Edit-Profile-Input-holder">
                                <aside className="Edit-Profile-aside">
                                    <label htmlFor="input-confirmpass">Confirm New Password</label>
                                </aside>
                                <div className="Edit-Profile-div">
                                    <input id="input-confirmpass" 
                                      className="Edit-Password-input" 
                                      type="password" 
                                      value={this.state.password2}
                                      onChange={this.update('password2')} />
                                </div>
                            </div>
                            <div className="Edit-Profile-Input-holder">
                                <aside className="Edit-Profile-aside">
                                    <label></label>
                                </aside>
                                <div className="Edit-Profile-div">
                                    <div className="Edit-Profile-submit">
                                        <button className="Submit-button">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        )
    }
}

export default EditPassword;