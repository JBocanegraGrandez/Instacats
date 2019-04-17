import React from 'react';
import './post.css';

class PostDisplayItem extends React.Component {
  render() {
    return (
      <div className="Post-display-item-wrapper">
        <a>
            <div className="Post-display-item-holder">
                <div className="Post-display-item">
                    <img className="Post-display-item-pic" src={this.props.url}></img>
                </div>
            </div>
        </a>
        
      </div>
    )
  }
}

export default PostDisplayItem
