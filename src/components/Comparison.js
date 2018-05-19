import React, { Component } from 'react';
import easyS3 from '../util/easyS3'

class Comparison extends Component {

    constructor(){
        super();
        this.state = {
            listOfS3Files: [],
            loading: false,
            comparedFaces: false,
            matchPercent: "0%"
        }

        this.assignFilesToState = this.assignFilesToState.bind(this);
        this.updateLoadingState = this.updateLoadingState.bind(this);
    }

    componentWillMount() {
        this.getListofPhotos()
    }

    getListofPhotos = () => {
        easyS3.getListOfFilesFromS3().then(data => {
            this.assignFilesToState(data.Contents)
        }).catch(err => console.error(err))
    }

    assignFilesToState = (listOfS3Files) => {
        this.setState({ listOfS3Files })
    }

    renderListOfFiles = () => {
        const { listOfS3Files } = this.state;
        return listOfS3Files.map((file, index) => {
            const filename = file.Key
            return (
                <option key={index} value={filename}>{filename}</option>
            );
        })
    }

    comparePhotos = () => {
        const firstFileName = document.getElementById("first-selector").value
        const secondFileName = document.getElementById("second-selector").value
        this.updateLoadingState(true, false)
        easyS3.comparePhotos(firstFileName, secondFileName).then(data => {
            let matchPercent = data.FaceMatches[0].Similarity + "%"
            this.updateLoadingState(false, true)
            this.setState({ matchPercent })
        }).catch(err => console.error(err))
    }

    updateLoadingState = (loading, comparedFaces) => {
        this.setState({ loading, comparedFaces })
    }

    renderLoadingMessage = () => {
        return (
            <div id="loading-message">
                Loading...
            </div>
        )
    }

    renderCompletedMessage = () => {
        return (
            <div id="succes-message">
                Completed Comparison
            </div>
        )
    }

    render() {

        const { loading, comparedFaces, matchPercent } = this.state;
        return (
            <div>
                <h1>Comparison PAge</h1>

                <div>
                    Select two photos

                    <select id="first-selector">
                        {this.renderListOfFiles()}
                    </select>

                    <select id="second-selector">
                        {this.renderListOfFiles()}
                    </select>

                    <button onClick={this.comparePhotos}>Compare!</button>

                    <a id="naviate-to-other-page" href="/upload">Add more photos</a>

                    {loading && this.renderLoadingMessage()}
                    {comparedFaces && this.renderCompletedMessage()}
            
                    {comparedFaces && <h1>Similarity between the two photos is: {matchPercent}</h1>}


                </div>
            </div>
        )
    }
}

export default Comparison