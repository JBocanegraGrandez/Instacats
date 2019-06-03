import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';

class PostDisplayItem extends React.Component {
  render() {
    return (
      <div className="Post-display-item-wrapper">
      <Link to ={`/post/${this.props._id}`}>
        <span>
            <div className="Post-display-item-holder">
                <div className="Post-display-item">
                    <img className="Post-display-item-pic" src={this.props.url} alt=""></img>
                </div>
            </div>
        </span>
      </Link>
      </div>
    )
  }
}

export default PostDisplayItem
