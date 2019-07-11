import React from 'react'
import { withRouter } from 'react-router';
import axios from 'axios';
import './upload.css'

class SimpleReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }


    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        // this.fileUpload(this.state.file).then((response) => {
        //   debuggerZ
        //   const user = this.props.currentUser
        //   user.profileURL = response.data['imageURL']
        //   this.props.patchUser(user);
        //     this.props.modifyModal(false);
        //     this.setState({file: null});
        //     this.props.history.push(`/${this.props.currentUser.username}`)
        // })
    }
    onChange(e) {
        const reader = new FileReader()
        const file = e.target.files[0]
        if (!file) {
          return
        }
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (renderE => {
            const dataURL  = renderE.target.result
            
            this.props.receiveNewPost({dataURL, file})
            this.props.toogleModal()
            this.setState({ file: null })
            this.props.history.push('/posts/new')
          })
    }
    fileUpload(file) {
        const url = 'api/upload/';
        const formData = new FormData();
        formData.append('image', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config)
    }

    show(){
        if (!this.props.show) {
            return { display: 'none' }
        }  else {
            return 
        }
    }

    stopProp(e) {
        e.stopPropagation()
    }


    render() {
        return (
          <div
            className="Upload-Profile-pic-z"
            style={this.show()}
            onClick={() => this.props.modifyModal(false)}
          >
            <div className="Upload-Profile-pic-wrapper">
              <form onSubmit={this.onFormSubmit}>
                <div className="Upload-Profile-pic-holder" onClick={this.stopProp}>
                  <div className="Upload-Profile-pic-title-holder">
                    <h3 className="Upload-Profile-pic-title">
                      {this.props.title}
                    </h3>
                  </div>
                  <div className="Upload-Profile-pic-buttons">
                    <input
                      className="Upload-Profile-button"
                      type="file"
                      onChange={this.onChange}
                    />
                    <button
                      className="Upload-Profile-button"
                      type="submit"
                    >
                      Upload
                    </button>
                    <button
                      className="Upload-Profile-button Upload-Profile-cancel"
                      onClick={() => this.props.modifyModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
    }
}



export default withRouter(SimpleReactFileUpload)