import React from 'react';
import { Link } from 'react-router-dom';
import "./post.css"

class PostBox extends React.Component {
    
    getDatefromString(str) {
        let MONTHS = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December"
        }

        return MONTHS[str[5]+str[6]] +" " + str[8] +str[9] +", " + str.slice(0,4)
    }
    render() {
        return (
          <article className="Postbox-article">
            <header className="Postbox-header">
              <div className="Postbox-header-profile-pic-holder">
                <Link to={`/${this.props.author}`}className="Postbox-header-profile-pic-item">
                  <img
                    className="Postbox-header-picture"
                                src={this.props.authorPic || "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
                    alt=""
                  />
                </Link>
              </div>
              <div className="Postbox-header-author-details">
                  <div className="Postbox-header-username">
                    <Link to={`/${this.props.author}`}>{this.props.author}</Link>
                  </div>
                  <div className="Postbox-header-location">
                  </div>
              </div>
            </header>
            <div>
                <img className="Postbox-picture" src={this.props.url} alt="" />
            </div>
            <div>
                <section className="Postbox-interactive">
                    <span className="Postbox-button-holder-first"><button className="Postbox-interactive-button"><span className="Span-like"></span></button></span>
                    <span className="Postbox-button-holder-between"><button className="Postbox-interactive-button"><span className="Span-comment"></span></button></span>
                    <span className="Postbox-button-holder-between"><button className="Postbox-interactive-button"><span className="Span-share"></span></button></span>
                    <span className="Postbox-button-holder-last"><button className="Postbox-interactive-button"><span className="Span-save"></span></button></span>
                </section>
                <section className="Postbox-stats-wrapper"><div className="Postbox-stats-div"><span className="Link-bold"><span>5</span> likes</span></div></section>
                <div className="Postbox-comments">
                    <ul>
                        <li className="Li-comment">
                            <div className="Div-comment">
                                    <h2 className="username"><Link to={`/${this.props.author}`} className="username-link">{this.props.author}</Link></h2><span>{this.props.caption}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="Postbox-date"> {this.getDatefromString(this.props.date)}</div>
            <section className="Postbox-input">
                <div className="Postbox-form-wrapper">
                    <form className="Postbox-form">
                        <textarea placeholder="Add a comment…" className="Create-comment" autoComplete="off" autoCorrect="off"></textarea>
                        <button className="Create-comment-button">Post</button>
                    </form>
                </div>
            </section>
            </div>
          </article>
        );
    }
}

export default PostBox;