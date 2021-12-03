import PropTypes from 'prop-types';
import React from 'react';
import Header from './Header';
import TriviaGame from './TriviaGame';

class GamePage extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <TriviaGame history={ history } />
      </div>
    );
  }
}

GamePage.propTypes = {
  history: PropTypes.func.isRequired,
};

export default GamePage;
