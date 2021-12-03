import React, { Component } from 'react';

export default class Feedback extends Component {
  render() {
    const image = JSON.parse(localStorage.getItem('token'));
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <div data-testid="feedback-text">
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${image}` } alt="imagem do usuário" />
        <h2 data-testid="header-player-name">{ state.player.name }</h2>
        <h3 data-testid="header-score">{ state.player.score }</h3>
      </div>
    );
  }
}
