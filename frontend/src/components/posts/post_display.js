import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './post.css';

class PostDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            postId: this.props.post._id
        }

    this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.fetchUsers().then(
            () => this.props.fetchPosts()
        )
    }


    getCommentLikeButton(comment) {
        if (comment.likes.filter(id => id.toString() === this.props.currentUser._id.toString()).length === 0) {
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
    
    getDatefromString(str) {
        if (!str) {
            return ""
        }
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

        return MONTHS[str[5] + str[6]] + " " + str[8] + str[9] + ", " + str.slice(0, 4)
    }
    getPostLikeButton(post) {
        if (post.likes.filter(id => id.toString() === this.props.currentUser._id.toString()).length === 0) {
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

    update(field) {

        return e => {
            this.setState({ [field]: e.currentTarget.value });

        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let comment = {
            body: this.state.body,
            postId: this.props.post._id
        };
        this.props.addCommentToPost(comment).then(
        () => this.setState({body: ""})
        );
    }

    isDisabled() {
        if (this.state.body === '') {
            return true
        } else {
            return false
        }
    }

    render() {
        let posts
        if (!this.props.posts || !this.props.post) {
            return ""
        } else {
            posts = this.props.posts

        }
        return (
            <div className="Profile-wrapper">
            <div className="Post-holder">
                <div className="Post-article-holder">
                <article className="Article-1 Article-2 Article-3 Article-4 Article-5">
                    <div className="Post-article-main-1 Post-article-main-2">
                        <div className="Post-article-main-img-holder">
                            
                            <img
                                className="Postbox-picture"
                                src={this.props.post.img}
                            />
                            
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection: 'column', width: '335px'}}>

                        <header className="Article-header-1 Article-header-2 Article-header3">
                        <div className="Post-article-pic-holder">
                            <canvas className="Post-article-pic-canvas" />
                            <Link
                            to={`/${this.props.post.user.username}`}
                            style={{ cursor: 'pointer' }}
                            className="Postbox-header-profile-pic-item"
                            >
                            <img
                                className="Postbox-header-picture"
                                src={
                                    this.props.post.user.profileURL
                                }
                            />
                            </Link>
                        </div>
                        <div className="Postbox-header-author-details">
                            <div className="Postbox-header-username">
                            <Link style={{cursor: 'pointer'}}
                            onClick={() => this.props.history.push(`/${this.props.post.user.username}`)}
                            to={`/${this.props.post.user.username}`}
                            >{this.props.post.user.username}</Link>
                            </div>
                            <div className="Postbox-header-location" />
                        </div>
                        </header>
                        <div className="Postbox-comments">
                            <ul>
                                <li className="Li-comment">
                                    <div className="Div-comment">
                                            <h2 className="username"><Link to={`/${this.props.post.user.username}`} className="username-link">{this.props.post.user.username}</Link></h2><span>{this.props.post.caption}</span>
                                    </div>
                                </li>
                                {this.props.post.comments.map(comment => {

                                    return (
                                        <li className="Li-comment" key={comment._id}>
                                            <div className="Div-comment-wrapper">
                                                <div className="Div-comment">
                                                    <h2 className="username"><Link to={`/${this.props.users[comment.author].username}`} className="username-link">{this.props.users[comment.author].username}</Link></h2><span>{comment.body}</span>
                                                </div>
                                                {this.getCommentLikeButton(comment)}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <section className="Postbox-interactive" style={{borderTop: '1px solid #efefef', paddingTop: "2px"}}>
                            {this.getPostLikeButton(this.props.post)}
                            <span className="Postbox-button-holder-between">
                                <button className="Postbox-interactive-button"><span className="Span-comment"></span></button>
                            </span>
                            <span className="Postbox-button-holder-between"><button className="Postbox-interactive-button"><span className="Span-share"></span></button></span>
                            <span className="Postbox-button-holder-last"><button className="Postbox-interactive-button"><span className="Span-save"></span></button></span>
                        </section>
                            <section className="Postbox-stats-wrapper"><div className="Postbox-stats-div"><span className="Link-bold"><span>{this.props.post.likes.length}</span> likes</span></div></section>

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
                </div>
            </div>
            </div>
        );
    }
}

export default withRouter(PostDisplay)