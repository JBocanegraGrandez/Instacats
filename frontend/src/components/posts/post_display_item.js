import React from 'react';
import './post.css';

class PostDisplayItem extends React.Component {
  render() {
    return (
      <div className="Post-display-item-wrapper">
        <span>
            <div className="Post-display-item-holder">
                <div className="Post-display-item">
                    <img className="Post-display-item-pic" src={this.props.url} alt=""></img>
                </div>
            </div>
        </span>
        
      </div>
    )
  }
}

export default PostDisplayItem
