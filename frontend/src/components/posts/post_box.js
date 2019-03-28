import React from 'react';

class PostBox extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.url}</h3>
            </div>
        );
    }
}

export default PostBox;