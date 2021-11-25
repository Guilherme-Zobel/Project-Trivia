import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import GamePage from './components/GamePage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game-page" component={ GamePage } />
      </Switch>
    );
  }
}

export default App;
