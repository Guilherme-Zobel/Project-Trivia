import React, { Component } from 'react';

export default class Feedback extends Component {
  render() {
    const THREE = 3;
    const image = JSON.parse(localStorage.getItem('token'));
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state.player.assertions);
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
        {/* Requisito 14 nas próximas linhas */}
        <h4 data-testid="feedback-total-score">{ state.player.score }</h4>
        <h4 data-testid="feedback-total-question">{ state.player.assertions }</h4>
        {/* Requisito 15 iniciado na próxima linha */}
        <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        {/* Requisito 16 iniciado na próxima linha */}
        <button data-testid="btn-ranking" type="button">Ver Ranking</button>
      </div>
    );
  }
}
