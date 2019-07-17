import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import _ from 'lodash';
// import ramda from 'ramda';
// import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div>hohoh</div>
    );
  }
}

const wrapper = document.getElementById('create-article-form');
wrapper ? ReactDOM.render(<App />, wrapper) : false;