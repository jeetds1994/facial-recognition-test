import React, { Component } from 'react';
import easyS3 from '../util/easyS3'

class Upload extends Component {

    constructor(){
        super()
        this.state = {
            uploading: false,
            uploaded: false,
            error: false
        }
        this.updateUploadState = this.updateUploadState.bind(this);
    }

    upload = (e) => {
        e.preventDefault();
        let uploadElem = document.getElementById('upload-file')
        let file = uploadElem.files[0]
        this.updateUploadState(true, false, false)
        easyS3.upload(file, file.name).then(data => {
            this.updateUploadState(false, true, false)
        }).catch(err => this.updateUploadState(false, false, true))
    }

    updateUploadState = (uploading, uploaded, error) => {
        this.setState({ uploading, uploaded, error })
    }

    renderSuccessfulUploadMessage = () => {
        return (
            <div id="success-message">
                File was uploaded.
            </div>
        )
    }

    renderUnsuccessfulUploadMessage = () => {
        return (
            <div id="not-success-upload-message">
                File was not uploaded.
            </div>
        )
    }

    renderUploadingMessage = () => {
        return (
            <div id="loading-message">
                Uploading...
            </div>
        )
    }

    render() {
        const { uploading, uploaded, error } = this.state;
        return (
            <div>
                <h1>Upload File to S3!</h1>
                <form onSubmit={this.upload}>
                    <input id="upload-file" type="file" name="pic" accept="image/*" />
                    <input type="submit" value="Upload!"/>
                </form >

                <a id="naviate-to-other-page" href="/comparePhotos">Ready to Compare?</a>
                { uploading && this.renderUploadingMessage() }
                { uploaded && this.renderSuccessfulUploadMessage() }
                { error && this.renderUnsuccessfulUploadMessage() }

                    
            </div>
        )
    }
}

export default Upload