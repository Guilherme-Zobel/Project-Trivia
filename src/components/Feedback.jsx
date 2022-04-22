import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/feedback.css';
import trivia from '../trivia.png';

export default class Feedback extends Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/game-page');
    document.location.reload(true);
  }

  endGame() {
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
        return 'Podia ser melhor... 🙁';
      } return 'Mandou bem! 😎';
    };

    return (
      <div id="page-feebaback">
        <div className="div-avatar">
          <img src={ `https://www.gravatar.com/avatar/${image}` } alt="imagem do usuário" />
        </div>
        <div className="img-header">
          <img className="img-fluid" src={ trivia } alt="imagem" />
        </div>
        <h2>{ state.player.name }</h2>
        <h3>
          Score:
          {' '}
          { state.player.score }
        </h3>
        <h4>{ resultTest() }</h4>
        <h4>
          Acertos:
          {' '}
          { state.player.assertions }
          {' '}
          / 5
        </h4>
        <div className="btn-feedback">
          <button
            type="button"
            onClick={ this.playAgain }
          >
            Jogar novamente

          </button>
        </div>
        <div className="btn-feedback">
          <button
            type="button"
            onClick={ this.endGame }
          >
            Encerrar
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
