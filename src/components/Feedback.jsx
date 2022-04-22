import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Feedback extends Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  render() {
    const THREE = 3;
    const image = JSON.parse(localStorage.getItem('token'));
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(this.props);
    const resultTest = () => {
      if (state.player.assertions < THREE) {
        return 'Podia ser melhor...';
      } return 'Mandou bem!';
    };

    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${image}` } alt="imagem do usuário" />
        <h2 data-testid="header-player-name">{ state.player.name }</h2>
        <h3 data-testid="header-score">{ state.player.score }</h3>
        <h4 data-testid="feedback-text">
          { resultTest() }

        </h4>
        <h4 data-testid="feedback-total-score">{ state.player.score }</h4>
        <h4 data-testid="feedback-total-question">{ state.player.assertions }</h4>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Jogar novamente

        </button>
        <button data-testid="btn-ranking" type="button">Ver Ranking</button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
