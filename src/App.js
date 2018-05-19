import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Upload from './components/Upload'
import Comparison from './components/Comparison'
import Instructions from './components/Instructions'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" render={() => <Instructions />}/>
            <Route path="/upload" render={() => <Upload />}/>
            <Route path="/comparePhotos" render={() => <Comparison />}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
