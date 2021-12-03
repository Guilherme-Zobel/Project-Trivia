import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import GamePage from './components/GamePage';
import Settings from './components/Settings';
import Feedback from './components/Feedback';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game-page" component={ GamePage } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
