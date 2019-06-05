import React from 'react';
import PostBox from './post_box';
import axios from 'axios'
class PostCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            caption: "",
            newPost: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({newPost: nextProps.newPost.caption});
    // }

    handleSubmit(e) {
        e.preventDefault();
        let post = {
            caption: this.state.caption
        };

        this.fileUpload();
        this.setState({caption: ''})
    }

    fileUpload() {
        const url = 'api/posts/';
        const formData = new FormData();
        formData.append('image', this.props.newPost.file)
        formData.append('caption', this.state.caption)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config)
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render() {
        return (
          <div className="Profile-wrapper">
            <div className="Profile-holder-edit">
              <form onSubmit={this.handleSubmit} className="Profile-edit-wrapper">
                <div className="Post-new-header-holder">
                  <div className="Post-new-header-pic-wrapper">
                    <img style={{height: '100%'}}src={this.props.newPost.dataURL} />
                  </div>
                  <div className="Post-new-header-details">
                    <div className="Post-new-caption-holder">
                      <textarea
                        onChange={this.update('caption')}
                        className="Post-new-caption"
                        placeholder="Write a caption..."
                        autoComplete="off"
                        autoCorrect="off"
                        value={this.state.caption}
                      />
                    </div>
                  </div>
                </div>
                <div className="New-Post-Input-holder">
                  <div className="New-Post-Input-wrapper">
                    <aside className="New-Post-aside">
                        <label htmlFor="input-tag">Tag People</label>
                    </aside>
                    <div className="New-Post-div">
                        <input id="input-tag" />
                    </div>
                  </div>
                  <div className="New-Post-Input-wrapper">
                    <aside className="New-Post-aside">
                        <label htmlFor="input-location">Add Location</label>
                    </aside>
                    <div className="New-Post-div">
                        <input id="input-location" />
                    </div>
                  </div>
                  <div className="New-Post-Input-wrapper">
                    <aside className="New-Post-aside">
                        <label></label>
                    </aside>
                    <div className="New-Post-div">
                        <div className="Edit-Profile-submit">
                            <button className="Submit-button" type="submit">Share</button>
                        </div>
                    </div>
                  </div>
    
                </div>
              </form>
            </div>
          </div>
        );
    }
}

export default PostCompose;