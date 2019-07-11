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
        this.props.fetchUsers()
    }

    componentWillReceiveProps(newState) {
        this.setState({ posts: newState.posts });
    }

    render(){
        if(this.state.posts.length === 0) {
            return (<div>The are no Posts</div>)
        } else {
            return (
                <main className='Posts-main'>
                    <section className="Postbox-narrow">
                        {this.state.posts.reverse().map(post =>(
                            <PostBox key={post._id} post={post} 
                            removeLikeToPost={this.props.removeLikeToPost}
                            currentUser={this.props.currentUser}
                            addLikeToPost={this.props.addLikeToPost}
                            users={this.props.users}
                            addCommentToPost={this.props.addCommentToPost}
                            fetchPosts={this.props.fetchPosts}
                            />
                        ))}
                    </section>
                </main>
            );
        }
    }
}

export default withRouter(Post);