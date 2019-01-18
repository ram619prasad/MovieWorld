import React, { Component } from 'react';
import classes from './App.module.css';
import axios from './axiosInstances/movieInstance';

class App extends Component {
  componentDidMount() {
    axios.get('/popular')
      .then(res => {
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
      })
      .catch(err => {
        console.error('err', err);
      })
  }

  render() {
    return (
      <div className={classes.App}>
        <h1>Hello RPR!!</h1>
        <h2>{process.env.REACT_APP_API_BASE_URL}</h2>
      </div>
    );
  }
}

export default App;
