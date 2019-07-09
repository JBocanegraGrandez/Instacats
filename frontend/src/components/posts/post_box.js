import React from 'react';
import { Link } from 'react-router-dom';
import "./post.css"
import { parse, distanceInWordsToNow } from 'date-fns';

class PostBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            postId: this.props.post._id
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    getDatefromString(str) {
        return distanceInWordsToNow(parse(str), {addSuffix: true});
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value });

        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let comment = {
            body: this.state.body,
            postId: this.state.postId
        };
        this.props.addCommentToPost(comment);
    }

    isDisabled() {
        if (this.state.body === '') {
            return true
        } else {
            return false
        }
    }

    getPostLikeButton(post){
        
        if (post.likes.filter( id => id.toString() === this.props.currentUser._id.toString()).length === 0 ) {
            return (
            <span className="Postbox-button-holder-first" onClick={() => this.props.addLikeToPost(this.props.post._id)}>
                <button className="Postbox-interactive-button"><span className="Span-like"></span></button>
            </span>)
        } else {
            return (
                <span className="Postbox-button-holder-first" onClick={() => this.props.removeLikeToPost(this.props.post._id)}>
                    <button className="Postbox-interactive-button"><span className="Span-dislike"></span></button>
                </span>)  
                }
    }

    getCommentLikeButton(comment) {
         if (comment.likes.filter( id => id.toString() === this.props.currentUser._id.toString()).length === 0) {
             return (
                 <span className="Li-comment-like-wrapper">
                     <button className="Li-comment-like-button">
                         <span className="Li-comment-like"></span>
                     </button>
                 </span>
             )
         } else {
             return (
                 <span>nothing</span>
             )
         }
    }

    createComment(comment) {
        this.props.addCommentToPost(comment)
            
    }

    render() {
        return (
          <article className="Postbox-article">
            <header className="Postbox-header">
              <div className="Postbox-header-profile-pic-holder">
                <Link to={`/${this.props.post.user.username}`}className="Postbox-header-profile-pic-item">
                  <img
                    className="Postbox-header-picture"
                                src={this.props.post.user.profileURL || "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
                    alt=""
                  />
                </Link>
              </div>
              <div className="Postbox-header-author-details">
                  <div className="Postbox-header-username">
                    <Link to={`/${this.props.post.user.username}`}>{this.props.post.user.username}</Link>
                  </div>
                  <div className="Postbox-header-location">
                  </div>
              </div>
            </header>
            <div>
                <img className="Postbox-picture" src={this.props.post.img} alt="" />
            </div>
            <div>
                <section className="Postbox-interactive">
                    {this.getPostLikeButton(this.props.post)}
                    <span className="Postbox-button-holder-between">
                        <button className="Postbox-interactive-button"><span className="Span-comment"></span></button>
                    </span>
                    <span className="Postbox-button-holder-between"><button className="Postbox-interactive-button"><span className="Span-share"></span></button></span>
                    <span className="Postbox-button-holder-last"><button className="Postbox-interactive-button"><span className="Span-save"></span></button></span>
                </section>
                <section className="Postbox-stats-wrapper"><div className="Postbox-stats-div"><span className="Link-bold"><span>{this.props.post.likes.length}</span> likes</span></div></section>
                <div className="Postbox-comments">
                    <ul>
                        <li className="Li-comment">
                            <div className="Div-comment">
                                    <h2 className="username"><Link to={`/${this.props.post.user.username}`} className="username-link">{this.props.post.user.username}</Link></h2><span>{this.props.post.caption}</span>
                            </div>
                        </li>
                        {this.props.post.comments.map(comment => {
                            return (
                              <li
                                className="Li-comment"
                                key={comment._id}
                              >
                                <div className="Div-comment-wrapper">
                                  <div className="Div-comment">
                                    <h2 className="username">
                                      <Link
                                        to={`${
                                          this.props
                                            .users[
                                            comment
                                              .author
                                          ].username
                                        }`}
                                        className="username-link"
                                      >
                                        {
                                          this.props
                                            .users[
                                            comment
                                              .author
                                          ].username
                                        }
                                      </Link>
                                    </h2>
                                    <span>
                                      {comment.body}
                                    </span>
                                  </div>
                                  {this.getCommentLikeButton(
                                    comment
                                  )}
                                </div>
                              </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="Postbox-date"> {this.getDatefromString(this.props.post.date)}</div>
            <section className="Postbox-input">
                <div className="Postbox-form-wrapper">
                    
                    <form className="Postbox-form" onSubmit={this.handleSubmit}>
                        <textarea placeholder="Add a comment…" 
                            className="Create-comment" 
                            autoComplete="off" 
                            autoCorrect="off" 
                            value={this.state.body}
                            onChange={this.update('body')}
                             />
                        <button className="Create-comment-button" type="submit" disabled={this.isDisabled()}>Post</button>
                    </form>
                </div>
            </section>
            </div>
          </article>
        );
    }
}

export default PostBox;