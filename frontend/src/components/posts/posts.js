import React from 'react';
import { withRouter } from 'react-router-dom';
import PostBox from './post_box';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        this.props.fetchPosts()
    }

    componentWillReceiveProps(newState) {
        this.setState({ posts: newState.posts });
    }

    render(){
        if(this.state.posts.length === 0) {
            return (<div>The are no Posts</div>)
        } else {
            return (
                <section className="Postbox-narrow">
                    {this.state.posts.map(post =>(
                        <PostBox key={post._id} url={post.img} caption={post.caption} author={post.user.username} date={post.date}/>
                    ))}
                </section>
            );
        }
    }
}

export default withRouter(Post);