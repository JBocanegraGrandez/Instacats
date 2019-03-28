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
                <div>
                    <h2>All Posts</h2>
                    {this.state.posts.map(post =>(
                        <PostBox key={post._id} url={post.img} />
                    ))}
                </div>
            );
        }
    }
}

export default withRouter(Post);