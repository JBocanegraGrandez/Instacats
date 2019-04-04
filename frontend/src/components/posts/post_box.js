import React from 'react';
import "./post.css"

class PostBox extends React.Component {
    render() {
        return (
          <article className="Postbox-article">
            <header className="Postbox-header">
              <div className="Postbox-header-profile-pic-holder">
                <a className="Postbox-header-profile-pic-item">
                  <img
                    className="Postbox-header-picture"
                    src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                  />
                </a>
              </div>
              <div className="Postbox-header-author-details">
                  <div className="Postbox-header-username">
                    <a>username</a>
                  </div>
                  <div className="Postbox-header-location">
                    <h2><a>location</a></h2>
                  </div>
              </div>
            </header>
            <div>
                <img className="Postbox-picture" src={this.props.url} />
            </div>
            <div>
                <section className="Postbox-interactive">
                    <span className="Postbox-button-holder-first"><button className="Postbox-interactive-button"><span className="Span-like"></span></button></span>
                    <span className="Postbox-button-holder-between"><button className="Postbox-interactive-button"><span className="Span-comment"></span></button></span>
                    <span className="Postbox-button-holder-between"><button className="Postbox-interactive-button"><span className="Span-share"></span></button></span>
                    <span className="Postbox-button-holder-last"><button className="Postbox-interactive-button"><span className="Span-save"></span></button></span>
                </section>
                <section className="Postbox-stats-wrapper"><div className="Postbox-stats-div"><a className="Link-bold"><span>5</span> likes</a></div></section>
                <div className="Postbox-comments">
                    <ul>
                        <li className="Li-comment">
                            <div className="Div-comment">
                                <h2 className="username"><a className="username-link">username</a></h2><span>comment</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="Postbox-date">date here</div>
            </div>
            <section className="Postbox-input">
                <div className="Postbox-form-wrapper">
                    <form className="Postbox-form">
                        <textarea placeholder="Add a comment…" className="Create-comment" autoComplete="off" autoCorrect="off"></textarea>
                        <button className="Create-comment-button">Post</button>
                    </form>
                </div>
            </section>
          </article>
        );
    }
}

export default PostBox;