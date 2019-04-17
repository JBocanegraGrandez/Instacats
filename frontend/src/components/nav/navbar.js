import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import glyph from '../../glyph.png';
import kitty from '../../kitty-small.png';
import heart from '../../heart-small.png';
import compass from '../../compass-small.png';
import "./nav.css"; 


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn){
            return (
              <div className="Nav-bar-icon-holder">
                <div>
                  <Link to={"/posts"}>
                    <img src={compass} height="24px" width="24px" alt="discover"/>
                  </Link>
                </div>
                <div>
                  <Link className="link-icon" to={"/"}>
                    <img src={heart} height="24px" width="24px" alt="notifications" />
                  </Link>
                </div>
                <div>
                  <Link className="link-icon"  to={`/${this.props.currentUser.username}`}>
                    <img src={kitty} height="24px" width="24px" alt="profile" />
                  </Link>
                </div>
              </div>
            );
        } else {
            return(
                <span>
                        
                        <Link to={'/login'} className="Submit">
                            <button className="Submit-button">Log In</button>
                        </Link>

                        <Link to={'/signup'} className="Submit">Sign Up</Link>        
                </span>
            );
        }
    }

    render() {
        return (
          <div className="Nav-bar-wrapper">
            <div className="Nav-bar-holder">
              <div className="Nav-bar-item-1">
                <div>
                  <Link to={"/posts"} >
                  <img src={glyph} height="24px" width="24px"/>
                  </Link>
                </div>
                <div className ="Nav-bar-divider"></div>
                <div className="Nav-bar-logo">
                  <Link to={"/posts"} >
                  <img src={logo} height="29px" width="103px" />
                  </Link>
                </div>
                <div />
              </div>
              <div className="Nav-bar-item-2">
                <input className="Nav-bar-search" type="text" />
              </div>
              <div className="Nav-bar-item-3">
                {this.getLinks()}
              </div>
            </div>
          </div>
        );
    };
}

export default NavBar