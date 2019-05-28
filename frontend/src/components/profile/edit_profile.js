import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import "./profile.css"
import UploadProfilePic from "../upload/file_upload"

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: `${this.props.currentUser.email}`,
      name: `${this.props.currentUser.name}`,
      lastname: `${this.props.currentUser.lastname}`,
      username: `${this.props.currentUser.username}`,
      description: `${this.props.currentUser.description}`,
      modal: false
    };

    this.modifyModal = this.modifyModal.bind(this)
  }


  

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }


  showModal(){
    this.setState({modal: true})
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.name,
      lastname: this.state.lastname,
      username: this.state.username,
      description: this.state.description
    };

    this.props.patchUser(user, this.props.history);
  }

  modifyModal(boolean) {
    this.setState({modal: boolean})
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
                      src={
                        this.props.currentUser.profileURL ||
                        "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                      }
                      alt="edit-pic"
                    />
                    />
                  </button>
                </div>
              </div>
              <div className="Profile-edit-header-details">
                <h1 className="Profile-edit-title">
                  {this.state.username}{" "}
                </h1>
                <button
                  className="Profile-change-pic"
                  onClick={this.showModal.bind(this)}
                >
                  Change Profile Photo
                </button>
              </div>
            </div>
            <form
              className="Edit-Profile-Form"
              onSubmit={this.handleSubmit.bind(this)}
            >
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
                    onChange={this.update("name")}
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
                    onChange={this.update("lastname")}
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
                    onChange={this.update("username")}
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
                    onChange={this.update("description")}
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
        <UploadProfilePic
          show={this.state.modal}
          modifyModal={this.modifyModal}
          title='Change Profile Photo'
          patchUser={this.props.patchUser}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default withRouter(EditProfile);