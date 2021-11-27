import React from 'react';
import Header from './Header';
import TriviaGame from './TriviaGame';
// import Settings from './Settings';

class GamePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <TriviaGame />
      </div>
    );
  }
}

export default GamePage;
