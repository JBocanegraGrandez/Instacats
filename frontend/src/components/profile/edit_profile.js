import React from 'react';
import Pic from "../../profile.jpg";
import { Link } from 'react-router-dom'
import "./profile.css"

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: `${this.props.currentUser.email}`,
      name: `${this.props.currentUser.name}`,
      lastname: `${this.props.currentUser.lastname}`,
      username: `${this.props.currentUser.username}`,
      description: `${this.props.currentUser.description}`
    };
  }

  componentWillMount() {}

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  render() {
    return (
      <div className="Profile-wrapper">
        <div className="Profile-holder-edit">
          <ul className="Profile-edit-menu">
            <li>
              <Link
                to={"/accounts/edit"}
                className="Profile-edit-li edit-li-active"
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to={"/accounts/password"}
                className="Profile-edit-li edit-li-inactive"
              >
                Change Password
              </Link>
            </li>
          </ul>
          <article className="Profile-edit-wrapper">
            <div className="Profile-edit-header-holder">
              <div className="Profile-edit-header-pic-wrapper">
                <div className="Profile-edit-header-pic-holder">
                  <button className="Profile-edit-change-pic">
                    <img
                      className="Profile-edit-img"
                      src="https://scontent-sjc3-1.cdninstagram.com/vp/8979d347db3984c185c7b9fcac6d1414/5D48C6E9/t51.2885-19/11138064_655901884543180_1057880351_a.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com"
                    />
                    />
                  </button>
                </div>
              </div>
              <div className="Profile-edit-header-details">
                <h1 className="Profile-edit-title">{this.state.username} </h1>
                <button className="Profile-change-pic">
                  Change Profile Photo
                </button>
              </div>
            </div>
            <form className="Edit-Profile-Form">
              <div className="Edit-Profile-Input-holder">
                <aside className="Edit-Profile-aside">
                  <label htmlFor="input-name">First Name</label>
                </aside>
                <div className="Edit-Profile-div">
                  <input
                    id="input-name"
                    className="Edit-Profile-input"
                    type="text"
                    value={this.state.name} 
                    onChange={this.update('name')}
                  />
                </div>
              </div>
              <div className="Edit-Profile-Input-holder">
                <aside className="Edit-Profile-aside">
                  <label htmlFor="input-lastname">Last Name</label>
                </aside>
                <div className="Edit-Profile-div">
                  <input
                    id="input-lastname"
                    className="Edit-Profile-input"
                    type="text"
                    value={this.state.lastname}
                    onChange={this.update('lastname')}
                  />
                </div>
              </div>
              <div className="Edit-Profile-Input-holder">
                <aside className="Edit-Profile-aside">
                  <label htmlFor="input-username">Username</label>
                </aside>
                <div className="Edit-Profile-div">
                  <input
                    id="input-username"
                    className="Edit-Profile-input"
                    type="text"
                    value={this.state.username}
                    onChange={this.update('username')}
                  />
                </div>
              </div>
              <div className="Edit-Profile-Input-holder">
                <aside className="Edit-Profile-aside">
                  <label htmlFor="input-email">email</label>
                </aside>
                <div className="Edit-Profile-div">
                  <input
                    id="input-email"
                    className="Edit-Profile-input"
                    type="text"
                    value={this.state.email}
                    readOnly
                  />
                </div>
              </div>
              <div className="Edit-Profile-Input-holder">
                <aside className="Edit-Profile-aside">
                  <label htmlFor="textarea-description">Description</label>
                </aside>
                <div className="Edit-Profile-div">
                  <textarea
                    id="textarea-description"
                    className="Edit-Profile-textarea"
                    type="text"
                    value={this.state.description}
                    onChange={this.update('description')}
                  />
                </div>
              </div>
              <div className="Edit-Profile-Input-holder">
                <aside className="Edit-Profile-aside">
                  <label />
                </aside>
                <div className="Edit-Profile-div">
                  <div className="Edit-Profile-submit">
                    <button className="Submit-button">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </article>
        </div>
      </div>
    );
  }
}

export default EditProfile;