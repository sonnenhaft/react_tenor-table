import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import {map} from 'lodash';
// import {map} from 'lodash-es';
// import map from 'lodash-es/map';
import {where} from 'ramda';
// import axios from 'axios';

class App extends Component {
  render() {
    console.log(where);

    return (
      <div>hohoh</div>
    );
  }
}

const wrapper = document.getElementById('create-article-form');
wrapper ? ReactDOM.render(<App />, wrapper) : false;